import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  FaUser,
  FaCogs,
  FaMoneyBill,
  FaLeaf,
  FaClock,
  FaChartLine,
  FaUsers,
  FaPlane,
} from "react-icons/fa";

const Compensation = () => {
  const [openMenus, setOpenMenus] = useState({});
  const [activeTab, setActiveTab] = useState("PAY PACKAGE");
  const [selectedYear, setSelectedYear] = useState("2023-2024");
  const [isTableView, setIsTableView] = useState(true);
  const router = useRouter();

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleToggleView = () => {
    setIsTableView(!isTableView);
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
    sidebarList: {
      listStyle: "none",
      padding: "0",
    },
    sidebarItem: {
      marginBottom: "10px",
      cursor: "pointer",
      padding: "10px",
      borderRadius: "5px",
      transition: "background-color 0.3s",
      position: "relative",
    },
    sidebarItemHover: {
      backgroundColor: "#444",
    },
    icon: {
      marginRight: "10px",
    },
    subMenu: {
      listStyle: "none",
      padding: "0",
      margin: "10px 0 0 0",
    },
    subMenuItem: {
      padding: "10px",
      backgroundColor: "#444",
      borderRadius: "5px",
      marginTop: "5px",
    },
    mainContent: {
      flex: "1",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#f4f4f4",
    },
    navbar: {
      backgroundColor: "#87ceeb", // Sky blue color
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
    toggleButton: {
      padding: "10px",
      fontSize: "16px",
      cursor: "pointer",
      backgroundColor: "#87ceeb",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      transition: "background-color 0.3s",
    },
    toggleButtonHover: {
      backgroundColor: "#76b3da",
    },
    content: {
      padding: "20px",
    },
    tabBar: {
      display: "flex",
      borderBottom: "1px solid #ddd",
      marginBottom: "20px",
    },
    tab: {
      padding: "10px 20px",
      cursor: "pointer",
      borderBottom: activeTab === "PAY PACKAGE" ? "3px solid #87ceeb" : "none",
    },
    tabActive: {
      borderBottom: "3px solid #87ceeb",
    },
    dropdown: {
      marginBottom: "20px",
      padding: "10px",
      fontSize: "16px",
      borderRadius: "5px",
      border: "1px solid #ccc",
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
    normalView: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    normalViewItem: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px",
      backgroundColor: "#fff",
      borderRadius: "5px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
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

  const handeloverview = () => {
    router.push("/overview");
  };

  const handelempolyeedetail = () => {
    router.push("/empolyeedetail");
  };

  const handelpersonaldetail = () => {
    router.push("/personaldetail");
  };
  const handelcompensation = () => {
    router.push("/compensation");
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
        <h2 style={styles.sidebarHeader}>Menu</h2>
        <ul style={styles.sidebarList}>
          <li style={styles.sidebarItem} onClick={() => toggleMenu("profile")}>
            <FaUser style={styles.icon} />
            Profile
            {openMenus.profile && (
              <ul style={styles.subMenu}>
                <li style={styles.subMenuItem} onClick={handeloverview}>
                  Overview
                </li>
                <li style={styles.subMenuItem} onClick={handelpersonaldetail}>
                  Personal Detail
                </li>
                <li style={styles.subMenuItem} onClick={handelempolyeedetail}>
                  Employee Detail
                </li>
              </ul>
            )}
          </li>
          <li style={styles.sidebarItem} onClick={() => toggleMenu("flows")}>
            <FaCogs style={styles.icon} />
            Flows
            {openMenus.flows && (
              <ul style={styles.subMenu}>
                <li style={styles.subMenuItem}>Sub Flow 1</li>
                <li style={styles.subMenuItem}>Sub Flow 2</li>
              </ul>
            )}
          </li>
          <li style={styles.sidebarItem} onClick={handelcompensation}>
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
          <li
            style={styles.sidebarItem}
            onClick={() => toggleMenu("performance")}
          >
            <FaChartLine style={styles.icon} />
            Performance
            {openMenus.performance && (
              <ul style={styles.subMenu}>
                <li style={styles.subMenuItem}>Sub Performance 1</li>
                <li style={styles.subMenuItem}>Sub Performance 2</li>
              </ul>
            )}
          </li>
          <li style={styles.sidebarItem} onClick={() => toggleMenu("talent")}>
            <FaUsers style={styles.icon} />
            Talent Management
            {openMenus.talent && (
              <ul style={styles.subMenu}>
                <li style={styles.subMenuItem}>Sub Talent 1</li>
                <li style={styles.subMenuItem}>Sub Talent 2</li>
              </ul>
            )}
          </li>
          <li style={styles.sidebarItem} onClick={() => toggleMenu("travel")}>
            <FaPlane style={styles.icon} />
            Travel and Expenses
            {openMenus.travel && (
              <ul style={styles.subMenu}>
                <li style={styles.subMenuItem}>Sub Travel 1</li>
                <li style={styles.subMenuItem}>Sub Travel 2</li>
              </ul>
            )}
          </li>
        </ul>
      </div>
      <div style={styles.mainContent}>
        <div style={styles.navbar}>
          <input type="text" style={styles.searchBar} placeholder="Search..." />
          <button style={styles.toggleButton} onClick={handleToggleView}>
            Change View
          </button>
        </div>
        <div style={styles.content}>
          <div style={styles.tabBar}>
            {[
              "PAY PACKAGE",
              "CTC PRORATION",
              "IT DECLARATION",
              "TAX SHEET",
              "PAY SLIPS",
            ].map((tab) => (
              <div
                key={tab}
                style={
                  activeTab === tab
                    ? { ...styles.tab, ...styles.tabActive }
                    : styles.tab
                }
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </div>
            ))}
          </div>
          <select
            style={styles.dropdown}
            value={selectedYear}
            onChange={handleYearChange}
          >
            <option value="2023-2024">2023-2024</option>
            <option value="2022-2023">2022-2023</option>
            <option value="2021-2022">2021-2022</option>
          </select>
          <h2>PAY PACKAGE</h2>
          {isTableView ? (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    WHEN WAS THE CHANGE?
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    MONTHLY FIXED CTC
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    TOTAL CTC
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    BASE CURRENCY CTC (RS)
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    ANNUAL/MONTHLY
                  </th>
                  <th style={{ ...styles.tableCell, ...styles.tableHeader }}>
                    CTC PRORATION
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.tableCell}>01/01/2023</td>
                  <td style={styles.tableCell}>50,000</td>
                  <td style={styles.tableCell}>600,000</td>
                  <td style={styles.tableCell}>INR 600,000</td>
                  <td style={styles.tableCell}>Annual</td>
                  <td style={styles.tableCell}>Pro-rated</td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>01/07/2023</td>
                  <td style={styles.tableCell}>55,000</td>
                  <td style={styles.tableCell}>660,000</td>
                  <td style={styles.tableCell}>INR 660,000</td>
                  <td style={styles.tableCell}>Annual</td>
                  <td style={styles.tableCell}>Pro-rated</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div style={styles.normalView}>
              <div style={styles.normalViewItem}>
                <div>WHEN WAS THE CHANGE?</div>
                <div>01/01/2023</div>
              </div>
              <div style={styles.normalViewItem}>
                <div>MONTHLY FIXED CTC</div>
                <div>50,000</div>
              </div>
              <div style={styles.normalViewItem}>
                <div>TOTAL CTC</div>
                <div>600,000</div>
              </div>
              <div style={styles.normalViewItem}>
                <div>BASE CURRENCY CTC (RS)</div>
                <div>INR 600,000</div>
              </div>
              <div style={styles.normalViewItem}>
                <div>ANNUAL/MONTHLY</div>
                <div>Annual</div>
              </div>
              <div style={styles.normalViewItem}>
                <div>CTC PRORATION</div>
                <div>Pro-rated</div>
              </div>
              <div style={styles.normalViewItem}>
                <div>WHEN WAS THE CHANGE?</div>
                <div>01/07/2023</div>
              </div>
              <div style={styles.normalViewItem}>
                <div>MONTHLY FIXED CTC</div>
                <div>55,000</div>
              </div>
              <div style={styles.normalViewItem}>
                <div>TOTAL CTC</div>
                <div>660,000</div>
              </div>
              <div style={styles.normalViewItem}>
                <div>BASE CURRENCY CTC (RS)</div>
                <div>INR 660,000</div>
              </div>
              <div style={styles.normalViewItem}>
                <div>ANNUAL/MONTHLY</div>
                <div>Annual</div>
              </div>
              <div style={styles.normalViewItem}>
                <div>CTC PRORATION</div>
                <div>Pro-rated</div>
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

export default Compensation;
