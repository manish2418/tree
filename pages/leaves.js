import { Button, Col, Modal, Row, Input, Table, message } from "antd";
const { Column } = Table;
import React, { useEffect, useState } from "react";
import moment from "moment";
import { LeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import clientPromise from "@/lib/mongoDb";
import LeaveModal from "@/components/Leaves/LeaveModal";
import ApplyLeave from "@/components/Leaves/ApplyLeave";
import { useSession, getSession } from "next-auth/react";
import ApproveLeaveModal from "@/components/Leaves/ApproveLeave";
import axios from "axios";

const leaves = ({ employee, holidays, leaveRequest, myRequest, employees, empOptions }) => {
  const [modelOpen, setModalOpen] = useState(false);
  const { data } = useSession();
  const [applyModelOpen, setApplyModalOpen] = useState(false);
  const [appliedLeaveModelOpen, setAppliedLeaveModalOpen] = useState(false);
  const [apporveModelOpen, setApporveModalOpen] = useState(false);
  const [leaveRequestList, setLeaveRequestList] = useState(leaveRequest);
  const router = useRouter();

  useEffect(() => {
    console.log({ employee, holidays, leaveRequest, myRequest })
  }, [employee, holidays, leaveRequest, myRequest])

  const showAppliedLeaveModal = () => {
    setAppliedLeaveModalOpen(true);
  };
  const handleAppliedLeaveOk = () => {
    setAppliedLeaveModalOpen(false);
  };
  const handleAppliedLeaveCancel = () => {
    setAppliedLeaveModalOpen(false);
  };

  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const showLeaveModal = () => {
    //setIsLeaveModalOpen(true)
    setApporveModalOpen(true);
  };
  const handleClaimOk = () => {
    setIsLeaveModalOpen(false);
  };
  const handleClaimCancel = () => {
    setIsLeaveModalOpen(false);
  };
  const pendingLeavesColumns = [
    {
      title: "Date",
      dataIndex: "date",
    },
    { title: "Name", dataIndex: "name" },
    {
      title: "Leave Type",
      dataIndex: "leave_type",
    },
    {
      title: "Reason",
      dataIndex: "reason",
    },
    {
      title: "Reason to Approve or Reject",
      dataIndex: "reasonAction",
    },
    {
      title: "",
      dataIndex: "action",
    },
  ];

  const pendingLeavesData = [
    {
      date: "11-01-2024",
      name: "Rahul",
      leave_type: "EARNED LEAVE",
      reason: "Reason 1",
      reasonAction: (
        <>
          <Input.TextArea placeholder="Enter Reason" />
        </>
      ),
      action: (
        <>
          <Row justify={"space-between"}>
            <Col span={10}>
              <Button
                className="funded-status "
                onClick={() => message.success("Leave Approved")}
              >
                APPROVE
              </Button>
            </Col>
            <Col span={10}>
              <Button
                className="expired-status "
                onClick={() => message.success("Leave Rejected")}
              >
                REJECT
              </Button>
            </Col>
          </Row>
        </>
      ),
    },
    {
      date: "14-01-2024",
      name: "Rajat",

      leave_type: "CASUAL LEAVE",
      reason: "Reason 2",
      reasonAction: (
        <>
          <Input.TextArea placeholder="Enter Reason" />
        </>
      ),
      action: (
        <>
          <Row justify={"space-between"}>
            <Col span={10}>
              <Button
                className="funded-status "
                onClick={() => message.success("Claim Approved")}
              >
                APPROVE
              </Button>
            </Col>
            <Col span={10}>
              <Button
                className="expired-status "
                onClick={() => message.success("Claim Rejected")}
              >
                REJECT
              </Button>
            </Col>
          </Row>
        </>
      ),
    },
    {
      date: "11-01-2024",
      name: "Rahul",

      leave_type: "IT Expenses",
      reason: "Reason 3",
      reasonAction: (
        <>
          <Input.TextArea placeholder="Enter Reason" />
        </>
      ),
      action: (
        <>
          <Row justify={"space-between"}>
            <Col span={10}>
              <Button
                className="funded-status "
                onClick={() => message.success("Claim Approved")}
              >
                APPROVE
              </Button>
            </Col>
            <Col span={10}>
              <Button
                className="expired-status "
                onClick={() => message.success("Claim Rejected")}
              >
                REJECT
              </Button>
            </Col>
          </Row>
        </>
      ),
    },
  ];
  return (
    <div className="leaves-container">
      <div className="leaves-header">
        <Row className="header-row">
          <Col span={12} className="left-col">
            <p>
              <LeftOutlined
                onClick={() => router.back()}
                className="cursor-pointer"
              />
              Your Leave Balance as of {moment().format("DD-MMM-YYYY")}
            </p>
            {
              employee?.Role === "Manager" &&
              <Button
                className="pending-button"
                onClick={() => {
                  // if (leaveRequest.length > 0) {
                  showLeaveModal();
                  // }
                }}
              >
                Pending Requests ({leaveRequestList.length})
              </Button>
            }
          </Col>
          <Col span={12} className="right-col">
            <Button onClick={showAppliedLeaveModal} className="apply-button">
              APPLIED HOLIDAYS
            </Button>
            <Button onClick={() => setModalOpen(true)}>LIST OF HOLIDAY</Button>
            <Button
              onClick={() => setApplyModalOpen(true)}
              className="apply-button"
            >
              APPLY
            </Button>
          </Col>
        </Row>
      </div>
      <div className="leaves-body">
        <Row justify={"space-between"} gutter={[0, 40]}>
          <Col xl={7} lg={11} md={11} sm={24} xs={24} className="body-cols">
            <h3 className="main-heading">1. Paid</h3>
            <Row className="currently-available">
              <Col span={8}>
                <h4>{employee?.leaves?.paid_leaves?.available}</h4>
              </Col>
              <Col span={12}>
                <p>Currently Available</p>
              </Col>
            </Row>
            <hr />
            <Row className="detail-leaves">
              <Col span={8}>
                <h4>{employee?.leaves?.paid_leaves?.total}</h4>
              </Col>
              <Col span={8}>
                <p>Annual Allotment</p>
              </Col>
            </Row>
            <Row className="detail-leaves">
              <Col span={8}>
                <h4>{employee?.leaves?.paid_leaves?.used}</h4>
              </Col>
              <Col span={8}>
                <p>Used</p>
              </Col>
            </Row>
          </Col>
          <Col xl={7} lg={11} md={11} sm={24} xs={24} className="body-cols">
            <h3 className="main-heading">
            2. Festival/Personal Event (Optional Holiday)
            </h3>
            <Row className="currently-available">
              <Col span={8}>
                <h4>{employee?.leaves?.optional_holidays?.available}</h4>
              </Col>
              <Col span={12}>
                <p>Currently Available</p>
              </Col>
            </Row>
            <hr />
            <Row className="detail-leaves">
              <Col span={8}>
                <h4>{employee?.leaves?.optional_holidays?.total}</h4>
              </Col>
              <Col span={8}>
                <p>Annual Allotment</p>
              </Col>
            </Row>
            <Row className="detail-leaves">
              <Col span={8}>
                <h4>{employee?.leaves?.optional_holidays?.used}</h4>
              </Col>
              <Col span={8}>
                <p>Used</p>
              </Col>
            </Row>
          </Col>
          <Col xl={7} lg={11} md={11} sm={24} xs={24} className="body-cols">
            <h3 className="main-heading">
            3. Parental Leaves (peternity/meternity)
            </h3>
            <Row className="currently-available">
              <Col span={8}>
                <h4>{employee?.leaves?.parental_leaves?.available}</h4>
              </Col>
              <Col span={12}>
                <p>Currently Available</p>
              </Col>
            </Row>
            <hr />
            <Row className="detail-leaves">
              <Col span={8}>
                <h4>{employee?.leaves?.parental_leaves?.total}</h4>
              </Col>
              <Col span={8}>
                <p>Annual Allotment</p>
              </Col>
            </Row>
            <Row className="detail-leaves">
              <Col span={8}>
                <h4>{employee?.leaves?.parental_leaves?.used}</h4>
              </Col>
              <Col span={8}>
                <p>Used</p>
              </Col>
            </Row>
          </Col>

          <Col xl={7} lg={11} md={11} sm={24} xs={24} className="body-cols">
            <h3 className="main-heading">4. Unpaid</h3>

            <hr />

            <Row className="detail-leaves">
              <Col span={8}>
                <h4>{employee?.leaves?.unpaid_leaves?.used}</h4>
              </Col>
              <Col span={8}>
                <p>Already Taken</p>
              </Col>
            </Row>
            {/* <Row className='detail-leaves'>
       <Col span={8}>
        <h4>0</h4>
       </Col>
       <Col span={8}>
        <p>Applied</p>
       </Col>
      </Row> */}
          </Col>
        </Row>
      </div>
      <ApproveLeaveModal
        setLeaveReq={setLeaveRequestList}
        leaveList={leaveRequestList}
        modelOpen={apporveModelOpen}
        onClose={() => setApporveModalOpen(false)}
      />
      <ApplyLeave
        employee={employee}
        modelOpen={applyModelOpen}
        onClose={() => setApplyModalOpen(false)}
        employees={employees}
        empOptions={empOptions}
      />{" "}
      <LeaveModal
        holidays={holidays[0]?.holidays}
        modelOpen={modelOpen}
        onClose={() => setModalOpen(false)}
        isHR={employee?.Role === 'HR'}
      />
      <Modal
        title={<b>Applied Leaves</b>}
        open={appliedLeaveModelOpen}
        onOk={handleAppliedLeaveOk}
        onCancel={handleAppliedLeaveCancel}
        footer={null}
        width={800}
        className="applied-leaves-modal"
      >
        <Table
          dataSource={myRequest}
          pagination={false}
          scroll={{
            y: "60vh",
          }}
        >
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
          <Column title="Leave Type" dataIndex="type" key="type" />
          <Column title="Request" dataIndex="description" key="description" />
          <Column
            title="Reason"
            dataIndex="type"
            key="type"
            render={(_, record) => (
              <div>
                {/* {record.isApproved_hr ? <p>{record?.hrApproveReason || "-"}</p>: record.isRejected ? <p>{record?.rejectReason || "-"}</p> : "-"} */}
                {/* {record.isRejected ? <p>{record?.rejectReason}</p> : "-"} */}
                <p>{record.isApproved ? record?.approveReason : record?.rejectReason}</p>
              </div>
            )}
          />
          <Column
            title="status"
            dataIndex="type"
            key="type"
            render={(_, record) => (
              <div>
                {/* {!record.isActive
                  ? (record.isApproved_hr ? <div className='funded-status leave-status'>APPROVED</div> : <div className='expired-status leave-status'>REJECTED</div>)
                  : <div className='pending-status leave-status'>PENDING</div>} */}
                {!record.isActive
                  ? (record.isApproved ? <div className='funded-status leave-status'>APPROVED</div> : <div className='expired-status leave-status'>REJECTED</div>)
                  : <div className='pending-status leave-status'>PENDING</div>}
              </div>
            )}
          />
        </Table>
      </Modal>
      <Modal
        title={<h2>Pending Leaves Requests</h2>}
        open={false}
        onOk={handleClaimOk}
        onCancel={handleClaimCancel}
        footer={null}
        width={1100}
        className="reimbursement-status"
      >
        <Table
          columns={pendingLeavesColumns}
          dataSource={pendingLeavesData}
          pagination={false}
          scroll={{
            y: "60vh",
          }}
        ></Table>
      </Modal>
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const session = await getSession({ req: context.req });

    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    const client = await clientPromise;
    const db = client.db("employeeDashboard");
    const employee = await db
      .collection("employees")
      .find({ employee_id: session.user.employeeId })
      .toArray();

    const holidays = await db
      .collection("holiday_list")
      .find({ year: new Date().getFullYear().toString() })
      .toArray();

    const leaveRequest = await db
      .collection("leave_request")
      .find({
        $and: [{ currently_with: session.user.employeeId }, { isActive: true }],
      })
      .toArray();
    const myRequest = await db
      .collection("leave_request")
      .find({ employee_id: session.user.employeeId })
      .toArray();

    // Convert the cursor to an array here
    const employees = await db.collection("employees").find({}).toArray();

    const empOptions = employees.map((emp) => ({
      label: `${emp.first_name} ${emp.last_name}`,
      value: emp.employee_id,
      manager_id: emp.manager,
      is_manager: emp.Role === 'Manager',
      is_employee: emp.Role === 'Employee',
    }));

    return {
      props: {
        employee: JSON.parse(JSON.stringify(employee[0])),
        holidays: JSON.parse(JSON.stringify(holidays)),
        leaveRequest: JSON.parse(JSON.stringify(leaveRequest)),
        myRequest: JSON.parse(JSON.stringify(myRequest)),
        employees: JSON.parse(JSON.stringify(employees)),
        empOptions: JSON.parse(JSON.stringify(empOptions)),
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        employee: {},
        holidays: {},
        leaveRequest: {},
        myRequest: {},
        employees: [],
        empOptions: [],
      }
    }
  }
}


export default leaves;
