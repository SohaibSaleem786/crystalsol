import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  IconButton,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  FaFile,
  FaExchangeAlt,
  FaChartBar,
  FaTools,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import { ExpandLess, ExpandMore, Opacity } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { fetchMenu } from "../../Redux/action";
import { getUserData, getOrganisationData, isLoggedIn } from "../../Auth";
import { useSidebar } from "../../../SidebarContext";
import { Avatar } from "@mui/material"; // Import Avatar component
import { Typography } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import imagebackground from "../../../image/homeapp.png";
import man from "../../../image/man.png";
import "./Sidebarr.css";
import { DataProvider } from "../../../DataContext";
const SidebarHeader = ({ userName, userAvatar }) => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
        backgroundImage: `url(${imagebackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        height: "100px",
        justifyContent: "center",
        opacity: 0.8,
        zIndex: -1,
      }}
    >
      {/* Avatar Row */}
      <Row style={{ marginBottom: "20px" }}>
        <Avatar
          alt={userName}
          src={userAvatar}
          sx={{ width: 80, height: 50 }}
        />
      </Row>
      <Row
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          width: "100%",
          justifyContent: "center", // Center the contents horizontally
          alignItems: "start", // Center the contents vertically
          padding: "10px",
          position: "absolute",
          height: "33px",
          bottom: 0,
        }}
      >
        <Col
          className="col-9"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Typography
            sx={{
              color: "#FFFFFF",
              display: "flex",
              fontSize: "13px",
              justifyContent: "left", // Center text horizontally
            }}
          >
            {userName}
          </Typography>
        </Col>
        <Col
          className="col-3"
          style={{ display: "flex", justifyContent: "center" }} // Center the IconButton
        >
          <IconButton
            sx={{ color: "#FFFFFF", marginTop: "-7px", fontSize: "13px" }}
          >
            {/* <ExpandMore /> */}
            <i className="bi bi-caret-down-fill"></i>
          </IconButton>
        </Col>
      </Row>
    </Box>
  );
};
const SideBar1 = () => {
  const dispatch = useDispatch();
  const user = getUserData();
  const organisation = getOrganisationData();
  const navigate = useNavigate();
  const { data, loading, error } = useSelector((state) => state.item);

  const [expanded, setExpanded] = useState(true);
  const [menuData, setMenuData] = useState([]);
  const [openMenu, setOpenMenu] = useState({}); // To track open/closed top-level menus
  const [openSubMenu, setOpenSubMenu] = useState({}); // To track open/closed sub-menus
  const [isToggled, setIsToggled] = useState(true);

  // const { isSidebarOpen, toggleSidebarr } = useSidebar();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    setMenuData(data);
    dispatch(fetchMenu(user.tusrid));
  }, [dispatch, user.tusrid]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setMenuData(data.sort((a, b) => a.tmencod.localeCompare(b.tmencod)));
    }
  }, [data]);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    setExpanded(!expanded);
  };

  const handleMenuClick = (menuKey) => {
    setOpenMenu((prevOpenMenu) => ({
      ...Object.keys(prevOpenMenu).reduce((acc, key) => {
        acc[key] = key === menuKey ? !prevOpenMenu[key] : false;
        return acc;
      }, {}),
      [menuKey]: !prevOpenMenu[menuKey],
    }));
  };

  const handleSubMenuClick = (menuKey, subMenuKey) => {
    setOpenSubMenu((prevOpenSubMenu) => ({
      ...prevOpenSubMenu,
      [`${menuKey}-${subMenuKey}`]:
        !prevOpenSubMenu[`${menuKey}-${subMenuKey}`],
    }));
  };

  const customLinks = {
    "1-01-00": "/AccountCodeMaintenance",
    "1-02-01": "/CompanyMaintenance",
    "1-02-02": "/CategoryMaintenance",
    "1-02-03": "/CapacityMaintenance",
    "1-02-04": "/TypeMaintenance",
    "1-02-05": "/ItemMaintenance",
    "1-05-00": "/Get_Complain",
    "1-08-00": "/Get_Mobile",
    "1-09-00": "/Get_Category",
    "2-06-00": "/ItemPurchase",
    "2-07-00": "/ItemSale",
    "3-01-00": "/DailyJobReport",
    "3-02-00": "/Get_Comparison_Report",
    "3-03-00": "/Item_Comparison_Report",
    "4-01-00": "/UserManagement",
  };

  // Sort the menuData array and create hierarchical structure
  const hierarchicalMenuData = {};
  menuData.forEach((item) => {
    const [topLevel, middleLevel] = item.tmencod.split("-");
    if (!hierarchicalMenuData[topLevel]) {
      hierarchicalMenuData[topLevel] = { label: item.tmendsc, items: {} };
    }
    if (!hierarchicalMenuData[topLevel].items[middleLevel]) {
      hierarchicalMenuData[topLevel].items[middleLevel] = [];
    }
    hierarchicalMenuData[topLevel].items[middleLevel].push({
      label: item.tmendsc,
      to: item.tmenurl,
      disabled: item.tmenprm === "N",
    });
  });

  // Function to render sub-submenu
  const renderSubSubMenu = (topLevel, middleLevel, subItems) => {
    // Exclude the first item (assuming the first item in subItems is already shown in the sub-menu)
    const filteredSubItems = subItems.slice(1);

    return filteredSubItems.map((subItem, index) => (
      <ListItem
        button
        key={index}
        component="a"
        href={subItem.to}
        disabled={subItem.disabled}
        sx={{
          pl: 7,
          "&:hover": {
            backgroundColor: "#737270",
            color: "white",
          },
        }}
      >
        <ListItemText primary={subItem.label} />
      </ListItem>
    ));
  };

  // Function to render submenu (middle level)
  const renderSubMenu = (topLevel, middleLevelItems) => {
    return Object.keys(middleLevelItems)
      .filter((middleLevel) => middleLevel !== "00")
      .map((middleLevel) => {
        const subItems = middleLevelItems[middleLevel];
        const hasSubSubMenu = subItems.length > 1;

        return (
          <React.Fragment key={middleLevel}>
            {isSidebarVisible && (
              <ListItem
                button
                onClick={
                  () =>
                    hasSubSubMenu
                      ? handleSubMenuClick(topLevel, middleLevel)
                      : subItems[0].to && navigate(subItems[0].to) // Directly navigate if no sub-sub-menu
                }
                sx={{
                  pl: 6,
                  "&:hover": {
                    backgroundColor: "#737270",
                  },
                }}
              >
                <ListItemText primary={subItems[0].label} />
                {hasSubSubMenu ? (
                  openSubMenu[`${topLevel}-${middleLevel}`] ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )
                ) : null}
              </ListItem>
            )}

            {hasSubSubMenu && (
              <Collapse
                in={openSubMenu[`${topLevel}-${middleLevel}`]}
                timeout="auto"
                unmountOnExit
              >
                {renderSubSubMenu(topLevel, middleLevel, subItems)}
              </Collapse>
            )}
          </React.Fragment>
        );
      });
  };

  const imagelink = `https://crystalsolutions.com.pk/images/${
    organisation && organisation.code
  }`;

  const { isSidebarVisible, toggleSidebar, getcolor, toggleChangeColor } =
    useSidebar();

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Drawer
          sx={{
            width: isSidebarVisible ? 240 : 60,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              marginTop: "55px",
              width: isSidebarVisible ? 240 : 60,
              boxSizing: "border-box",
              backgroundColor: "#021A33",
              color: "white",
              overflowX: isSidebarVisible ? "auto" : "hidden",
            },
          }}
          onMouseEnter={() => toggleSidebar(true)}
          onMouseLeave={() => toggleSidebar(false)}
          variant="permanent"
          anchor="left"
          open={isSidebarVisible}
          // onMouseEnter={toggleSidebar}
        >
          <SidebarHeader userName={user.tusrnam} userAvatar={man} />
          <Divider />
          {/* <IconButton onClick={handleToggle}>
            {isToggled ? <FaToggleOn /> : <FaToggleOff />}
          </IconButton> */}
          <br />
          <br />
          <List>
            {Object.keys(hierarchicalMenuData)
              .filter((topLevel) => topLevel !== "00") // Exclude top levels with code `00`
              .map((topLevel, index) => (
                <React.Fragment key={topLevel}>
                  <ListItem
                    button
                    onClick={() => handleMenuClick(topLevel)}
                    sx={{
                      pl: 2,
                      "&:hover": {
                        backgroundColor: "#737270",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: "white" }}>
                      {index === 0 && <FaFile />}
                      {index === 1 && <FaExchangeAlt />}
                      {index === 2 && <FaChartBar />}
                      {index === 3 && <FaTools />}
                    </ListItemIcon>
                    {isSidebarVisible && (
                      <ListItemText
                        sx={{
                          marginLeft: "-28px",
                        }}
                        primary={hierarchicalMenuData[topLevel].label}
                      />
                    )}
                    {openMenu[topLevel] ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse
                    in={openMenu[topLevel]}
                    timeout="auto"
                    unmountOnExit
                  >
                    {renderSubMenu(
                      topLevel,
                      hierarchicalMenuData[topLevel].items
                    )}
                  </Collapse>
                </React.Fragment>
              ))}
          </List>
          <Divider />
        </Drawer>
      </Box>
    </>
  );
};

export default SideBar1;
