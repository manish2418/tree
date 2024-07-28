import { Button, Card, Checkbox, DatePicker, Form, Input, InputNumber, Row, Select, message } from "antd"
import { CloseOutlined } from '@ant-design/icons'
import { postClaim } from "@/app/lib/fetch/claims"

const claimOptions = [
    {
        label: 'Claims',
        options: [
            {
                label:
                    'Courier Changes (Laptops & IT office related).',
                value: 'laptop_related.',
            },
            {
                label: 'Foreign Travel Module',
                value: 'foreign_travel_module',
            },
            {
                label: 'IT Expenses',
                value: 'it_expenses',
            },
            {
                label:
                    'Learning and Development Certification',
                value: 'learning_development_certification',
            },
        ],
    },
    {
        label: 'Travel and Hotels',
        options: [
            {
                label: 'Flight/Train',
                value: 'flight_train',
            },
            {
                label: 'Hotel',
                value: 'hotel',
            },
            {
                label: 'Local Transport',
                value: 'local_transport',
            },
            {
                label: 'Visa fee',
                value: 'visa_fee',
            },
        ],
    },
    {
        label: 'Food and Beverage',
        options: [
            {
                label: 'Team Lunch/Dinner',
                value: 'lunch_dinner',
            },
        ],
    },
    {
        label: 'Subsscriptions',
        options: [
            {
                label: 'Software/SAAS tools',
                value: 'softwavr_tool',
            },
        ],
    },
    {
        label: 'Mobile and Internet',
        options: [
            {
                label:
                    'Internet & Mobile (Recommended limit is Rs1000)',
                value: 'software_tool',
            },
            {
                label:
                    'Learning and Development-Program/Workshop',
                value: 'learning_development',
            },
        ],
    },
    {
        label: 'Misc.',
        options: [
            {
                label: 'Office Expense',
                value: 'office_expense',
            },
            {
                label: 'Sports/Hobbies',
                value: 'sports_hobbies',
            },
        ],
    },
]

export const ClaimForm = () => {
    const [form] = Form.useForm()
    const onFinishReimbursement = (formData) => {
        postClaim(formData).then((res) => {
            if (res?.error) {
                message.error(res?.error?.message)
            } else {
                form.resetFields()
                message.success('Claim submitted successfully')
            }
        })
    }

    return (
        <div className='rows-background'>
            <Row className="" justify={'center'}>
                <Form
                    form={form}
                    name="reimbursement_form"
                    autoComplete="off"
                    initialValues={{
                        expenses: [{}],
                    }}
                    layout="vertical"
                    className='reimbursement-form'
                    onFinish={onFinishReimbursement}
                >
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Claim Name'
                        name='claim_name'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter name',
                            },
                        ]}
                    >
                        <Input placeholder='Enter name' />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label='Description'
                        name='claim_description'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Description',
                            },
                        ]}
                    >
                        <Input.TextArea maxLength={50} placeholder='Enter Description' />
                    </Form.Item>
                    <Form.List name="expenses">
                        {(fields, { add, remove }) => (
                            <>
                                <div
                                    style={{
                                        display: 'flex',
                                        rowGap: 20,
                                        flexDirection: 'row',
                                        resize: "vertical",
                                        gap: "10px",
                                        flexWrap: "wrap"
                                    }}
                                >
                                    {fields.map((field) => (
                                        <Card
                                            size="small"
                                            title={`Expense ${field.name + 1}`}
                                            key={field.key}
                                            extra={
                                                fields.length === 1 ? <></> : <CloseOutlined
                                                    onClick={() => {
                                                        if (fields.length > 1) {
                                                            remove(field.name);
                                                        } else {
                                                            message.error("Require atlest one item in claim")
                                                        }
                                                    }}
                                                />
                                            }
                                        >
                                            <Form.Item
                                                labelCol={{ span: 24 }}
                                                label='Type of reimbursement?'
                                                name={[field.name, 'expense_type']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please select type of Reimbursement',
                                                    },
                                                ]}
                                            >
                                                <Select
                                                    placeholder='Please pick a type'
                                                    style={{
                                                        width: 400,
                                                    }}
                                                    options={claimOptions}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                labelCol={{ span: 24 }}
                                                label='Expense Date'
                                                name={[field.name, 'expense_date_range']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please select date/time range for th expense in concern',
                                                    },
                                                ]}
                                            >
                                                <DatePicker.RangePicker
                                                    showTime={{
                                                        format: 'HH:mm',
                                                    }}
                                                    format="YYYY-MM-DD HH:mm"
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                labelCol={{ span: 24 }}
                                                label='Description'
                                                name={[field.name, 'expense_description']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter Description',
                                                    },
                                                ]}
                                            >
                                                <Input.TextArea maxLength={100} placeholder='Enter Description' />
                                            </Form.Item>
                                            <Form.Item
                                                labelCol={{ span: 24 }}
                                                label='Amount'
                                                name={[field.name, 'expense_amount']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter Amount',
                                                    },
                                                ]}
                                            >
                                                <InputNumber addonAfter="INR" min={1} type="number" rows={4} placeholder='Please enter amount' size='large' />
                                            </Form.Item>
                                            <Form.Item
                                                labelCol={{ span: 24 }}
                                                label='Supporting images or documents (maximum 5 MB each)'
                                                name={[field.name, 'expense_proof_link']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please upload the document',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder='Enter the link' />
                                            </Form.Item>
                                        </Card>
                                    ))}
                                </div>

                                <Button style={{ width: "fit-content", marginTop: "30px", marginBottom: "30px" }} type="dashed" onClick={() => add()} block>
                                    + Add Item
                                </Button>
                            </>

                        )}
                    </Form.List>

                    <Form.Item
                        name="is_draft"
                        style={{ marginBottom: "5px" }}
                        valuePropName="checked"
                    >
                        <Checkbox name="is_draft">Save as draft?</Checkbox>
                    </Form.Item>
                    <Row className='tab-two-button'>
                        <Button type='primary' htmlType='submit'>
                            Save
                        </Button>
                        &nbsp;&nbsp;
                        &nbsp;&nbsp;
                        <Button type="dashed" onClick={() => form.resetFields()}>Cancel</Button>
                        &nbsp;&nbsp;
                    </Row>
                </Form>
            </Row>
        </div>
    )
}
