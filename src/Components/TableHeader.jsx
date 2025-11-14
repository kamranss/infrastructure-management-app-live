import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import {
  faCloudArrowDown,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
// import React, { useState } from "react";

const TableHeader = () => {
  return (
    <div className="tableHeadContainer">
      <div className="tableHead">
        <div className="tableHeadBox">
          <NavLink className="header_nav_icon" to="/AssetCreate">
            <FontAwesomeIcon icon={faSquarePlus} />
          </NavLink>
          <NavLink className="header_nav_icon" to="/EquipmentPage">
            <FontAwesomeIcon icon={faCloudArrowDown} />
          </NavLink>
          <NavLink className="header_nav_icon" to="/EquipmentPage">
            <FontAwesomeIcon icon={faEyeSlash} />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
