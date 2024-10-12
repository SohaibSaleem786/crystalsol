// SidebarContext.js
import React, { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const useSidebar = () => {
  return useContext(SidebarContext);
};

export const SidebarProvider = ({ children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [getcolor, setcolor] = useState("#021A33");
  const [fontcolor, setfontcolor] = useState("white");
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
    setfontcolor((prev) => (prev === "white" ? "black" : "white"));
  };

  return (
    <SidebarContext.Provider
      value={{
        isSidebarVisible,
        toggleSidebar,
        getcolor,
        fontcolor,
        toggleChangeColor,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
