import React from "react";
import { Button, Col, Row, Select, Space, Table, Tag } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const payslips = () => {
  const router = useRouter();
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const columns = [
    {
      title: "Month",
      dataIndex: "month",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Gross Salary",
      dataIndex: "gross_salary",
    },
    {
      title: "In-hand Salary",
      dataIndex: "in_hand_salary",
    },
  ];

  const data = [
    {
      key: "1",
      month: "Dec, 2023",
      title: "Software Developer",
      gross_salary: "₹100000",
      in_hand_salary: "₹90000",
    },
    {
      key: "2",
      month: "Nov, 2023",
      title: "Software Developer",
      gross_salary: "₹100000",
      in_hand_salary: "₹90000",
    },
    {
      key: "3",
      month: "Oct, 2023",
      title: "Software Developer",
      gross_salary: "₹100000",
      in_hand_salary: "₹90000",
    },
    {
      key: "4",
      month: "Sep, 2023",
      title: "Software Developer",
      gross_salary: "₹100000",
      in_hand_salary: "₹90000",
    },
    {
      key: "5",
      month: "Aug, 2023",
      title: "Software Developer",
      gross_salary: "₹100000",
      in_hand_salary: "₹90000",
    },
    {
      key: "6",
      month: "Jul, 2023",
      title: "Software Developer",
      gross_salary: "₹100000",
      in_hand_salary: "₹90000",
    },
    {
      key: "7",
      month: "Jun, 2023",
      title: "Software Developer",
      gross_salary: "₹100000",
      in_hand_salary: "₹90000",
    },
    {
      key: "8",
      month: "May, 2023",
      title: "Software Developer",
      gross_salary: "₹100000",
      in_hand_salary: "₹90000",
    },
    {
      key: "9",
      month: "Apr, 2023",
      title: "Software Developer",
      gross_salary: "₹100000",
      in_hand_salary: "₹90000",
    },
    {
      key: "10",
      month: "Mar, 2023",
      title: "Software Developer",
      gross_salary: "₹100000",
      in_hand_salary: "₹90000",
    },
    {
      key: "11",
      month: "Feb, 2023",
      title: "Software Developer",
      gross_salary: "₹100000",
      in_hand_salary: "₹90000",
    },
    {
      key: "12",
      month: "Jan, 2023",
      title: "Software Developer",
      gross_salary: "₹100000",
      in_hand_salary: "₹90000",
    },
  ];
  return (
    <div className="payslip-container">
      <div className="payslip">
        <div className="payslip-header">
          <Row className="header-row">
            <Col span={12} className="left-col">
              <p>
                <LeftOutlined
                  onClick={() => router.back()}
                  className="cursor-pointer"
                />
                Pay Slips
              </p>
            </Col>
          </Row>
        </div>

        <div className="payslip-body">
          <Row justify={"center"}>
            <Col span={15}>
              <Row align={"middle"} className="select-row">
                <Col span={12}>
                  <h3>Select financial year</h3>
                  <Select
                    style={{
                      width: 200,
                    }}
                    onChange={handleChange}
                    options={[
                      {
                        label: "2024 - 2025",
                        value: "2024_2025",
                      },
                      {
                        label: "2023 - 2024",
                        value: "2023_2024",
                      },

                      {
                        label: "2022 - 2023",
                        value: "2022_2023",
                      },
                    ]}
                  />
                </Col>
                <Col span={12} align="end">
                  <Button type="primary">Download Payslips</Button>
                </Col>
              </Row>
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                scroll={{
                  y: "60vh",
                }}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default payslips;
