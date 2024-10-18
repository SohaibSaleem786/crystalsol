import React, { useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import { useTheme } from "../../../../ThemeContext";
import { useNavigate } from "react-router-dom";

const Admin = ({ isOpen, handleToggle }) => {
  const navigate = useNavigate();
  const { getcolor, fontcolor } = useTheme(); // Use the theme context
  const popupRef = useRef(null); // To track the popup container

  const PopupContainer = styled("div")({
    position: "absolute",
    top: "60px",
    right: "10vw",
    width: "200px",
    border: `1px solid ${fontcolor}`,
    backgroundColor: getcolor, // Get from context
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    zIndex: 1,
    padding: "10px",
    color: fontcolor, // Get from context
    fontFamily: "Arial, sans-serif",
    transition: "all 0.3s ease",
  });

  const MenuItem = styled("div")({
    padding: "10px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#3368B5",
      color: fontcolor,
    },
  });

  // Add event listener to detect clicks outside the popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handleToggle("admin"); // Close the popup if clicked outside
      }
    };

    // Attach event listener when the component is mounted
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleToggle]);

  return (
    isOpen && (
      <PopupContainer ref={popupRef}>
        <MenuItem
          onClick={() => {
            navigate("/MenuAdmin");
          }}
        >
          Menu
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/AdminCustomers");
          }}
        >
          Customer
        </MenuItem>

        {/* <MenuItem
          onClick={() => {
            navigate("/AdminUserManagement");
          }}
        >
          User Management
        </MenuItem> */}
      </PopupContainer>
    )
  );
};

export default Admin;
