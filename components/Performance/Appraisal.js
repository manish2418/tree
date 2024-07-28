import { Col, Row, Button, Steps } from 'antd'
import React, { useEffect, useState } from 'react'
import {
  CheckCircleFilled,
  DashboardFilled,
  PieChartFilled,
  CloudDownloadOutlined,
} from '@ant-design/icons'
import Self_Appraisal from "@/public/Assests/Self_Appraisal.png";
import AppraisalSummary from './AppraisalSummary'
import EmployeeForm from './EmployeeForm'
import Image from 'next/image';

const appraisal = ({ reviewData, currentUser, reportingManager, handleReviewSubmit, setPerformanceReview, ...props }) => {
  const [review, setReview] = useState(reviewData)
  useEffect(() => {
    setReview(reviewData)
  }, [reviewData])
  return (
    <div className='appraisal-container'>
      <div className='center-card'>
        {/* <Row justify={'center'}>
          <Col span={15} className='top-navigation'>
            <Row justify={'space-between'} align={'middle'}>
              <Col span={4} className='navigation-col-1'>
                {' '}
                <CheckCircleFilled
                  style={{
                    fontSize: '32px',
                    color: review?.isEmpoyeeSubmitted ? 'green' : 'gray',
                  }}
                />
                <h4> Employee Self</h4>
              </Col>
              <Col span={6}>
                <hr />
              </Col>
              <Col span={4} className='navigation-col-2' align='center'>
                <DashboardFilled
                  style={{
                    fontSize: '32px',
                    color: review?.isManagerSubmitted ? 'blue' : 'gray',
                  }}
                />
                <h4>Mentor</h4>
              </Col>
              <Col span={6}>
                <hr />
              </Col>
              <Col span={4} className='navigation-col-3' align='end'>
                <PieChartFilled
                  style={{
                    fontSize: '32px',
                    color: review?.isHrSubmitted ? 'green' : 'gray',
                  }}
                />
                <h4>HR Team</h4>
              </Col>
            </Row>
            <Row justify={'space-between'}>
              <Col span={7}>
                <p>{review?.isEmpoyeeSubmitted ? `Completed | ${new Intl.DateTimeFormat('en-GB').format(new Date(review?.employeeReview?.updated_at))}` : "IN PROGRESS"}</p>
                {currentUser && <p>{`${currentUser?.first_name} ${currentUser?.last_name} (${currentUser?.employee_id})`}</p>}
              </Col>
              <Col span={7} align='center'>
                <p>{review?.isManagerSubmitted ? `Completed | ${new Intl.DateTimeFormat('en-GB').format(new Date(review?.managerReview?.updated_at))}` : "IN PROGRESS"}</p>
                {reportingManager && <p>{reportingManager?.first_name} {reportingManager?.last_name} ({reportingManager?.employee_id})</p>}
              </Col>
              <Col span={7} align='end'>
                <p>{review?.isHrSubmitted ? `Completed | ${new Intl.DateTimeFormat('en-GB').format(new Date(review?.managerReview?.updated_at))}` : "IN PROGRESS"}</p>
                {
                  review?.isHrSubmitted ?
                    <p>{review?.hr_name} {review?.hr_id && `(${review?.hr_id})`}</p> :
                    null
                }
              </Col>
            </Row>
          </Col>
        </Row> */}

        <Row justify={'center'}>
          <Col span={18}>
          <Steps
            current={review?.isHrSubmitted ? 4 : review?.isManagerSubmitted ? 2 : 1}
            // current={4}
            items={[
              {
                title: 'Employee Self',
                description: <>
                  <p>{review?.isEmpoyeeSubmitted ? `Completed | ${new Intl.DateTimeFormat('en-GB').format(new Date(review?.employeeReview?.updated_at))}` : "IN PROGRESS"}</p>
                  {currentUser && <p>{`${currentUser?.first_name} ${currentUser?.last_name} (${currentUser?.employee_id})`}</p>}
                </>,
              },
              {
                title: 'Mentor',
                description: <>
                  <p>{review?.isManagerSubmitted ? `Completed | ${new Intl.DateTimeFormat('en-GB').format(new Date(review?.managerReview?.updated_at))}` : "IN PROGRESS"}</p>
                  {reportingManager && <p>{reportingManager?.first_name} {reportingManager?.last_name} ({reportingManager?.employee_id})</p>}
                </>,
                // subTitle: 'Left 00:00:08',
              },
              {
                title: 'HR Team',
                description: <>
                  <p>{review?.isHrSubmitted ? `Completed | ${new Intl.DateTimeFormat('en-GB').format(new Date(review?.managerReview?.updated_at))}` : "IN PROGRESS"}</p>
                {
                  review?.isHrSubmitted ?
                    <p>{review?.hr_name} {review?.hr_id && `(${review?.hr_id})`}</p> :
                    null
                }
                </>,
              },
            ]}
          />
          </Col>
        </Row>
      </div>

      {review?.isSubmitted &&
        <Row justify={'center'}>
          <Col span={23} className='self-review'>
            <CheckCircleFilled
              style={{
                fontSize: '32px',
                color: '#ffffff',
                background: 'black',
                borderRadius: '50%',
              }}
            />
            <div>
              <h3>Employee self Review is Submitted</h3>
              <p>Mentor step is currently in progress</p>
            </div>
          </Col>
        </Row>
      }


      {
        review?.isEmpoyeeSubmitted ?
          <div className="apraisal_submitted_container">
            <h3>Employee self Review is Submitted</h3>
            <Image alt='apraisal_image' src={Self_Appraisal} className='self_appraisal_img' />
          </div> :
          <Row justify={'center'}>
            <Col span={23}>
              <Row justify={'space-between'} align={'middle'}>
                <Col span={5}>
                  <h2>Appraisal Summary</h2>
                </Col>
              </Row>

              <div className='inner-section'>
                <h3>Forms</h3>

                <div className='text-editor-container'>
                  <div className='text-editor-white-container'>
                    <div className='text-editor-blue-container'>
                      <span className='employee-self-review'>
                        EMPLOYEE SELF REVIEW
                      </span>
                      <EmployeeForm currentUser={currentUser} handleReviewSubmit={handleReviewSubmit} />
                    </div>
                  </div>
                </div>
              </div>

            </Col>
          </Row>
      }
    </div>
  )
}

export default appraisal
