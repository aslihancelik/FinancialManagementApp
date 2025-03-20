import React from "react";
import { FaHome, FaUser, FaCog } from "react-icons/fa";

const Navbar = ({ activeTab }) => {
  return (
    <div className="navbar">
      <button
        className={activeTab === "home" ? "active" : ""}
        aria-label="Home"
        title="Home"
      >
        <FaHome />
        Home
      </button>
      <button
        className={activeTab === "profile" ? "active" : ""}
        aria-label="Profile"
        title="Profile"
      >
        <FaUser />
        Profile
      </button>
      <button
        className={activeTab === "settings" ? "active" : ""}
        aria-label="Settings"
        title="Settings"
      >
        <FaCog />
        Settings
      </button>
    </div>
  );
};

export default Navbar;
