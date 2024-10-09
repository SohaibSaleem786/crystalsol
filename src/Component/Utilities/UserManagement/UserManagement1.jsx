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
export default function UserMaintenance() {
  const user = getUserData();
  const organisation = getOrganisationData();
  const tableTopColor = "#3368B5";
  const tableHeadColor = "#3368B5";
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
  const thirdColWidth = { width: "25%" };
  const forthColWidth = { width: "11%" };
  const fifthColWidth = { width: "8%" };
  const sixthColWidth = { width: "8%" };
  const seventhColWidth = { width: "11%" };
  const eighthColWidth = { width: "16%" };
  const ninthColWidth = { width: "6%" };

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
        <div style={{ backgroundColor: "white" }}>
          <Nav
            className="col-12 d-flex justify-content-between"
            style={{
              backgroundColor: tableTopColor,
              color: textColor,
              width: "100%",
            }}
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
              <div className="col-4 d-flex justify-content-start">
                <label className="col-3 text-end">
                  <strong>Search: &nbsp;&nbsp;</strong>
                </label>
                <input
                  type="text"
                  placeholder="Item Description"
                  className="col-6"
                  onChange={handleSearch}
                  value={selectedSearch}
                />
              </div>
              <div>
                <Link to="/AddUser1">
                  <button
                    className="btn btn-primary"
                    style={{
                      backgroundColor: btnColor,
                      color: textColor,
                      borderRadius: "0px",
                    }}
                  >
                    Add User
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div
              style={{
                backgroundColor: textColor,
                overflowY: "auto",
                maxHeight: "63vh",
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
                      Menu
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
                            }}
                          >
                            <td className="text-center" style={firstColWidth}>
                              <i className="fa fa-user fa-xl"></i>
                            </td>
                            <td className="text-start" style={secondColWidth}>
                              {item.tusrid}
                            </td>
                            <td className="text-start" style={thirdColWidth}>
                              {item.tusrnam}
                            </td>
                            <td className="text-center" style={forthColWidth}>
                              {item.tusrpwd ? "*****" : ""}
                            </td>
                            <td className="text-center" style={fifthColWidth}>
                              {item.tusrsts}
                            </td>
                            <td className="text-center" style={sixthColWidth}>
                              {item.tusrtyp}
                            </td>
                            <td className="text-center" style={seventhColWidth}>
                              {item.tmobnum}
                            </td>
                            <td className="text-start" style={eighthColWidth}>
                              {item.temladd}
                            </td>

                            <td className="text-center" style={ninthColWidth}>
                              <Link to={`/MenuUser/${item.tusrid}`}>
                                <i className="fa fa-list fa-xl"></i>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                      {Array.from({ length: Math.max(0, 60 - 3) }).map(
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
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
