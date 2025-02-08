import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "./images/manta.webp"; 

export default function Header({ onSignIn, onSignUp }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          {/* Add logo image */}
          <img
            src={logo}
            alt="FundChain Logo"
            className="header-logo"
            onClick={() => navigate("/")} 
          />
          <h1
            className="logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            FundChain
          </h1>
          <nav className="nav-buttons">
            <button
              className="nav-button"
              onClick={() => navigate("/view-projects")}
            >
              View Projects
            </button>
            <button
              className="nav-button"
              onClick={() => navigate("/upload-projects")}
            >
              Upload Projects
            </button>
            <button
              className="nav-button"
              onClick={() => navigate("/rewards-system")}
            >
              Rewards System
            </button>
            <button
              className="nav-button"
              onClick={() => navigate("/investor-dashboard")}
            >
              Investor Dashboard
            </button>
            <button
              className="nav-button"
              onClick={() => navigate("/ai-chat")}
            >
              AI Chat
            </button>
          </nav>
        </div>
        <div className="auth-buttons">
          <button className="nav-button" onClick={onSignIn}>
            Sign In
          </button>
          <button className="nav-button" onClick={onSignUp}>
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}
