import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  HeroContainer,
  HeroBg,
  HeroContent,
  HeroH1,
  HeroP,
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight,
  HeroBtn,
  HeroSocialLinks,
  SocialLink,
  HeroStats,
  StatItem,
  StatNumber,
  StatLabel,
  FloatingParticles,
  Particle,
  TypewriterContainer,
  TypewriterText,
  HeroImageContainer,
  HeroImage,
  GradientOverlay,
  HeroName,
  HeroTitle,
} from "./HeroStyle";

const HeroSection = () => {
  const [hover, setHover] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const texts = useMemo(() => [
    "AI-First Developer",
    "Automation Engineer",
    "Mobile App Architect",
    "Payments Integration Specialist",
    "React & Flutter Expert",
    "Supabase Solutions Builder",
    "Cloud Platform Engineer",
    "Technical Innovator",
    "Product-Focused Coder",
    "Python Visioneer"
  ], []);

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    const shouldDelete = isDeleting;

    if (shouldDelete) {
      if (displayText === "") {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        return;
      }
      setDisplayText(currentText.substring(0, displayText.length - 1));
    } else {
      if (displayText === currentText) {
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      }
      setDisplayText(currentText.substring(0, displayText.length + 1));
    }

    const speed = shouldDelete ? 50 : 100;
    const timer = setTimeout(() => {}, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTextIndex, texts]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const particleVariants = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      rotate: [0, 180, 360],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const stats = [
    { number: "5+", label: "Years Experience" },
    { number: "50+", label: "Projects Completed" },
    { number: "100%", label: "Client Satisfaction" },
  ];



  return (
    <HeroContainer id="home">
      <HeroBg>
        <GradientOverlay />
        <FloatingParticles>
          {[...Array(20)].map((_, i) => (
            <Particle
              key={i}
              variants={particleVariants}
              animate="animate"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </FloatingParticles>
      </HeroBg>

      <HeroContent
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div>
          <motion.div variants={itemVariants}>
            <HeroName>
              Hi, I'm{" "}
              <span className="gradient-text">Galen Myburgh</span>
            </HeroName>
          </motion.div>

          <motion.div variants={itemVariants}>
            <HeroTitle>
              I'm a{" "}
              <TypewriterContainer>
                <TypewriterText>
                  <span className="gradient-text">{displayText}</span>
                  <span className="cursor">|</span>
                </TypewriterText>
              </TypewriterContainer>
            </HeroTitle>
          </motion.div>

          <motion.div variants={itemVariants}>
            <HeroP>
              Passionate about creating innovative digital experiences that combine
              cutting-edge technology with beautiful design. Let's build something
              amazing together.
            </HeroP>
          </motion.div>

          <motion.div variants={itemVariants}>
            <HeroStats>
              {stats.map((stat, index) => (
                <StatItem key={index}>
                  <StatNumber>{stat.number}</StatNumber>
                  <StatLabel>{stat.label}</StatLabel>
                </StatItem>
              ))}
            </HeroStats>
          </motion.div>

          <motion.div variants={itemVariants}>
            <HeroBtnWrapper>
              <HeroBtn
                to="contact"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                Get In Touch {hover ? <ArrowForward /> : <ArrowRight />}
              </HeroBtn>
            </HeroBtnWrapper>
          </motion.div>
        </div>

        <motion.div variants={itemVariants}>
          <HeroImageContainer>
            <HeroImage
              src="/gmNew.jpg"
              alt="Galen Myburgh"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </HeroImageContainer>
        </motion.div>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;