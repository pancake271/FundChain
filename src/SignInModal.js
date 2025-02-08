import React, { useState, useEffect } from "react";
import "./SignInModal.css";

// Helper functions for Local Storage
const saveUserSession = (email) => {
  localStorage.setItem("user", JSON.stringify({ email, isLoggedIn: true }));
};

const getUserSession = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.isLoggedIn ? user : null;
};

const logoutUser = () => {
  localStorage.removeItem("user");
};

export default function SignInModal({ isOpen, onClose, setAuthenticated }) {
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  useEffect(() => {
    // Check if the user is already logged in
    const session = getUserSession();
    if (session) {
      setAuthenticated(true);
      onClose();
    }
  }, [setAuthenticated, onClose]);

  const handleSignIn = () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    // Save session to Local Storage
    saveUserSession(email);
    setAuthenticated(true);
    onClose();
  };

  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Sign In</h2>
        <input
          type="text"
          placeholder="Email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input type="password" placeholder="Password" className="input-field" />
        <label>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Remember Me
        </label>
        <button className="submit-button" onClick={handleSignIn}>
          Sign In
        </button>
        <p className="signup-link">
          Don't have an account?{" "}
          <button className="link-button">Sign Up</button>
        </p>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  ) : null;
}
