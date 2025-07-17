
import styled from "styled-components";
import { motion } from "framer-motion";

export const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 0 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 1rem;
  }
`;

export const HeroBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.gradient};
  z-index: -2;
`;

export const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 80%, rgba(37, 99, 235, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(96, 165, 250, 0.05) 0%, transparent 50%);
  z-index: -1;
`;

export const FloatingParticles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
`;

export const Particle = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
`;

export const HeroContent = styled(motion.div)`
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
  z-index: 1;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

export const HeroName = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize["5xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.textPrimary};
  line-height: 1.1;
  margin-bottom: 0.5rem;
  
  .gradient-text {
    background: ${({ theme }) => theme.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.fontSize["4xl"]};
  }
`;

export const HeroTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
    flex-direction: column;
    gap: 0.25rem;
  }
`;

export const TypewriterContainer = styled.div`
  display: inline-block;
`;

export const TypewriterText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.textSecondary};
  
  .gradient-text {
    background: ${({ theme }) => theme.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
  
  .cursor {
    color: ${({ theme }) => theme.primary};
    animation: blink 1s infinite;
  }
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  }
`;

export const HeroP = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 500px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 100%;
  }
`;

export const HeroStats = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    justify-content: center;
    gap: 1.5rem;
  }
`;

export const StatItem = styled.div`
  text-align: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    text-align: center;
  }
`;

export const StatNumber = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.primary};
  line-height: 1;
`;

export const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.textMuted};
  margin-top: 0.25rem;
`;

export const HeroBtnWrapper = styled.div`
  margin-bottom: 2rem;
`;

export const HeroBtn = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.gradient};
  color: white;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  box-shadow: ${({ theme }) => theme.shadow};
  transition: all ${({ theme }) => theme.animation.duration} ${({ theme }) => theme.animation.easing};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadowHover};
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const ArrowForward = styled.span`
  margin-left: 8px;
  font-size: 18px;
`;

export const ArrowRight = styled.span`
  margin-left: 8px;
  font-size: 18px;
`;

export const HeroSocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: center;
  }
`;

export const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: ${({ theme }) => theme.glass};
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.glassBorder};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.textPrimary};
  font-size: 1.5rem;
  text-decoration: none;
  transition: all ${({ theme }) => theme.animation.duration} ${({ theme }) => theme.animation.easing};
  
  &:hover {
    background: ${({ theme }) => theme.glassHover};
    border-color: ${({ theme }) => theme.primary};
    box-shadow: ${({ theme }) => theme.shadowGlow};
  }
`;

export const HeroImageContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  margin-top: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: center;
    order: -1;
  }
`;

export const HeroImage = styled(motion.img)`
  max-width: 300px;
  width: 100%;
  height: auto;
  filter: drop-shadow(0 20px 40px rgba(37, 99, 235, 0.2));
  border-radius: 20px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 250px;
  }
`;

// Keep the old HeroH1 for backward compatibility
export const HeroH1 = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize["5xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.textPrimary};
  line-height: 1.1;
  margin-bottom: 1rem;
  
  .gradient-text {
    background: ${({ theme }) => theme.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.fontSize["4xl"]};
  }
`;
