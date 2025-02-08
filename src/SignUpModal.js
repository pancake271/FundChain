import React, { useState } from "react";
import "./SignUpModal.css";

// Helper functions for Local Storage
const saveUserToLocal = (user) => {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
};

export default function SignUpModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const { fullName, email, password } = formData;

    if (!fullName || !email || !password) {
      alert("Please fill in all the fields.");
      return;
    }

    const newUser = {
      fullName,
      email,
      password,
    };

    // Save user to Local Storage
    saveUserToLocal(newUser);

    alert("Account created successfully!");
    setFormData({ fullName: "", email: "", password: "" });
    onClose(); // Close the modal after successful signup
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Sign Up</h2>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className="input-field"
          value={formData.fullName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input-field"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input-field"
          value={formData.password}
          onChange={handleChange}
        />
        <button className="submit-button" onClick={handleSubmit}>
          Create Account
        </button>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
