import { getEmployeeList } from "@/app/lib/fetch/employee";
import { Localizations } from "@/utils/constants";
import { Col, Row, Input, Table, message } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  FaChartLine,
  FaClock,
  FaCogs,
  FaLeaf,
  FaMoneyBill,
  FaPlane,
  FaUser,
  FaUsers,
} from "react-icons/fa";

const { Column } = Table;

const EmployeeList = ({ includeOnlyMyReportees }) => {
  //   const router = useRouter();
  const [
    totalEmployeesInGivenFilter,
    setTotalEmployeesInGivenFilter,
  ] = useState(0);
  const [employeesInGivenFilter, setEmployeesInGivenFilter] = useState([]);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const getPaginatedEmployeeData = (
    pageNumber,
    pageSize,
    includeOnlyMyReportees,
    searchKey
  ) => {
    getEmployeeList(
      pageNumber,
      pageSize,
      includeOnlyMyReportees,
      searchKey
    ).then((res) => {
      if (res.error) {
        message.error(res.error.message);
      } else {
        setTotalEmployeesInGivenFilter(res.result.total);
        setEmployeesInGivenFilter(res.result.employees);
      }
    });
  };

  useEffect(() => {
    getPaginatedEmployeeData(undefined, undefined, includeOnlyMyReportees);
  }, []);

  const onSearch = (searchKey) => {
    getPaginatedEmployeeData(
      undefined,
      undefined,
      includeOnlyMyReportees,
      searchKey
    );
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const handeloverview = () => {
    window.open("/overview", "_blank");
  };

  const handelempolyeedetail = () => {
    window.open("/empolyeedetail", "_blank");
  };

  const handelpersonaldetail = () => {
    window.open("/personaldetail", "_blank");
  };
  //   const handelcompensation = () => {
  //     router.push("/compensation");
  //   };

  const styles = {
    container: {
      display: "flex",
    },
    sidebar: {
      width: "250px",
      backgroundColor: "#333",
      color: "#fff",
      padding: "20px",
      height: "100vh",
      position: "fixed",
    },
    sidebarHeader: {
      margin: "0 0 20px 0",
      fontSize: "1.5em",
      fontWeight: "bold",
      textAlign: "center",
      color: "#87ceeb",
    },
    sidebarList: {
      listStyle: "none",
      padding: "0",
    },
    sidebarItem: {
      marginBottom: "10px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      padding: "10px",
      borderRadius: "5px",
      transition: "background-color 0.3s",
    },
    sidebarSubItem: {
      marginBottom: "5px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      padding: "5px 10px",
      borderRadius: "5px",
      transition: "background-color 0.3s",
      paddingLeft: "30px",
      backgroundColor: "#444",
    },

    employeeInfo: {
      textAlign: "center",
      marginBottom: "20px",
    },
    employeeImage: {
      borderRadius: "50%",
      width: "100px",
      height: "100px",
      marginBottom: "10px",
    },
    employeeName: {
      fontSize: "1.2em",
      fontWeight: "bold",
    },
    employeeDesignation: {
      fontSize: "0.9em",
      color: "#ccc",
    },
    sidebarItemHover: {
      backgroundColor: "#444",
    },
    icon: {
      marginRight: "10px",
    },
    mainContent: {
      marginLeft: "270px",
      width: "calc(100% - 270px)",
      padding: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.employeeInfo}>
          <img
            src="https://www.andreamcninch.com/wp-content/uploads/2016/05/employee-carl.jpg"
            alt="Employee"
            style={styles.employeeImage}
          />
          <div style={styles.employeeName}>John Doe</div>
          <div style={styles.employeeDesignation}>Software Engineer</div>
        </div>
        {/* <h2 style={styles.sidebarHeader}>Menu</h2> */}
        <ul style={styles.sidebarList}>
          <li style={styles.sidebarItem} onClick={toggleProfileMenu}>
            <FaUser style={styles.icon} />
            Profile
          </li>
          {profileMenuOpen && (
            <>
              <li style={styles.sidebarSubItem} onClick={handeloverview}>
                Overview
              </li>
              <li style={styles.sidebarSubItem} onClick={handelpersonaldetail}>
                Personal Detail
              </li>
              <li style={styles.sidebarSubItem} onClick={handelempolyeedetail}>
                Employment Detail
              </li>
            </>
          )}
          <li style={styles.sidebarItem}>
            <FaCogs style={styles.icon} />
            Flows
          </li>
          <li style={styles.sidebarItem}>
            <FaMoneyBill style={styles.icon} />
            Compensation
          </li>
          <li style={styles.sidebarItem}>
            <FaLeaf style={styles.icon} />
            Leaves
          </li>
          <li style={styles.sidebarItem}>
            <FaClock style={styles.icon} />
            Attendance
          </li>
          <li style={styles.sidebarItem}>
            <FaChartLine style={styles.icon} />
            Performance
          </li>
          <li style={styles.sidebarItem}>
            <FaUsers style={styles.icon} />
            Talent Management
          </li>
          <li style={styles.sidebarItem}>
            <FaPlane style={styles.icon} />
            Travel and Expenses
          </li>
        </ul>
      </div>
      <div style={styles.mainContent}>
        <Row justify={"center"}>
          <Col span={23}>
            <div className="reporteer-body">
              <Row justify={"space-between"}>
                <Col span={6}>
                  <p className="active-employee">
                    {totalEmployeesInGivenFilter} Active Employee
                    {totalEmployeesInGivenFilter > 1 ? "s" : ""}
                  </p>
                </Col>
                <Col span={4}>
                  <Input.Search
                    onSearch={onSearch}
                    className="search-input"
                    size="large"
                    placeholder="Search..."
                    allowClear
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Table
                    dataSource={employeesInGivenFilter}
                    onChange={(pagination) => {
                      getPaginatedEmployeeData(
                        pagination?.current,
                        pagination?.pageSize,
                        includeOnlyMyReportees
                      );
                    }}
                    pagination={{
                      total: totalEmployeesInGivenFilter,
                      defaultPageSize: 5,
                    }}
                    scroll={{ y: "60vh" }}
                    rowKey="Id"
                  >
                    <Column
                      title={Localizations.employee_list_header_name}
                      dataIndex="name"
                      key="date"
                      render={(_, val) => (
                        <div>{val.first_name + " " + val.last_name}</div>
                      )}
                    />
                    <Column
                      title={Localizations.employee_list_header_id}
                      dataIndex="employee_id"
                      key="employee_id"
                    />
                    <Column
                      title={Localizations.employee_list_header_designation}
                      dataIndex="designation"
                      key="designation"
                    />
                    <Column
                      title={Localizations.employee_list_header_email}
                      dataIndex="email"
                      key="email"
                    />
                    <Column
                      title={Localizations.employee_list_header_office_location}
                      dataIndex="location"
                      key="location"
                    />
                  </Table>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default EmployeeList;
