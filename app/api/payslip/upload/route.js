import { constants } from "node:http2"
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import clientPromise from "@/lib/mongoDb";


const readFile = (req) => {
    return new Promise(async (resolve, reject) => {
        const data = await req.formData();
        const file = data.get('file');

        if (!file) {
            return reject({ message: 'No file sent!', statusCode: constants.HTTP_STATUS_BAD_REQUEST });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        resolve({ contentBuffer: buffer, fileInfo: file });
    });
}


const validateAndReturnInforFromFileName = (fileName) => {
    const [name, _extension] = fileName?.split(".")
    const [firstName, lastName, empoyeeId, salaryMonth, salaryYear] = name?.split("_")

    const isValidMonth = Number(salaryMonth) > 0 && Number(salaryMonth) <= 12

    const isValidEmployeeId = !Number.isNaN(empoyeeId)

    const isValidYear = !Number.isNaN(salaryYear)

    if (!firstName
        || !lastName
        || !isValidEmployeeId
        || !isValidMonth
        || !isValidYear
    ) {
        return { error: { message: "Invalid file name, file name should follow the convenion: <firstName>_<lastName>_<employeeId>_<salaryMonth(1-12)_salaryYear>", statusCode: constants.HTTP_STATUS_BAD_REQUEST } }
    }

    return {
        userInfoFromFileName: {
            firstName, lastName, empoyeeId, salaryMonth, salaryYear
        }
    }

}

const validateFile = (fileInfo) => {

    if (!fileInfo.type?.includes("pdf")) {
        return { error: { message: "Invalid file type", statusCode: constants.HTTP_STATUS_BAD_REQUEST } }
    }

    // Max file size should come from env
    if (fileInfo.size > 142786000) {
        return { error: { message: "File size above threshold", statusCode: constants.HTTP_STATUS_BAD_REQUEST } }
    }

    return validateAndReturnInforFromFileName(fileInfo.name)
}

export async function POST(req) {
    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        if (!token || token.role !== "HR") {
            return NextResponse.json({ status: "nok" }, { status: constants.HTTP_STATUS_UNAUTHORIZED });
        }

        const { contentBuffer, fileInfo } = await readFile(req)
        const { error, userInfoFromFileName } = validateFile(fileInfo)

        if (error) {
            return NextResponse.json({ status: "nok", message: error.message || "Something went wrong" }, { status: error.statusCode || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR });
        }

        const client = await clientPromise

        const db = client.db("employeeDashboard")

        const employeeData = await db.collection("employees").find({ employee_id: Number(userInfoFromFileName.empoyeeId) }).limit(1).toArray()
        const employee = employeeData?.[0]

        if (!employee) {
            return NextResponse.json({ status: "nok", message: "no employee found with the given employeeId specified id in the file" }, { status: constants.HTTP_STATUS_BAD_REQUEST });
        }

        if (employee.first_name?.toLowerCase() !== userInfoFromFileName.firstName?.toLowerCase()) {
            return NextResponse.json({ status: "nok", message: "Employee id related info and first name does not match" }, { status: constants.HTTP_STATUS_BAD_REQUEST });
        }

        // upload the contentBuffer to s3 and then save s3 reference to a collection: this should be done in a session to provide trasnactional stability

        return NextResponse.json({ status: "ok" }, { status: constants.HTTP_STATUS_CREATED });
    } catch (error) {
        return NextResponse.json({ status: "nok" }, { status: constants.HTTP_STATUS_CREATED });
    }
}
