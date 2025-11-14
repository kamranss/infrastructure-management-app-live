import React from "react";
import ExportExcel from "../ExportExcel";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { Download } from "@mui/icons-material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import {
  List as ListIcon,
  TaskAlt,
  CalendarMonth,
  Warehouse,
  ShoppingCart,
  ShowChart,
  ManageAccounts,
  ChatBubbleOutline,
  FileDownload,
  Tune,
} from "@mui/icons-material";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";

const navLinks = [
  { to: "/assetsPage", icon: <ListIcon /> },
  // { to: "/AssetDetails", icon: <TaskAlt /> },
  { to: "/usageHistory", icon: <CalendarMonth /> },
  { to: "/maintenanceoverview", icon: <BuildCircleIcon /> },
  { to: "/inventorypage", icon: <Warehouse /> },
  // { to: "/department", icon: <CorporateFareIcon /> },
  { to: "/dashboard", icon: <ShowChart /> },
  { to: "/chat", icon: <ChatBubbleOutline /> },
  { to: "/administration", icon: <Tune /> },
];

const HeaderNav = () => {
  const location = useLocation();

  return (
    <div className="headernav_container">
      <div className="main">
        {navLinks.map((link, index) => (
          <div
            key={index}
            className={`nav-wrapper ${
              location.pathname === link.to ? "active" : ""
            }`}
          >
            <NavLink to={link.to} className="header_nav_icon">
              {link.icon}
            </NavLink>
          </div>
        ))}

        <div className="main_excel">
          <FileDownload className="icon" />
        </div>
      </div>
    </div>
  );
};

export default HeaderNav;
