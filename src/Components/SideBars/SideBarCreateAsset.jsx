import React from "react";
import SideBarimg from "../../Assets/Images/SideBar.jpg";

// import { Tabs, Tab, AppBar } from "@material-ui/core";
// import React, { useState } from "react";
import { NavLink } from "react-router-dom";
const SideBarCreateAsset = ({ activeTab, onTabChange }) => {
  return (
    <div className="department_sidebar">
      <div className="heading">
        <h2 className="heading_name">Samples</h2>
      </div>
      <div>{/* <img src={SideBarimg} alt="" /> */}</div>
    </div>
  );
};

export default SideBarCreateAsset;
