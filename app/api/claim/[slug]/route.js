import { constants } from "node:http2"
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import Claim from "@/app/lib/db/models/Claim";
import { ObjectId } from "mongodb";

const commonSelectFields = ['email', 'first_name', 'last_name', 'employee_id']
export async function GET(req, { params: { slug: claimId } }) {
    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        if (!token) {
            return NextResponse.json({ status: "nok" }, { status: constants.HTTP_STATUS_UNAUTHORIZED });
        }

        const claim = await Claim.findOne({ _id: new ObjectId(claimId) }).populate({
            path: "created_by",
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
        }).lean()
        if (!claim) {
            return NextResponse.json({ status: "nok", error: { message: "Requested claim id not found" } }, { status: constants.HTTP_STATUS_NOT_FOUND });
        }

        // Only employeed involved in the claim procedure can view the claim details
        const canViewClaimIds = new Set()
        canViewClaimIds.add(String(claim?.created_by?._id))
        canViewClaimIds.add(String(claim?.created_by?.manager?._id))
        canViewClaimIds.add(String(claim?.created_by?.manager?._id))

        if (!canViewClaimIds.has(token._id)) {
            return NextResponse.json({ status: "nok", error: { message: "You are not authorized to view the claim details" } }, { status: constants.HTTP_STATUS_UNAUTHORIZED });
        }

        return NextResponse.json({ status: "ok", result: claim }, { status: constants.HTTP_STATUS_OK });
    } catch (err) {
        return NextResponse.json({ status: "nok", error: { message: "Something went wrong" } }, { status: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR });
    }
}