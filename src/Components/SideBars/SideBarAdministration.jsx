import React from "react";
// import React, { useState } from "react";
import { NavLink } from "react-router-dom";
const SideBarAdministration = ({ activeTab, onTabChange }) => {
  return (
    <div className="department_sidebar">
      <div className="heading">
        <h2 className="heading_name">Code_Lists</h2>
      </div>
      <NavLink
        className={`division-name ${activeTab === 1 ? "active" : ""}`}
        onClick={() => onTabChange(0)}
      >
        <i className="fa-solid fa-angle-right"></i>
        <span className="span">001 - Departments</span>
      </NavLink>
      <NavLink
        className={`division-name ${activeTab === 2 ? "active" : ""}`}
        onClick={() => onTabChange(1)}
      >
        <i className="fa-solid fa-angle-right"></i>
        <span className="span">002 - Parts</span>
      </NavLink>
      <NavLink
        className={`division-name ${activeTab === 3 ? "active" : ""}`}
        onClick={() => onTabChange(2)}
      >
        <i className="fa-solid fa-angle-right"></i>
        <span className="span">003 - Manufactures</span>
      </NavLink>
      <NavLink
        className={`division-name ${activeTab === 4 ? "active" : ""}`}
        onClick={() => onTabChange(3)}
      >
        <i className="fa-solid fa-angle-right"></i>
        <span className="span">004 - Models</span>
      </NavLink>
      <NavLink
        className={`division-name ${activeTab === 5 ? "active" : ""}`}
        onClick={() => onTabChange(4)}
      >
        <i className="fa-solid fa-angle-right"></i>
        <span className="span">005 - Operation_Sites</span>
      </NavLink>
      <NavLink className="division-name" to="/Users">
        <i className="fa-solid fa-angle-right"></i>
        <span className="span">006 - Users</span>
      </NavLink>
    </div>
  );
};

export default SideBarAdministration;
