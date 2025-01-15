import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Importing a user icon

export default function Navigation() {
  const [showDropdown, setShowDropdown] = useState(false);

  const navContainer = {
    width: "100%",
    backgroundColor: "#343a40",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  };

  const navInner = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0.5rem 1rem",
  };

  const navList = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
  };

  const logoStyle = {
    color: "#fff", // Gold color for differentiation
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "1rem",
    marginRight: "3rem", // Space between "Price Tag Pro" and "Home"
  };

  const userMenuContainer = {
    position: "relative",
    cursor: "pointer",
  };

  const dropdownStyle = {
    position: "absolute",
    right: 0,
    top: "110%", // just below the icon
    backgroundColor: "#fff",
    color: "#333",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    borderRadius: "4px",
    minWidth: "150px",
    zIndex: 10,
  };

  const dropdownItemStyle = {
    padding: "0.8rem 1rem",
    cursor: "pointer",
    textDecoration: "none",
    color: "#333",
    display: "block",
  };

  const dropdownItemHover = {
    backgroundColor: "#f2f2f2",
  };

  return (
    <nav style={navContainer}>
      <div style={navInner}>
        <ul style={navList}>
          {/* Price Tag Pro or Logo */}
          <li>
            <span style={logoStyle}>Price Tag Pro</span>
          </li>
          {/* Navigation Links */}
          <li>
            <Link to="/" style={linkStyle}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" style={linkStyle}>
              All Products
            </Link>
          </li>
          <li>
            <Link to="/create-product" style={linkStyle}>
              Create Product
            </Link>
          </li>
        </ul>

        {/* User Icon + Dropdown */}
        <div
          style={userMenuContainer}
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <FaUserCircle style={{ fontSize: "30px", color: "#fff" }} />
          {showDropdown && (
            <div style={dropdownStyle}>
              {/* Manage Subscription */}
              <Link to="/manage-subscription" style={dropdownItemStyle}>
                Manage Subscription
              </Link>
              {/* Account Settings */}
              <Link to="/account-settings" style={dropdownItemStyle}>
                Account Settings
              </Link>
              {/* Sign Out */}
              <div
                style={dropdownItemStyle}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#f2f2f2")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                Sign Out
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
