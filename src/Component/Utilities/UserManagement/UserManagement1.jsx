import React, { useState, useEffect } from "react";
import { Container, Spinner, Nav } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../../MainComponent/Header/Header";
import Footer from "../../MainComponent/Footer/Footer";
import { useTheme } from "../../../ThemeContext";
import SideBar1 from "../../MainComponent/SideBar1/SideBar";
import { useSidebar } from "../../../SidebarContext";
import { isLoggedIn, getUserData, getOrganisationData } from "../../Auth";
import NavComponent from "../../MainComponent/Navform/navbarform";
export default function UserMaintenance() {
  const user = getUserData();
  const organisation = getOrganisationData();
  const tableTopColor = "#3368B5";
  const tableHeadColor = "#3368b5";
  const secondaryColor = "white";
  const btnColor = "#3368B5";
  const textColor = "white";

  const { apiLinks } = useTheme();
  const [tableData, setTableData] = useState([]);
  const [selectedSearch, setSelectedSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const data = {
      code: organisation.code,
    };
    setIsLoading(true);
    const formdata = new URLSearchParams(data).toString();
    axios
      .post(`${apiLinks}/GetUser.php`, formdata, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setTableData(response.data);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
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
        (data) => data.tusrnam && data.tusrnam.toLowerCase().includes(query)
      );
    }

    return filteredData;
  };

  const firstColWidth = { width: "6%" };
  const secondColWidth = { width: "10%" };
  const thirdColWidth = { width: "20%" };
  const forthColWidth = { width: "11%" };
  const fifthColWidth = { width: "8%" };
  const sixthColWidth = { width: "8%" };
  const seventhColWidth = { width: "11%" };
  const eighthColWidth = { width: "21%" };
  const ninthColWidth = { width: "6%" };

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
  } = useSidebar();
  const contentStyle = {
    backgroundColor: getcolor,
    height: "100vh",
    width: isSidebarVisible ? "calc(100vw - 5%)" : "100vw",
    marginLeft: isSidebarVisible ? "5%" : "15%",
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
          <NavComponent textdata="User Management" />
          <div className="my-1 mx-3">
            <div className="col-12 d-flex justify-content-between mt-1">
              <div className="col-4 d-flex justify-content-start">
                <label
                  className="col-3 text-end"
                  style={{ fontSize: "0.8rem" }}
                >
                  <strong>Search: &nbsp;&nbsp;</strong>
                </label>
                <input
                  type="text"
                  placeholder="Item Description"
                  className="col-6"
                  onChange={handleSearch}
                  value={selectedSearch}
                  style={{
                    height: "22px",
                    fontSize: "0.8rem",
                    backgroundColor: getcolor,
                    border: `1px solid ${fontcolor}`,
                    color: fontcolor,
                    "::placeholder": {
                      color: fontcolor,
                    },
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <div
              style={{
                backgroundColor: textColor,
                borderBottom: `1px solid ${fontcolor}`,
                overflowY: getFilteredTableData.length > 10 ? "auto" : "hidden",
                maxHeight: "60vh",
                width: "100%",
                wordBreak: "break-word",
              }}
            >
              <table
                className="myTable"
                id="table"
                style={{
                  fontSize: "12px",
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
                        ...firstColWidth,
                        wordBreak: "break-word",
                      }}
                    >
                      <a style={{ color: "white" }}>Avatar</a>
                    </td>
                    <td
                      className="border-dark"
                      style={{
                        ...secondColWidth,
                        wordBreak: "break-word",
                      }}
                    >
                      <a style={{ color: "white" }}>UserId</a>
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
                        ...forthColWidth,
                        wordBreak: "break-word",
                      }}
                    >
                      <a style={{ color: "white" }}>Password</a>
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
                      <a style={{ color: "white" }}>Type</a>
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
                              className="text-center"
                              style={{
                                ...firstColWidth,
                                wordBreak: "break-word",
                                color: fontcolor,
                              }}
                            >
                              <i className="fa fa-user fa-xl"></i>
                            </td>
                            <td
                              className="text-start"
                              style={{
                                ...secondColWidth,
                                color: fontcolor,
                                wordBreak: "break-word",
                              }}
                            >
                              {item.tusrid}
                            </td>
                            <td
                              className="text-start"
                              style={{
                                ...thirdColWidth,
                                color: fontcolor,
                                wordBreak: "break-word",
                              }}
                            >
                              {item.tusrnam}
                            </td>
                            <td
                              className="text-center"
                              style={{
                                ...forthColWidth,
                                color: fontcolor,
                                wordBreak: "break-word",
                              }}
                            >
                              {item.tusrpwd ? "*****" : ""}
                            </td>
                            <td
                              className="text-center"
                              style={{
                                ...fifthColWidth,
                                color: fontcolor,
                                wordBreak: "break-word",
                              }}
                            >
                              {item.tusrsts}
                            </td>
                            <td
                              className="text-center"
                              style={{
                                ...sixthColWidth,
                                color: fontcolor,
                                wordBreak: "break-word",
                              }}
                            >
                              {item.tusrtyp}
                            </td>
                            <td
                              className="text-center"
                              style={{
                                ...seventhColWidth,
                                color: fontcolor,
                                wordBreak: "break-word",
                              }}
                            >
                              {item.tmobnum}
                            </td>
                            <td
                              className="text-start"
                              style={{
                                ...eighthColWidth,
                                color: fontcolor,
                                wordBreak: "break-word",
                              }}
                            >
                              {item.temladd}
                            </td>

                            <td
                              className="text-center"
                              style={{
                                ...ninthColWidth,
                                color: fontcolor,
                                wordBreak: "break-word",
                              }}
                            >
                              <Link to={`/MenuUser/${item.tusrid}`}>
                                <i
                                  className="fa fa-list fa-xl"
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
            <Link to="/MainPage">
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
                }}
              >
                User
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
