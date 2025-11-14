import React from "react";
import { NavLink } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
// import "./Header.css"; // Make sure to import your CSS file

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="nav-buttons">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
          >
            Register
          </NavLink>
        </div>
        <NavLink to="/profile" className="userinfo-link">
          <div className="userinfo">
            <h3 className="username">UserName</h3>
            <AccountCircle fontSize="large" sx={{ color: "#fff" }} />
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
