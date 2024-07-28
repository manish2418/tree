import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Collapse, Input, Form, message, Space } from 'antd';
import { DownOutlined, EditOutlined } from '@ant-design/icons';

const MyReporteeSummary = ({ reporteeName, reviewData, currentUser, fetchData }) => {
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false);
  const [review, setReview] = useState(reviewData);

  useEffect(() => {
    setReview(reviewData);
    form.setFieldsValue({
      whatHeDidWell: reviewData?.managerReview?.what_hen_did_well,
      improvement: reviewData?.managerReview?.what_need_to_improve,
      rating: reviewData?.rating
    });
  }, [reviewData]);

  const onFinish = async (values) => {
    try {
      const response = await fetch('/api/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          managerReview: {
            what_hen_did_well: values.whatHeDidWell,
            what_need_to_improve: values.improvement,
            updated_at: new Date(),
          },
          employee_id: review?.employee_id,
          currently_with: currentUser?.manager,
          rating: values.rating,
          ...(currentUser?.role === "Manager" && {
            isManagerSubmitted: true,
            manager_name: currentUser?.first_name + " " + currentUser?.last_name,
          }),
          ...(currentUser?.role === "HR" && {
            isActive: false,
            isApproved: true,
            hr_id: currentUser?.employee_id,
            hr_name: currentUser?.first_name + " " + currentUser?.last_name,
            isHrSubmitted: true,
          }),
        }),
      });

      if (response.ok) {
        message.success('Submit success!');
        form.resetFields();
        fetchData();
        setIsEditMode(false);
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

  const hrSubmitHandler = async () => {
    try {
      const response = await fetch('/api/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employee_id: review?.employee_id,
          currently_with: currentUser?.manager,
          isActive: false,
          isApproved: true,
          hr_id: currentUser?.employee_id,
          hr_name: currentUser?.first_name + " " + currentUser?.last_name,
          isHrSubmitted: true,
        }),
      });

      if (response.ok) {
        message.success('Submit success!');
        form.resetFields();
        fetchData();
        setIsEditMode(false);
      } else {
        const errorData = await response.json();
        message.error(`Submit failed: ${errorData.message}`);
      }
    } catch (error) {
      message.error('Submit failed: Network error');
    }
  }

  const getItems = [
    {
      key: `${reporteeName}'s review`,
      label: (
        <div>
          <Row>
            <Col span={24}>
              <p
                style={{
                  margin: 0,
                  fontSize: '30px',
                  fontWeight: '700',
                }}
              >
                {`${reporteeName}'s review`}
              </p>
            </Col>
          </Row>
        </div>
      ),
      children: (
        <div className='open-collapse'>
          <Row align={'middle'} className='open-collapse-row'>
            <Col span={24}>
              <h1 className='review-heading'>Self Review</h1>
              <hr />
              <h3>What did you do well</h3>
              <p>{review?.employeeReview?.what_did_you_do_well}</p>
              <h3>What could you have done better</h3>
              <p>{review?.employeeReview?.what_colud_have_done_better}</p>
              <h3>How your leads/company could have helped you better</h3>
              <p>{review?.employeeReview?.how_they_helped_you}</p>
              <h3>Anything specific you'd like to do over the next year</h3>
              <p>{review?.employeeReview?.anything_specific_for_next_year}</p>

              <div className='review-heading editable'>
                <h1>Mentor Review</h1>
                {
                  (currentUser?.role === "Manager" &&
                  !review?.isApproved &&
                  review?.isManagerSubmitted
                ) &&
                  <Button
                    type="primary"
                    className="edit-button"
                    onClick={() => setIsEditMode(PV => !PV)}
                  >
                    <EditOutlined />
                  </Button>
                }
              </div>
              <hr />
              {
                (!review?.isEmpoyeeSubmitted || (!isEditMode && Object?.keys(review?.managerReview).length > 1)) ?
                  <>
                    <h3>What he did well</h3>
                    <p>{review?.managerReview?.what_hen_did_well}</p>
                    <h3>What he needs to improve</h3>
                    <p>{review?.managerReview?.what_need_to_improve}</p>
                    <h3>Rating of the employee</h3>
                    <p>{review?.rating}</p>

                    {
                      (currentUser?.role === "HR" &&
                      !review?.isApproved) &&
                      <Space>
                        <Button type="primary" onClick={hrSubmitHandler}>
                          Approve
                        </Button>
                        <Button onClick={() => setIsEditMode(true)}>
                          Edit
                        </Button>
                      </Space>
                    }
                  </>
                  :
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <Form.Item
                      name="whatHeDidWell"
                      label="What he did well"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter What he did well!',
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
                      label="What he needs to improve"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter What he needs to improve!',
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
                      name="rating"
                      label="Rating of the employee"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter the rating!',
                        },
                      ]}
                    >
                      <Input type="number" max={5} placeholder="Enter your input here..." />
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
              }
            </Col>
          </Row>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Collapse
        bordered={false}
        expandIcon={({ isActive }) => (
          <DownOutlined
            rotate={isActive ? 180 : 0}
            style={{
              fontSize: '20px',
              cursor: 'pointer',
            }}
          />
        )}
        items={getItems}
      />
    </div>
  );
}

export default MyReporteeSummary;
