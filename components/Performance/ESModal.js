import { Modal, Button, Select, message } from "antd";
import { useState } from "react";

export default function ESModal({ isModalOpen, close, options = [] }) {
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  // const [empOptions, setEmpOptions] = useState([]);
  const handleChange = (value) => {
    console.log("selected employees: ", value);
    setSelectedEmployees(value);
  };

  const handleSubmit = async () => {
    try {
      const employees = options
        .filter(emp => selectedEmployees.includes(emp.value))
        .map(emp => ({
          employee_id: emp.value,
          employee_name: emp.label,
          manager_id: emp.manager_id,
          // is_manager: emp.is_manager,
          // is_employee: emp.is_employee,
        }));

      const response = await fetch('/api/initiatePerformanceReviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employeeIds: employees }),
      });

      if (response.ok) {
        message.success('Initiation success!');
        close();
        // Optionally, trigger a refresh of the data or UI
      } else {
        message.error(`Initiation failed: ${response.statusText}`);
        console.error('Error initiating performance reviews:', response.statusText);
      }
    } catch (error) {
      message.error('Initiation failed: Network error');
      console.error('Error initiating performance reviews:', error);
    }
  };

  return (
    <Modal
      title="Select Employees"
      open={isModalOpen}
      onCancel={close}
      footer={[
        <Button key="cancel" onClick={close}>
          Cancel
        </Button>,
        <Button
          key="apply"
          type="primary"
          loading={false}
          onClick={handleSubmit}
        >
          Apply
        </Button>,
      ]}
    >
      <Select
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder="Please select"
        onChange={handleChange}
        options={options}
      />
    </Modal>
  );
}
