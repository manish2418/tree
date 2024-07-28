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

const EmployeeDetail = () => {
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
      alignItems: "center",
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
    searchBar: {
      padding: "5px",
      fontSize: "16px",
      width: "300px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    button: {
      backgroundColor: "#87ceeb",
      color: "#fff",
      border: "none",
      padding: "5px 10px",
      cursor: "pointer",
      borderRadius: "5px",
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
          <h2>Work Role</h2>
          {isGridView ? (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    Group Company
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    Designation
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    Department
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    Band
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    Band Code
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    Grade
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    Grade Code
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    From
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    To
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.tableCell}>ABC Corp</td>
                  <td style={styles.tableCell}>Software Engineer</td>
                  <td style={styles.tableCell}>Engineering</td>
                  <td style={styles.tableCell}>B1</td>
                  <td style={styles.tableCell}>B1C</td>
                  <td style={styles.tableCell}>G1</td>
                  <td style={styles.tableCell}>G1C</td>
                  <td style={styles.tableCell}>01/01/2020</td>
                  <td style={styles.tableCell}>Present</td>
                  <td style={styles.tableCell}>Edit</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div style={styles.gridViewContainer}>
              <div style={styles.gridViewItem}>
                <div style={styles.gridViewLabel}>Group Company:</div>
                <div>ABC Corp</div>
              </div>
              <div style={styles.gridViewItem}>
                <div style={styles.gridViewLabel}>Designation:</div>
                <div>Software Engineer</div>
              </div>
              <div style={styles.gridViewItem}>
                <div style={styles.gridViewLabel}>Department:</div>
                <div>Engineering</div>
              </div>
              <div style={styles.gridViewItem}>
                <div style={styles.gridViewLabel}>Band:</div>
                <div>B1</div>
              </div>
              <div style={styles.gridViewItem}>
                <div style={styles.gridViewLabel}>Band Code:</div>
                <div>B1C</div>
              </div>
              <div style={styles.gridViewItem}>
                <div style={styles.gridViewLabel}>Grade:</div>
                <div>G1</div>
              </div>
              <div style={styles.gridViewItem}>
                <div style={styles.gridViewLabel}>Grade Code:</div>
                <div>G1C</div>
              </div>
              <div style={styles.gridViewItem}>
                <div style={styles.gridViewLabel}>From:</div>
                <div>01/01/2020</div>
              </div>
              <div style={styles.gridViewItem}>
                <div style={styles.gridViewLabel}>To:</div>
                <div>Present</div>
              </div>
              <div style={styles.gridViewItem}>
                <div style={styles.gridViewLabel}>Action:</div>
                <div>Edit</div>
              </div>
            </div>
          )}

          <h2>Current Office Location</h2>
          {isGridView ? (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    Office Area
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    Country
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    Region
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    State
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    District
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    City
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    Country Area
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    From
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    To
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.tableCell}>Main Office</td>
                  <td style={styles.tableCell}>USA</td>
                  <td style={styles.tableCell}>North America</td>
                  <td style={styles.tableCell}>California</td>
                  <td style={styles.tableCell}>San Francisco</td>
                  <td style={styles.tableCell}>San Francisco</td>
                  <td style={styles.tableCell}>West</td>
                  <td style={styles.tableCell}>01/01/2020</td>
                  <td style={styles.tableCell}>Present</td>
                  <td style={styles.tableCell}>Edit</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div style={styles.gridViewContainer}>
              <div style={styles.gridViewItem}>
                <div style={styles.gridViewLabel}>Office Area:</div>
                <div>Main Office</div>
              </div>
              <div style={styles.gridViewItem}>
                <div style={styles.gridViewLabel}>Country:</div>
                <div>USA</div>
              </div>
              <div style={styles.gridViewItem}>
                <div style={styles.gridViewLabel}>Region:</div>
                <div>North America</div>
              </div>
              <div style={styles.gridViewItem}>
                <div style={styles.gridViewLabel}>State:</div>
                <div>California</div>
              </div>
              <div style={styles.gridViewItem}>
                <div style={styles.gridViewLabel}>District:</div>
                <div>San Francisco</div>
              </div>
              <div style={styles.gridViewItem}>
                <div style={styles.gridViewLabel}>City:</div>
                <div>San Francisco</div>
              </div>
              <div style={styles.gridViewItem}>
                <div style={styles.gridViewLabel}>Country Area:</div>
                <div>West</div>
              </div>
              <div style={styles.gridViewItem}>
                <div style={styles.gridViewLabel}>From:</div>
                <div>01/01/2020</div>
              </div>
              <div style={styles.gridViewItem}>
                <div style={styles.gridViewLabel}>To:</div>
                <div>Present</div>
              </div>
              <div style={styles.gridViewItem}>
                <div style={styles.gridViewLabel}>Action:</div>
                <div>Edit</div>
              </div>
            </div>
          )}

          <h2>Mentor</h2>
          {isGridView ? (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    Mentor Name
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    From
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    To
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.tableCell}>John Doe</td>
                  <td style={styles.tableCell}>01/01/2020</td>
                  <td style={styles.tableCell}>Present</td>
                  <td style={styles.tableCell}>Edit</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div style={styles.gridViewContainer}>
              <div style={styles.gridViewItem}>
                <div style={styles.gridViewLabel}>Mentor Name:</div>
                <div>John Doe</div>
              </div>
              <div style={styles.gridViewItem}>
                <div style={styles.gridViewLabel}>From:</div>
                <div>01/01/2020</div>
              </div>
              <div style={styles.gridViewItem}>
                <div style={styles.gridViewLabel}>To:</div>
                <div>Present</div>
              </div>
              <div style={styles.gridViewItem}>
                <div style={styles.gridViewLabel}>Action:</div>
                <div>Edit</div>
              </div>
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

export default EmployeeDetail;
