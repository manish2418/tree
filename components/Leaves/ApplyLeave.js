import React, { useState, useEffect } from "react";
import { Modal, Button, Form, DatePicker, Input, Select, Row, Col, message, Segmented } from "antd";
import { getDatesBetween } from "@/utils/dates";
import axios from "axios";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const ApplyLeave = ({ employee, modelOpen, onClose, employees, empOptions }) => {
  const [isModalOpen, setIsModalOpen] = useState(modelOpen);
  const [activeSegment, setActiveSegment] = useState("self");
  const [form] = Form.useForm();
  const [employeeSelected, setEmployeeSelected] = useState(null);

  const handleApply = async (values) => {
    try {
      const dates = getDatesBetween(values.startDate[0], values.startDate[1]);
      const leaveData = {
        from_date: values.startDate[0],
        to_date: values.startDate[1],
        isApproved: false,
        type: values.type,
        total_days: dates?.length,
        description: values.note,
      };
      
      let reqBody;
      if (activeSegment === "self") {
        reqBody = {
          leaveData,
          employeeId: employee.employee_id,
          employeeName: employee.first_name + " " + employee.last_name,
          employeeManager: employee.manager,
          employee
        };
      } else if (activeSegment === "others" && employeeSelected) {
        const selectedEmployee = employees.find(emp => emp.employee_id === employeeSelected);
        // console.log(selectedEmployee)
        reqBody = {
          leaveData,
          employeeId: selectedEmployee.employee_id,
          employeeName: selectedEmployee.first_name + " " + selectedEmployee.last_name,
          employeeManager: selectedEmployee.manager,
          employee
        };
      }

      await axios.post("/api/leaves", reqBody);
      message.success("Leave request created successfully!", 1, () => {
        setIsModalOpen(false);
        onClose();
      });
    } catch (error) {
      console.log(error)
      message.error(error?.response?.data?.error || "Unable to create leave request");
    }
  };

  const onCancel = () => {
    form.resetFields();
    onClose();
    setIsModalOpen(false);
  };

  useEffect(() => {
    setIsModalOpen(modelOpen);
    if (!modelOpen) {
      form.resetFields();
    }
  }, [modelOpen]);

  const handleChange = (value) => {
    setEmployeeSelected(value);
  };
  const leaveTypes = [
    { value: "paid", label: "Paid Leave" },
    { value: "optional", label: "Optional Holiday" },
    { value: "parental", label: "Parental Leave" },
    { value: "unpaid", label: "Unpaid Leave" }
  ];

  return (
    <Modal
      title="Apply Leave"
      open={isModalOpen}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="apply" type="primary" form="applyLeaveForm" htmlType="submit">
          Apply
        </Button>,
      ]}
    >
      {
        ["HR", "Manager"].includes(employee?.Role) &&
      <Segmented
        block
        defaultValue={activeSegment}
        options={[
          {
            label: 'Self',
            value: 'self',
          },
          {
            label: 'Others',
            value: 'others',
          },
        ]}
        onChange={setActiveSegment}
        style={{ marginBottom: "20px" }}
      />
      }
      <Form
        form={form}
        name="applyLeaveForm"
        initialValues={{ type: "paid" }}
        autoComplete="off"
        layout="vertical"
        onFinish={handleApply}
      >
        {
          ["HR", "Manager"].includes(employee?.Role) &&
          activeSegment === "others" &&
          <Form.Item
            name="employee"
            label="Employee"
            rules={[{ required: true, message: "Please select an employee" }]}
          >
            <Select
              style={{ width: '100%' }}
              placeholder="Please select"
              onChange={handleChange}
              options={empOptions}
            />
          </Form.Item>
        }
        <Row gutter={16}>
          <Col span={16}>
            <Form.Item
              name="startDate"
              label="Date Range"
              rules={[{ required: true, message: "Please select the date range" }]}
            >
              <RangePicker />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="type"
              label="Type of Leave"
              rules={[{ required: true, message: "Please select the type of leave" }]}
            >
              <Select
                style={{ width: "100%" }}
                // options={[
                //   { value: "paid", label: "Paid" },
                //   { value: "unpaid", label: "Unpaid" },
                // ]}
                options={leaveTypes}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="note"
          label="Note for the manager"
          rules={[
            { required: true, message: "Please fill the reason" },
            { min: 10, message: "Note must be at least 10 characters long" },
          ]}
        >
          <TextArea rows={3} placeholder="please fill your reasons" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ApplyLeave;
