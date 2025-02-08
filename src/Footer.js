import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About FundChain</h3>
          <p>FundChain is a decentralized microfinance and crowdfunding platform empowering small businesses.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/view-projects">View Projects</a></li>
            <li><a href="/upload-projects">Upload Projects</a></li>
            <li><a href="/rewards-system">Rewards System</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@fundchain.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} FundChain. All Rights Reserved.</p>
      </div>
    </footer>
  );
}