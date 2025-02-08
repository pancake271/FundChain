import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./UploadProjectsPage.css";
import Header from "./Header";
import SignInModal from "./SignInModal";
import { saveInvestmentToBlockchain } from "./blockchainSimulator"; 

const loadProjectsFromLocal = () => {
  try {
    const projects = JSON.parse(localStorage.getItem("projects"));
    return Array.isArray(projects) ? projects : [];
  } catch (error) {
    console.error("Error parsing projects from Local Storage:", error);
    return [];
  }
};

const saveProjectToLocal = (project) => {
  const projectData = { ...project, businessPlan: null, logo: null }; 
  let projects = JSON.parse(localStorage.getItem("projects")) || [];
  projects.push(projectData);
  localStorage.setItem("projects", JSON.stringify(projects));
};

const getUserSession = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.isLoggedIn && typeof user.email === "string") {
      return user;
    }
    return null;
  } catch (error) {
    console.error("Error parsing user session from Local Storage:", error);
    return null;
  }
};

const handleInvalidUserSession = () => {
  localStorage.removeItem("user"); 
};

const logoutUser = () => {
  localStorage.removeItem("user");
  window.location.reload(); 
};

export default function UploadProjectPage() {
  const [formData, setFormData] = useState({
    name: "",
    goal: "",
    description: "",
    category: "",
    businessPlan: null,
    logo: null,
    wallet: "",
    loanType: "Microloan",
  });

  const [projects, setProjects] = useState([]);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState(null);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);

  const [errorMessage, setErrorMessage] = useState(""); 

  useEffect(() => {
    const storedProjects = loadProjectsFromLocal();
    setProjects(storedProjects);

    const session = getUserSession();
    if (session) {
      setAuthenticated(true);
    } else {
      handleInvalidUserSession();
      setAuthenticated(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    updateProgress();
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    if (!files.length) return;

    const file = files[0];

    if (name === "businessPlan" && file.type !== "application/pdf") {
      setErrorMessage("Only PDF files are allowed for the Business Plan.");
      return;
    }
    if (
      name === "logo" &&
      !["image/png", "image/jpeg", "image/jpg"].includes(file.type)
    ) {
      setErrorMessage(
        "Only PNG and JPG files are allowed for the Business Logo."
      );
      return;
    }

    setErrorMessage(""); 
    setFormData({ ...formData, [name]: file });
    updateProgress();
  };

  const updateProgress = () => {
    let filledFields = Object.values(formData).filter(
      (v) => v !== "" && v !== null
    ).length;
    setProgress((filledFields / 7) * 100);
  };

  const handleSubmit = () => {
    if (!isAuthenticated) {
      setIsSignInOpen(true); 
      return;
    }

    const newProject = { ...formData, id: Date.now() };

    
    const blockchainTransaction = saveInvestmentToBlockchain({
      projectName: newProject.name,
      amount: newProject.goal,
      investor: formData.wallet || "0xFakeWalletAddress", 
    });

    saveProjectToLocal(newProject);
    setProjects([...projects, newProject]);

    alert(`Project submitted successfully!\nBlockchain TX: ${blockchainTransaction.txHash}`);

    setFormData({
      name: "",
      goal: "",
      description: "",
      category: "",
      businessPlan: null,
      logo: null,
      wallet: "",
      loanType: "Microloan",
    });
    setProgress(0);
  };

  
  const generatePreview = () => {
    setPreview({ ...formData });
  };

  return (
    <>
      <Header>
        {isAuthenticated && (
          <button className="logout-button" onClick={logoutUser}>
            Sign Out
          </button>
        )}
      </Header>
      <motion.div
        className="upload-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="content-wrapper">
          <h1 className="page-title">Submit Your Project</h1>
          <div className="form-card">
            <input
              type="text"
              placeholder="Business Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="number"
              placeholder="Funding Goal ($)"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              className="input-field"
            />
            <textarea
              placeholder="Business Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="textarea-field"
            ></textarea>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="dropdown"
            >
              <option value="">Select Category</option>
              <option value="Tech">Tech</option>
              <option value="Retail">Retail</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Manufacturing">Manufacturing</option>
            </select>

            <div className="file-upload-section">
              <label className="upload-label">
                Upload Business Plan (PDF only):
              </label>
              <div className="upload-wrapper">
                <button
                  className="upload-button"
                  onClick={() =>
                    document.querySelector('input[name="businessPlan"]').click()
                  }
                >
                  Upload
                </button>
                <input
                  type="file"
                  name="businessPlan"
                  accept="application/pdf"
                  onChange={handleFileUpload}
                  className="file-input"
                />
                <span className="file-chosen">
                  {formData.businessPlan
                    ? formData.businessPlan.name
                    : "No file chosen"}
                </span>
              </div>

              <label className="upload-label">
                Upload Business Logo (PNG/JPG only):
              </label>
              <div className="upload-wrapper">
                <button
                  className="upload-button"
                  onClick={() =>
                    document.querySelector('input[name="logo"]').click()
                  }
                >
                  Upload
                </button>
                <input
                  type="file"
                  name="logo"
                  accept="image/png, image/jpeg"
                  onChange={handleFileUpload}
                  className="file-input"
                />
                <span className="file-chosen">
                  {formData.logo ? formData.logo.name : "No file chosen"}
                </span>
              </div>
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <input
              type="text"
              placeholder="Wallet Address"
              name="wallet"
              value={formData.wallet}
              onChange={handleChange}
              className="input-field"
            />
            <select
              name="loanType"
              value={formData.loanType}
              onChange={handleChange}
              className="dropdown"
            >
              <option value="Microloan">Microloan</option>
              <option value="Equity Investment">Equity Investment</option>
              <option value="Hybrid Loan">Hybrid Loan</option>
            </select>
            <motion.div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></motion.div>
            <button onClick={generatePreview} className="preview-button">
              Preview
            </button>
            <button onClick={handleSubmit} className="submit-button">
              Submit
            </button>
          </div>
          {preview && (
            <div className="preview-card">
              <h2>Project Preview</h2>
              <p>
                <strong>Business Name:</strong> {preview.name}
              </p>
              <p>
                <strong>Funding Goal:</strong> ${preview.goal}
              </p>
              <p>
                <strong>Description:</strong> {preview.description}
              </p>
              <p>
                <strong>Category:</strong> {preview.category}
              </p>
              <p>
                <strong>Loan Type:</strong> {preview.loanType}
              </p>
            </div>
          )}
          <div className="projects-list">
            <h2>Submitted Projects</h2>
            {projects && projects.length > 0 ? (
              projects.map((project) => (
                <div key={project.id} className="project-card">
                  <h3>{project.name}</h3>
                  <p>Funding Goal: ${project.goal}</p>
                  <p>Description: {project.description}</p>
                  <p>Category: {project.category}</p>
                </div>
              ))
            ) : (
              <p>No projects submitted yet.</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Sign-In Modal */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        setAuthenticated={setAuthenticated}
      />
    </>
  );
}
