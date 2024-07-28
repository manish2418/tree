import { ClaimApproveOrReject, Localizations } from "@/utils/constants";
import { Button, Form, Input, Modal, Row } from "antd";

export const ClaimApprovalAndRejectionModal = ({ type, setShowModal, showModal, handleClaimApprovalAndRejection, claimId }) => {
    const [form] = Form.useForm()
    return <Modal title={type === ClaimApproveOrReject.APPROVE ? Localizations.claim_approval_modal_title : Localizations.claim_rejection_modal_title} onCancel={() => setShowModal(false)} open={showModal} cancelButtonProps={{ style: { display: 'none' } }} okButtonProps={{ style: { display: 'none' } }} >
        <Form
            layout='vertical'
            form={form}
            requiredMark={false}
            onFinish={(v) => { form.resetFields(); setShowModal(false); handleClaimApprovalAndRejection(type, claimId, v) }}
        >
            <Form.Item
                name='reason'
                rules={[
                    {
                        required: true,
                        message: ClaimApproveOrReject.APPROVE ? Localizations.claim_approval_reason_input_alter : Localizations.claim_rejection_reason_input_alter
                    },
                ]}
            >
                <Input.TextArea placeholder={ClaimApproveOrReject.APPROVE ? Localizations.claim_approval_reason_input_placeholder : Localizations.claim_rejection_reason_input_placeholder} />
            </Form.Item>
            <Row className='tab-two-button'>
                <Button type='primary' htmlType='submit'>
                    {type === ClaimApproveOrReject.APPROVE ? Localizations.claim_approval_modal_confirm_button_text : Localizations.claim_rejection_modal_confirm_button_text}
                </Button>
                &nbsp;&nbsp;
                <Button onClick={() => { form.resetFields(); setShowModal(false) }}>{Localizations.claim_close_confirm_modal_text}</Button>
                &nbsp;&nbsp;
            </Row>
        </Form>
    </Modal>
}