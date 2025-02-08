import { useState, useEffect } from "react";
import { motion} from "framer-motion";
import "./MicrofinancePlatform.css";
import Header from "./Header";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";


import aiTutorImage from "./images/5.jpeg";
import solarEnergyImage from "./images/4.jpeg";
import vrTravelImage from "./images/3.jpeg";

const projects = [
  {
    image: aiTutorImage,
    title: "AI Tutor – Personalized Learning",
    description: "Revolutionizing education with an AI-driven tutor.",
    cta: "Explore AI Tutor",
    data: {
      totalInvestors: 150,
      fundingRaised: "$50,000",
      fundingGoal: "$75,000",
    },
  },
  {
    image: solarEnergyImage,
    title: "Clean Solar Energy for All",
    description: "Empowering communities with affordable solar solutions.",
    cta: "Invest in Solar Energy",
    data: {
      totalInvestors: 320,
      fundingRaised: "$120,000",
      fundingGoal: "$200,000",
    },
  },
  {
    image: vrTravelImage,
    title: "VR Travel – See the World Differently",
    description: "Travel the world through immersive VR technology.",
    cta: "Support VR Travel",
    data: {
      totalInvestors: 250,
      fundingRaised: "$85,000",
      fundingGoal: "$150,000",
    },
  },
];

function ProjectShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container">
      {/* Left Project Data */}
      <motion.div
        className="project-data-left"
        key={`${projects[currentIndex].title}-left`}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3>Project Statistics</h3>
        <p><strong>Total Investors:</strong> {projects[currentIndex].data.totalInvestors}</p>
        <p><strong>Funding Raised:</strong> {projects[currentIndex].data.fundingRaised}</p>
        <p><strong>Funding Goal:</strong> {projects[currentIndex].data.fundingGoal}</p>
      </motion.div>

      <div className="carousel">
        <motion.div
          className="carousel-content"
          key={projects[currentIndex].title}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={projects[currentIndex].image}
            alt={projects[currentIndex].title}
            className="project-main-image"
          />
          <h2 className="project-title">{projects[currentIndex].title}</h2>
          <p className="project-description">{projects[currentIndex].description}</p>
          <button className="cta-button">{projects[currentIndex].cta}</button>
        </motion.div>

        <button className="arrow left-arrow" onClick={prevSlide}>&#8249;</button>
        <button className="arrow right-arrow" onClick={nextSlide}>&#8250;</button>

        <div className="dots">
          {projects.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>

      
      <motion.div
        className="project-data-right"
        key={`${projects[currentIndex].title}-right`}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3>Investment Insights</h3>
        <p>Discover how this project is making an impact and why it’s worth investing in.</p>
      </motion.div>
    </div>
  );
}

export default function MicrofinancePlatform() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <div className="page-container">
      <Header onSignIn={() => setIsSignInOpen(true)} onSignUp={() => setIsSignUpOpen(true)} />
      <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
      <SignUpModal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} />

      <div className="content" style={{ paddingTop: "120px" }}>
        <div className="intro">
          <h1 className="title">Welcome to FundChain</h1>
          <p className="subtitle">Decentralized microfinance empowering small businesses.</p>
        </div>

        <ProjectShowcase />
      </div>
    </div>
  );
}
