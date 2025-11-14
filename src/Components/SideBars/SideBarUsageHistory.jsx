import React from "react";
import SideBarEquUsageimg from "../../Assets/Images/EquUsage.webp";

// import { Tabs, Tab, AppBar } from "@material-ui/core";
// import React, { useState } from "react";
import { NavLink } from "react-router-dom";
const SideBarUsageHistory = ({ activeTab, onTabChange }) => {
  return (
    <div className="department_sidebar">
      <div className="heading">
        <h2 className="heading_name">EquipmentUsage</h2>
      </div>
      <div>
        <img className="sideBar_Image" src={SideBarEquUsageimg} alt="" />
      </div>
    </div>
  );
};

export default SideBarUsageHistory;
