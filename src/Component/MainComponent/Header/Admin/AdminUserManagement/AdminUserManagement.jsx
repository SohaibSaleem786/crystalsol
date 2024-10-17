import React, { useState, useEffect, useRef } from "react";
import { Container, Spinner, Nav } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTheme } from "../../../../../ThemeContext";
import { isLoggedIn, getUserData, getOrganisationData } from "../../../../Auth";
import NavComponent from "../../../Navform/navbarform";
import "./AdminUserManagement.css";
import SingleButton from "../../../Button/SingleButton/SingleButton";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchGetCrystalCustomer,
  fetchGetUser,
} from "../../../../Redux/action";
import AdminUserManagementModal from "./AdminUserManagementModal";
export default function AdminUserManagement() {
  const dispatch = useDispatch();
  const user = getUserData();
  const organisation = getOrganisationData();
  const tableTopColor = "#3368B5";
  const tableHeadColor = "#3368b5";
  const secondaryColor = "white";
  const btnColor = "#3368B5";
  const textColor = "white";
  const {
    isSidebarVisible,
    toggleSidebar,
    getcolor,
    fontcolor,
    toggleChangeColor,
  } = useTheme();
  const [tableData, setTableData] = useState([]);
  const [selectedSearch, setSelectedSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data, loading, error } = useSelector((state) => state.getuser);
  const [selectedcode, setSelectedCode] = useState("CRYSTAL");

  useEffect(() => {
    setTableData(data);
    console.log(data, "selectedcode", selectedcode);
    dispatch(fetchGetUser(selectedcode));
  }, [dispatch, selectedcode]);

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
  // const forthColWidth = { width: "11%" };
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
    maxWidth: "1000px",
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "23px",
    fontFamily: '"Poppins", sans-serif',
  };
  const SearchBox = useRef(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const handleRowClick = async (selectedItem, rowIndex) => {
    console.log("handleRowClickAccount", selectedItem);
    await dispatch(fetchGetUser(selectedItem.code));
    setSelectedCode(selectedItem.code);
    console.log("selectedCode", selectedItem.code);

    if (data && data.length > 0) {
      setTableData(data);
    }
    setModalOpen(false);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleDoubleClick = (e) => {
    setTimeout(() => {
      SearchBox.current.focus();
    }, 500);
    setModalOpen(true);
  };
  const {
    data: crystalCustomerData,
    loading: crystalCustomerLoading,
    error: crystalCustomerError,
  } = useSelector((state) => state.getcrystalcustomer);
  const [dataaa, setDataaa] = useState([]);

  // Only fetch once when component mounts
  useEffect(() => {
    console.log("customerlist", crystalCustomerData);
    setTimeout(() => {
      console.log("customerlist", crystalCustomerData);
    }, 3000);
    if (crystalCustomerData?.length === 0) {
      dispatch(fetchGetCrystalCustomer());
    }
  }, [dispatch]);

  useEffect(() => {
    setDataaa(crystalCustomerData);
  }, [crystalCustomerData]);

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
          <NavComponent textdata="Admin UserManagement" />
          <div className="my-1 mx-3 row">
            <div className="col-4">
              <label className="col-3 text-end">
                <strong>Search: &nbsp;&nbsp;</strong>
              </label>
              <input
                type="text"
                className="col-9"
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
            </div>
            <div className="col-4"></div>
            <div className="col-4">{selectedcode}</div>
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
                            {Array.from({ length: 7 }).map((_, colIndex) => (
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
                                ...fifthColWidth,
                                color: fontcolor,
                                wordBreak: "break-word",
                              }}
                            >
                              {item.Status}
                            </td>
                            <td
                              className="text-center"
                              style={{
                                ...sixthColWidth,
                                color: fontcolor,
                                wordBreak: "break-word",
                              }}
                            >
                              {item.Type}
                            </td>
                            <td
                              className="text-center"
                              style={{
                                ...seventhColWidth,
                                color: fontcolor,
                                wordBreak: "break-word",
                              }}
                            >
                              {item.Mobile}
                            </td>
                            <td
                              className="text-start"
                              style={{
                                ...eighthColWidth,
                                color: fontcolor,
                                wordBreak: "break-word",
                              }}
                            >
                              {item.Email}
                            </td>

                            <td
                              className="text-center"
                              style={{
                                ...ninthColWidth,
                                color: fontcolor,
                                wordBreak: "break-word",
                              }}
                            >
                              <Link
                                to={`/AdminMenuUser/${item.tusrid}/${selectedcode}`}
                              >
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
                            {Array.from({ length: 7 }).map((_, colIndex) => (
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
              to={`/AdminAddUser/${selectedcode}`}
              text="User"
              style={{ backgroundColor: "#186DB7", width: "120px" }}
            />
            <SingleButton
              onClick={handleDoubleClick}
              text=" Company"
              style={{ backgroundColor: "#186DB7", width: "120px" }}
            />
            <AdminUserManagementModal
              isOpen={isModalOpen}
              handleClose={handleCloseModal}
              title="Select Customer"
              technicians={crystalCustomerData}
              searchRef={SearchBox}
              handleRowClick={handleRowClick}
              firstColKey="code"
              secondColKey="description"
            />
          </div>
        </div>
      </div>
    </>
  );
}
