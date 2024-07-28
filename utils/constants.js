import { ClaimStatus } from "@/app/lib/constants/claim";

export const ClaimApproveOrReject = Object.freeze({
    APPROVE: "approve",
    REJECT: "reject"
});

export const ClaimSideBarOptions = Object.freeze({
    LIST_CLAIMS_REQUESTED_BY_ME: "list_claims_requested_by_me",
    PAYSLIPS: "payslips",
    REQUEST_FOR_CLAIM: "request_for_claim",
    LIST_CLAIMS_ASSIGNED_TO_ME: "list_claims_assigned_to_me"
});

export const HRSideBarOptions = Object.freeze({
    UPLOAD_PAY_SLIPS: "upload_pay_slips",
});

export const EmployeeActiveTabs = Object.freeze({
    MY_REPORTEES: "my_reportees",
    DIRECTORY: "directory",
    SALARY: "salary",
});


export const Localizations = Object.freeze({
    [ClaimStatus.DRAFT]: 'Draft',
    [ClaimStatus.IN_REVIEW_BY_HR]: 'In Review By HR',
    [ClaimStatus.IN_REVIEW_BY_MANAGER]: 'In Review By Manager',
    [ClaimStatus.REJECTED_BY_MANAGER]: 'Rejected By Manager',
    [ClaimStatus.REJECTED_BY_HR]: 'Rejected By HR',
    [ClaimStatus.COMPLETED]: 'Completed',
    [ClaimSideBarOptions.LIST_CLAIMS_REQUESTED_BY_ME]: "View my claims",
    [ClaimSideBarOptions.PAYSLIPS]: "Payslips",
    [ClaimSideBarOptions.REQUEST_FOR_CLAIM]: "Request for claim",
    [ClaimSideBarOptions.LIST_CLAIMS_ASSIGNED_TO_ME]: "Claims assigned to me",
    [EmployeeActiveTabs.MY_REPORTEES]: "MY REPORTEES",
    [EmployeeActiveTabs.DIRECTORY]: "DIRECTORY",
    [EmployeeActiveTabs.SALARY]: "SALARY",
    [HRSideBarOptions.UPLOAD_PAY_SLIPS]: "Upload PaySlips",
    "unknown_claim_status": "Unknown",
    "claim_reason_for_approval": "Reason for approval",
    "claim_reason_for_rejection": "Reason for rejection",
    "claim_event_date": "Event date",
    "claim_submission_date": "Submitted on",
    "claim_type": "Type",
    "claim_description": "Description",
    "claim_title": "Title",
    "claim_related_doc": "Document",
    "claim_status": "Status",
    "claim_assigned_manager": "Assigned Manager",
    "claim_assigned_hr": "Assigned HR",
    "claim_approval_button_text": "Approve",
    "claim_rejection_button_text": "Reject",
    "claim_submitted_by": "Raised By",
    "claim_approval_reason_input_alter": "Please enter your approval reason",
    "claim_rejection_reason_input_alter": "Please enter your rejection reason",
    "claim_approval_reason_input_placeholder": "Enter approval reason",
    "claim_rejection_reason_input_placeholder": "Enter rejection reason",
    "claim_approval_modal_confirm_button_text": "Send for approval",
    "claim_rejection_modal_confirm_button_text": "Send for rejection",
    "claim_approval_modal_title": "Approval request",
    "claim_rejection_modal_title": "Rejection request",
    "claim_close_confirm_modal_text": "Cancel",
    "claim_submission_success_ticker_message": "Submitted claim status",
    "unkonwn_error_message": 'Sorry something went wrong, please try again!',
    "employee_list_header_name": "Name",
    "employee_list_header_id": "Employee ID",
    "employee_list_header_designation": "Designation",
    "employee_list_header_email": "Email",
    "employee_list_header_office_location": "Office Location"
})