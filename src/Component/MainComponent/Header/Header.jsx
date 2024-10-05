import Cart from "../../../image/cart.png";
import Logo from "../../../image/UMAIR.png";
import itc from "../HomePage/itc.png";
import "../Header/Header.css";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../ThemeContext";
import { FaToggleOn, FaToggleOff } from "react-icons/fa"; // Import toggle icons
import {
  Card,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import axios from "axios";
import { useData } from "../../../DataContext";
import { useSidebar } from "../../../SidebarContext";
import { isLoggedIn, getUserData, getOrganisationData } from "../../Auth";
function Header({ id }) {
  const navigate = useNavigate();
  const user = getUserData();
  const organisation = getOrganisationData();
  useEffect(() => {
    if (!isLoggedIn()) {
      // navigate("/login");
    }
  }, [navigate]);
  const { primaryColor, secondaryColor } = useTheme();
  const { apiLinks } = useTheme();

  const imagelink = `https://crystalsolutions.com.pk/images/${
    organisation && organisation.code
  }`;
  // Define a state to handle the dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // e.preventdefault();
    // Remove user data from local storage
    localStorage.removeItem("user_id");
    // Redirect to the login page
    navigate("/");
  };
  // console.log("=======================");

  // console.log(imagelink + getUser.tprjid);
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  ////////////CART ICON KA OPER ITEM NUMBER ///////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  const { orderData } = useData();

  // Use a side effect to log the value of user whenever it changes

  const [totalItems, settotalItem] = useState([]);
  // useEffect(() => {
  //   fetch(`${apiLinks}/PendingOrder.php`)
  //     .then((response) => response.json())
  //     .then((apiData) => {
  //       const transformedData = apiData.map((item) => ({
  //           id : item.id,

  //       }));

  //       const columns = [
  //         { label: "Order ID", field: "id", sort: "asc" },

  //         { label: "Edit ", field: "tedtdat", sort: "asc" },

  //       ];

  //       // setData({ columns, rows: transformedData });

  //       settotalItem(apiData.length);
  //     })
  //     .catch((error) => console.error(error));
  // }, []);
  const totalItem = totalItems; // Replace with your actual total item count
  const [isSidebarToggled, setIsSidebarToggled] = useState(false); // State variable for toggling sidebar
  // const { toggleSidebar } = useSidebar();

  // const toggleSidebarr = () => {
  //   setIsSidebarToggled(!isSidebarToggled);
  // };

  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const toggleSidebarr = () => {
    toggleSidebar(); // Call the toggleSidebar function from SidebarContext
  };

  return (
    <>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "5px",
          backgroundColor: "rgb(235, 235, 235)",
        }}
      >
        {/* <button className="toggle-btn" onClick={toggleSidebar}>
          <i className="lni lni-grid-alt">
            {isSidebarToggled ? <FaToggleOn /> : <FaToggleOff />}
          </i>
        </button> */}
        {/* <button onClick={toggleSidebarr}>Toggle Sidebar</button> */}

        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={`${imagelink}01.jpg`}
            alt="Company Logo"
            style={{ height: "50px", marginRight: "20px", marginLeft: "70px" }}
          />
          <h1
            style={{
              fontSize: "22px",
              margin: "0",
              color: primaryColor,
              fontWeight: "bold",
            }}
          >
            {user && user.tprjdsc}
          </h1>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="btn-group">
            <h5 style={{ fontSize: "14px", marginTop: "10px" }}>
              {moment().format("DD/MM/YYYY")}
            </h5>
            <button
              className="btn"
              style={{
                fontSize: "14px",
                border: "none",
                boxShadow: "none",
                borderRadius: "0",
              }}
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FontAwesomeIcon icon={faEllipsisV} />
            </button>
            <ul className="dropdown-menu dropdown-menu-left">
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = primaryColor;
                    e.target.style.color = secondaryColor;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "";
                    e.target.style.color = "";
                  }}
                >
                  {user && user.tusrnam}
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={navigate("/UserManagement")}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = primaryColor;
                    e.target.style.color = secondaryColor;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "";
                    e.target.style.color = "";
                  }}
                >
                  User Management
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = primaryColor;
                    e.target.style.color = secondaryColor;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "";
                    e.target.style.color = "";
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
