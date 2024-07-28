import React from 'react';
import { Button, Form, Input, message, Space } from 'antd';

export default function EmployeeForm({currentUser, handleReviewSubmit, ...props}) {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            const response = await fetch('/api/performance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    employeeReview: {
                        what_did_you_do_well: values.wellDone,
                        what_colud_have_done_better: values.improvement,
                        how_they_helped_you: values.helpNeeded,
                        anything_specific_for_next_year: values.nextYearGoals,
                        updated_at: new Date(),
                    },
                    employee_id: currentUser?.employee_id,
                    currently_with: currentUser?.manager,
                    isEmpoyeeSubmitted: true
                }),
            });

            if (response.ok) {
                const updatedReviewData = await response.json();
                message.success('Submit success!');
                form.resetFields();
                handleReviewSubmit(updatedReviewData);
            } else {
                const errorData = await response.json();
                message.error(`Submit failed: ${errorData.message}`);
            }
        } catch (error) {
            message.error('Submit failed: Network error');
        }
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                name="wellDone"
                label="What did you do well"
                rules={[
                    {
                        required: true,
                        message: 'Please enter what you did well!',
                    },
                    {
                        min: 6,
                        message: 'Minimum 6 characters required!',
                    },
                ]}
            >
                <Input.TextArea size='large' placeholder="Enter your input here..." />
            </Form.Item>
            <Form.Item
                name="improvement"
                label="What could you have done better"
                rules={[
                    {
                        required: true,
                        message: 'Please enter what you could have done better!',
                    },
                    {
                        min: 6,
                        message: 'Minimum 6 characters required!',
                    },
                ]}
            >
                <Input.TextArea size='large' placeholder="Enter your input here..." />
            </Form.Item>
            <Form.Item
                name="helpNeeded"
                label="How your leads/company could have helped you better"
                rules={[
                    {
                        required: true,
                        message: 'Please enter how your leads/company could have helped you better!',
                    },
                    {
                        min: 6,
                        message: 'Minimum 6 characters required!',
                    },
                ]}
            >
                <Input.TextArea size='large' placeholder="Enter your input here..." />
            </Form.Item>
            <Form.Item
                name="nextYearGoals"
                label="Anything specific you'd like to do over the next year"
                rules={[
                    {
                        required: true,
                        message: 'Please enter your goals for the next year!',
                    },
                    {
                        min: 6,
                        message: 'Minimum 6 characters required!',
                    },
                ]}
            >
                <Input.TextArea size='large' placeholder="Enter your input here..." />
            </Form.Item>
            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};
