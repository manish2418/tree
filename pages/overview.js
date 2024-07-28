import React, { useState } from "react";
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

const Overview = () => {
  const [isGridView, setIsGridView] = useState(true);

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  const styles = {
    container: {
      width: "100%",
      display: "flex",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    sidebar: {
      width: "250px",
      backgroundColor: "#2c3e50",
      color: "#ecf0f1",
      padding: "20px",
      height: "100vh",
      boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
    },
    sidebarHeader: {
      margin: "0 0 20px 0",
      fontSize: "1.75em",
      fontWeight: "bold",
      textAlign: "center",
      color: "#1abc9c",
    },
    sidebarList: {
      listStyle: "none",
      padding: "0",
    },
    sidebarItem: {
      marginBottom: "15px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      padding: "12px",
      borderRadius: "5px",
      transition: "background-color 0.3s",
    },
    sidebarItemHover: {
      backgroundColor: "#34495e",
    },
    icon: {
      marginRight: "12px",
      fontSize: "1.2em",
    },
    mainContent: {
      flex: "1",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#ecf0f1",
    },
    navbar: {
      backgroundColor: "#1abc9c",
      padding: "10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    },
    searchBar: {
      padding: "8px",
      fontSize: "16px",
      width: "300px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    toggleButton: {
      padding: "10px 20px",
      fontSize: "16px",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#16a085",
      color: "#fff",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    toggleButtonHover: {
      backgroundColor: "#148f77",
    },
    content: {
      padding: "30px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    },
    tableHeader: {
      backgroundColor: "#1abc9c",
      color: "#fff",
      fontSize: "1em",
    },
    tableCell: {
      border: "1px solid #ddd",
      padding: "12px",
      textAlign: "left",
      fontSize: "0.95em",
    },
    nonGridView: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    nonGridItem: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: "15px",
      backgroundColor: "#fff",
      borderRadius: "5px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
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
    nonGridItemRow: {
      display: "flex",
      flexDirection: "column",
      flex: "1",
    },
    nonGridItemCell: {
      marginBottom: "10px",
    },
    footer: {
      textAlign: "center",
      marginTop: "30px",
      padding: "20px",
      fontSize: "14px",
      color: "#7f8c8d",
      backgroundColor: "#fff",
      borderTop: "1px solid #ddd",
      boxShadow: "0 -1px 5px rgba(0,0,0,0.1)",
    },
    link: {
      color: "#1abc9c",
      textDecoration: "none",
    },
  };

  const data = [
    {
      employeeId: "12345",
      emailId: "employee@example.com",
      department: "Engineering",
      country: "USA",
      joiningDate: "01/01/2020",
      talentPartner: "John Doe",
      role: "Software Engineer",
      mentor: "Jane Smith",
      learningPartner: "Jim Brown",
      officeLocation: "New York",
    },
    {
      employeeId: "67890",
      emailId: "employee2@example.com",
      department: "Marketing",
      country: "UK",
      joiningDate: "02/15/2021",
      talentPartner: "Anna White",
      role: "Marketing Manager",
      mentor: "Paul Black",
      learningPartner: "Eva Green",
      officeLocation: "London",
    },
  ];

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
          <li style={styles.sidebarItem}>
            <FaUser style={styles.icon} />
            Profile
          </li>
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
        <div style={styles.navbar}>
          <input type="text" style={styles.searchBar} placeholder="Search..." />
          <button style={styles.toggleButton} onClick={toggleView}>
            {isGridView ? "Switch to Non-Grid View" : "Switch to Grid View"}
          </button>
        </div>
        <div style={styles.content}>
          <h2>Overview</h2>
          {isGridView ? (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    EMPLOYEE ID
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    EMAIL ID
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    DEPARTMENT
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    CURRENT COUNTRY
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    DATE OF JOINING COMPANY
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    TALENT PARTNER
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    ROLE
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    MENTOR
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    LEARNING PARTNER
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.employeeId}>
                    <td style={styles.tableCell}>{item.employeeId}</td>
                    <td style={styles.tableCell}>{item.emailId}</td>
                    <td style={styles.tableCell}>{item.department}</td>
                    <td style={styles.tableCell}>{item.country}</td>
                    <td style={styles.tableCell}>{item.joiningDate}</td>
                    <td style={styles.tableCell}>{item.talentPartner}</td>
                    <td style={styles.tableCell}>{item.role}</td>
                    <td style={styles.tableCell}>{item.mentor}</td>
                    <td style={styles.tableCell}>{item.learningPartner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={styles.nonGridView}>
              {data.map((item) => (
                <div key={item.employeeId} style={styles.nonGridItem}>
                  <div style={styles.nonGridItemRow}>
                    <div style={styles.nonGridItemCell}>
                      <strong>EMPLOYEE ID:</strong> {item.employeeId}
                    </div>
                    <div style={styles.nonGridItemCell}>
                      <strong>EMAIL ID:</strong> {item.emailId}
                    </div>
                    <div style={styles.nonGridItemCell}>
                      <strong>DEPARTMENT:</strong> {item.department}
                    </div>
                  </div>
                  <div style={styles.nonGridItemRow}>
                    <div style={styles.nonGridItemCell}>
                      <strong>CURRENT COUNTRY:</strong> {item.country}
                    </div>
                    <div style={styles.nonGridItemCell}>
                      <strong>DATE OF JOINING COMPANY:</strong>{" "}
                      {item.joiningDate}
                    </div>
                    <div style={styles.nonGridItemCell}>
                      <strong>TALENT PARTNER:</strong> {item.talentPartner}
                    </div>
                  </div>
                  <div style={styles.nonGridItemRow}>
                    <div style={styles.nonGridItemCell}>
                      <strong>ROLE:</strong> {item.role}
                    </div>
                    <div style={styles.nonGridItemCell}>
                      <strong>MENTOR:</strong> {item.mentor}
                    </div>
                    <div style={styles.nonGridItemCell}>
                      <strong>LEARNING PARTNER:</strong> {item.learningPartner}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <h2>Job</h2>
          {isGridView ? (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    EMPLOYEE ID
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    BASE OFFICE LOCATION
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.employeeId}>
                    <td style={styles.tableCell}>{item.employeeId}</td>
                    <td style={styles.tableCell}>{item.officeLocation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={styles.nonGridView}>
              {data.map((item) => (
                <div key={item.employeeId} style={styles.nonGridItem}>
                  <div>
                    <strong>EMPLOYEE ID: </strong> {item.employeeId}
                  </div>
                  <div>
                    <strong>BASE OFFICE LOCATION: </strong>{" "}
                    {item.officeLocation}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={styles.footer}>
          Powered by <span style={styles.link}>Darwinbox</span> |{" "}
          <span style={styles.link}>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Overview;
