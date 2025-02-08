import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ViewProjectsPage from "./ViewProjectsPage";
import UploadProjectsPage from "./UploadProjectsPage";
import RewardsSystemPage from "./RewardsSystemPage";
import BusinessPage from "./BusinessPage";
import InvestorDashboard from "./InvestorDashboard";
import AiChat from "./Chatbot";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/view-projects" element={<ViewProjectsPage />} />
        <Route path="/upload-projects" element={<UploadProjectsPage />} />
        <Route path="/rewards-system" element={<RewardsSystemPage />} />
        <Route path="/business/:businessId" element={<BusinessPage />} />
        <Route path="/investor-dashboard" element={<InvestorDashboard />} />
        <Route path="/ai-chat" element={<AiChat />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
