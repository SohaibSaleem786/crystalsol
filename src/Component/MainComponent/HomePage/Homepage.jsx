import { React, useState } from "react";
import "../../../menu.css";
import "./Homepage.css";
import { useSidebar } from "../../../SidebarContext";
function HomePage1() {
  const { isSidebarVisible, toggleSidebar, getcolor, toggleChangeColor } =
    useSidebar();

  return (
    <>
      <div style={{ backgroundColor: getcolor, height: "100vh" }}></div>
    </>
  );
}

export default HomePage1;
