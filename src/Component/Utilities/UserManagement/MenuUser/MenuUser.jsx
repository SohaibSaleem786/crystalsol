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
        setUserName(user.tusrid);
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

        const transformedData = subItems.map((item) => ({
          Sr: `${item.tmencod.split("-")[1]}`,
          Description: item.tmendsc,
          Permissions: (
            <select
              value={item.Permission}
              onChange={(e) =>
                handlePermissionChange(item.tmencod, e.target.value)
              }
              className="form-select"
            >
              <option value="Y">Yes</option>
              <option value="N">No</option>
              <option value="S">Skip</option>
            </select>
          ),
        }));

        const columns = [
          { label: "Sr", field: "Sr", sort: "asc" },
          { label: "Description", field: "Description", sort: "asc" },
          { label: "Permissions", field: "Permissions", sort: "asc" },
        ];
        console.log(transformedData, "transformData");
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
  const { isSidebarVisible, toggleSidebar, getcolor, toggleChangeColor } =
    useSidebar();
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
        <div
          style={{
            display: "flex",
            // alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <div
            style={{
              width: "60vw",
              height: "75vh",
              border: "1px solid black",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
            }}
          >
            <Nav
              className="col-12 d-flex justify-content-between"
              style={{
                backgroundColor: "#3368b5",
                color: "#fff",
                height: "40px",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
                padding: "10px",
              }}
            >
              <div className="col-4"></div>
              <div style={{ fontSize: "16px" }} className="col-4 text-center">
                <strong>Menu Update</strong>
              </div>
              <div className="col-4"></div>
            </Nav>
            <div style={{ padding: "20px" }}>
              <span>
                User Id: <u>{userName}</u>
                <br />
                User Type: <u>{userType}</u>
              </span>
            </div>
            <Tabs
              activeKey={activeTab.toString()}
              onSelect={(k) => handleTabClick(parseInt(k))}
              id="fill-tab-example"
              fill
            >
              {["Files", "Transactions", "Reports", "Utilities"].map(
                (tabLabel, index) => (
                  <Tab eventKey={index + 1} title={tabLabel} key={index}>
                    <div
                      style={{
                        overflowY: "auto",
                        maxHeight: "35vh",
                        width: "100%",
                        padding: "10px",
                      }}
                    >
                      <table
                        className="myTable"
                        style={{
                          fontSize: "14px",
                          width: "100%",
                          borderCollapse: "collapse",
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
                              style={{ borderBottom: "1px solid #ddd" }}
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
                                        ? "70%"
                                        : "20%",
                                    textAlign:
                                      key === "Description" ? "left" : "center",
                                  }}
                                >
                                  {row[key]}
                                </td>
                              ))}
                            </tr>
                          ))}
                          {Array.from({ length: Math.max(0, 8 - 3) }).map(
                            (_, rowIndex) => (
                              <tr key={`blank-${rowIndex}`}>
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
            <div className="d-flex justify-content-center mt-3">
              <Button
                type="submit"
                style={{
                  margin: "5px",
                  width: "120px",
                  fontSize: "14px",
                  height: "40px",
                  borderRadius: "4px",
                  backgroundColor: "#3368b5",
                  color: "#fff",
                  border: "none",
                }}
                onClick={submit}
              >
                Save
              </Button>
              <Button
                style={{
                  margin: "5px",
                  width: "120px",
                  fontSize: "14px",
                  height: "40px",
                  borderRadius: "4px",
                  backgroundColor: "#6c757d",
                  color: "#fff",
                  border: "none",
                }}
                onClick={() => navigate("/UserManagement")}
              >
                Return
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuUser;
