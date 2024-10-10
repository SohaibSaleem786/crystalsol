import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../ThemeContext";
import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useData } from "../../../DataContext";
import "bootstrap-icons/font/bootstrap-icons.css"; // Ensure this is imported
import man from "../../../image/man.png";
import { isLoggedIn, getUserData, getOrganisationData } from "../../Auth";
import { SvgIcon, Button } from "@mui/material";
import { Avatar, Divider, ListItemIcon } from "@mui/material";
import { Settings, ExitToApp, Brightness4, Inbox } from "@mui/icons-material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EmailIcon from "@mui/icons-material/Email";
import SettingsIcon from "@mui/icons-material/Settings";
import { useSidebar } from "../../../SidebarContext";

const Menufile = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div
      className="menu"
      style={{
        position: "absolute",
        top: "60px",
        right: "475px",
        width: "650px",
        backgroundColor: "#0d2949",
        color: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        zIndex: 9999,
      }}
    >
      <div
        className="menu-section"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Left Section: Applications */}
        <div className="menu-applications" style={{ width: "60%" }}>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {/* Chat Application */}
            <li style={{ marginBottom: "15px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 0, 0, 0.5)",
                    color: "#fff",
                    marginRight: "10px", // Add margin to space out from text
                  }}
                >
                  <span
                    style={{
                      fontSize: "16px",
                      color: "#ADB7C1",
                    }}
                  >
                    💬
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <strong
                    style={{
                      color: "#d4d2d2",
                      fontSize: "14px",
                    }}
                  >
                    Chat Application
                  </strong>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#7fbef3",
                    }}
                  >
                    New messages arrived
                  </span>
                </div>
              </div>
            </li>

            <li style={{ marginBottom: "15px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(96, 154, 247, 0.5)",
                    color: "#fff",
                    marginRight: "10px", // Add margin to space out from text
                  }}
                >
                  <span
                    style={{
                      fontSize: "16px",
                      color: "#ADB7C1",
                    }}
                  >
                    📝
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <strong
                    style={{
                      color: "#d4d2d2",
                      fontSize: "14px",
                    }}
                  >
                    Notes App
                  </strong>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#7fbef3",
                    }}
                  >
                    Get latest invoice
                  </span>
                </div>
              </div>
            </li>

            <li style={{ marginBottom: "15px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(30, 186, 2, 0.5)",
                    color: "#fff",
                    marginRight: "10px", // Add margin to space out from text
                  }}
                >
                  <span
                    style={{
                      fontSize: "16px",
                      color: "#ADB7C1",
                    }}
                  >
                    📇
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <strong
                    style={{
                      color: "#d4d2d2",
                      fontSize: "14px",
                    }}
                  >
                    Contact Application
                  </strong>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#7fbef3",
                    }}
                  >
                    2 Unsaved Contacts
                  </span>
                </div>
              </div>
            </li>

            <li style={{ marginBottom: "15px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(161, 49, 14, 0.5)",
                    color: "#fff",
                    marginRight: "10px", // Add margin to space out from text
                  }}
                >
                  <span
                    style={{
                      fontSize: "16px",
                      color: "#ADB7C1",
                    }}
                  >
                    📧
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <strong
                    style={{
                      color: "#d4d2d2",
                      fontSize: "14px",
                    }}
                  >
                    Email Application
                  </strong>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#7fbef3",
                    }}
                  >
                    2 unread messages
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="menu-applications" style={{ width: "60%" }}>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "15px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(184, 147, 17, 0.5)",
                    color: "#fff",
                    marginRight: "10px", // Add margin to space out from text
                  }}
                >
                  <span
                    style={{
                      fontSize: "16px",
                      color: "#ADB7C1",
                    }}
                  >
                    📅
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <strong
                    style={{
                      color: "#d4d2d2",
                      fontSize: "14px",
                    }}
                  >
                    Calendar App
                  </strong>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#7fbef3",
                    }}
                  >
                    Get dates
                  </span>
                </div>
              </div>
            </li>

            <li style={{ marginBottom: "15px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(164, 222, 29, 0.5)",
                    color: "#fff",
                    marginRight: "10px", // Add margin to space out from text
                  }}
                >
                  <span
                    style={{
                      fontSize: "16px",
                      color: "#ADB7C1",
                    }}
                  >
                    🎟️
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <strong
                    style={{
                      color: "#d4d2d2",
                      fontSize: "14px",
                    }}
                  >
                    Ticket Application
                  </strong>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#7fbef3",
                    }}
                  >
                    Get new tickets
                  </span>
                </div>
              </div>
            </li>

            <li style={{ marginBottom: "15px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(25, 240, 22, 0.5)",
                    color: "#fff",
                    marginRight: "10px", // Add margin to space out from text
                  }}
                >
                  <span
                    style={{
                      fontSize: "16px",
                      color: "#ADB7C1",
                    }}
                  >
                    🛒
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <strong
                    style={{
                      color: "#d4d2d2",
                      fontSize: "14px",
                    }}
                  >
                    eCommerce
                  </strong>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#7fbef3",
                    }}
                  >
                    Buy more products
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        {/* Right Section: Quick Links */}
        <div className="menu-quick-links" style={{ width: "35%" }}>
          <strong
            style={{
              color: "white",
              fontSize: "16px",
            }}
          >
            Quick Links
          </strong>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <br />
            {[
              "Pricing Page",
              "Authentication",
              "Register Now",
              "404 Error Page",
              "Notes App",
              "User Application",
              "Account Settings",
            ].map((linkText) => (
              <li
                key={linkText}
                style={{
                  marginBottom: "15px",
                  fontSize: "14px",
                  cursor: "pointer",
                  color: "#b0c8e4",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.target.style.color = "#b0c8e4")}
              >
                {linkText}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom "Check" Button */}
      <button
        style={{
          backgroundColor: "#0090e7",
          border: "none",
          color: "white",
          padding: "10px 20px",
          borderRadius: "20px",
          cursor: "pointer",
          marginTop: "20px",
          display: "block",
          width: "100px",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#007bb5")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#0090e7")}
      >
        Check
      </button>
    </div>
  );
};
const Threelineiconheader = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  );
};

const CustomGridIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
  );
};

const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Circle for search icon */}
      <circle cx="11" cy="11" r="8"></circle>
      {/* Line for search icon */}
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
};
export default function Header() {
  const navigate = useNavigate();
  const user = getUserData();
  const organisation = getOrganisationData();

  useEffect(() => {
    if (!isLoggedIn()) {
    }
  }, [navigate]);

  const { primaryColor, secondaryColor } = useTheme();
  const { apiLinks } = useTheme();

  const imagelink = `https://crystalsolutions.com.pk/images/${
    organisation && organisation.code
  }`;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    localStorage.removeItem("user_id");

    navigate("/");
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <div>
      <IconButton onClick={handleMenuOpen}>
        <Avatar alt={user?.tusrnam || ""} src="/path-to-avatar.jpg" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 6,
          sx: {
            marginTop: "50px",
            width: 300,
            backgroundColor: "#0A2744", // Dark blue background
            color: "white", // White text
            borderRadius: "12px",
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        {/* Profile Info */}
        <div
          style={{
            padding: "20px",
            background: "linear-gradient(135deg, #1f3b56, #3f4e71)",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
            display: "flex",
            alignItems: "center", // Align name and avatar
            gap: "16px", // Space between avatar and text
          }}
        >
          <Avatar
            alt={user?.name || "John Deo"}
            src="/path-to-avatar.jpg"
            sx={{
              width: 64,
              height: 64,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          />
          <div style={{ textAlign: "left" }}>
            <Typography
              variant="body1"
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "12px", // Adjusted font size to 12px
              }}
            >
              {user?.tusrnam || "John Deo"}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "lightgray",
                fontSize: "10px", // Adjusted font size to 12px
              }}
            >
              {user?.temladd || "info@wrappixel.com"}
            </Typography>
          </div>
        </div>

        <Divider sx={{ borderBottom: "2px solid #efefef" }} />

        {/* Menu Items */}
        <MenuItem
          onClick={handleMenuClose}
          sx={{
            color: "white",
            padding: "12px 16px",
            fontSize: "12px", // Adjusted font size to 12px
            transition: "background 0.3s",
            "&:hover": { backgroundColor: "#1f3b56" },
          }}
        >
          My Profile
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose}
          sx={{
            color: "white",
            padding: "12px 16px",
            fontSize: "12px", // Adjusted font size to 12px
            transition: "background 0.3s",
            "&:hover": { backgroundColor: "#1f3b56" },
          }}
        >
          My Projects
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose}
          sx={{
            color: "white",
            padding: "12px 16px",
            fontSize: "12px", // Adjusted font size to 12px
            transition: "background 0.3s",
            "&:hover": { backgroundColor: "#1f3b56" },
          }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <Inbox fontSize="small" />
          </ListItemIcon>
          Inbox
        </MenuItem>

        <Divider sx={{ borderBottom: "2px solid #efefef" }} />

        {/* Mode and Settings */}
        <MenuItem
          onClick={handleMenuClose}
          sx={{
            color: "white",
            padding: "12px 16px",
            fontSize: "12px", // Adjusted font size to 12px
            transition: "background 0.3s",
            "&:hover": { backgroundColor: "#1f3b56" },
          }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <Brightness4 fontSize="small" />
          </ListItemIcon>
          Mode
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose}
          sx={{
            color: "white",
            padding: "12px 16px",
            fontSize: "12px", // Adjusted font size to 12px
            transition: "background 0.3s",
            "&:hover": { backgroundColor: "#1f3b56" },
          }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <Settings fontSize="small" />
          </ListItemIcon>
          Account Settings
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          sx={{
            color: "white",
            padding: "12px 16px",
            fontSize: "12px", // Adjusted font size to 12px
            transition: "background 0.3s",
            "&:hover": { backgroundColor: "#1f3b56" },
          }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          Sign Out
        </MenuItem>
      </Menu>
    </div>
  );
  const PopupContainer = styled("div")({
    position: "absolute",
    top: "60px",
    right: "20px",
    width: "360px",
    backgroundColor: "#0D2C46",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    zIndex: 1,
    padding: "10px",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
  });

  const Header = styled("h3")({
    margin: "0 0 10px 0",
    padding: "10px",
    backgroundColor: "#007BFF",
    borderRadius: "5px",
    textAlign: "center",
    fontSize: "16px", // Small but still readable
  });

  const MessageCount = styled("p")({
    margin: "0 0 10px 0",
    textAlign: "center",
    fontSize: "12px", // Reduced font size for count
  });

  const MessageList = styled("div")({
    maxHeight: "370px",
    overflowY: "auto",
    marginBottom: "10px",
  });

  const MessageItem = styled("div")({
    display: "flex",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#1E3A5F",
    borderRadius: "5px",
    marginBottom: "10px",
  });

  const MessageDetails = styled("div")({
    flex: 1,
    marginLeft: "10px",
  });

  const MessageTitle = styled("div")({
    fontWeight: "bold",
    fontSize: "12px", // Smaller font size
  });

  const MessageText = styled("p")({
    margin: "5px 0 0 0",
    fontSize: "10px",
    color: "#ccc",
  });

  const CheckButton = styled("button")({
    backgroundColor: "#007BFF",
    color: "#fff",
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "12px",
  });

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const [isOpenmail, setIsOpenmail] = useState(false);

  const handleClickmail = () => {
    setIsOpenmail(!isOpenmail);
  };

  const [isOpennotification, setIsOpennotification] = useState(false);

  const handleClicknotification = () => {
    setIsOpennotification(!isOpennotification);
  };

  const [isfilesOpen, setIsfilesOpen] = useState(false);

  const togglefiles = () => {
    setIsfilesOpen(!isfilesOpen);
  };

  const { isSidebarVisible, toggleSidebar, getcolor, toggleChangeColor } =
    useSidebar();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{
          background: "#3368B5",
          height: "55px",
          borderBottom: "1px solid gray",
        }}
      >
        <Toolbar>
          <img
            src={`${imagelink}01.jpg`}
            alt="Company Logo"
            style={{ height: "40px", marginRight: "5px" }}
          />
          <h6 style={{ fontWeight: "bold" }}>
            {organisation && organisation.description}
          </h6>
          <IconButton
            style={{ marginLeft: "60px" }}
            size="small"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{
              "&:hover": {
                backgroundColor: "rgba(191, 191, 191,0.5)",
                borderRadius: "50%",
              },
            }}
            onClick={() => toggleSidebar(!isSidebarVisible)}
          >
            <Threelineiconheader />
          </IconButton>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{
              ml: 2,
              "&:hover": {
                backgroundColor: "rgba(191, 191, 191,0.5)",
                borderRadius: "50%",
              },
            }}
            onClick={togglefiles}
          >
            <CustomGridIcon />
          </IconButton>
          <Menufile isOpen={isfilesOpen} />

          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{
              ml: 2,
              "&:hover": {
                backgroundColor: "rgba(191, 191, 191,0.5)",
                borderRadius: "50%",
              },
            }}
          >
            <SearchIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(191, 191, 191,0.5)",
                  borderRadius: "50%",
                },
              }}
              onClick={toggleChangeColor}
            >
              <i className="bi bi-brightness-high fs-5 text-white"></i>
            </IconButton>

            <IconButton
              size="large"
              aria-label="show new mails"
              color="inherit"
              onClick={handleClickmail}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(191, 191, 191,0.5)",
                  borderRadius: "50%",
                },
              }}
            >
              <Badge badgeContent={5} color="error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </Badge>
            </IconButton>

            {isOpenmail && (
              <PopupContainer>
                <Header>Messages</Header>
                <MessageCount>You have 5 new messages</MessageCount>

                {/* Message List */}
                <MessageList>
                  {[
                    {
                      title: "Subtain",
                      time: "9:10 PM",
                      message: "Just a reminder of the event.",
                      icon: <EventAvailableIcon />,
                      avatarColor: "#FF5722",
                    },
                    {
                      title: "Hamza",
                      time: "9:02 AM",
                      message: "Just send my admin!",
                      icon: <EmailIcon />,
                      avatarColor: "#2196F3",
                    },
                    {
                      title: "Ahmed",
                      time: "9:02 AM",
                      message: "Just check emails for today.",
                      icon: <EmailIcon />,
                      avatarColor: "#4CAF50",
                    },
                    {
                      title: "Numan",
                      time: "9:08 AM",
                      message: "You can customize this template as you...",
                      icon: <SettingsIcon />,
                      avatarColor: "#FF9800",
                    },
                    {
                      title: "Saif",
                      time: "9:02 AM",
                      message: "Just send my admin!",
                      icon: <EmailIcon />,
                      avatarColor: "#9C27B0",
                    },
                  ].map((msg, index) => (
                    <MessageItem key={index}>
                      <Avatar style={{ backgroundColor: msg.avatarColor }}>
                        {msg.title[0]}
                      </Avatar>
                      <MessageDetails>
                        <MessageTitle>
                          {msg.time} - {msg.title}
                        </MessageTitle>
                        <MessageText>{msg.message}</MessageText>
                      </MessageDetails>
                    </MessageItem>
                  ))}
                </MessageList>

                <CheckButton>Check All Messages</CheckButton>
              </PopupContainer>
            )}

            <IconButton
              size="large"
              aria-label="show new notification"
              color="inherit"
              onClick={handleClicknotification}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(191, 191, 191,0.5)",
                  borderRadius: "50%",
                },
              }}
            >
              <Badge badgeContent={17} color="error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </Badge>
            </IconButton>

            {isOpennotification && (
              <PopupContainer>
                <Header>Notification</Header>
                <MessageCount>You have 5 new notification</MessageCount>

                {/* Message List */}
                <MessageList>
                  {[
                    {
                      title: "Event Today",
                      time: "9:10 PM",
                      message: "Just a reminder of the event.",
                      icon: <EventAvailableIcon />,
                      avatarColor: "#FF5722",
                    },
                    {
                      title: "Send Email",
                      time: "9:02 AM",
                      message: "Just send my admin!",
                      icon: <EmailIcon />,
                      avatarColor: "#2196F3",
                    },
                    {
                      title: "Check Email",
                      time: "9:02 AM",
                      message: "Just check emails for today.",
                      icon: <EmailIcon />,
                      avatarColor: "#4CAF50",
                    },
                    {
                      title: "Settings",
                      time: "9:08 AM",
                      message: "You can customize this template as you...",
                      icon: <SettingsIcon />,
                      avatarColor: "#FF9800",
                    },
                    {
                      title: "Send Email",
                      time: "9:02 AM",
                      message: "Just send my admin!",
                      icon: <EmailIcon />,
                      avatarColor: "#9C27B0",
                    },
                  ].map((msg, index) => (
                    <MessageItem key={index}>
                      <Avatar style={{ backgroundColor: msg.avatarColor }}>
                        {msg.title[0]}
                      </Avatar>
                      <MessageDetails>
                        <MessageTitle>
                          {msg.time} - {msg.title}
                        </MessageTitle>
                        <MessageText>{msg.message}</MessageText>
                      </MessageDetails>
                    </MessageItem>
                  ))}
                </MessageList>

                <CheckButton>Check All Notification</CheckButton>
              </PopupContainer>
            )}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              onClick={handleProfileMenuOpen}
            >
              <Avatar
                alt="Profile"
                src={man}
                sx={{ height: "30px", width: "30px", marginTop: "-10px" }}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
