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

const PersonalDetail = () => {
  const [isGridView, setIsGridView] = useState(true);

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  const styles = {
    container: {
      width: "100%",
      display: "flex",
      fontFamily: "Arial, sans-serif",
    },
    sidebar: {
      width: "250px",
      backgroundColor: "#333",
      color: "#fff",
      padding: "20px",
      height: "100vh",
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
    sidebarItemHover: {
      backgroundColor: "#444",
    },
    icon: {
      marginRight: "10px",
    },
    mainContent: {
      flex: "1",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#f4f4f4",
    },
    navbar: {
      backgroundColor: "#87ceeb",
      padding: "10px",
      display: "flex",
      justifyContent: "space-between",
    },
    searchBar: {
      padding: "5px",
      fontSize: "16px",
      width: "300px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    content: {
      padding: "20px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    tableHeader: {
      backgroundColor: "#87ceeb",
      color: "#fff",
    },
    tableCell: {
      border: "1px solid #ddd",
      padding: "8px",
      textAlign: "left",
    },
    tableHeaderActions: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    button: {
      backgroundColor: "#87ceeb",
      color: "#fff",
      border: "none",
      padding: "5px 10px",
      cursor: "pointer",
      borderRadius: "5px",
    },
    gridViewContainer: {
      display: "flex",
      flexWrap: "wrap",
    },
    gridViewItem: {
      width: "30%",
      margin: "1%",
      backgroundColor: "#fff",
      padding: "10px",
      boxShadow: "0 0 5px rgba(0,0,0,0.1)",
    },
    gridViewLabel: {
      fontWeight: "bold",
    },
    footer: {
      textAlign: "center",
      marginTop: "20px",
      fontSize: "14px",
      color: "#333",
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
    link: {
      color: "#87ceeb",
      textDecoration: "none",
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
          <button style={styles.button} onClick={toggleView}>
            Toggle View
          </button>
        </div>
        <div style={styles.content}>
          <h2>Personal Detail</h2>
          {isGridView ? (
            <>
              <div style={styles.tableHeaderActions}>
                <h3>Biographical</h3>
                <button style={styles.button}>Initiate Workflow</button>
              </div>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                      First Name
                    </th>
                    <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                      Middle Name
                    </th>
                    <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                      Last Name
                    </th>
                    <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                      Gender
                    </th>
                    <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                      DOB
                    </th>
                    <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                      Nationality
                    </th>
                    <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                      Marital Status
                    </th>
                    <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                      Father's Name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={styles.tableCell}>John</td>
                    <td style={styles.tableCell}>M</td>
                    <td style={styles.tableCell}>Doe</td>
                    <td style={styles.tableCell}>Male</td>
                    <td style={styles.tableCell}>01/01/1980</td>
                    <td style={styles.tableCell}>American</td>
                    <td style={styles.tableCell}>Single</td>
                    <td style={styles.tableCell}>Robert Doe</td>
                  </tr>
                </tbody>
              </table>

              <div style={styles.tableHeaderActions}>
                <h3>Personal Identity</h3>
                <button style={styles.button}>Initiate Workflow</button>
              </div>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                      Country Code Mobile Number
                    </th>
                    <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                      Mobile Number
                    </th>
                    <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                      Aadhar
                    </th>
                    <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                      PAN
                    </th>
                    <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                      Passport Number
                    </th>
                    <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                      Passport Country
                    </th>
                    <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                      Passport Type
                    </th>
                    <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                      Issue Place
                    </th>
                    <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                      Issue Date
                    </th>
                    <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                      Valid Till
                    </th>
                    <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                      Driving License
                    </th>
                    <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                      Aadhar Detail Verified
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={styles.tableCell}>+91</td>
                    <td style={styles.tableCell}>9876543210</td>
                    <td style={styles.tableCell}>1234 5678 9012</td>
                    <td style={styles.tableCell}>ABCDE1234F</td>
                    <td style={styles.tableCell}>P1234567</td>
                    <td style={styles.tableCell}>India</td>
                    <td style={styles.tableCell}>Regular</td>
                    <td style={styles.tableCell}>Delhi</td>
                    <td style={styles.tableCell}>01/01/2015</td>
                    <td style={styles.tableCell}>01/01/2025</td>
                    <td style={styles.tableCell}>DL123456</td>
                    <td style={styles.tableCell}>Yes</td>
                  </tr>
                </tbody>
              </table>
            </>
          ) : (
            <>
              <div style={styles.tableHeaderActions}>
                <h3>Biographical</h3>
                <button style={styles.button}>Initiate Workflow</button>
              </div>
              <div style={styles.gridViewContainer}>
                <div style={styles.gridViewItem}>
                  <div style={styles.gridViewLabel}>First Name:</div>
                  <div>John</div>
                </div>
                <div style={styles.gridViewItem}>
                  <div style={styles.gridViewLabel}>Middle Name:</div>
                  <div>M</div>
                </div>
                <div style={styles.gridViewItem}>
                  <div style={styles.gridViewLabel}>Last Name:</div>
                  <div>Doe</div>
                </div>
                <div style={styles.gridViewItem}>
                  <div style={styles.gridViewLabel}>Gender:</div>
                  <div>Male</div>
                </div>
                <div style={styles.gridViewItem}>
                  <div style={styles.gridViewLabel}>DOB:</div>
                  <div>01/01/1980</div>
                </div>
                <div style={styles.gridViewItem}>
                  <div style={styles.gridViewLabel}>Nationality:</div>
                  <div>American</div>
                </div>
                <div style={styles.gridViewItem}>
                  <div style={styles.gridViewLabel}>Marital Status:</div>
                  <div>Single</div>
                </div>
                <div style={styles.gridViewItem}>
                  <div style={styles.gridViewLabel}>Father's Name:</div>
                  <div>Robert Doe</div>
                </div>
              </div>

              <div style={styles.tableHeaderActions}>
                <h3>Personal Identity</h3>
                <button style={styles.button}>Initiate Workflow</button>
              </div>
              <div style={styles.gridViewContainer}>
                <div style={styles.gridViewItem}>
                  <div style={styles.gridViewLabel}>
                    Country Code Mobile Number:
                  </div>
                  <div>+91</div>
                </div>
                <div style={styles.gridViewItem}>
                  <div style={styles.gridViewLabel}>Mobile Number:</div>
                  <div>9876543210</div>
                </div>
                <div style={styles.gridViewItem}>
                  <div style={styles.gridViewLabel}>Aadhar:</div>
                  <div>1234 5678 9012</div>
                </div>
                <div style={styles.gridViewItem}>
                  <div style={styles.gridViewLabel}>PAN:</div>
                  <div>ABCDE1234F</div>
                </div>
                <div style={styles.gridViewItem}>
                  <div style={styles.gridViewLabel}>Passport Number:</div>
                  <div>P1234567</div>
                </div>
                <div style={styles.gridViewItem}>
                  <div style={styles.gridViewLabel}>Passport Country:</div>
                  <div>India</div>
                </div>
                <div style={styles.gridViewItem}>
                  <div style={styles.gridViewLabel}>Passport Type:</div>
                  <div>Regular</div>
                </div>
                <div style={styles.gridViewItem}>
                  <div style={styles.gridViewLabel}>Issue Place:</div>
                  <div>Delhi</div>
                </div>
                <div style={styles.gridViewItem}>
                  <div style={styles.gridViewLabel}>Issue Date:</div>
                  <div>01/01/2015</div>
                </div>
                <div style={styles.gridViewItem}>
                  <div style={styles.gridViewLabel}>Valid Till:</div>
                  <div>01/01/2025</div>
                </div>
                <div style={styles.gridViewItem}>
                  <div style={styles.gridViewLabel}>Driving License:</div>
                  <div>DL123456</div>
                </div>
                <div style={styles.gridViewItem}>
                  <div style={styles.gridViewLabel}>
                    Aadhar Detail Verified:
                  </div>
                  <div>Yes</div>
                </div>
              </div>
            </>
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

export default PersonalDetail;
