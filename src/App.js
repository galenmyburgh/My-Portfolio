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
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              background: theme.gradient,
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                border: "2px solid rgba(255, 255, 255, 0.3)",
              }}
            />
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