import profilePicture from './profilePicture.png';
import sideButton from'./sideButton.png';
import './App.css';
import {motion, useScroll, useTransform, AnimatePresence} from 'framer-motion';
import { useRef, useState } from 'react';
import { ReactLenis } from "lenis/react";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // Note: Removed TypeScript syntax <'success' | 'error' | null> for pure JS

  // 1. Form Data State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // 2. Input Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // 3. Submit Handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  // --- ABOUT SECTION SCROLL ANIMATIONS ---
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const aboutOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const aboutScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  // --- PROJECTS SECTION SCROLL ANIMATIONS ---
  const projectsRef = useRef(null);
  const { scrollYProgress: projectsScrollProgress } = useScroll({
    target: projectsRef,
    offset: ["start start", "end end"] 
  });
  const projectsX = useTransform(projectsScrollProgress, [0.1, 1], ["0vw", "-120vw"]);

  return (
    <main ref={ref} className="relative min-h-screen">
      <ReactLenis root>

        <nav id="navbar">
          <h1 id="nav-logo">
              &lt;/dev&gt;
          </h1>
          <motion.div 
            id="nav-toggle"
            className="navContent"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", duration: 0.8 }}
            onClick={toggleDropdown}
          >
            <img src={sideButton} alt="button" className="sideButton"/>
          </motion.div>
        </nav>
        
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              id="nav-dropdown"
              className="dropdownList"
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
            >
              <li id="dropdown-about" className="dropdownItem"><a href="#" onClick={toggleDropdown}>About</a></li>
              <li id="dropdown-projects" className="dropdownItem"><a href="#projects-section" onClick={toggleDropdown}>Projects</a></li>
              <li id="dropdown-skills" className="dropdownItem"><a href="#credentials-section" onClick={toggleDropdown}>Credentials</a></li>
              <li id="dropdown-contact" className="dropdownItem"><a href="#contact-section" onClick={toggleDropdown}>Contact</a></li>
            </motion.ul>
          )}
        </AnimatePresence>

        <div id="about-section" className="about-sticky-wrapper">
          <motion.div 
            id="about-card"
            className="about-animated-core"
            style={{ opacity: aboutOpacity, scale: aboutScale }}
          >
            <div className="aboutLeft">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', duration: 0.8 }}
              >
                <h3>Hi, I'm </h3>
                <h2>Bernardinus</h2>
                <h2>Gabriel</h2>
                <h2>Hermawan</h2>
              </motion.div>
              <motion.div 
                className="intro"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', duration: 0.8 }}
              >
                <p>FULL-STACK DEVELOPER & ML/AI ENTHUSIAST.</p>
                <p>I CRAFT FAST, ACCESSIBLE PRODUCTS</p>
                <p>THAT PEOPLE ACTUALLY ENJOY USING.</p>
              </motion.div>
            </div>
            <motion.div 
              className="aboutRight"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', duration: 0.8 }}
            >
              <img src={profilePicture} alt="Profile" />
            </motion.div>
          </motion.div>
        </div>

        <div className="transition"></div>
        
        {/* FIXED: Passed projectsRef to the project container below so the useScroll target is registered! */}
        <div id="projects-section" ref={projectsRef} className="project">
          <div className="project-title"><h1>PROJECTS</h1></div>
          <div className="projects-sticky">
            <motion.div 
              id="projects-track-list"
              className="projects-track"
              style={{ 
                x: projectsX 
              }}
            >
              <motion.div 
                id="card-1" 
                className="project-card"
                initial={{scale:0.5}}
                whileInView={{scale:1}}
                whileHover={{y:-15}}
                transition={{type:"spring", duration:0.8}}
              >
                <h2>Metaheuristic AI Sideflip Game</h2>
                <p>A Java-based 2D physics game where an AI agent learns to execute a perfect sideflip using evolutionary algorithms, adapting its movements over successive generations.</p>
                <div className="skills">
                  <div className="skill-container">
                    <p>Java</p>
                  </div>
                  <div className="skill-container">
                    <p>Metaheuristics</p>
                  </div>
                  <div className="skill-container">
                    <p>OOP</p>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                id="card-1" 
                className="project-card"
                initial={{scale:0.5}}
                whileInView={{scale:1}}
                whileHover={{y:-15}}
                transition={{type:"spring", duration:0.8}}
              >
                <h2>AI-Powered Academic Document Assistant</h2>
                <p>An intelligent full-stack platform that processes uploaded PDFs to automatically generate study summaries and answer contextual questions using Natural Language Processing (NLP).</p>
                <div className="skills">
                  <div className="skill-container">
                    <p>FastAPI</p>
                  </div>
                  <div className="skill-container">
                    <p>NLP</p>
                  </div>
                  <div className="skill-container">
                    <p>Rag</p>
                  </div>
                  <div className="skill-container">
                    <p>Parsings</p>
                  </div>
                </div>
              </motion.div>
                          <motion.div 
                id="card-1" 
                className="project-card"
                initial={{scale:0.5}}
                whileInView={{scale:1}}
                whileHover={{y:-15}}
                transition={{type:"spring", duration:0.8}}
              >
                <h2>High-Frequency Volatility Forecasting Engine</h2>
                <p>A machine learning pipeline that predicts short-term financial volatility using Optiver's real-world Kaggle order book data to train gradient-boosting models.</p>
                <div className="skills">
                  <div className="skill-container">
                    <p>LightGBM</p>
                  </div>
                  <div className="skill-container">
                    <p>Pandas</p>
                  </div>
                  <div className="skill-container">
                    <p>Optimization</p>
                  </div>
                  <div className="skill-container">
                    <p>Forecasting</p>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                id="card-1" 
                className="project-card"
                initial={{scale:0.5}}
                whileInView={{scale:1}}
                whileHover={{y:-15}}
                transition={{type:"spring", duration:0.8}}
              >
                <h2>Autonomous Code Review Pipeline</h2>
                <p>A production-grade AI workflow integrated into a repository that automatically scans pull requests, identifies vulnerabilities, and uses agents to draft and verify patches.</p>
                <div className="skills">
                  <div className="skill-container">
                    <p>Orchestration</p>
                  </div>
                  <div className="skill-container">
                    <p>Agents</p>
                  </div>
                  <div className="skill-container">
                    <p>LLMs</p>
                  </div>
                  <div className="skill-container">
                    <p>Automation</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="credentials-section" id="credentials-section">
          <div className="credentials-sticky">
            <div className="credentials-wrapper">
              <h1>Credentials</h1>

              {/* Card 1*/}
              <motion.div 
                id="cred-card-2"
                className="credential-card education"
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="card-topbar">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                  <span className="card-tag">CERT_01.SYS</span>
                </div>
                <div className="card-body">
                  <div className="icon-wrap">🧠</div>
                  <h3>AI Professional Certificate</h3>
                  <p className="institution">Google</p>
                  <p className="year">2026</p>
                  <div className="divider"></div>
                  <p className="desc">The Google AI Professional Certificate is a hands-on program that teaches non-technical professionals how to practically apply tools like Gemini to streamline everyday workplace tasks and earn an employer-recognized credential in AI fluency.</p>
                </div>
              </motion.div> 

              {/* Card 2*/}
                <motion.div 
                  id="cred-card-2"
                  className="credential-card cert"
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="card-topbar">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                    <span className="card-tag">CERT_02.SYS</span>
                  </div>
                  <div className="card-body">
                    <div className="icon-wrap">🤖</div>
                    <h3>Introduction to ML</h3>
                    <p className="institution">Duke University</p>
                    <p className="year">2026</p>
                    <div className="divider"></div>
                    <p className="desc">The Introduction to Machine Learning course from Duke University on Coursera provides a foundational understanding of various machine learning models and features hands-on practice using PyTorch to solve complex, real-world problems.</p>
                  </div>
                </motion.div>

                {/* Card 3*/}
                <motion.div 
                  id="cred-card-3"
                  className="credential-card cert-tf"
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="card-topbar">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                    <span className="card-tag">CERT_03.SYS</span>
                  </div>
                  <div className="card-body">
                    <div className="icon-wrap">🔥</div>
                    <h3>DevOps, DataOps, MLOps</h3>
                    <p className="institution">Duke University</p>
                    <p className="year">2026</p>
                    <div className="divider"></div>
                    <p className="desc">The DevOps, DataOps, MLOps course from Duke University on Coursera teaches learners how to automate the lifecycle of software, data, and machine learning models by building end-to-end production pipelines using tools like Python, Rust, and Docker.</p>
                  </div>
                </motion.div>

                {/* Card 4: Achievements / Hackathons */}
                <motion.div 
                  id="cred-card-4"
                  className="credential-card achievement"
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                </motion.div>

            </div> 
          </div>
        </div>

        <div className="contact-section" id="contact-section">
          <div className="contact-sticky">
              <div className="contact-wrapper">
              
                <motion.div 
                  className="contact-terminal"
                  initial={{ opacity: 0, y: 120 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", stiffness: 80, damping: 15 }}
                >
                  <div className="terminal-header">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                    <span className="terminal-title">CONTACT_ME.SYS</span>
                  </div>
                  <div className="terminal-body">
                    <div className="terminal-welcome">
                      <p className="terminal-prompt">$ run contact_form.sh</p>
                      <p className="terminal-response">ESTABLISHING SECURE CONNECTION...</p>
                      <p className="terminal-response" style={{ color: '#0D4715' }}>READY TO TRANSMIT. ENTER CREDENTIALS:</p>
                    </div>
                    
                    <form onSubmit={handleFormSubmit} className="contact-form">
                      <div className="form-group">
                        <label htmlFor="name" className="form-label">SENDER_NAME &gt;</label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          placeholder="e.g. USER_01" 
                          value={formData.name}
                          onChange={handleInputChange}
                          required 
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email" className="form-label">SENDER_EMAIL &gt;</label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          placeholder="e.g. user@domain.com" 
                          value={formData.email}
                          onChange={handleInputChange}
                          required 
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="message" className="form-label">MESSAGE_PAYLOAD &gt;</label>
                        <textarea 
                          id="message" 
                          name="message" 
                          placeholder="Enter transmission payload here..." 
                          value={formData.message}
                          onChange={handleInputChange}
                          required 
                          rows={4}
                          className="form-textarea"
                        />
                      </div>

                      <div className="form-actions">
                        <motion.button 
                          type="submit" 
                          className="transmit-btn"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "TRANSMITTING..." : "TRANSMIT [ENTER]"}
                        </motion.button>
                      </div>
                    </form>

                    {submitStatus && (
                      <motion.div 
                        className={`submit-message ${submitStatus === 'success' ? 'success' : 'error'}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        {submitStatus === 'success' 
                          ? ">>> TRANSMISSION SECURED & RECEIVED. ACK." 
                          : ">>> TRANSMISSION ERROR. TRY AGAIN."}
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                <div className="contact-sidebar">
                  <div className="sidebar-card">
                    <div className="sidebar-header">DIRECT_CHANNELS</div>
                    <div className="sidebar-links">
                      <a href="mailto:bernardinushermawan@gmail.com" className="sidebar-link">
                        <span className="link-icon">📧</span> EMAIL
                      </a>
                      <a href="https://github.com/bernardinushermawan" target="_blank" rel="noopener noreferrer" className="sidebar-link">
                        <span className="link-icon">🐙</span> GITHUB
                      </a>
                      <a href="https://www.linkedin.com/in/bernardinus-gabriel-hermawan-3a69a53a3" target="_blank" rel="noopener noreferrer" className="sidebar-link">
                        <span className="link-icon">🔗</span> LINKEDIN
                      </a>
                    </div>
                  </div>

                  <div className="sidebar-card ping-card">
                    <div className="sidebar-header">SYS_STATUS</div>
                    <p className="status-text">HOST: ACTIVE</p>
                    <p className="status-text" style={{ color: '#690B22' }}>LOC: SINGAPORE</p>
                    <p className="status-text">TIME: 2026 UTC</p>
                  </div>
              </div>
            </div>
          </div>
        </div>

      </ReactLenis>
    </main>
  );
}

export default App;
