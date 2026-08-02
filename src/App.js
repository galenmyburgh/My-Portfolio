import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./utils/Themes";
import { AnimatePresence } from "framer-motion";
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

const MainContent = styled.main`
  padding-top: 180px; /* Much more breathing room */

  @media (max-width: 768px) {
    padding-top: 160px; /* More padding on mobile too */
  }
`;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Read the stored choice before first paint so the page never flashes the wrong theme.
const getInitialTheme = () => {
  const stored = window.localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") return stored === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const App = () => {
  const [darkMode, setDarkMode] = useState(getInitialTheme);
  const [openModal, setOpenModal] = useState({ state: false, project: null });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      disable: prefersReducedMotion,
    });
  }, []);

  useEffect(() => {
    window.localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((previous) => !previous);
  };

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />
        <MainContent id="main">
          <HeroSection />
          <Skills />
          <Experience />
          <Projects openModal={openModal} setOpenModal={setOpenModal} />
          <Education />
          <Certifications />
          <Contact />
        </MainContent>
        <Footer />
        <ScrollToTop />
        <AnimatePresence>
          {openModal.state && (
            <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
          )}
        </AnimatePresence>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;