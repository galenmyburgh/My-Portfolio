import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./utils/Themes";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

// Components
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import ProjectDetails from "./components/ProjectDetails";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/scrollToTop";

const AppContainer = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
  transition: all ${({ theme }) => theme.animation.duration} ${({ theme }) => theme.animation.easing};
`;

const MainContent = styled.div`
  padding-top: 180px; /* Much more breathing room */
  
  @media (max-width: 768px) {
    padding-top: 160px; /* More padding on mobile too */
  }
`;

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null });

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const theme = darkMode ? darkTheme : lightTheme;

  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AppContainer>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              background: theme.gradient,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Animated background particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                style={{
                  position: "absolute",
                  width: "4px",
                  height: "4px",
                  background: "rgba(255, 255, 255, 0.6)",
                  borderRadius: "50%",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.random() * 50 - 25, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}

            {/* Main loading container */}
            <motion.div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
                zIndex: 10,
              }}
            >
              {/* Animated logo/name */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                  fontSize: "48px",
                  fontWeight: "bold",
                  color: "white",
                  textShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
                  marginBottom: "20px",
                }}
              >
                GM
              </motion.div>

              {/* Animated loading circles */}
              <motion.div
                style={{
                  display: "flex",
                  gap: "8px",
                }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background: "rgba(255, 255, 255, 0.8)",
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>

              {/* Loading text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "16px",
                  marginTop: "20px",
                }}
              >
                Loading Portfolio...
              </motion.div>

              {/* Animated progress bar */}
              <motion.div
                style={{
                  width: "200px",
                  height: "3px",
                  background: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "2px",
                  marginTop: "20px",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)",
                  }}
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Rotating gear icon */}
              <motion.div
                style={{
                  fontSize: "24px",
                  color: "rgba(255, 255, 255, 0.6)",
                  marginTop: "30px",
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                ⚙️
              </motion.div>
            </motion.div>

            {/* Floating elements */}
            <motion.div
              style={{
                position: "absolute",
                top: "20%",
                left: "10%",
                fontSize: "24px",
                color: "rgba(255, 255, 255, 0.3)",
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              💻
            </motion.div>

            <motion.div
              style={{
                position: "absolute",
                top: "30%",
                right: "15%",
                fontSize: "20px",
                color: "rgba(255, 255, 255, 0.3)",
              }}
              animate={{
                y: [0, 15, 0],
                rotate: [0, -15, 15, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              📱
            </motion.div>

            <motion.div
              style={{
                position: "absolute",
                bottom: "25%",
                left: "20%",
                fontSize: "18px",
                color: "rgba(255, 255, 255, 0.3)",
              }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 20, -20, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              🚀
            </motion.div>
          </motion.div>
        </AppContainer>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <AnimatePresence mode="wait">
          <motion.div
            key={darkMode ? "dark" : "light"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />
            <MainContent>
              <HeroSection />
              <Skills />
              <Experience />
              <Projects openModal={openModal} setOpenModal={setOpenModal} />
              <Education />
              <Certifications />
              <Contact />
              <Footer />
            </MainContent>
            <ScrollToTop />
            <AnimatePresence>
              {openModal.state && (
                <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;