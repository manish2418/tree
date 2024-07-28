import React, { useEffect, useState } from "react";
import { Col, Empty, Skeleton, Table, message } from "antd";
import { getClaimsWithPaginationApi } from "@/app/lib/fetch/claims.js";
const { Column } = Table;
import { Localizations } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { ClaimStatus } from "@/app/lib/constants/claim.js";

export const ClaimPICType = Object.freeze({
    MANAGER: "manager",
    HR: "hr"
});

// This should ideally come from backend (probably some kind of content management API)
const claimFiltersBasedOnStatus = [
    {
        text: Localizations[ClaimStatus.DRAFT],
        value: ClaimStatus.DRAFT,
    },
    {
        text: Localizations[ClaimStatus.IN_REVIEW_BY_HR],
        value: ClaimStatus.IN_REVIEW_BY_HR,
    },
    {
        text: Localizations[ClaimStatus.IN_REVIEW_BY_MANAGER],
        value: ClaimStatus.IN_REVIEW_BY_MANAGER,
    },
    {
        text: Localizations[ClaimStatus.REJECTED_BY_MANAGER],
        value: ClaimStatus.REJECTED_BY_MANAGER,
    },
    {
        text: Localizations[ClaimStatus.REJECTED_BY_HR],
        value: ClaimStatus.REJECTED_BY_HR,
    },
    {
        text: Localizations[ClaimStatus.COMPLETED],
        value: ClaimStatus.COMPLETED,
    },
]

const ClaimList = ({ claimStatus, assignedToMe }) => {

    const router = useRouter()

    const [totalClaimsInTheSelectedCategory, setTotalClaimsInTheSelectedCategory] = useState(0)
    const [claims, setClaims] = useState([])
    const [isClaimListLoading, setIsClaimListLoading] = useState(true)
    const [userInfo, setUserInfo] = useState()

    const getClaimsWithPagination = (claimStatuses, pageNumber, pageSize, assignedToMe) => {
        setIsClaimListLoading(true)
        getClaimsWithPaginationApi(claimStatuses || Object.values(ClaimStatus), pageNumber, pageSize, assignedToMe).then(res => {
            setIsClaimListLoading(false)
            if (res.error) {
                message.error(res.error.message || Localizations.unkonwn_error_message)
            } else if (res.result) {
                setTotalClaimsInTheSelectedCategory(res.result.total || 0)
                setClaims(res.result.claims || [])
                setUserInfo(res.result.userInfo)
            } else {
                message.error(Localizations.unkonwn_error_message)
            }
        })
    }


    useEffect(() => {
        getClaimsWithPagination(claimStatus, undefined, undefined, assignedToMe)
    }, [])

    const getStatusWording = (record) => {
        switch (record.status) {
            case ClaimStatus.DRAFT:
                return <div>{Localizations[ClaimStatus.DRAFT]}</div>
            case ClaimStatus.IN_REVIEW_BY_MANAGER:
                return <div>{Localizations[ClaimStatus.IN_REVIEW_BY_MANAGER]}</div>
            case ClaimStatus.REJECTED_BY_MANAGER:
                return <div>{Localizations[ClaimStatus.REJECTED_BY_MANAGER]}</div>
            case ClaimStatus.IN_REVIEW_BY_HR:
                return <div>{Localizations[ClaimStatus.IN_REVIEW_BY_HR]}</div>
            case ClaimStatus.REJECTED_BY_HR:
                return <div>{Localizations[ClaimStatus.REJECTED_BY_HR]}</div>
            case ClaimStatus.COMPLETED:
                return <div>{Localizations[ClaimStatus.COMPLETED]}</div>
            default:
                return <div>{Localizations.unknown_claim_status}</div>;
        }
    }

    const getPICDetails = (type, record, userInfo, assignedToMe) => {
        if (record?.status === ClaimStatus.DRAFT) {
            return "In Draft"
        }
        let pic
        if (assignedToMe) {
            pic = type === ClaimPICType.MANAGER ? record?.created_by?.manager : record?.created_by?.hr
        } else {
            pic = type === ClaimPICType.MANAGER ? userInfo?.manager : userInfo?.hr
        }
        const name = `${pic?.first_name || ""} ${pic?.last_name || ""}`
        return name
    }

    return (<Col span={20} className='expense-right-col'>
        <Table
            dataSource={isClaimListLoading ? [] : claims}
            onChange={(pagination, filters) => {
                getClaimsWithPagination(filters?.["2"], pagination?.current, pagination?.pageSize, assignedToMe, false)
            }}
            pagination={{ total: totalClaimsInTheSelectedCategory, defaultPageSize: 5, }}
            scroll={{
                y: '60vh',
            }}
            locale={{
                emptyText: isClaimListLoading ? <Skeleton active={true} /> : <Empty />
            }}
            rowKey="Id"
            onRow={(claim) => {
                { return { onClick: () => router.push(`/claim/${claim._id}`) } }
            }}
        >
            <Column title={Localizations.claim_title} dataIndex="claim_name" key="claim_name" />
            <Column title={Localizations.claim_description} dataIndex="claim_description" key="claim_description" />
            {assignedToMe ?
                <Column title={Localizations.claim_status}
                    render={(_, record) => getStatusWording(record)}
                /> :
                <Column title={Localizations.claim_status}
                    render={(_, record) => getStatusWording(record)}
                    filters={claimFiltersBasedOnStatus}
                />
            }
            <Column
                title={Localizations.claim_submission_date}
                dataIndex="submitted_at"
                key="submitted_at"
                render={(_, record) => { console.log(record); return <div>{record.submitted_at?.split("T")?.[0]}</div> }}
            />
            {assignedToMe && <Column title={Localizations.claim_submitted_by} render={(_, record) => <div>{`${record.created_by.first_name} ${record.created_by.last_name}`}</div>} />}
            <Column title={Localizations.claim_assigned_manager}
                render={(_, record) => getPICDetails(ClaimPICType.MANAGER, record, userInfo, assignedToMe)}
            />
            <Column title={Localizations.claim_assigned_hr}
                render={(_, record) => getPICDetails(ClaimPICType.HR, record, userInfo, assignedToMe)}
            />
        </Table>
    </Col>)
};

export default ClaimList;
