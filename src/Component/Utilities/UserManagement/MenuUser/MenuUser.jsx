import React, { useState, useEffect } from "react";
import { Button, Container, Nav } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../../MainComponent/Header/Header";
import Footer from "../../../MainComponent/Footer/Footer";

const MenuUser = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(1);
  const [data, setData] = useState({ columns: [], rows: [] });
  const [showAlert, setShowAlert] = useState(false);
  const [allPermissionsY, setAllPermissionsY] = useState(false);
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const [toggleState, setToggleState] = useState(true);
  const navigate = useNavigate();

  //   useEffect(() => {
  //     fetch(
  //       `https://crystalsolutions.com.pk/american_lec/web/utilties/UserList.php`
  //     )
  //       .then((response) => response.json())
  //       .then((apiData) => {
  //         const user = apiData.find((item) => item.id === id);
  //         setUserName(user.tusrid);
  //         setUserType(user.tusrtyp);
  //       })
  //       .catch((error) => console.error(error));
  //   }, [id]);
  useEffect(() => {
    const data = {
      code: "ALPHA",
    };
    const formdata = new URLSearchParams(data).toString();

    axios
      .post(
        "https://crystalsolutions.com.pk/american_lec/web/utilties/getPermissions.php",
        formdata,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => response.json())
      .then((apiData) => {
        const user = apiData.find((item) => item.id === id);
        setUserName(user.tusrid);
        setUserType(user.tusrtyp);
      })
      .catch((error) => console.error(error));
  }, [id]);

  useEffect(() => {
    fetchDataForUserId(id);
  }, [activeTab]);

  function fetchDataForUserId(userId) {
    const apiUrl = "https://crystalsolutions.com.pk/american_lec/web/Menu.php";
    const data = { userid: 167 };
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
              value={item.tusrpem}
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

        setData({ columns, rows: transformedData });
      })
      .catch((error) => {
        console.error("Error:", error.message);
        throw error;
      });
  }

  function handlePermissionChange(menuCode, newPermissionValue) {
    Update_Menu({ id: id, mcode: menuCode, permission: newPermissionValue })
      .then(() => {
        fetchDataForUserId(id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function Update_Menu(user) {
    const apiUrl =
      "https://crystalsolutions.com.pk/american_lec/web/utilties/update_permission.php";
    const data = {
      userid: user.id,
      mcode: user.mcode,
      permission: user.permission,
    };
    const formData = new URLSearchParams(data).toString();

    return axios
      .post(apiUrl, formData)
      .then((response) => {
        // console.log("Update response:", response.data);
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

  return (
    <>
      <Header />
      <Container style={{ marginTop: "10%" }}>
        <div
          style={{ width: "40vw", margin: "0 auto", border: "1px solid black" }}
        >
          <Nav
            className="col-12 d-flex justify-content-between"
            style={{
              backgroundColor: "#3368b5",
              color: "#fff",
              height: "24px",
            }}
          >
            <div className="col-4"></div>
            <div style={{ fontSize: "14px" }} className="col-4 text-center">
              <strong>Menu Update</strong>
            </div>
            <div className="col-4"></div>
          </Nav>
          <div className="">
            <span>
              User id: <u>{userName}</u>
              <br />
              User type: <u>{userType}</u>
              <br />
              Last Login Date: <u>{}</u>
            </span>
          </div>
          <Tabs
            activeKey={activeTab.toString()}
            onSelect={(k) => handleTabClick(parseInt(k))}
            id="fill-tab-example"
            className=""
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
                    }}
                  >
                    <table
                      className="myTable"
                      style={{
                        fontSize: "12px",
                        width: "100%",
                        position: "relative",
                      }}
                    >
                      <thead
                        style={{
                          fontWeight: "bold",
                          height: "24px",
                          position: "sticky",
                          top: 0,
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        <tr>
                          {data.columns.map((column, index) => (
                            <th
                              key={index}
                              style={{
                                width: column.field === "Sr" ? "60px" : "auto",
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
                          <tr key={rowIndex}>
                            {Object.keys(row).map((key, index) => (
                              <td
                                key={index}
                                style={{
                                  fontsize: "12px !important",
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
                width: "100px",
                fontSize: "12px",
                height: "30px",
              }}
              onClick={submit}
            >
              Save
            </Button>
            <Button
              style={{
                margin: "5px",
                width: "100px",
                fontSize: "12px",
                height: "30px",
              }}
              onClick={() => navigate("/UserManagement")}
            >
              Return
            </Button>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default MenuUser;
