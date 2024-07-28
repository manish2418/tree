import axios from "axios"

const defaultPageSizeForEmployeeList = 5

export const getEmployeeList = (pageNumber = 1, pageSize = defaultPageSizeForEmployeeList, includeOnlyMyReportees = false, searchKey) => {
    const limit = pageSize
    const offset = (pageNumber - 1) * pageSize
    const query = { limit: limit, offset: offset, includeOnlyMyReportees: includeOnlyMyReportees, searchKey }
    return axios.get("/api/employee", { params: query }).then((res) => {
        return { result: { total: res?.data?.result?.pagination?.total || 0, employees: res?.data?.result?.employees || [] } }
    })
        .catch((_err) => { return { error: { message: "Sorry something went wrong! please trye again later" } } })

}
