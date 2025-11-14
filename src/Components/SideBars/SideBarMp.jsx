import React from "react";
import SideImageMaintenance from "../../Assets/Images/maintenance.jpg";

// import { Tabs, Tab, AppBar } from "@material-ui/core";
// import React, { useState } from "react";
import { NavLink } from "react-router-dom";
const SideBarMp = ({ activeTab, onTabChange }) => {
  return (
    <div className="department_sidebar">
      <div className="heading">
        <h2 className="heading_name">Maintenance plan</h2>
      </div>
      <div>
        <img src={SideImageMaintenance} alt="" />
      </div>
    </div>
  );
};

export default SideBarMp;
