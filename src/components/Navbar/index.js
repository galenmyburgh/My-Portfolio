import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Nav,
  NavContainer,
  AnimatedBackground,
  NavLogo,
  NavMenu,
  NavItem,
  NavLink,
  MobileIcon,
  MobileMenu,
  MobileMenuItem,
  MobileMenuLink,
  ThemeToggle,
  ThemeToggleButton,
  ThemeIcon,
} from "./NavbarStyledComponent";

const Navbar = ({ toggleTheme, darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: -30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <AnimatedBackground />
      <Nav scrolled={scrolled}>
        <NavContainer
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
        <NavLogo
          as={motion.div}
          variants={logoVariants}
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            GM
          </motion.span>
        </NavLogo>

        <NavMenu>
          {navItems.map((item, index) => (
            <NavItem key={index} as={motion.li} variants={itemVariants}>
              <NavLink
                href={item.href}
                onClick={closeMenu}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </NavLink>
            </NavItem>
          ))}
        </NavMenu>

        <ThemeToggle as={motion.div} variants={itemVariants}>
          <ThemeToggleButton
            onClick={toggleTheme}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
          >
            <ThemeIcon>
              {darkMode ? "☀️" : "🌙"}
            </ThemeIcon>
          </ThemeToggleButton>
        </ThemeToggle>

        <MobileIcon onClick={toggleMenu} as={motion.button} variants={itemVariants}>
          <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={{
              open: { rotate: 45, y: 6 },
              closed: { rotate: 0, y: 0 },
            }}
            style={{
              width: "20px",
              height: "2px",
              background: "currentColor",
              margin: "4px 0",
            }}
          />
          <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={{
              open: { opacity: 0 },
              closed: { opacity: 1 },
            }}
            style={{
              width: "20px",
              height: "2px",
              background: "currentColor",
              margin: "4px 0",
            }}
          />
          <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={{
              open: { rotate: -45, y: -6 },
              closed: { rotate: 0, y: 0 },
            }}
            style={{
              width: "20px",
              height: "2px",
              background: "currentColor",
              margin: "4px 0",
            }}
          />
        </MobileIcon>

        <MobileMenu
          as={motion.div}
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={{
            open: {
              opacity: 1,
              height: "auto",
              transition: {
                duration: 0.3,
                staggerChildren: 0.1,
              },
            },
            closed: {
              opacity: 0,
              height: 0,
              transition: {
                duration: 0.3,
              },
            },
          }}
        >
          {navItems.map((item, index) => (
            <MobileMenuItem key={index} as={motion.li}>
              <MobileMenuLink
                href={item.href}
                onClick={closeMenu}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </MobileMenuLink>
            </MobileMenuItem>
          ))}
        </MobileMenu>
        </NavContainer>
      </Nav>
    </>
  );
};

export default Navbar;