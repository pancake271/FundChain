import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RewardsSystemPage.css";
import Header from "./Header";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";

export default function RewardsSystemPage() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  return (
    <div className="rewards-container">
      <Header
        onSignIn={() => setIsSignInOpen(true)}
        onSignUp={() => setIsSignUpOpen(true)}
      />
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSignUp={() => {
          setIsSignInOpen(false);
          setIsSignUpOpen(true);
        }}
      />
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
      />

      <h1 className="rewards-title">FundChain Rewards System</h1>
      <p className="rewards-description">
        The <strong>Transparent Tokenized Reward System</strong> is designed to
        incentivize investors by providing platform-native tokens as rewards for
        participation.
      </p>

      <h2 className="section-title">🔹 How Investors Earn Tokens</h2>
      <ul className="rewards-list">
        <li>
          📌 Investing in projects → Earn tokens proportional to investment
          size.
        </li>
        <li>
          📌 Holding funds in the platform (staking) → Receive periodic reward
          distributions.
        </li>
        <li>
          📌 Reaching lending milestones → Bonus tokens for every $10,000
          invested.
        </li>
      </ul>

      <h2 className="section-title">🔹 How Tokens Can Be Used</h2>
      <ul className="rewards-list">
        <li>
          🎟️ <strong>Access to High-Yield Projects</strong> → Investors get
          exclusive early access.
        </li>
        <li>
          💲 <strong>Discounts on Investments & Fees</strong> → Lower platform
          fees for token holders.
        </li>
        <li>
          💰 <strong>Increased Credit Limits</strong> → More tokens = higher
          lending capacity.
        </li>
      </ul>

      <div className="benefits-container">
        <h2 className="benefits-title">🎯 Key Advantages</h2>
        <ul className="benefits-list">
          <li>
            💹 Investors benefit from both interest payments and token
            appreciation.
          </li>
          <li>
            🔒 A secure and transparent reward system built on blockchain.
          </li>
          <li>
            ⚡ Encourages long-term engagement and trust within the ecosystem.
          </li>
        </ul>
      </div>

      <div className="back-button-container">
        <Link to="/" className="back-button">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
