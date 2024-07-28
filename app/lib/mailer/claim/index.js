import { sendEmail } from ".."
import { createClaimSubmissionTemplate } from "../../templates/claim"

export const sendEmailOnClaimCreation = async ({ user, claimRecord }) => {
    if (claimRecord.status === "draft") {
        return Promise.resolve()
    }
    return Promise.all([
        user.email ? sendEmail({
            to: user.email, subject: "Claim request", html: await createClaimSubmissionTemplate({ employeeName: `${user.first_name} ${user.last_name}`, claimName: claimRecord.name, expenseCount: claimRecord.expenses?.length, contentFor: "Employee" })
        }) : Promise.resolve(),
        user.manager.email ? sendEmail({
            to: user.manager.email, subject: "Claim request", html: await createClaimSubmissionTemplate({ employeeName: `${user.first_name} ${user.last_name}`, claimName: claimRecord.name, expenseCount: claimRecord.expenses?.length, contentFor: "Manager" })
        }) : Promise.resolve(),
        user.hr.email ? sendEmail({
            to: user.hr.email, subject: "Claim request", html: await createClaimSubmissionTemplate({ employeeName: `${user.first_name} ${user.last_name}`, claimName: claimRecord.name, expenseCount: claimRecord.expenses?.length, contentFor: "HR" })
        }) : Promise.resolve()
    ])
}