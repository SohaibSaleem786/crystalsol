// SidebarContext.js
import React, { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const useSidebar = () => {
  return useContext(SidebarContext);
};

export const SidebarProvider = ({ children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [getcolor, setcolor] = useState("#021A33"); // Initial color state

  const toggleSidebar = (visible) => {
    // Only update the state if it's different from the current value
    if (visible !== isSidebarVisible) {
      setSidebarVisible(visible);
    }
  };
  const toggleChangeColor = () => {
    console.log(getcolor);
    // Toggle between two colors
    setcolor((prev) => (prev === "#021A33" ? "white" : "#021A33"));
  };

  return (
    <SidebarContext.Provider
      value={{ isSidebarVisible, toggleSidebar, getcolor, toggleChangeColor }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
