import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Collapse, Image, Checkbox, Input, Table } from 'antd'
import { ProfileFilled, DownOutlined } from '@ant-design/icons'
import MyReporteeSummary from './MyReporteeSummary'

const TeamSummary = ({currentUser}) => {
  // const columns = [
  //   {
  //     title: "Name, ID & My Reportees Type",
  //     dataIndex: "name",
  //   },
  //   {
  //     title: "New Goal Plan Status",
  //     dataIndex: "new_goal_plan",
  //   },
  //   {
  //     title: "Appraisal Status",
  //     dataIndex: "appraisal_status",
  //   },
  //   {
  //     title: "Additional Feedback Status",
  //     dataIndex: "additional_feedback_status",
  //   },
  // ];
  // const data = [];
  // for (let i = 1; i < 46; i++) {
  //   data.push({
  //     key: i,
  //     name: `Name ${i}`,
  //     new_goal_plan: `New Goal ${i}`,
  //     appraisal_status: `Appraisal status ${i}`,
  //     additional_feedback_status: `Additional Feedback ${i}`,
  //   });
  // }

  // const [selectedRowKeys, setSelectedRowKeys] = useState([])
  // const [loading, setLoading] = useState(false)
  // const start = () => {
  //   setLoading(true)
  //   // ajax request after empty completing
  //   setTimeout(() => {
  //     setSelectedRowKeys([])
  //     setLoading(false)
  //   }, 1000)
  // }
  // const onSelectChange = (newSelectedRowKeys) => {
  //   console.log('selectedRowKeys changed: ', newSelectedRowKeys)
  //   setSelectedRowKeys(newSelectedRowKeys)
  // }
  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // }
  // const hasSelected = selectedRowKeys.length > 0


  const [reviews, setReviews] = useState([]);
  const fetchData = async () => {
    const response = await fetch('http://localhost:3000/api/performance', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    setReviews(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Row justify={'center'}>
        <Col span={23}>
          <div className='team-summary-body'>
            {/* <Row
              justify={'space-between'}
              className='filter-row'
              align={'middle'}
            >
              <Col span={10}></Col>
              <Col span={12} align={'end'}>
                <div className='right-flter'>
                  <span className='download-button'>Download Reports-6</span>{' '}
                </div>
              </Col>
            </Row>

            <div className='table-container'>
              <Row justify={'end'}>
                <Col span={4} className='search-row'>
                  <div>
                    <Input.Search
                      // onSearch={onSearch}
                      className='search-input'
                      size='large'
                      placeholder='Search...'
                      allowClear
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <div>
                    <span
                      style={{
                        marginLeft: 8,
                      }}
                    >
                      {hasSelected
                        ? `Selected ${selectedRowKeys.length} items`
                        : ''}
                    </span>
                  </div>
                  <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                  />
                </Col>
              </Row>

            
            </div> */}

            {
              reviews.map(review => (
                <MyReporteeSummary reporteeName={review?.employee_name} reviewData={review} fetchData={fetchData} currentUser={currentUser} key={review?._id}  />
              ))
            }

            {/* <MyReporteeSummary reporteeName={'Aman'} />
            <MyReporteeSummary reporteeName={'Rahul'} />
            <MyReporteeSummary reporteeName={'Rachit'} /> */}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default TeamSummary
