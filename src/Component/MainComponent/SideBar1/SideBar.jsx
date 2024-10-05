import React, { useEffect, useState } from "react";
import "./Sidebarr.css";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaFile,
  FaExchangeAlt,
  FaChartBar,
  FaTools,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import { useSidebar } from "../../../SidebarContext";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMenu } from "../../Redux/action";
import CompanyName from "../../../image/logowithname.jpeg";
import CompanyInfo from "../../../image/Crystal_info.jpeg";
import { isLoggedIn, getUserData, getOrganisationData } from "../../Auth";

const SideBar1 = () => {
  const dispatch = useDispatch();
  const user = getUserData();
  const organisation = getOrganisationData();
  const imagelink = `https://crystalsolutions.com.pk/images/${
    organisation && organisation.code
  }`;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      // If user is not logged in, redirect to login page
      navigate("/login");
    }
  }, [navigate]);
  const { data, loading, error } = useSelector((state) => state.item);

  useEffect(() => {
    setMenuData(data);
    dispatch(fetchMenu(user.tusrid));
  }, [dispatch, user.tusrid]);
  useEffect(() => {
    if (data) {
      // Make sure data is an array before sorting
      if (Array.isArray(data)) {
        setMenuData(data);
        menuData.sort((a, b) => a.tmencod.localeCompare(b.tmencod));
      } else {
        // console.error("Data is not an array:", data);
      }
    }
  }, [data]);

  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsToggled(!isToggled);
    setExpanded(!expanded);
  };
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
    } else {
    }
  }, []);

  const [isToggled, setIsToggled] = useState(false);

  const { isSidebarOpen, toggleSidebarr } = useSidebar();
  // console.log("isSidebarOpen", isSidebarOpen);

  const [menuData, setMenuData] = useState([]);
  console.log("menuData", menuData);
  const menuUrl = "https://crystalsolutions.com.pk/complaint/get_usrmenu.php";

  const customLinks = {
    "1-01-00": "/AccountCodeMaintenance",
    "1-02-01": "/CompanyMaintenance",
    "1-02-02": "/CategoryMaintenance",
    "1-02-03": "/CapacityMaintenance",
    "1-02-04": "/TypeMaintenance",
    "1-02-05": "/ItemMaintenance",

    "1-05-00": "/Get_Complain",
    // "1-07-00": "/Get_Mobile",

    "1-08-00": "/Get_Mobile",
    "1-09-00": "/Get_Category",

    "2-06-00": "/ItemPurchase",
    "2-07-00": "/ItemSale",

    "3-01-00": "/DailyJobReport",
    "3-02-00": "/Get_Comparison_Report",
    "3-03-00": "/Item_Comparison_Report",
    "4-01-00": "/UserManagement",
  };
  // sfsf
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey) {
        switch (event.key.toLowerCase()) {
          case "c":
            navigate(customLinks["1-01-00"]);
            break;
          case "m":
            navigate(customLinks["1-02-01"]);
            break;
          case "g":
            navigate(customLinks["1-02-02"]);
            break;
          case "p":
            navigate(customLinks["1-02-03"]);
            break;
          case "t":
            navigate(customLinks["1-02-04"]);
            break;
          case "i":
            navigate(customLinks["1-02-05"]);
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);
  // Sort the menuData array based on tmencod
  menuData.sort((a, b) => a.tmencod.localeCompare(b.tmencod));

  // Initialize an empty object to store the hierarchical menu data
  const hierarchicalMenuData = {};

  // Loop through the sorted menuData array
  menuData.forEach((item) => {
    const [topLevel, middleLevel, subLevel] = item.tmencod.split("-");

    // Create the top-level menu item if it doesn't exist
    if (!hierarchicalMenuData[topLevel]) {
      hierarchicalMenuData[topLevel] = {
        label: item.tmendsc,
        items: [],
      };
    }

    // Create the middle-level menu item if it doesn't exist
    if (!hierarchicalMenuData[topLevel].items[middleLevel]) {
      hierarchicalMenuData[topLevel].items[middleLevel] = {
        label: item.tmendsc,
        items: [],
      };
    }

    // Add the sub-level menu item
    hierarchicalMenuData[topLevel].items[middleLevel].items.push({
      label: item.tmendsc,
      to: item.tmenurl,
      disabled: item.tmenprm === "N",
    });
  });

  const renderSubSubDropdown = (topLevel) => {
    const middleLevelItems = hierarchicalMenuData[topLevel].items;

    // Sort middle level keys based on the middle digit of tmencod
    const sortedMiddleLevelKeys = Object.keys(middleLevelItems).sort((a, b) => {
      const middleDigitA = parseInt(a);
      const middleDigitB = parseInt(b);
      return middleDigitA - middleDigitB;
    });

    return sortedMiddleLevelKeys
      .map((middleLevel, index) => {
        const subSubItems = middleLevelItems[middleLevel].items;

        // Check if there are sub-sub-items
        if (subSubItems.length > 1) {
          // Filter out the first sub-sub-item
          const filteredSubSubItems = subSubItems.slice(1);

          return (
            <Dropdown
              key={middleLevel}
              className="custom-dropdown-button dropend"
            >
              <Dropdown.Toggle
                variant="transparent"
                id={`dropdown-${topLevel}-${middleLevel}`}
                className="sub-dropdown-toggle"
              >
                {middleLevelItems[middleLevel].label}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {filteredSubSubItems.map((item, subIndex) => (
                  <Dropdown.Item
                    key={subIndex}
                    as={item.to !== "#" ? Link : undefined}
                    to={item.to}
                    disabled={item.disabled}
                    className="sub-dropdown-item"
                  >
                    {item.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          );
        } else if (subSubItems.length === 1) {
          return (
            <Dropdown.Item
              key={middleLevel}
              as={subSubItems[0].to !== "#" ? Link : undefined}
              to={subSubItems[0].to}
              disabled={subSubItems[0].disabled}
              className={`custom-dropdown-item${
                index === 0 ? " hide-first-item" : ""
              }`}
              style={
                middleLevel === "2-01-00"
                  ? { borderBottom: "1px solid black" }
                  : {}
              }
            >
              {middleLevelItems[middleLevel].label}
            </Dropdown.Item>
          );
        }

        return null;
      })
      .filter(Boolean);
  };

  const [activeDropdown, setActiveDropdown] = useState(null);

  // Handler for mouse enter event on a top-level menu
  const handleMouseEnter = (menuKey) => {
    setActiveDropdown(menuKey);
  };

  // Handler for mouse leave event on a top-level menu
  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };
  return (
    <div className={`wrapper ${expanded ? "expand" : ""}`}>
      {/* <button onClick={toggleSidebarr}>Toggle Sidebar</button> */}
      <aside className="sidebar" style={{ marginTop: "-3%" }}>
        <button className="toggle-btn" style={{ marginTop: "-23px" }}>
          <i className="lni lni-grid-alt" onClick={toggleSidebar}>
            {isToggled ? <FaToggleOn /> : <FaToggleOff />}
          </i>
        </button>
        {isSidebarOpen && (
          <ul className="sidebar-nav">
            {Object.keys(hierarchicalMenuData).map((topLevel, index) => (
              <Dropdown
                key={topLevel}
                className="custom-dropdown-button"
                onMouseEnter={() => handleMouseEnter(topLevel)}
                onMouseLeave={handleMouseLeave}
                show={activeDropdown === topLevel} // Show dropdown only if activeDropdown matches current top-level menu
              >
                <li
                  className="sidebar-item"
                  style={{ position: "relative", marginLeft: "-43%" }}
                >
                  <Dropdown.Toggle
                    style={{ borderRadius: "0px", textTransform: "none" }}
                    variant="transparent"
                    id={`dropdown-${topLevel}`}
                    className={`${expanded ? "sidebar-menu" : "sidebar-menuu"}`}
                  >
                    <i className="lni lni-user">
                      {index === 0 && <FaFile />}
                      {index === 1 && <FaExchangeAlt />}
                      {index === 2 && <FaChartBar />}
                      {index === 3 && <FaTools />}
                    </i>
                    {expanded && hierarchicalMenuData[topLevel].label}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {renderSubSubDropdown(topLevel)}
                  </Dropdown.Menu>
                </li>
              </Dropdown>
            ))}
          </ul>
        )}
      </aside>
      <div className="main p-3">
        <div className="row dashboard-name">
          <img
            src={`${imagelink}02.jpg`}
            alt="Company Logo"
            style={{ height: "100px", marginLeft: "150px", width: "350px" }}
          />
        </div>
        <div
          className="row "
          style={{ borderTop: "2px solid blue", width: "90%" }}
        >
          <div className="col-4 dashboard-okara">LAHORE</div>
          <div className="col-1"></div>
          <div className="col-7 dashboard-address">
            {organisation && organisation.address} <br /> Phone #:
            {organisation && organisation.contactno}
          </div>
        </div>
        <div className="row" style={{ marginTop: "2%" }}>
          <div className="col-4 dashboard-companynameimage">
            <img src={CompanyName} alt="logo" />
          </div>
          <div className="col-4 dashboard-companyinfoimage">
            <img src={CompanyInfo} alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar1;
