import React from 'react'
import { Button, Col, Row, Collapse, Image, Checkbox } from 'antd'
import { DownOutlined } from '@ant-design/icons'

const AppraisalSummary = ({ mainheading, review }) => {
  const getItems = [
    {
      key: mainheading,
      label: (
        <div>
          <Row>
            <Col span={15}>
              <h3>{mainheading}</h3>
              <p className='show-description'>Show Description</p>
            </Col>
            <Col span={8}>
              <p>Competency Tier</p>
              <h3>Technology Consultiog</h3>
            </Col>
          </Row>
        </div>
      ),
      children: (
        <div className='open-collapse'>
          <Row align={'middle'} className='open-collapse-row'>
            <Col span={12}>
              <h2>Review by Mentor</h2>
              <p>{review}</p>
            </Col>
          </Row>
        </div>
      ),
    },
  ]
  return (
    <Collapse
      bordered={false}
      defaultActiveKey={mainheading}
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
  )
}

export default AppraisalSummary
