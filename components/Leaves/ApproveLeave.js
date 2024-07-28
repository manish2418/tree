import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Input, message } from "antd";
import axios from "axios";

const { Column } = Table;

const ApproveLeaveModal = ({ setLeaveReq, leaveList, modelOpen, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(modelOpen);
  const [approvalReasons, setApprovalReasons] = useState({});
  const [rejectionReasons, setRejectionReasons] = useState({});

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    onClose();
    setIsModalOpen(false);
  };

  const handleApproveReject = (leaveData, isApproved) => {
    const reasonKey = isApproved ? 'approveReason' : 'rejectReason';
    const reasonValue = isApproved ? approvalReasons[leaveData._id] : rejectionReasons[leaveData._id];

    if (!reasonValue) {
      message.error(`Reason to ${isApproved ? 'approve' : 'reject'} is required`);
      return;
    }

    const reqBody = {
      leaveData,
      isApproved,
      [reasonKey]: reasonValue,
    };
    console.log({reqBody});
    axios.put("/api/leaves", reqBody).then((res) => {
      const data = leaveList.filter((val) => val._id !== leaveData._id);
      setLeaveReq(data);
    });
  };

  useEffect(() => {
    setIsModalOpen(modelOpen);
  }, [modelOpen]);

  const handleReasonChange = (e, leaveId, isApproved) => {
    const value = e.target.value;
    if (isApproved) {
      setApprovalReasons({
        ...approvalReasons,
        [leaveId]: value,
      });
    } else {
      setRejectionReasons({
        ...rejectionReasons,
        [leaveId]: value,
      });
    }
  };

  return (
    <>
      <Modal
        title="Holiday List"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={false}
        footer={null}
        width={"auto"}
      >
        <Table dataSource={leaveList} pagination={false}>
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Description" dataIndex="description" key="description" />
          <Column
            title="From Date"
            dataIndex="from_date"
            key="from_date"
            render={(_, record) => <div>{record.from_date.split("T")[0]}</div>}
          />
          <Column
            title="To Date"
            dataIndex="to_date"
            key="to_date"
            render={(_, record) => <div>{record.to_date.split("T")[0]}</div>}
          />
          <Column
            title="Reason to Approve"
            dataIndex="approveReason"
            key="approveReason"
            render={(_, record) => (
              <Input
                placeholder="Reason to approve"
                value={approvalReasons[record._id] || ""}
                onChange={(e) => handleReasonChange(e, record._id, true)}
              />
            )}
          />
          <Column
            title="Reason to Reject"
            dataIndex="rejectReason"
            key="rejectReason"
            render={(_, record) => (
              <Input
                placeholder="Reason to reject"
                value={rejectionReasons[record._id] || ""}
                onChange={(e) => handleReasonChange(e, record._id, false)}
              />
            )}
          />
          <Column
            title="Action"
            dataIndex="action"
            key="action"
            render={(_, record) => (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <Button
                  type="primary"
                  onClick={() => handleApproveReject(record, true)}
                  disabled={!approvalReasons[record._id]}
                >
                  Approve
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => handleApproveReject(record, false)}
                  disabled={!rejectionReasons[record._id]}
                >
                  Reject
                </Button>
              </div>
            )}
          />
        </Table>
      </Modal>
    </>
  );
};

export default ApproveLeaveModal;
