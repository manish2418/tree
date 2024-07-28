import { Col, Row, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import MySummary from '@/components/Performance/MySummary';
import MyReportee from '@/components/Performance/MyReportee';
import Appraisal from '@/components/Performance/Appraisal';
import ESModal from '@/components/Performance/ESModal';
import { getSession } from 'next-auth/react';
import clientPromise from '@/lib/mongoDb';
import NoApraisel from '@/components/Performance/NoApraisel';

const Overview = ({
  currentUserData,
  empOptionsData,
  performanceReviewData,
  reportingManagerData,
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  const [isEsModalOpen, setIsEsModalOpen] = useState(false);
  const [currentUser] = useState(currentUserData);
  const [empOptions] = useState(empOptionsData);
  const [performanceReview, setPerformanceReview] = useState(performanceReviewData);
  const [reportingManager] = useState(reportingManagerData);

  const esModelHandler = () => {
    setIsEsModalOpen((prev) => !prev);
  };

  const handleReviewSubmit = async (data) => {
    try {
      if (data) {
        setPerformanceReview(data.data);
        console.log('performance review after submitting: 1', data);
        return;
      }
      const response = await fetch(`/api/performance?id=${currentUser?.employee_id}`);
      if (response.ok) {
        const data = await response.json();
        setPerformanceReview(data[0]); // Assuming response is an array of reviews
        console.log('performance review after submitting: 2', data);
      }
    } catch (error) {
      console.error('Error initiating performance reviews:', error);
    }
  };

  return (
    <div className='overview-container'>
      <div className='overview-header'>
        <Row>
          <Col span={12}>
            <Row>
              <Col>
                <h2>
                  <LeftOutlined onClick={() => router.back()} className='cursor-pointer' />
                  Performance
                </h2>
              </Col>
            </Row>
            <Row className='overview-tabs'>
              <Col>
                <h3
                  className={activeTab === 1 ? 'active-tab' : ''}
                  onClick={() => setActiveTab(1)}
                >
                  APPRAISAL
                </h3>
              </Col>
              <Col>
                <h3
                  className={activeTab === 2 ? 'active-tab' : ''}
                  onClick={() => setActiveTab(2)}
                >
                  MY SUMMARY
                </h3>
              </Col>
              {['HR', 'Manager'].includes(currentUser?.Role) && (
                <Col>
                  <h3
                    className={activeTab === 3 ? 'active-tab' : ''}
                    onClick={() => setActiveTab(3)}
                  >
                    MY REPORTEE
                  </h3>
                </Col>
              )}
            </Row>
          </Col>
          {currentUser?.Role === 'HR' && (
            <Col span={12} align={'end'}>
              <Button type='primary' onClick={esModelHandler}>
                Initiate
              </Button>
            </Col>
          )}
        </Row>
      </div>
      {isEsModalOpen && (
        <ESModal
          options={empOptions}
          isModalOpen={isEsModalOpen}
          close={() => setIsEsModalOpen(false)}
        />
      )}
      {activeTab === 1 && (
        <div>
          {performanceReview ? (
            <Appraisal
              handleReviewSubmit={handleReviewSubmit}
              reviewData={performanceReview}
              currentUser={currentUser}
              reportingManager={reportingManager}
              key={new Date().getTime()}
            />
          ) : (
            <NoApraisel />
          )}
        </div>
      )}
      {activeTab === 2 && <MySummary currentUser={currentUserData} />}
      {activeTab === 3 && <MyReportee currentUser={currentUserData} />}
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const session = await getSession({ req: context.req });

    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    const client = await clientPromise;
    const db = client.db('employeeDashboard');

    const currentUser = await db.collection('employees').findOne({ employee_id: session.user.employeeId });
    const employees = await db.collection('employees').find({}).toArray();
    const empOptions = employees.map((emp) => ({
      label: `${emp.first_name} ${emp.last_name}`,
      value: emp.employee_id,
      manager_id: emp.manager,
      is_manager: emp.role === 'Manager',
      is_employee: emp.role === 'Employee',
    }));

    const performanceReview = await db.collection('performance_reviews').findOne({
      employee_id: session.user.employeeId,
      review_year: new Date().getFullYear(),
    });

    const reportingManager = employees.find((emp) => String(emp._id) === String(currentUser?.manager));
    return {
      props: {
        currentUserData: JSON.parse(JSON.stringify(currentUser)),
        employeesData: JSON.parse(JSON.stringify(employees)),
        empOptionsData: JSON.parse(JSON.stringify(empOptions)),
        performanceReviewData: performanceReview ? JSON.parse(JSON.stringify(performanceReview)) : null,
        reportingManagerData: JSON.parse(JSON.stringify(reportingManager)),
      },
    };
  } catch (error) {
    return {
      props: {
        currentUserData: {},
        employeesData: [],
        empOptionsData: [],
        performanceReviewData: null,
        reportingManagerData: null,
      },
    };
  }
}

export default Overview;
