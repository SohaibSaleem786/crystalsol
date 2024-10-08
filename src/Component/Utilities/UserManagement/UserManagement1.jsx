import React, { useState, useEffect, useContext } from "react";
import { Container, Spinner, Nav } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../../MainComponent/Header/Header";
import Footer from "../../MainComponent/Footer/Footer";
import { useTheme } from "../../../ThemeContext";
import SideBar1 from "../../MainComponent/SideBar1/SideBar";
import { useSidebar } from "../../../SidebarContext";
// import EmailModal from "./EmailModal";
// import { Content } from "../../../App";

export default function UserMaintenance() {
  const tableTopColor = "#3368B5";
  const tableHeadColor = "#3368B5";
  const secondaryColor = "white";
  const btnColor = "#3368B5";
  const textColor = "white";
  const apiLinkk =
    "https://crystalsolutions.com.pk/kasurcable/web/admin/CustomerLedger.php";
  const { apiLink } = useTheme();
  const [tableData, setTableData] = useState([]);
  const [selectedSearch, setSelectedSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const data = {
      code: "ALPHA",
    };
    setIsLoading(true);
    const formdata = new URLSearchParams(data).toString();
    axios
      .post("https://crystalsolutions.com.pk/api/GetUser.php", formdata, {
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

    // Filter based on search query
    if (selectedSearch.trim() !== "") {
      const query = selectedSearch.trim().toLowerCase();
      filteredData = filteredData.filter(
        (data) =>
          (data.itemdesc && data.itemdesc.toLowerCase().includes(query)) ||
          (data.ttrnnum && data.ttrnnum.toLowerCase().includes(query))
      );
    }

    return filteredData;
  };

  const firstColWidth = { width: "3%" };
  const secondColWidth = { width: "10%" };
  const thirdColWidth = { width: "10%" };
  const forthColWidth = { width: "5%" };
  const fifthColWidth = { width: "5%" };
  const sixthColWidth = { width: "5%" };
  const seventhColWidth = { width: "10%" };
  const eighthColWidth = { width: "15%" };
  const ninthColWidth = { width: "27%" };
  const tenthColWidth = { width: "5%" };
  const eleventhColWidth = { width: "5%" };
  const { isSidebarVisible, toggleSidebar, getcolor, toggleChangeColor } =
    useSidebar();
  return (
    <>
      <div
        style={{
          backgroundColor: getcolor,
          height: "100vh",
          overflowX: "hidden",
          overflowY: "hidden",
        }}
      >
        <Header />
        <div
          className="row"
          style={{
            backgroundColor: "white",
          }}
        >
          <div style={{ width: "18%" }}>
            <SideBar1 />
          </div>
          <div style={{ width: "82%", backgroundColor: "white" }}>
            <div style={{ width: "90%" }}>
              <Nav
                className="col-12 d-flex justify-content-between"
                style={{ backgroundColor: tableTopColor, color: textColor }}
              >
                <div className="col-4">
                  <Link to="/AddUser1">
                    <i
                      className="fa-solid fa-arrow-right fa-xl topBtn"
                      title="Next Page"
                    ></i>
                  </Link>
                </div>
                <div style={{ fontSize: "14px" }} className="col-4 text-center">
                  <strong>User Maintenance</strong>
                </div>
                <div className="text-end col-4">
                  <Link to="/sidebar">
                    <i className="fa fa-close fa-2xl crossBtn"></i>
                  </Link>
                </div>
              </Nav>
              <div className="my-1 mx-3">
                <div className="col-12 d-flex justify-content-between mt-1">
                  <div></div>
                  <div className="col-4 d-flex justify-content-end">
                    <label className="col-3 text-end">
                      <strong>Search: &nbsp;&nbsp;</strong>
                    </label>
                    <input
                      type="text"
                      placeholder="Item Description"
                      className="col-6"
                      onChange={handleSearch}
                      value={selectedSearch}
                    />{" "}
                  </div>
                </div>
              </div>
              <div>
                <div
                  style={{
                    backgroundColor: textColor,
                    overflowY: "auto",
                    maxHeight: "70vh",
                    width: "100%",
                  }}
                >
                  <table
                    className="myTable"
                    id="table"
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
                      <tr
                        style={{
                          backgroundColor: tableHeadColor,
                        }}
                      >
                        <td className="border-dark" style={firstColWidth}>
                          Avatar
                        </td>
                        <td className="border-dark" style={secondColWidth}>
                          UserId
                        </td>
                        <td className="border-dark" style={thirdColWidth}>
                          Name
                        </td>
                        <td className="border-dark" style={forthColWidth}>
                          Password
                        </td>
                        <td className="border-dark" style={fifthColWidth}>
                          Status
                        </td>
                        <td className="border-dark" style={sixthColWidth}>
                          Type
                        </td>
                        <td className="border-dark" style={seventhColWidth}>
                          Mobile No
                        </td>
                        <td className="border-dark" style={eighthColWidth}>
                          Email Address
                        </td>
                        <td className="border-dark" style={ninthColWidth}>
                          Date
                        </td>
                        <td className="border-dark" style={tenthColWidth}>
                          Edit
                        </td>
                        <td className="border-dark" style={eleventhColWidth}>
                          Menu
                        </td>
                      </tr>
                    </thead>

                    <tbody>
                      {isLoading ? (
                        <>
                          <tr>
                            <td colSpan="11" className="text-center">
                              <Spinner animation="border" variant="primary" />
                            </td>
                          </tr>
                          {Array.from({ length: Math.max(0, 30 - 3) }).map(
                            (_, rowIndex) => (
                              <tr key={`blank-${rowIndex}`}>
                                {Array.from({ length: 11 }).map(
                                  (_, colIndex) => (
                                    <td key={`blank-${rowIndex}-${colIndex}`}>
                                      &nbsp;
                                    </td>
                                  )
                                )}
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
                                }}
                              >
                                <td
                                  className="text-center"
                                  style={firstColWidth}
                                >
                                  <i className="fa fa-user fa-xl"></i>
                                </td>
                                <td
                                  className="text-start"
                                  style={secondColWidth}
                                >
                                  {item.tusrid}
                                </td>
                                <td
                                  className="text-start"
                                  style={thirdColWidth}
                                >
                                  {item.tusrnam}
                                </td>
                                <td
                                  className="text-center"
                                  style={forthColWidth}
                                >
                                  {item.tusrpwd}
                                </td>
                                <td
                                  className="text-center"
                                  style={fifthColWidth}
                                >
                                  {item.tstat}
                                </td>
                                <td
                                  className="text-center"
                                  style={sixthColWidth}
                                >
                                  {item.ttype}
                                </td>
                                <td
                                  className="text-center"
                                  style={seventhColWidth}
                                >
                                  {item.tmobileno}
                                </td>
                                <td
                                  className="text-start"
                                  style={eighthColWidth}
                                >
                                  {item.temail}
                                </td>
                                <td
                                  className="text-center"
                                  style={ninthColWidth}
                                >
                                  {item.tdate}
                                </td>
                                <td
                                  className="text-center"
                                  style={tenthColWidth}
                                >
                                  <Link to={`/EditUser/${item.tusrid}`}>
                                    <i className="fa fa-edit fa-xl"></i>
                                  </Link>
                                </td>
                                <td
                                  className="text-center"
                                  style={eleventhColWidth}
                                >
                                  <Link to={`/UserMenu/${item.tusrid}`}>
                                    <i className="fa fa-list fa-xl"></i>
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
