import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ViewProjectsPage.css";
import Header from "./Header";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import im1 from "./images/1.jpeg";
import im2 from "./images/2.jpeg";
import im3 from "./images/3.jpeg";
import im4 from "./images/4.jpeg";
import im5 from "./images/5.jpeg";
import im6 from "./images/6.jpeg";
import im7 from "./images/7.jpeg";
import im8 from "./images/8.jpeg";
import im9 from "./images/9.jpeg";
import im10 from "./images/10.jpeg";

export default function ViewProjectsPage() {
  const navigate = useNavigate();

  
  const templateProjects = [
    { id: 1, name: "Etherland", category: "Technology, Culture", image: im1, status: "FINISHED", raisedCapital: 6726, progress: 100, businessId: "101" },
    { id: 2, name: "Storage Hunter", category: "Games", image: im2, status: "FINISHED", raisedCapital: 452960, progress: 90, businessId: "102" },
    { id: 3, name: "CutPoint", category: "Mobile App", image: im3, status: "UPCOMING", raisedCapital: 0, progress: 0, businessId: "103" },
    { id: 4, name: "Solar Energy", category: "Renewable Energy", image: im4, status: "ONGOING", raisedCapital: 25000, progress: 75, businessId: "104" },
    { id: 5, name: "AI-Powered Tutor", category: "Education, AI", image: im5, status: "UPCOMING", raisedCapital: 5000, progress: 10, businessId: "105" },
    { id: 6, name: "Eco-Friendly Packaging", category: "Sustainability", image: im6, status: "FINISHED", raisedCapital: 34000, progress: 100, businessId: "106" },
    { id: 7, name: "Blockchain Healthcare", category: "Healthcare, Blockchain", image: im7, status: "ONGOING", raisedCapital: 60000, progress: 80, businessId: "107" },
    { id: 8, name: "Smart Agriculture Sensors", category: "Agriculture, IoT", image: im8, status: "UPCOMING", raisedCapital: 2000, progress: 5, businessId: "108" },
    { id: 9, name: "VR Travel Experiences", category: "Virtual Reality, Travel", image: im9, status: "ONGOING", raisedCapital: 32000, progress: 50, businessId: "109" },
    { id: 10, name: "Clean Water Initiative", category: "Social Impact", image: im10, status: "ONGOING", raisedCapital: 45000, progress: 90, businessId: "110" },
  ];

  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [projects, setProjects] = useState(templateProjects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [isInvestModalOpen, setIsInvestModalOpen] = useState(false);

  
  const handleInvestClick = (project) => {
    setSelectedProject(project);
    setIsInvestModalOpen(true);
  };

  
  const handleConfirmInvestment = () => {
    if (!investmentAmount || investmentAmount <= 0) {
      alert("Please enter a valid investment amount.");
      return;
    }

    
    const updatedProjects = projects.map((p) =>
      p.id === selectedProject.id
        ? { ...p, raisedCapital: p.raisedCapital + parseFloat(investmentAmount), progress: Math.min(100, ((p.raisedCapital + parseFloat(investmentAmount)) / 100000) * 100) }
        : p
    );

    setProjects(updatedProjects);
    alert(`Investment of $${investmentAmount} in ${selectedProject.name} successful!`);
    setIsInvestModalOpen(false);
    setInvestmentAmount("");
  };

  return (
    <div className="view-projects-container">
      <Header onSignIn={() => setIsSignInOpen(true)} onSignUp={() => setIsSignUpOpen(true)} />
      <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} onSignUp={() => { setIsSignInOpen(false); setIsSignUpOpen(true); }} />
      <SignUpModal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} />

      <h1 className="view-projects-header">Explore Projects</h1>
      <p className="view-projects-description">Discover innovative projects from various industries.</p>

      <div className="project-list">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <img src={project.image} alt={project.name} className="project-image" />
            <div className="project-card-header">
              <span className={`status-badge ${project.status.toLowerCase()}`}>{project.status}</span>
            </div>
            <h3 className="project-title">{project.name}</h3>
            <p className="project-category">{project.category}</p>
            <div className="progress-container">
              <p>Raised Capital: ${project.raisedCapital.toLocaleString()}</p>
              <div className="progress-bar">
                <div className="progress-filled" style={{ width: `${project.progress}%` }}></div>
              </div>
              <p>{project.progress}% funded</p>
            </div>

            <button className="view-business-button" onClick={() => navigate(`/business/${project.businessId}`)}>
              View Business
            </button>

            {project.status === "ONGOING" && (
              <button className="invest-button" onClick={() => handleInvestClick(project)}>
                Invest Now
              </button>
            )}
          </div>
        ))}
      </div>

      {isInvestModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Invest in {selectedProject.name}</h2>
            <input
              type="number"
              placeholder="Enter investment amount"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
              className="investment-input"
            />
            <div className="modal-buttons">
              <button className="close-button" onClick={() => setIsInvestModalOpen(false)}>
                Close
              </button>
              <button className="confirm-button" onClick={handleConfirmInvestment}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="back-button-container">
        <Link to="/" className="back-button">← Back to Home</Link>
      </div>
    </div>
  );
}
