import React, { useState, useEffect } from "react";
import { Button, Container, Nav } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../../MainComponent/Header/Header";
import Footer from "../../../MainComponent/Footer/Footer";
import { useSidebar } from "../../../../SidebarContext";
import Alert from "@mui/material/Alert";
import { useTheme } from "../../../../ThemeContext";
import { isLoggedIn, getUserData, getOrganisationData } from "../../../Auth";
import NavComponent from "../../../MainComponent/Navform/navbarform";
import "./MenuUser.css";
const MenuUser = () => {
  const { tusrid } = useParams();
  const user = getUserData();
  const { apiLinks } = useTheme();
  const organisation = getOrganisationData();
  const [activeTab, setActiveTab] = useState(1);
  const [data, setData] = useState({ columns: [], rows: [] });
  const [showAlert, setShowAlert] = useState(false);
  const [allPermissionsY, setAllPermissionsY] = useState(false);
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const [toggleState, setToggleState] = useState(true);
  const navigate = useNavigate();
  const [alertData, setAlertData] = useState(null);

  const functioncallingmenu = () => {
    const data = {
      code: organisation.code,
      FUsrId: user.tusrid,
    };
    const formdata = new URLSearchParams(data).toString();

    axios
      .post(`${apiLinks}/GetUser.php`, formdata, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        const apiData = response.data;
        const user = apiData.find((item) => item.tusrid === tusrid);
        setUserName(user.tusrnam);
        setUserType(user.tusrtyp);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    functioncallingmenu();
  }, [tusrid]);

  useEffect(() => {
    fetchDataForUserId(tusrid);
  }, [activeTab]);
  const {
    isSidebarVisible,
    toggleSidebar,
    getcolor, // Background color from context
    fontcolor, // Font color from context
    toggleChangeColor,
  } = useSidebar();

  function fetchDataForUserId() {
    console.log("call the api");
    const apiUrl = `${apiLinks}/GetMenu.php`;
    const data = { FUsrId: tusrid, code: organisation.code };
    const formData = new URLSearchParams(data).toString();

    return axios
      .post(apiUrl, formData)
      .then((response) => response.data)
      .then((apiData) => {
        const mainMenuItem = apiData.find(
          (item) => item.tmencod === `${activeTab}-00-00`
        );

        if (!mainMenuItem) {
          console.log("Main menu item not found for tab:", activeTab);
          return;
        }

        const subItems = apiData.filter((subItem) => {
          return (
            subItem.tmencod.startsWith(`${activeTab}-`) &&
            subItem.tmencod !== `${activeTab}-00-00`
          );
        });

        // Transform data for rendering
        const transformedData = subItems.map((item) => ({
          Sr: `${item.tmencod.split("-")[1]}`,
          Description: item.tmendsc,
          Permissions: (
            <select
              style={{
                height: "20px",
                fontSize: "12px",
                padding: "0px",
                textAlign: "center",
                color: fontcolor, // Apply dynamic font color
                backgroundColor: getcolor, // Apply dynamic background color
                border: "1px solid #ccc", // Optional: to make sure the border color is visible
              }}
              value={item.Permission}
              onChange={(e) =>
                handlePermissionChange(item.tmencod, e.target.value)
              }
            >
              <option value="Y">Yes</option>
              <option value="N">No</option>
              <option value="S">Skip</option>
            </select>
          ),
        }));

        // Columns configuration for the table
        const columns = [
          { label: "Sr", field: "Sr", sort: "asc" },
          { label: "Description", field: "Description", sort: "asc" },
          { label: "Permissions", field: "Permissions", sort: "asc" },
        ];
        console.log(transformedData, "transformData");

        // Set the transformed data for the table
        setData({ columns, rows: transformedData });
      })
      .catch((error) => {
        console.error("Error:", error.message);
        throw error;
      });
  }

  function handlePermissionChange(menuCode, newPermissionValue) {
    Update_Menu({ id: tusrid, mcode: menuCode, permission: newPermissionValue })
      .then(() => {
        fetchDataForUserId(tusrid);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function Update_Menu(users) {
    const apiUrl = `${apiLinks}/SavePermission.php`;
    const data = {
      code: organisation.code,
      FUsrId: tusrid,
      FMenCod: users.mcode,
      FUsrPem: users.permission,
    };
    const formData = new URLSearchParams(data).toString();

    return axios
      .post(apiUrl, formData)
      .then((response) => {
        functioncallingmenu();
        fetchDataForUserId();
        console.log("Update response:", response.data);
        setAlertData({
          type: "success",
          message: response.data.message,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error;
      });
  }

  const handleDoubleClick = () => {
    const newPermission = toggleState ? "Y" : "N";
    const updatedRows = data.rows.map((row) => {
      return {
        ...row,
        Permissions: (
          <select
            value={newPermission}
            onChange={(e) =>
              handlePermissionChange(row.tmencod, e.target.value)
            }
            className="form-select"
          >
            <option value="Y">Yes</option>
            <option value="N">No</option>
            <option value="S">Skip</option>
          </select>
        ),
      };
    });
    setData({ ...data, rows: updatedRows });
    setToggleState(!toggleState);
  };

  const submit = () => {};

  function handleTabClick(tabNumber) {
    setActiveTab(tabNumber);
  }

  const contentStyle = {
    backgroundColor: getcolor,
    height: "100vh",
    width: isSidebarVisible ? "calc(100vw - 5vw)" : "100vw",
    marginLeft: isSidebarVisible ? "5vw" : "25vh",
    transition: isSidebarVisible
      ? "margin-left 2s ease-in-out, margin-right 2s ease-in-out"
      : "margin-left 2s ease-in-out, margin-right 2s ease-in-out",
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    overflowX: "hidden",
    overflowY: "hidden",
    wordBreak: "break-word",
    textAlign: "center",
    maxWidth: "1000px",
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "23px",
    fontFamily: '"Poppins", sans-serif',
  };

  return (
    <>
      <div
        style={{
          backgroundColor: getcolor,
          height: "100vh",
          width: "80vw",
          overflowX: "hidden",
          overflowY: "hidden",
        }}
      >
        {alertData && (
          <Alert
            severity={alertData.type}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "30%",
              marginLeft: "35%",
              zIndex: 9999, // Ensuring this is very high
              textAlign: "center",
            }}
          >
            {alertData.message}
          </Alert>
        )}
        <div style={contentStyle}>
          <div
            style={{
              width: "40vw",
              height: "73vh",
              border: `1px solid ${fontcolor}`,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: getcolor,
              color: fontcolor,
            }}
          >
            <NavComponent textdata="Menu User" />
            <div className="row">
              <div className="col-5 label-item" style={{ textAlign: "left" }}>
                User: <b>{userName}</b>
              </div>
              <div className="col-4"></div>
              <div className="col-3 label-item" style={{ textAlign: "right" }}>
                Type:{" "}
                <b>
                  {userType === "A"
                    ? "Admin"
                    : userType === "U"
                    ? "User"
                    : userType}
                </b>
              </div>
            </div>
            <Tabs
              activeKey={activeTab.toString()}
              onSelect={(k) => handleTabClick(parseInt(k))}
              id="fill-tab-example"
              fill
              style={{ backgroundColor: "#5aa4f2" }}
            >
              {["Files", "Transactions", "Reports", "Utilities"].map(
                (tabLabel, index) => (
                  <Tab
                    eventKey={index + 1}
                    title={
                      <span style={{ color: "white", fontSize: "11px" }}>
                        {tabLabel}
                      </span>
                    }
                    key={index}
                  >
                    <div
                      style={{
                        overflowY: data.rows > 10 ? "auto" : "hidden",
                        maxHeight: "48vh",
                        width: "100%",
                        borderBottom: `1px solid ${fontcolor}`,

                        // padding: "10px",
                      }}
                    >
                      <table
                        className="myTable"
                        style={{
                          fontSize: "14px",
                          width: "100%",
                          borderCollapse: "collapse",
                          backgroundColor: getcolor,
                        }}
                      >
                        <thead
                          style={{
                            fontWeight: "bold",
                            height: "40px",
                            position: "sticky",
                            top: 0,
                            backgroundColor: "#3368b5",
                            color: "#fff",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          <tr>
                            {data.columns.map((column, index) => (
                              <th
                                key={index}
                                style={{
                                  width:
                                    column.field === "Sr" ? "60px" : "auto",
                                  padding: "10px",
                                  textAlign: "center",
                                  height: "40px",
                                  // color: "white",
                                }}
                                onDoubleClick={
                                  column.field === "Permissions"
                                    ? handleDoubleClick
                                    : null
                                }
                              >
                                {column.label}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {data.rows.map((row, rowIndex) => (
                            <tr
                              key={rowIndex}
                              style={{
                                height: "40px",
                                borderBottom: "1px solid #ddd",
                                backgroundColor: getcolor,
                                color: "black",
                              }}
                            >
                              {Object.keys(row).map((key, index) => (
                                <td
                                  key={index}
                                  style={{
                                    fontSize: "14px",
                                    padding: "10px",
                                    width:
                                      index === 0
                                        ? "10%"
                                        : index === 1
                                        ? "65%"
                                        : "25%",
                                    textAlign:
                                      key === "Description" ? "left" : "center",
                                    height: "40px",
                                    color: fontcolor,
                                  }}
                                >
                                  {row[key]}
                                </td>
                              ))}
                            </tr>
                          ))}
                          {Array.from({ length: Math.max(0, 20 - 3) }).map(
                            (_, rowIndex) => (
                              <tr
                                key={`blank-${rowIndex}`}
                                style={{
                                  height: "40px",
                                  backgroundColor: getcolor,
                                  color: fontcolor,
                                }}
                              >
                                {Array.from({ length: 3 }).map(
                                  (_, colIndex) => (
                                    <td key={`blank-${rowIndex}-${colIndex}`}>
                                      &nbsp;
                                    </td>
                                  )
                                )}
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </Tab>
                )
              )}
            </Tabs>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link to="/UserManagement">
                <button
                  className="btn btn-primary"
                  style={{
                    fontSize: "13px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontFamily: "Poppins, sans-serif",
                    color: "white",
                    backgroundColor: "#186DB7",
                    padding: "10px 20px",
                    border: "none",
                    cursor: "pointer",
                    lineHeight: "13px",
                    width: "120px",
                    textAlign: "center",
                    borderRadius: "5px",
                    marginRight: "5px",
                  }}
                >
                  Return
                </button>
              </Link>
              <Link to="/AddUser1">
                <button
                  className="btn btn-primary"
                  style={{
                    fontSize: "13px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontFamily: "Poppins, sans-serif",
                    color: "white",
                    backgroundColor: "#186DB7",
                    padding: "10px 20px",
                    border: "none",
                    cursor: "pointer",
                    lineHeight: "13px",
                    width: "120px",
                    textAlign: "center",
                    borderRadius: "5px",
                  }}
                >
                  User
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuUser;
