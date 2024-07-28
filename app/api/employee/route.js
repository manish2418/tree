// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { constants } from "node:http2"
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

import Salary from "@/app/lib/db/models/Salary";
import Employee from "@/app/lib/db/models/Employee";
import { getEmployeesSchema, postEmployeeSchema } from "@/app/lib/validators/employee";
import { postEmployeeToMongoEmployee } from "@/app/lib/map/employee";
import { postSalaryToMongoSalary } from "@/app/lib/map/salary";
import { MONGO_UNIQUE_CONSTRAINT_ERROR } from "@/app/lib/constants";

export async function POST(req) {
    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        if (!token) {
            return NextResponse.json({ status: "nok" }, { status: constants.HTTP_STATUS_UNAUTHORIZED });
        }

        const rawBody = await req.json()

        const validation = postEmployeeSchema.safeParse(rawBody)

        const values = validation.data

        if (!validation.success) {
            return NextResponse.json({ status: "nok", error: validation.error }, { status: constants.HTTP_STATUS_BAD_REQUEST });
        }

        const reportingManager = await Employee.findOne({ email: values.manager }).lean()

        let reportingHr = await Employee.findOne({ role: "HR" }).lean()
        if (values.hr) {
            const hrFromClientSide = await Employee.findOne({ email: values.hr }).lean()
            if (hrFromClientSide.role === "HR") {
                reportingHr = hrFromClientSide
            }
        }

        // TODO: Wrap employee and salary into a transaction
        const employeeRecord = await postEmployeeToMongoEmployee({ values, reportingManager, reportingHr })
        const employeeCreationResponse = await Employee.create(employeeRecord)
        const salaryBreakup = postSalaryToMongoSalary({ values, employee: employeeCreationResponse, createdBy: token })
        await Salary.create(salaryBreakup)

        return NextResponse.json({ status: "ok" }, { status: constants.HTTP_STATUS_CREATED });

    } catch (err) {
        if (err?.code === MONGO_UNIQUE_CONSTRAINT_ERROR) {
            return NextResponse.json({ statu: "nok", error: { message: err?.errmsg } }, { status: constants.HTTP_STATUS_CONFLICT });
        }
        console.log(err)
        return NextResponse.json({ statu: "nok", error: { message: "Error while updating DB" } }, { status: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR });
    }
}

export async function GET(req) {
    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        if (!token) {
            return NextResponse.json({ status: "nok" }, { status: constants.HTTP_STATUS_UNAUTHORIZED });
        }

        const validation = getEmployeesSchema.safeParse(Object.fromEntries(req.nextUrl?.searchParams))

        if (!validation.success) {
            return NextResponse.json({ status: "nok", error: validation.error }, { status: constants.HTTP_STATUS_BAD_REQUEST });
        }

        const includeOnlyMyReportees = validation.data.includeOnlyMyReportees
        const searchKey = validation.data.searchKey
        const limit = validation.data.limit
        const offset = validation.data.offset

        const andQueries = []
        if (includeOnlyMyReportees) {
            andQueries.push({ manager: token._id })
        }

        // Text based search may not be the best approach in this case as there is not much of text involved in this module
        if (!!searchKey) {
            andQueries.push({ $text: { $search: searchKey } })
        }

        const query = andQueries.length ? { $and: andQueries } : {}

        const response = await Employee.find(query).populate('manager').sort({ first_name: 1, last_name: 1 }).collation({ locale: "en", caseLevel: true }).limit(limit).skip(offset);
        const total = await Employee.find(query).countDocuments()
        return NextResponse.json({ result: { pagination: { total }, employees: response } }, { status: constants.HTTP_STATUS_OK });
    } catch (err) {
        console.log(err)
        return NextResponse.json({ statu: "nok", error: { message: "Unexpected error while fetching the data from  DB" } }, { status: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR });
    }
}

