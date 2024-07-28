// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { constants } from "node:http2"
import clientPromise from "@/lib/mongoDb";
import { ObjectId } from "mongodb"
import { getToken } from "next-auth/jwt";
import { ClaimApproveOrReject } from "@/utils/constants";
import { NextResponse } from "next/server";
import { createClaimSubmissionTemplate } from "@/app/lib/templates/claim";
import Employee from "@/app/lib/db/models/Employee";
import Claim from "@/app/lib/db/models/Claim";
import { mapPOSTClaimDataToMongoData } from "@/app/lib/map/claim";
import { sendEmailOnClaimCreation } from "@/app/lib/mailer/claim";
import { getClaimsSchema, postClaimSchema } from "@/app/lib/validators/claim";
import { ClaimStatus } from "@/app/lib/constants/claim";


export async function POST(req) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!session) {
        return NextResponse.json({ status: "nok" }, { status: constants.HTTP_STATUS_UNAUTHORIZED });
    }


    const reqBody = await req.json();
    const validation = postClaimSchema.safeParse(reqBody)


    if (!validation.success) {
        return NextResponse.json({ status: "nok", error: validation.error }, { status: constants.HTTP_STATUS_BAD_REQUEST });
    }

    try {
        const loggedInUser = await Employee.findOne({ _id: new ObjectId(session._id) }).populate([{ path: 'manager', select: 'email' }, { path: 'hr', select: 'email' }]).lean()

        if (!loggedInUser) {
            return NextResponse.json({ status: "nok", error: { message: "Error while getting user data from DB" } }, { status: constants.HTTP_STATUS_NOT_FOUND });
        }

        const claimRecord = mapPOSTClaimDataToMongoData({ loggedInUser: loggedInUser, postClaimData: reqBody })

        await Claim.create(claimRecord)

        // Not awaiting to make sure the API is not slow becuase of mail trigger
        sendEmailOnClaimCreation({ user: loggedInUser, claimRecord: claimRecord })

        return NextResponse.json({ status: "ok" }, { status: constants.HTTP_STATUS_CREATED });
    } catch (e) {
        console.log(e)
        return NextResponse.json({ statu: "nok", error: { message: "Error while updating DB" } }, { status: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR });
    }
}

export async function GET(req) {
    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        if (!token) {
            return NextResponse.json({ status: "nok" }, { status: constants.HTTP_STATUS_UNAUTHORIZED });
        }

        const validation = getClaimsSchema.safeParse(Object.fromEntries(req.nextUrl?.searchParams))

        const requestQuery = validation.data

        if (!validation.success) {
            return NextResponse.json({ status: "nok", error: validation.error }, { status: constants.HTTP_STATUS_BAD_REQUEST });
        }


        const statuses = requestQuery.statuses
        const assignedToMe = requestQuery.assignedToMe
        const limit = requestQuery.limit
        const offset = requestQuery.offset

        const commonSelectFields = ['email', 'first_name', 'last_name', 'employee_id']

        if (assignedToMe) {
            const findMyAssigneesQuery = {
                $or: [
                    { manager: new ObjectId(token._id) },
                    { hr: new ObjectId(token._id) }]
            }

            const myAssignees = await Employee.find(findMyAssigneesQuery).lean()

            const findClaimsOfMyAssigneesQuery = {
                $or: myAssignees.map(assignee => {
                    return {
                        $and: [{
                            created_by: assignee._id
                        },
                        {
                            $or: [{ status: ClaimStatus.IN_REVIEW_BY_HR }, { status: ClaimStatus.IN_REVIEW_BY_MANAGER }]
                        }]
                    }
                })
            }

            const commonPopulateOption = {
                select: commonSelectFields,
                populate: [
                    {
                        path: 'manager',
                        select: commonSelectFields
                    },
                    {
                        path: 'hr',
                        select: commonSelectFields
                    }
                ]
            }
            const claims = await Claim.find(findClaimsOfMyAssigneesQuery).limit(limit).skip(offset).populate([
                {
                    path: 'created_by',
                    ...commonPopulateOption
                },
                {
                    path: 'updated_by',
                    ...commonPopulateOption
                }]).lean()
            const total = await Claim.find(findClaimsOfMyAssigneesQuery).countDocuments()
            return NextResponse.json({ status: "ok", result: { claims: claims, pagination: { total } } }, { status: constants.HTTP_STATUS_OK });
        } else {
            const myClaimsQuery = {
                $and:
                    [
                        { created_by: new ObjectId(token._id) },
                        { status: { $in: statuses } }
                    ]
            }
            const loggedInUser = await Employee.findOne({ _id: new ObjectId(token._id) }).populate([{ path: 'manager', select: commonSelectFields }, { path: 'hr', select: commonSelectFields }]).lean()
            const claims = await Claim.find(myClaimsQuery).limit(limit).skip(offset).lean()
            const total = await Claim.find(myClaimsQuery).countDocuments()
            return NextResponse.json({ status: "ok", result: { claims: claims, pagination: { total }, userInfo: loggedInUser } }, { status: constants.HTTP_STATUS_OK });
        }
    } catch (err) {
        console.log(err)
        return NextResponse.json({ status: "nok", error: { message: "Error while fetching data" } }, { status: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR });
    }

}

export async function PATCH(req) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!session) {
        return NextResponse.json({ status: "nok" }, { status: constants.HTTP_STATUS_UNAUTHORIZED });
    }

    const { status, claimId, reason } = await req.json();

    const isValidStatusValue = status === ClaimApproveOrReject.APPROVE || status === ClaimApproveOrReject.REJECT
    if (!isValidStatusValue) {
        return NextResponse.json({ status: "nok", error: { message: "Invalid value set for status" } }, { status: constants.HTTP_STATUS_BAD_REQUEST });
    } else if (!claimId || !reason) {
        return NextResponse.json({ status: "nok", error: { message: "Missing required fields claimId/reason" } }, { status: constants.HTTP_STATUS_BAD_REQUEST });
    }

    try {
        const client = await clientPromise;
        const db = client.db("employeeDashboard");

        const claimData = await db
            .collection("claim_request")
            .find({ _id: new ObjectId(claimId) }).toArray()
        const claim = claimData?.[0]

        if (!claim) {
            return NextResponse.json({ status: "nok", error: { message: "Requested claimId not found" } }, { status: constants.HTTP_STATUS_NOT_FOUND });
        }

        if (session.role === "HR" && claim.hr.details.employee_id !== session.id) {
            return NextResponse.json({ status: "nok", error: { message: "Not authorized to perform the operation from HR" } }, { status: constants.HTTP_STATUS_UNAUTHORIZED });
        }

        if (session.role !== "HR" && claim.manager.details.employee_id !== session.id) {
            return NextResponse.json({ status: "nok", error: { message: "Not authorized to perform the operation from manager" } }, { status: constants.HTTP_STATUS_UNAUTHORIZED });
        }

        let data
        if (status === ClaimApproveOrReject.APPROVE) {
            if (session.role === "HR") {
                data = {
                    'status': ClaimStatus.COMPLETED,
                    'hr.approved_at': new Date(),
                    'hr.approval_comment': reason
                };
            } else {
                data = {
                    'status': ClaimStatus.IN_REVIEW_BY_HR,
                    'manager.approved_at': new Date(),
                    'manager.approval_comment': reason
                };
            }
        } else {
            if (session.role === "HR") {
                data = {
                    'status': ClaimStatus.REJECTED_BY_HR,
                    'hr.rejected_at': new Date(),
                    'hr.rejection_comment': reason
                };
            } else {
                data = {
                    status: ClaimStatus.REJECTED_BY_MANAGER,
                    'manager.rejected_at': new Date(),
                    'manager.rejection_comment': reason
                };
            }
        }
        await db
            .collection("claim_request")
            .updateOne({ _id: new ObjectId(claimId) }, { $set: data });

        // do not wait for mail to be sent hence do not await on it

        // Always send email to employee on all status change
        sendEmail({
            to: claim.employee.email, subject: "Claim request status update", html: await createClaimSubmissionTemplate({ contentFor: "employee", claimType: claim.type, amount: claim.amount, createdBy: claim.employee, managerInConcern: claim.manager.details, proofLink: claim.doc_link, status, action: "update", reason: reason, updatedByRole: session.role })
        })

        // In case manager approved send email to HR
        if (session.role !== "HR" && status === ClaimApproveOrReject.APPROVE) {
            sendEmail({
                to: claim.hr.details.email, subject: "Claim request status update", html: await createClaimSubmissionTemplate({ contentFor: "hr", claimType: claim.type, amount: claim.amount, createdBy: claim.employee, managerInConcern: claim.manager.details, proofLink: claim.doc_link, status, action: "update", reason: reason, updatedByRole: session.role })
            })
        }

        return NextResponse.json({ status: "ok" }, { status: constants.HTTP_STATUS_OK });

    } catch (e) {
        return NextResponse.json({ statu: "nok", error: { message: "Error while updating DB" } }, { status: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR });
    }
}


