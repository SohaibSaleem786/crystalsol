import React, { useState, useEffect } from "react";
import { Container, Spinner, Nav } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTheme } from "../../../../../ThemeContext";

import { isLoggedIn, getUserData, getOrganisationData } from "../../../../Auth";
import NavComponent from "../../../Navform/navbarform";
import "./AdminCustomer.css";
import SingleButton from "../../../Button/SingleButton/SingleButton";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchGetCrystalCustomer,
  fetchGetUser,
} from "../../../../Redux/action";
export default function AdminCustomers() {
  const dispatch = useDispatch();
  const user = getUserData();
  const organisation = getOrganisationData();
  const tableTopColor = "#3368B5";
  const tableHeadColor = "#3368b5";
  const secondaryColor = "white";
  const btnColor = "#3368B5";
  const textColor = "white";

  const [tableData, setTableData] = useState([]);
  const [selectedSearch, setSelectedSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data, loading, error } = useSelector(
    (state) => state.getcrystalcustomer
  );

  useEffect(() => {
    setTableData(data);
    dispatch(fetchGetCrystalCustomer());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchGetCrystalCustomer());
  }, []);
  const handleSearch = (e) => {
    setSelectedSearch(e.target.value);
  };

  let totalEntries = 0;

  const getFilteredTableData = () => {
    let filteredData = tableData;

    if (selectedSearch.trim() !== "") {
      const query = selectedSearch.trim().toLowerCase();
      filteredData = filteredData.filter(
        (data) => data.code && data.code.toLowerCase().includes(query)
      );
    }

    return filteredData;
  };

  const firstColWidth = { width: "6%" };
  const secondColWidth = { width: "10%" };
  const thirdColWidth = { width: "20%" };
  // const forthColWidth = { width: "11%" };
  const fifthColWidth = { width: "8%" };
  const sixthColWidth = { width: "8%" };
  const seventhColWidth = { width: "11%" };
  const eighthColWidth = { width: "18%" };
  const ninthColWidth = { width: "6%" };
  const tenthColWidth = { width: "6%" };
  const eleventhColWidth = { width: "8%" };
  // Adjust the content width based on sidebar state
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const {
    isSidebarVisible,
    toggleSidebar,
    getcolor,
    fontcolor,
    toggleChangeColor,
  } = useTheme();
  const contentStyle = {
    backgroundColor: getcolor,
    height: "100vh",
    width: isSidebarVisible ? "calc(100vw - 5%)" : "100vw",
    position: "relative",
    top: "50%",
    left: isSidebarVisible ? "50%" : "50%",
    transform: "translate(-50%, -50%)",
    transition: isSidebarVisible
      ? "left 3s ease-in-out, width 2s ease-in-out"
      : "left 3s ease-in-out, width 2s ease-in-out",
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    overflowX: "hidden",
    overflowY: "hidden",
    wordBreak: "break-word",
    textAlign: "center",
    maxWidth: "1050px",
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "23px",
    fontFamily: '"Poppins", sans-serif',
  };

  return (
    <>
      <div style={contentStyle}>
        <div
          style={{
            backgroundColor: getcolor,
            color: fontcolor,
            width: "100%",
            border: `1px solid ${fontcolor}`,
            borderRadius: "9px",
          }}
        >
          <NavComponent textdata="Customer Management" />
          <div className="my-1 mx-3">
            <div className="col-12 d-flex justify-content-between mt-1">
              <div className="col-4 d-flex justify-content-start">
                <label
                  className="col-3 text-end"
                  // style={{ fontSize: "0.8rem" }}
                >
                  <strong>Search: &nbsp;&nbsp;</strong>
                </label>
                <input
                  type="text"
                  className="col-6"
                  onChange={handleSearch}
                  placeholder="Search by Name"
                  value={selectedSearch}
                  style={{
                    height: "22px",
                    // fontSize: "0.8rem",
                    backgroundColor: getcolor,
                    border: `1px solid ${fontcolor}`,
                    color: fontcolor,
                    "::placeholder": {
                      color: "white",
                      opacity: 5,
                    },
                  }}
                />
                {/* <Form.Control
                  type="search"
                  placeholder="Search"
                  className="col-6"
                  onChange={handleSearch}
                  value={selectedSearch}
                  style={{
                    height: "22px",
                    // fontSize: "0.8rem",
                    backgroundColor: getcolor,
                    border: `1px solid ${fontcolor}`,
                    color: fontcolor,
                    "::placeholder": {
                      color: "white",
                    },
                  }}
                /> */}
              </div>
            </div>
          </div>
          <div>
            <div
              style={{
                backgroundColor: textColor,
                borderBottom: `1px solid ${fontcolor}`,
                overflowY: getFilteredTableData.length > 10 ? "auto" : "hidden",
                maxHeight: "59vh",
                width: "100%",
                wordBreak: "break-word",
              }}
            >
              <table
                className="myTable"
                id="table"
                style={{
                  width: "100%",
                  position: "relative",
                  wordBreak: "break-word",
                }}
              >
                <thead
                  style={{
                    fontWeight: "bold",
                    height: "24px",
                    position: "sticky",
                    top: 0,
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    wordBreak: "break-word",
                  }}
                >
                  <tr
                    style={{
                      backgroundColor: tableHeadColor,
                    }}
                  >
                    <td
                      className="border-dark"
                      style={{
                        ...secondColWidth,
                        wordBreak: "break-word",
                      }}
                    >
                      <a style={{ color: "white" }}>Code</a>
                    </td>
                    <td
                      className="border-dark"
                      style={{
                        ...thirdColWidth,
                        wordBreak: "break-word",
                      }}
                    >
                      <a style={{ color: "white" }}>Name</a>
                    </td>

                    <td
                      className="border-dark"
                      style={{
                        ...fifthColWidth,
                        wordBreak: "break-word",
                      }}
                    >
                      <a style={{ color: "white" }}>Status</a>
                    </td>
                    <td
                      className="border-dark"
                      style={{
                        ...sixthColWidth,
                        wordBreak: "break-word",
                      }}
                    >
                      <a style={{ color: "white" }}>Menu</a>
                    </td>
                    <td
                      className="border-dark"
                      style={{
                        ...seventhColWidth,
                        wordBreak: "break-word",
                      }}
                    >
                      <a style={{ color: "white" }}>Mobile</a>
                    </td>
                    <td
                      className="border-dark"
                      style={{
                        ...eighthColWidth,
                        wordBreak: "break-word",
                      }}
                    >
                      <a style={{ color: "white" }}>Email</a>
                    </td>

                    <td
                      className="border-dark"
                      style={{
                        ...ninthColWidth,
                        wordBreak: "break-word",
                      }}
                    >
                      <a style={{ color: "white" }}>Menu</a>
                    </td>
                    <td
                      className="border-dark"
                      style={{
                        ...tenthColWidth,
                        wordBreak: "break-word",
                      }}
                    >
                      <a style={{ color: "white" }}>User</a>
                    </td>
                    <td
                      className="border-dark"
                      style={{
                        ...eleventhColWidth,
                        wordBreak: "break-word",
                      }}
                    >
                      <a style={{ color: "white" }}>Branches</a>
                    </td>
                  </tr>
                </thead>

                <tbody>
                  {isLoading ? (
                    <>
                      <tr>
                        <td colSpan="10" className="text-center">
                          <Spinner animation="border" variant="primary" />
                        </td>
                      </tr>
                      {Array.from({ length: Math.max(0, 30 - 3) }).map(
                        (_, rowIndex) => (
                          <tr key={`blank-${rowIndex}`}>
                            {Array.from({ length: 9 }).map((_, colIndex) => (
                              <td key={`blank-${rowIndex}-${colIndex}`}>
                                &nbsp;
                              </td>
                            ))}
                          </tr>
                        )
                      )}
                    </>
                  ) : (
                    <>
                      {getFilteredTableData().map((item, i) => {
                        totalEntries += 1;

                        return (
                          <tr
                            key={i}
                            style={{
                              fontSize: "12px !important",
                              wordBreak: "break-word",
                              backgroundColor: getcolor,
                              color: fontcolor,
                            }}
                          >
                            <td
                              className="text-start"
                              style={{
                                ...secondColWidth,
                                color: fontcolor,
                                wordBreak: "break-word",
                              }}
                            >
                              {item.code}
                            </td>
                            <td
                              className="text-start"
                              style={{
                                ...thirdColWidth,
                                color: fontcolor,
                                wordBreak: "break-word",
                              }}
                            >
                              {item.description}
                            </td>

                            <td
                              className="text-center"
                              style={{
                                ...fifthColWidth,
                                color: fontcolor,
                                wordBreak: "break-word",
                              }}
                            >
                              {item.status}
                            </td>
                            <td
                              className="text-center"
                              style={{
                                ...sixthColWidth,
                                color: fontcolor,
                                wordBreak: "break-word",
                              }}
                            >
                              {item.menu}
                            </td>
                            <td
                              className="text-center"
                              style={{
                                ...seventhColWidth,
                                color: fontcolor,
                                wordBreak: "break-word",
                              }}
                            >
                              {item.mobileno}
                            </td>
                            <td
                              className="text-start"
                              style={{
                                ...eighthColWidth,
                                color: fontcolor,
                                wordBreak: "break-word",
                              }}
                            >
                              {item.email}
                            </td>

                            <td
                              className="text-center"
                              style={{
                                ...ninthColWidth,
                                color: fontcolor,
                                wordBreak: "break-word",
                              }}
                            >
                              <Link to={`/AdminCustomerMenu/${item.code}`}>
                                <i
                                  className="fa fa-list fa-xl"
                                  style={{ color: fontcolor }}
                                ></i>
                              </Link>
                            </td>
                            <td
                              className="text-center"
                              style={{
                                ...tenthColWidth,
                                color: fontcolor,
                                wordBreak: "break-word",
                              }}
                            >
                              <Link to={`/AdminUserManagement/${item.code}`}>
                                <i
                                  className="fa fa-user-cog fa-xl"
                                  style={{ color: fontcolor }}
                                ></i>
                              </Link>
                            </td>
                            <td
                              className="text-center"
                              style={{
                                ...eleventhColWidth,
                                color: fontcolor,
                                wordBreak: "break-word",
                              }}
                            >
                              <Link to={`/MenuUser/${item.code}`}>
                                <i
                                  className="fa fa-code-branch fa-xl"
                                  style={{ color: fontcolor }}
                                ></i>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                      {Array.from({ length: Math.max(0, 20 - 3) }).map(
                        (_, rowIndex) => (
                          <tr
                            key={`blank-${rowIndex}`}
                            style={{
                              backgroundColor: getcolor,
                              color: fontcolor,
                            }}
                          >
                            {Array.from({ length: 9 }).map((_, colIndex) => (
                              <td key={`blank-${rowIndex}-${colIndex}`}>
                                &nbsp;
                              </td>
                            ))}
                          </tr>
                        )
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div
            style={{
              margin: "5px",
              marginBottom: "2px",
            }}
          >
            <SingleButton
              to="/MainPage"
              text="Return"
              style={{ backgroundColor: "#186DB7", width: "120px" }}
            />
            <SingleButton
              to="/Customers"
              text="Customer"
              style={{ backgroundColor: "#186DB7", width: "120px" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
