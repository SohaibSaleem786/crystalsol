import React from "react";
import { Nav } from "react-bootstrap";

const NavComponent = ({ textdata }) => {
  return (
    <Nav
      className="col-12 d-flex justify-content-between"
      style={{
        backgroundColor: "#3368b5",
        color: "#fff",
        height: "24px",
      }}
    >
      <div style={{ fontSize: "14px" }} className="col-12 text-center">
        {textdata}
      </div>
    </Nav>
  );
};

export default NavComponent;
