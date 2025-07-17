import styled from "styled-components";

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${({ theme }) => theme.body === '#0f172a' 
    ? 'rgba(15, 23, 42, 0.98)' 
    : 'rgba(255, 255, 255, 0.98)'};
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${({ theme }) => theme.body === '#0f172a' 
    ? 'rgba(59, 130, 246, 0.2)' 
    : 'rgba(52, 144, 220, 0.15)'};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: ${({ scrolled }) => (scrolled ? "0.75rem 0" : "1.25rem 0")};
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(59, 130, 246, 0.6) 20%, 
      rgba(59, 130, 246, 1) 50%, 
      rgba(59, 130, 246, 0.6) 80%, 
      transparent 100%);
    opacity: ${({ scrolled }) => (scrolled ? 1 : 0.8)};
    transition: opacity 0.4s ease;
    animation: shimmer 3s ease-in-out infinite;
    z-index: -1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(96, 165, 250, 0.06) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.07) 0%, transparent 50%);
    opacity: 0.8;
    animation: circuitMove 6s ease-in-out infinite;
    z-index: -3;
  }
  

  

  
  @keyframes shimmer {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
  }
  
  @keyframes circuitMove {
    0%, 100% { 
      transform: translateX(-10px) translateY(-5px);
      opacity: 0.4;
    }
    25% { 
      transform: translateX(5px) translateY(-10px);
      opacity: 0.6;
    }
    50% { 
      transform: translateX(10px) translateY(5px);
      opacity: 0.8;
    }
    75% { 
      transform: translateX(-5px) translateY(10px);
      opacity: 0.6;
    }
  }
  
  @keyframes dotMove {
    0% { 
      transform: translateY(-50%) translateX(-100px);
      opacity: 0;
    }
    20% { 
      opacity: 1;
    }
    80% { 
      opacity: 1;
    }
    100% { 
      transform: translateY(-50%) translateX(100px);
      opacity: 0;
    }
  }
`;

export const AnimatedBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  z-index: -100;
  pointer-events: none;
  
  &::before {
    content: '● ● ● ● ●';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    color: rgba(59, 130, 246, 0.3);
    font-size: 8px;
    letter-spacing: 20px;
    text-align: center;
    transform: translateY(-50%);
    animation: dotMove 4s linear infinite;
  }
`;

export const NavContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 1.5rem;
  }
`;

export const NavLogo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textPrimary};
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
  animation: logoGlow 4s ease-in-out infinite;
  
  &:hover {
    transform: scale(1.05);
    animation: none;
  }
  
  @keyframes logoGlow {
    0%, 100% { 
      filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.3));
    }
    50% { 
      filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.6));
    }
  }
  
  span {
    background: linear-gradient(135deg, #3490dc, #6366f1, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    padding: 0.75rem 1.5rem;
    border-radius: 12px;
    border: 1px solid rgba(52, 144, 220, 0.3);
    backdrop-filter: blur(10px);
    background-color: rgba(52, 144, 220, 0.1);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, 
        transparent, 
        rgba(255, 255, 255, 0.2), 
        transparent);
      transition: left 0.6s ease;
    }
    
    &:hover::before {
      left: 100%;
    }
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const NavItem = styled.li`
  position: relative;
`;

export const NavLink = styled.a`
  color: ${({ theme }) => theme.textPrimary};
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  background: transparent;
  border: none;
  z-index: 1;
  animation: float 6s ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.body === '#0f172a' 
      ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(96, 165, 250, 0.05))' 
      : 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(96, 165, 250, 0.04))'};
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  &:hover {
    color: #3b82f6;
    transform: translateY(-3px);
    animation: none;
    
    &::before {
      opacity: 1;
    }
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  @keyframes float {
    0%, 100% { 
      transform: translateY(0px);
      box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
    }
    50% { 
      transform: translateY(-4px);
      box-shadow: 0 6px 16px rgba(59, 130, 246, 0.25);
    }
  }
`;

export const NavBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const NavBtnLink = styled.a`
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.gradient};
  color: white;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  transition: all ${({ theme }) => theme.animation.duration} ${({ theme }) => theme.animation.easing};
  box-shadow: ${({ theme }) => theme.shadow};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadowHover};
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const MobileIcon = styled.button`
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.glass};
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.glassBorder};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.textPrimary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animation.duration} ${({ theme }) => theme.animation.easing};
  
  &:hover {
    background: ${({ theme }) => theme.glassHover};
    border-color: ${({ theme }) => theme.primary};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;

export const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 1rem;
  right: 1rem;
  background: rgba(15, 23, 45, 0.95);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(52, 144, 220, 0.3);
  border-radius: 20px;
  padding: 1.5rem;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  animation: slideDown 0.3s ease-out;
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  

  
  @media (min-width: 769px) {
    display: none;
  }
`;

export const MobileMenuItem = styled.li`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const MobileMenuLink = styled.a`
  display: block;
  color: ${({ theme }) => theme.textPrimary};
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 0.5rem;
  background: transparent;
  border: none;
  position: relative;
  overflow: hidden;
  animation: mobileFloat 5s ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.body === '#0f172a' 
      ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(96, 165, 250, 0.06))' 
      : 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(96, 165, 250, 0.05))'};
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  &:hover {
    color: #3b82f6;
    transform: translateX(10px);
    animation: none;
    
    &::before {
      opacity: 1;
    }
  }
  
  &:active {
    transform: translateX(5px);
  }
  
  @keyframes mobileFloat {
    0%, 100% { 
      transform: translateX(0px);
      box-shadow: 0 2px 6px rgba(59, 130, 246, 0.08);
    }
    50% { 
      transform: translateX(2px);
      box-shadow: 0 3px 10px rgba(59, 130, 246, 0.12);
    }
  }
`;

export const ThemeToggle = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const ThemeToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background: ${({ theme }) => theme.glass};
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.glassBorder};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.textPrimary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animation.duration} ${({ theme }) => theme.animation.easing};
  animation: themePulse 3s ease-in-out infinite;
  
  &:hover {
    background: ${({ theme }) => theme.glassHover};
    border-color: ${({ theme }) => theme.primary};
    box-shadow: ${({ theme }) => theme.shadowGlow};
    animation: none;
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @keyframes themePulse {
    0%, 100% { 
      transform: scale(1);
      box-shadow: 0 0 0 rgba(59, 130, 246, 0.4);
    }
    50% { 
      transform: scale(1.05);
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
    }
  }
`;

export const ThemeIcon = styled.span`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;