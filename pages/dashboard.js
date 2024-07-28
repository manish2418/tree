import { Col, Drawer, Image, Row } from "antd";
import React, { useState } from "react";
import { BellOutlined } from "@ant-design/icons";
import TreeLogo from "../public/Assests/Dashboard/logo.svg";
import Logout from "../public/Assests/Dashboard/Logout.svg";
import Claims from "../public/Assests/Dashboard/web-analysis.png";
import Employee from "../public/Assests/Dashboard/monitoring.png";
import Attendance from "../public/Assests/Dashboard/interface.png";
import Leaves from "../public/Assests/Dashboard/leaveImage.png";
import HR from "../public/Assests/Dashboard/responsive.png";
import Performance from "../public/Assests/Dashboard/speedometer.png";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { getToken } from "next-auth/jwt";

const Dashboard = ({ userRole }) => {
  const router = useRouter();

  const [notificationVisible, setNotificationVisible] = useState(false);

  const cardData = [
    {
      imgsrc: Claims.src,
      label: <h3 className="dashbord-nav">Claims</h3>,
      routeLink: "/claim",
    },
    {
      imgsrc: Employee.src,
      label: <h3 className="dashbord-nav">Employee</h3>,
      routeLink: "/employee",
    },
    {
      imgsrc: Attendance.src,
      label: <h3 className="dashbord-nav">Attendance</h3>,
      routeLink: "/attendance",
    },
    {
      imgsrc: Performance.src,
      label: <h3 className="dashbord-nav">Performance</h3>,
      routeLink: "/performance",
    },
    {
      imgsrc: Leaves.src,
      label: <h3 className="dashbord-nav">Leaves</h3>,
      routeLink: "/leaves",
    },
    {
      imgsrc: Claims.src,
      label: <h3 className="dashbord-nav">Compensation</h3>,
      routeLink: "/compensation",
    },
  ];

  if (userRole === "HR") {
    cardData.push({
      imgsrc: HR.src,
      label: <h3 className="dashbord-nav">HR</h3>,
      routeLink: "/hr",
    });
  }

  const showNotificationSidebar = () => {
    setNotificationVisible(true);
  };

  const closeNotificationSidebar = () => {
    setNotificationVisible(false);
  };

  return (
    <div className="dashboard-container">
      <Row justify={"space-between"} align={"middle"}>
        <Col span={12}>
          <Image src={TreeLogo.src} width={100} height={100} preview={false} />
        </Col>
        <BellOutlined
          style={{ fontSize: "39px", marginRight: "56px", color: "#1890ff" }}
          onClick={showNotificationSidebar}
        />
        <Col span={12} align={"end"}>
          <Image
            src={Logout.src}
            width={40}
            height={40}
            preview={false}
            className="cursor-pointer"
            onClick={() => signOut({ callbackUrl: "/login" })}
          />
        </Col>
      </Row>
      <Row className="header-row" justify={"center"}>
        {/* <Col span={8}>
          <Image src={TreeLogo.src} width={100} height={100} preview={false} />
        </Col> */}
        <div className="top-header">
          <h1>TREE HUB </h1>
          <h2>Dashboard</h2>
        </div>
      </Row>
      <Row justify={"center"} className="dashboard-body">
        <Col span={20}>
          <Row gutter={[0, 40]} className="card-row">
            {cardData.map((item, index) => (
              <Col
                span={8}
                align={"middle"}
                onClick={() => {
                  router.push(item.routeLink);
                }}
                className="cursor-pointer card-item"
                key={index}
              >
                <Image
                  src={item.imgsrc}
                  alt={item.label}
                  // className='logos-background'
                  className="dashboard-logos"
                  preview={false}
                  width={130}
                  height={130}
                />
                {item.label}
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <Drawer
        title={
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>
            Notifications
          </span>
        }
        placement="right"
        closable={true}
        onClose={closeNotificationSidebar}
        visible={notificationVisible}
        width={430} // Adjust width as needed
      >
        <div
          style={{
            backgroundColor: "#f0f2f5",
            marginBottom: "16px",
            height: "10%",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            fontSize: "16px",
          }}
        >
          <p className="para">Notification content 1 goes here...</p>
        </div>
        <div
          style={{
            backgroundColor: "#e6f7ff",
            marginBottom: "16px",
            height: "10%",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            fontSize: "16px",
          }}
        >
          <p className="para">Notification content 2 goes here...</p>
        </div>
        <div
          style={{
            backgroundColor: "#f6ffed",
            height: "10%",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            fontSize: "16px",
          }}
        >
          <p className="para">Notification content 3 goes here...</p>
        </div>
      </Drawer>
    </div>
  );
};

export async function getServerSideProps(context) {
  const token = await getToken({
    req: context.req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log(token);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { userRole: token.role },
  };
}
export default Dashboard;
