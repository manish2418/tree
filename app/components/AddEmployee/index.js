import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, message } from "antd";
import {
    EyeInvisibleOutlined,
    EyeTwoTone,
    DownOutlined
} from '@ant-design/icons'
import { useState } from "react";
import { getEmployeeList } from "@/app/lib/fetch/employee";

export const AddEmployee = ({ onFinish, handleCancel }) => {
    const [managerSelectDropDownOptions, setManagerDropDownSelectOptions] = useState([])

    const getManager = (input) => {
        getEmployeeList(undefined, undefined, undefined, input).then(res => {
            if (res.error) {
                message.error("Sorry something went wrong")
            } else {
                setManagerDropDownSelectOptions(res.result.employees)
            }
        })
    }

    const [form] = Form.useForm()
    return <div className='add-employee-form'>
        <Form
            layout='vertical'
            form={form}
            onFinish={onFinish}
            requiredMark={false}
        >
            <Row justify={'space-between'}>
                <Col span={11}>
                    <Form.Item
                        label='First Name'
                        name='first_name'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter First Name!',
                            },
                        ]}
                    >
                        <Input
                            rows={4}
                            placeholder='Enter First Name...'
                            size='large'
                        />
                    </Form.Item>
                </Col>
                <Col span={11}>
                    <Form.Item
                        label='Last Name'
                        name='last_name'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Last Name!',
                            },
                        ]}
                    >
                        <Input
                            rows={4}
                            placeholder='Enter Last Name...'
                            size='large'
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
                label='Date of Birth'
                name='date_of_birth'
                rules={[
                    {
                        required: true,
                        message: 'Please enter date of birth',
                    },
                ]}
                validateTrigger='onBlur'
            >
                <DatePicker
                    suffixIcon={<DownOutlined />}
                    size='large'
                    format={'MM/DD/YYYY'}
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>

            <Form.Item
                label='Date of Joining'
                name='date_of_joining'
                rules={[
                    {
                        required: true,
                        message: 'Please enter date of joining',
                    },
                ]}
                validateTrigger='onBlur'
            >
                <DatePicker
                    suffixIcon={<DownOutlined />}
                    size='large'
                    format={'MM/DD/YYYY'}
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>

            <Form.Item
                label='Gender'
                name='gender'
                rules={[
                    {
                        required: true,
                        message: 'Please enter gender',
                    },
                ]}
            >
                <Select
                    showSearch
                    placeholder="Select a gender"
                    options={[{ lable: "Male", value: "Male" }, { lable: "Female", value: "Female" }]}
                />
            </Form.Item>

            <Form.Item
                label='Personal Email'
                name='personal_email'
                // validateTrigger={'onBlur'}
                rules={[
                    {
                        type: 'email',
                        message: 'Please enter a valid email address.',
                    },
                    {
                        required: true,
                        message: "Please enter employee's personal email address",
                    },
                ]}
            >
                <Input
                    size='large'
                    placeholder="Enter employee's personal email address..."
                ></Input>
            </Form.Item>

            <Form.Item
                label='Org Email'
                name='org_email'
                // validateTrigger={'onBlur'}
                rules={[
                    {
                        type: 'email',
                        message: 'Please enter a valid email address.',
                    },
                    {
                        required: true,
                        message: 'Please enter org email address',
                    },
                ]}
            >
                <Input
                    size='large'
                    placeholder='Enter org email address...'
                ></Input>
            </Form.Item>

            <Form.Item
                label='Password'
                name='password'
                rules={[
                    {
                        min: 6,
                        required: true,
                        message: 'Please enter valid password',
                    },
                ]}
            >
                <Input.Password
                    size='large'
                    placeholder='Enter password...'
                    type='password'
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                ></Input.Password>
            </Form.Item>

            <Form.Item
                label='Confirm password'
                name='confirm_password'
                dependencies={['password']}
                hasFeedback
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                rules={[
                    {
                        required: true,
                        min: 6,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password
                    size='large'
                    placeholder='Confirm password...'
                    type='password'
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                ></Input.Password>
            </Form.Item>

            <Form.Item
                label='Phone Number'
                name='mobile_no'
                rules={[
                    {
                        required: true,
                        message: 'Please enter phone number',
                    },
                ]}
            >
                <Input
                    allowEmptyFormatting
                    type='tel'
                    maxLength={10}
                    placeholder=' Enter phone number...'
                    className='phone-input'
                />
            </Form.Item>

            <Form.Item
                label='Emergency contact number'
                name='emergency_contact_number'
                rules={[
                    {
                        required: true,
                        message: 'Please enter contact number',
                    },
                ]}
            >
                <Input
                    allowEmptyFormatting
                    type='tel'
                    maxLength={10}
                    placeholder=' Enter phone number...'
                    className='phone-input'
                />
            </Form.Item>


            <Form.Item
                label='Role'
                name='role'
                rules={[
                    {
                        required: true,
                        message: 'Please enter phone number',
                    },
                ]}
            >
                <Select
                    showSearch
                    placeholder="Select a role"
                    options={[{ lable: "Employee", value: "Employee" }, { lable: "HR", value: "HR" }, { lable: "Manager", value: "Manager" }]}
                />
            </Form.Item>

            <Row justify={'space-between'}>
                <Col span={11}>
                    <Form.Item
                        label='IT Exp'
                        name='experience_in_years'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter IT Exp!',
                            },
                        ]}
                    >
                        <InputNumber
                            addonAfter="Yrs."
                            rows={4}
                            placeholder='Enter IT Exp...'
                            size='large'
                            type='number'
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify={'space-between'}>
                <Col span={11}>
                    <Form.Item
                        label='Reporting Manager'
                        name='manager'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Reporting Manager!',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Select a manager"
                            onSearch={(input) => getManager(input)}
                            options={managerSelectDropDownOptions.map(e => ({ lable: e.email, value: e.email }))}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
                label='Employee Designation'
                name='designation'
                rules={[
                    {
                        required: true,
                        message: 'Please enter Employee Role!',
                    },
                ]}
            >
                <Input.TextArea
                    rows={4}
                    placeholder='Enter Employee Role...'
                    size='large'
                />
            </Form.Item>
            <Row justify={'space-between'}>
                <Col span={11}>
                    <Form.Item
                        label='Department'
                        name='department'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Department!',
                            },
                        ]}
                    >
                        <Input
                            rows={4}
                            placeholder='Enter Department...'
                            size='large'
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
                label='Address'
                name='address'
                rules={[
                    {
                        required: true,
                        message: 'Please enter Address!',
                    },
                ]}
            >
                <Input rows={4} placeholder='Enter Address...' size='large' />
            </Form.Item>

            <Form.Item
                label='Location'
                name='location'
                rules={[
                    {
                        required: true,
                        message: 'Please enter Location!',
                    },
                ]}
            >
                <Input rows={4} placeholder='Enter Location...' size='large' />
            </Form.Item>

            <h2>Enter salary details</h2>

            <hr />
            <Row>
                <Col span={15}>
                    <Form.Item
                        label='Basic'
                        name='basic_salary'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter basic salary',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="INR" min={0} type="number" rows={4} placeholder='Please enter basic salary...' size='large' />
                    </Form.Item>
                </Col>
                <Col span={15}>
                    <Form.Item
                        label='HRA'
                        name='house_rent_allowance'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter House Rent Allowance',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="INR" min={0} type="number" rows={4} placeholder='Please enter House Rent Allowance...' size='large' />
                    </Form.Item>
                </Col>
                <Col span={15}>
                    <Form.Item
                        label='Telephone Allowance'
                        name='telephone_allowance'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Telephone Allowance',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="INR" min={0} type="number" rows={4} placeholder='Please enter Telephone Allowance...' size='large' />
                    </Form.Item>
                </Col>
                <Col span={15}>
                    <Form.Item
                        label='LTA'
                        name='lta'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter LTA',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="INR" min={0} type="number" rows={4} placeholder='Please enter LTA...' size='large' />
                    </Form.Item>
                </Col>
                <Col span={15}>
                    <Form.Item
                        label='Special Allowance'
                        name='special_allowance'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Special Allowance',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="INR" min={0} type="number" rows={4} placeholder='Please enter Special Allowance...' size='large' />
                    </Form.Item>
                </Col>
                <Col span={15}>
                    <Form.Item
                        label='Performance Incentive'
                        name='performance_incentive'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Performance Incentive',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="INR" min={0} type="number" rows={4} placeholder='Please enter Performance Incentive...' size='large' />
                    </Form.Item>
                </Col>
                <Col span={15}>
                    <Form.Item
                        label='Retention Bonus'
                        name='retention_bonus'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Retention Bonus',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="INR" min={0} type="number" rows={4} placeholder='Please enter Retention Bonus...' size='large' />
                    </Form.Item>
                </Col>
                <Col span={15}>
                    <Form.Item
                        label='PF'
                        name='provident_fund'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter PF',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="INR" min={0} type="number" rows={4} placeholder='Please enter PF...' size='large' />
                    </Form.Item>
                </Col>
                <Col span={15}>
                    <Form.Item
                        label='Professional Tax'
                        name='professional_tax'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Professional Tax',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="INR" min={0} type="number" rows={4} placeholder='Please enter Professional Tax...' size='large' />
                    </Form.Item>
                </Col>
                <Col span={15}>
                    <Form.Item
                        label='Income Tax'
                        name='income_tax'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Income Tax',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="INR" min={0} type="number" rows={4} placeholder='Please enter Professional Tax...' size='large' />
                    </Form.Item>
                </Col>
                <Col span={15}>
                    <Form.Item
                        label='NPS'
                        name='national_pention_scheme_amount'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter NPS',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="INR" min={0} type="number" placeholder='Please enter NPS...' size='large' />
                    </Form.Item>
                </Col>

            </Row>
            <Row justify={'end'}>
                <Button onClick={handleCancel}>Cancel</Button>&nbsp;&nbsp;
                <Button type='primary' htmlType='submit'>
                    Add
                </Button>
            </Row>
        </Form>
    </div>
}