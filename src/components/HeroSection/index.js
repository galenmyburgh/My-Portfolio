import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  HeroContainer,
  HeroBg,
  HeroContent,
  HeroP,
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight,
  HeroBtn,
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

  // Three specialisms, not ten titles. A visitor who reads ten reads none of them.
  const texts = useMemo(() => [
    "Flutter & React",
    "Payments integration",
    "AI-assisted automation",
  ], []);

  // Every state update has to be scheduled inside the timeout. Previously the
  // timeout body was empty and setDisplayText ran in the effect body, so the
  // text typed itself at render speed rather than the intended 100ms per char.
  useEffect(() => {
    const currentText = texts[currentTextIndex];

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      return undefined;
    }

    const finishedTyping = !isDeleting && displayText === currentText;
    const delay = finishedTyping ? 2000 : isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (finishedTyping) {
        setIsDeleting(true);
      } else {
        setDisplayText(
          currentText.substring(0, displayText.length + (isDeleting ? -1 : 1))
        );
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTextIndex, texts]);

  // Positions were recomputed with Math.random() on every render, which made the
  // particles jump on each state change. Generate them once.
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      })),
    []
  );

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
          {particles.map((particle, i) => (
            <Particle
              key={i}
              variants={particleVariants}
              animate="animate"
              style={particle}
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
                href="#contact"
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
              width={667}
              height={1000}
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