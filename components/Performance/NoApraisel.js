import React from 'react'
import {
    InfoCircleOutlined
  } from '@ant-design/icons'
export default function NoApraisel() {
  return (
    <div className='no_appraisal_container'>
        <div className="no_appraisal_container_content">
            <InfoCircleOutlined className='icon' />
            <h1>Please contact you HR Manager to Initiate Performance Review</h1>
        </div>
    </div>
  )
}
