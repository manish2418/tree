import { Button, Col, message, Row, Table } from 'antd';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { LeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import TreeLogo from '../public/Assests/Dashboard/logo.svg';
import Image from 'next/image';
import axios from 'axios';
import { useSession } from "next-auth/react";

const Attendance = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    if (session?.user?.employeeId) {
      fetchAttendanceData(session.user.employeeId);
    }
  }, [session]);

  const fetchAttendanceData = async (employeeId) => {
    try {
      const response = await axios.get(`/api/attendance?employee_id=${employeeId}`);
      console.log("response.data", response.data)
      setAttendanceData(response.data.data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  const handleCheckIn = async () => {
    try {
      await axios.post('/api/attendance', { action: 'checkin', employee_id: session?.user?.employeeId });
      fetchAttendanceData(session.user.employeeId);
      message.success('Checked in successfully');
    } catch (error) {
      message.error(error?.response?.data?.message || 'Error checking in');
      console.error('Error checking in:', error?.response?.data);
    }
  };

  const handleCheckOut = async () => {
    try {
      await axios.post('/api/attendance', { action: 'checkout', employee_id: session?.user?.employeeId });
      fetchAttendanceData(session.user.employeeId);
      message.success('Checked out successfully');
    } catch (error) {
      message.error(error?.response?.data?.message || 'Error checking out');
      console.error('Error checking out:', error?.response?.data);
    }
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Check In',
      dataIndex: 'check_in',
      key: 'check_in',
    },
    {
      title: 'Check Out',
      key: 'check_out',
      dataIndex: 'check_out',
    },
    {
      title: 'Duration',
      key: 'duration',
      dataIndex: 'duration',
    },
  ];

  return (
    <div className='attendance-container'>
      <div className='attendance-header'>
        <Row className='header-row'>
          <Col span={12} className='left-col'>
            <p>
              <LeftOutlined onClick={() => router.back()} className='cursor-pointer' />
              Attendance
            </p>
          </Col>
          <Col span={12} align={'end'}>
            <Image src={TreeLogo} />
          </Col>
        </Row>
      </div>
      <div className='attendance-body'>
        <Row justify={'center'} gutter={[0, 20]}>
          <Col span={22}>
            <Row align={'middle'}>
              <Col span={12}>
                <h3>Mark attendance for today ({moment().format('DD MMMM, YYYY')})</h3>
              </Col>
              <Col span={12} align={'end'}>
                <Button type='primary' onClick={handleCheckIn}>Check In</Button>&nbsp;&nbsp;
                <Button onClick={handleCheckOut}>Check Out</Button>
              </Col>
            </Row>

            <Table columns={columns} dataSource={attendanceData} pagination={false} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Attendance;
