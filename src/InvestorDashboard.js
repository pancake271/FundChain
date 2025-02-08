import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./InvestorDashboard.css";
import chartPlaceholder from "./images/output.png"; // Import chart image
import Header from "./Header";
import { getBlockchainTransactions } from "./blockchainSimulator"; // Import blockchain simulator for transactions

const mockData = {
  summary: {
    totalInvested: 50000,
    expectedReturns: 15000,
    activeProjects: 5,
    completedProjects: 10,
  },
  projects: [
    {
      name: "AI Tutor",
      amount: 10000,
      progress: 75,
      type: "Microloan",
      status: "Active",
    },
    {
      name: "Solar Energy",
      amount: 15000,
      progress: 100,
      type: "Equity",
      status: "Completed",
    },
    {
      name: "VR Travel Experience",
      amount: 5000,
      progress: 50,
      type: "Hybrid",
      status: "Active",
    },
  ],
  transactions: [
    { date: "2025-01-15", project: "AI Tutor", amount: 5000, type: "Investment" },
    { date: "2025-01-20", project: "Solar Energy", amount: 15000, type: "Payout" },
  ],
};

export default function InvestorDashboard() {
  const [investorData, setInvestorData] = useState(mockData);
  const [filteredProjects, setFilteredProjects] = useState(mockData.projects);
  const [filter, setFilter] = useState("All");

  // States for withdrawal functionality
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawalSuccess, setWithdrawalSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // New state for blockchain transactions
  const [blockchainTransactions, setBlockchainTransactions] = useState([]);

  // Fetch blockchain transactions on component mount
  useEffect(() => {
    setBlockchainTransactions(getBlockchainTransactions());
  }, []);

  // Handle filtering
  useEffect(() => {
    if (filter === "All") {
      setFilteredProjects(investorData.projects);
    } else {
      setFilteredProjects(
        investorData.projects.filter((p) => p.status === filter)
      );
    }
  }, [filter, investorData]);

  // Handle withdrawal
  const handleWithdrawEarnings = () => {
    const amountToWithdraw = parseFloat(withdrawalAmount);

    if (isNaN(amountToWithdraw) || amountToWithdraw <= 0) {
      setErrorMessage("Please enter a valid withdrawal amount.");
      return;
    }

    if (amountToWithdraw > investorData.summary.expectedReturns) {
      setErrorMessage("Insufficient earnings to withdraw this amount.");
      return;
    }

    setErrorMessage("");
    setIsWithdrawing(true);

    // Simulate a delay for API call
    setTimeout(() => {
      setIsWithdrawing(false);
      setWithdrawalSuccess(true);

      // Update state after withdrawal
      setInvestorData((prevData) => ({
        ...prevData,
        summary: {
          ...prevData.summary,
          expectedReturns:
            prevData.summary.expectedReturns - amountToWithdraw,
        },
        transactions: [
          ...prevData.transactions,
          {
            date: new Date().toISOString().split("T")[0],
            project: "Withdrawn Earnings",
            amount: amountToWithdraw,
            type: "Payout",
          },
        ],
      }));

      setWithdrawalAmount("");
      setTimeout(() => setWithdrawalSuccess(false), 3000);
    }, 2000);
  };

  return (
    <>
      <Header />
      <div className="dashboard-container">
        {/* Dashboard Header */}
        <div className="dashboard-header">
          <h1>Welcome Back, Investor!</h1>
          <div className="summary-cards">
            {Object.entries(investorData.summary).map(([key, value], index) => (
              <motion.div
                className="summary-card"
                key={index}
                whileHover={{ scale: 1.05 }}
              >
                <h3>{key.replace(/([A-Z])/g, " $1")}</h3>
                <p>${value}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="filter-container">
          <label>Filter by Status:</label>
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Projects Section */}
        <div className="projects-section">
          <h2>My Investments</h2>
          <div className="projects-list">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                className="project-card"
                whileHover={{ scale: 1.02 }}
              >
                <h3>{project.name}</h3>
                <p>
                  Amount Invested: <strong>${project.amount}</strong>
                </p>
                <p>
                  Type: <strong>{project.type}</strong>
                </p>
                <p>
                  Status: <strong>{project.status}</strong>
                </p>
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Earnings Summary */}
        <div className="earnings-section">
          <h2>Earnings Summary</h2>
          <img
            src={chartPlaceholder}
            alt="Earnings Chart"
            className="chart-placeholder"
          />
          <div className="withdrawal-container">
            <p className="earnings-balance">
              Available Earnings: ${investorData.summary.expectedReturns}
            </p>
            <input
              type="number"
              placeholder="Enter withdrawal amount"
              value={withdrawalAmount}
              onChange={(e) => setWithdrawalAmount(e.target.value)}
              className="withdrawal-input"
            />
            <button
              className="cta-button"
              onClick={handleWithdrawEarnings}
              disabled={isWithdrawing || investorData.summary.expectedReturns === 0}
            >
              {isWithdrawing ? "Processing..." : "Withdraw Earnings"}
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {withdrawalSuccess && (
              <p className="success-message">Earnings withdrawn successfully!</p>
            )}
          </div>
        </div>

        {/* Blockchain Transactions */}
        <div className="transactions-section">
          <h2>Blockchain Transactions</h2>
          <table>
            <thead>
              <tr>
                <th>TX Hash</th>
                <th>Project</th>
                <th>Amount</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {blockchainTransactions.map((tx, index) => (
                <tr key={index}>
                  <td className="tx-hash">{tx.txHash.slice(0, 10)}...</td>
                  <td>{tx.projectName}</td>
                  <td>${tx.amount}</td>
                  <td>{new Date(tx.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Transaction History */}
        <div className="transactions-section">
          <h2>Transaction History</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Project</th>
                <th>Amount</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {investorData.transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.date}</td>
                  <td>{transaction.project}</td>
                  <td>${transaction.amount}</td>
                  <td>{transaction.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="cta-button">Download CSV</button>
        </div>
      </div>
    </>
  );
}
