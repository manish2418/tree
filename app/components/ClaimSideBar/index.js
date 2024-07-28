import { ClaimSideBarOptions, Localizations } from "@/utils/constants";
import { Col } from "antd";

export const ClaimSideBar = ({ activeComponent, setActiveComponent }) => {
    return <Col span={3}>
        <div
            className={
                activeComponent === ClaimSideBarOptions.REQUEST_FOR_CLAIM
                    ? 'expense-left-col selected-value'
                    : 'expense-left-col un-selected-value'
            }
            onClick={() => setActiveComponent(ClaimSideBarOptions.REQUEST_FOR_CLAIM)}
        >
            {Localizations[ClaimSideBarOptions.REQUEST_FOR_CLAIM]}
        </div>
        <div
            className={
                activeComponent === ClaimSideBarOptions.PAYSLIPS
                    ? 'expense-left-col selected-value'
                    : 'expense-left-col un-selected-value'
            }
            onClick={() => setActiveComponent(ClaimSideBarOptions.PAYSLIPS)}
        >
            {Localizations[ClaimSideBarOptions.PAYSLIPS]}
        </div>
        <div
            className={
                activeComponent === ClaimSideBarOptions.LIST_CLAIMS_REQUESTED_BY_ME
                    ? 'expense-left-col selected-value'
                    : 'expense-left-col un-selected-value'
            }
            onClick={() => { setActiveComponent(ClaimSideBarOptions.LIST_CLAIMS_REQUESTED_BY_ME) }}
        >
            {Localizations[ClaimSideBarOptions.LIST_CLAIMS_REQUESTED_BY_ME]}
        </div>
        <div
            className={
                activeComponent === ClaimSideBarOptions.LIST_CLAIMS_ASSIGNED_TO_ME
                    ? 'expense-left-col selected-value'
                    : 'expense-left-col un-selected-value'
            }
            onClick={() => { setActiveComponent(ClaimSideBarOptions.LIST_CLAIMS_ASSIGNED_TO_ME); }}
        >
            {Localizations[ClaimSideBarOptions.LIST_CLAIMS_ASSIGNED_TO_ME]}
        </div>
    </Col>
}
