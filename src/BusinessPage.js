import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./BusinessPage.css";
import Header from "./Header";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import nftexample from "./images/nft-example.avif";

export default function BusinessPage() {
  const { businessId } = useParams();
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [business, setBusiness] = useState(null);
  const [showNFT, setShowNFT] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const businessesData = [
      {
        id: "101",
        name: "GreenTech Innovations",
        owner: "0xAaBbCc1234567890...",
        reputation: 92,
        fundingReceived: 75000,
        status: "Active",
        description: "A startup focused on eco-friendly technology.",
      },
      {
        id: "102",
        name: "Solar Energy for All",
        owner: "0xAbC1234567890...",
        reputation: 85,
        fundingReceived: 50000,
        status: "Active",
        description:
          "A project aimed at bringing affordable solar power solutions to rural communities.",
      },
      {
        id: "103",
        name: "Blockchain Healthcare",
        owner: "0xDef9876543210...",
        reputation: 78,
        fundingReceived: 90000,
        status: "Pending",
        description: "A decentralized healthcare data system.",
      },
    ];

    const foundBusiness = businessesData.find((biz) => biz.id === businessId);
    setBusiness(foundBusiness);
  }, [businessId]);


  if (!business) {
    return (
      <div className="business-page">
        <h2>Business Not Found</h2>
      </div>
    );
  }

  return (
    <div className="business-page">
      <Header
        onSignIn={() => setIsSignInOpen(true)}
        onSignUp={() => setIsSignUpOpen(true)}
      />
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
      />
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
      />

      <div className="business-card">
        <h1>{business.name}</h1>
        <p>
          <strong>Business ID:</strong> {business.id}
        </p>
        <p>
          <strong>Owner:</strong> {business.owner}
        </p>

        {/* Reputation and Funding Progress Bars */}
        <div className="business-stats">
          <div className="stat-card">
            <p className="stat-title">Reputation Score</p>
            <div className="stat-bar">
              <div
                className="stat-fill"
                style={{ width: `${business.reputation}%` }}
              ></div>
            </div>
            <p>{business.reputation}/100</p>
          </div>

          <div className="stat-card">
            <p className="stat-title">Funding Received</p>
            <div className="stat-bar">
              <div
                className="stat-fill"
                style={{
                  width: `${(business.fundingReceived / 100000) * 100}%`,
                }}
              ></div>
            </div>
            <p>${business.fundingReceived.toLocaleString()}</p>
          </div>
        </div>

        {/* Status Display with Icon */}
        <div className="status-container">
          <p
            className={
              business.status === "Active"
                ? "status-active"
                : business.status === "Pending"
                ? "status-pending"
                : "status-inactive"
            }
          >
            {business.status}
          </p>
        </div>

        <p>
          <strong>Description:</strong> {business.description}
        </p>

        {/* NFT View Button */}
        <div className="nft-section">
          <button className="view-nft-button" onClick={() => setShowNFT(true)}>
            View NFT
          </button>
          {showNFT && (
            <div className="nft-container">
              <img src={nftexample} alt="NFT Example" className="nft-image" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
