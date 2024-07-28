import { ClaimStatus } from "../constants/claim"

export const mapFormDataToPOSTClaimData = (formData) => {
    const postApiData = {
        claim_name: formData.claim_name,
        claim_description: formData.claim_description,
        is_draft: formData.is_draft ?? false,
        expenses: (formData.expenses || []).map(expense => ({
            amount: expense.expense_amount,
            description: expense.expense_description,
            proof_link: expense.expense_proof_link,
            type: expense.expense_type,
            from: new Date(expense.expense_date_range?.[0]?.$d),
            to: new Date(expense.expense_date_range?.[0]?.$d)
        }))
    }
    return postApiData
}

export const mapPOSTClaimDataToMongoData = ({ postClaimData, loggedInUser }) => {
    const mongoData = {
        claim_name: postClaimData.claim_name,
        claim_description: postClaimData.claim_description,
        status: postClaimData.is_draft ? ClaimStatus.DRAFT : ClaimStatus.IN_REVIEW_BY_MANAGER,
        created_by: loggedInUser._id,
        updated_by: loggedInUser._id,
        submitted_at: postClaimData.is_draft ? undefined : new Date(),
        expenses: postClaimData.expenses.map(expense => ({
            type: expense.type,
            amount: expense.amount,
            description: expense.description,
            proof_link: expense.proof_link,
            from: expense.from,
            to: expense.to
        }))
    }
    return mongoData
}
