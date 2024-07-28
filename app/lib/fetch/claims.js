import axios from "axios"
import { getErrorWrapper, getResultWrapper } from "."
import { mapFormDataToPOSTClaimData } from "../map/claim"

const defaultPageSizeForMyExpenseInACategory = 5


const basePath = "/api/claim"

export const getClaimsWithPaginationApi = (claimStatuses = [], pageNumber = 1, pageSize = defaultPageSizeForMyExpenseInACategory, getClaimsAssignedToMe = false) => {
    const limit = pageSize
    const offset = (pageNumber - 1) * pageSize
    const query = { statuses: claimStatuses?.length ? (claimStatuses || []).join(",") : undefined, limit: limit, offset: offset, assignedToMe: getClaimsAssignedToMe }
    return axios.get(basePath, { params: query }).then((res) =>
        getResultWrapper({ total: res?.data?.result?.pagination?.total || 0, claims: res?.data?.result?.claims || [], userInfo: res?.data?.result?.userInfo })
    )
        .catch((err) => getErrorWrapper(err?.response?.data?.error?.message))

}

export const approveOrRejectClaimRequest = (type, claimId, reason) => {
    const requestBody = {
        status: type, claimId, reason: reason
    }
    return axios.patch(basePath, requestBody)
}


export const getClaimById = ({ claimId }) => {
    return axios.get(`${basePath}/${claimId}`).then((res) => getResultWrapper(res?.data?.result))
        .catch((err) => getErrorWrapper(err?.response?.data?.error?.message))
}


export const postClaim = (formData) => {
    const mappedPostClaimData = mapFormDataToPOSTClaimData(formData)
    return axios.post(basePath, mappedPostClaimData).then(() => getResultWrapper())
        .catch((err) => getErrorWrapper(err?.response?.data?.error?.message))
}
