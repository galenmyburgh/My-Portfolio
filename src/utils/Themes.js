import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#fff",
  text: "#1a1a1a",
  primary: "#2563eb", // Bright blue
  secondary: "#1e40af", // Darker blue
  accent: "#3b82f6", // Medium blue
  gradient: "linear-gradient(135deg, #2563eb 0%, #1e40af 50%, #1e3a8a 100%)",
  gradientSecondary: "linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)",
  gradientAccent: "linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)",
  glass: "rgba(255, 255, 255, 0.1)",
  glassBorder: "rgba(255, 255, 255, 0.2)",
  glassHover: "rgba(255, 255, 255, 0.15)",
  shadow: "0 8px 32px rgba(37, 99, 235, 0.1)",
  shadowHover: "0 12px 40px rgba(37, 99, 235, 0.2)",
  shadowGlow: "0 0 20px rgba(37, 99, 235, 0.3)",
  textPrimary: "#1e293b",
  textSecondary: "#475569",
  textMuted: "#64748b",
  background: "#ffffff",
  backgroundSecondary: "#f8fafc",
  backgroundTertiary: "#f1f5f9",
  border: "#e2e8f0",
  borderHover: "#cbd5e1",
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",
  cardBackground: "rgba(255, 255, 255, 0.8)",
  cardBorder: "rgba(37, 99, 235, 0.1)",
  navbarBackground: "rgba(255, 255, 255, 0.8)",
  navbarBorder: "rgba(37, 99, 235, 0.1)",
  buttonPrimary: "#2563eb",
  buttonPrimaryHover: "#1d4ed8",
  buttonSecondary: "rgba(37, 99, 235, 0.1)",
  buttonSecondaryHover: "rgba(37, 99, 235, 0.2)",
  buttonText: "#ffffff",
  buttonTextSecondary: "#2563eb",
  inputBackground: "#ffffff",
  inputBorder: "#e2e8f0",
  inputBorderFocus: "#2563eb",
  inputText: "#1e293b",
  placeholder: "#94a3b8",
  link: "#2563eb",
  linkHover: "#1d4ed8",
  codeBackground: "#f1f5f9",
  codeText: "#1e293b",
  highlight: "rgba(37, 99, 235, 0.1)",
  overlay: "rgba(0, 0, 0, 0.5)",
  tooltipBackground: "#1e293b",
  tooltipText: "#ffffff",
  scrollbar: "#cbd5e1",
  scrollbarHover: "#94a3b8",
  selection: "rgba(37, 99, 235, 0.2)",
  focusRing: "rgba(37, 99, 235, 0.5)",
  animation: {
    duration: "0.3s",
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    spring: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  },
  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    desktop: "1024px",
    wide: "1200px",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
  },
  borderRadius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    full: "9999px",
  },
  typography: {
    fontFamily: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      secondary: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', 'Monaco', 'Cascadia Code', monospace",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
    },
    fontWeight: {
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
    },
    lineHeight: {
      tight: "1.25",
      normal: "1.5",
      relaxed: "1.75",
    },
  },
};

export const darkTheme = {
  body: "#0f172a",
  text: "#f8fafc",
  primary: "#3b82f6", // Bright blue for dark mode
  secondary: "#60a5fa", // Lighter blue
  accent: "#93c5fd", // Light blue
  gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)",
  gradientSecondary: "linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)",
  gradientAccent: "linear-gradient(135deg, #93c5fd 0%, #60a5fa 50%, #3b82f6 100%)",
  glass: "rgba(15, 23, 42, 0.8)",
  glassBorder: "rgba(59, 130, 246, 0.2)",
  glassHover: "rgba(15, 23, 42, 0.9)",
  shadow: "0 8px 32px rgba(59, 130, 246, 0.2)",
  shadowHover: "0 12px 40px rgba(59, 130, 246, 0.3)",
  shadowGlow: "0 0 20px rgba(59, 130, 246, 0.4)",
  textPrimary: "#f8fafc",
  textSecondary: "#cbd5e1",
  textMuted: "#94a3b8",
  background: "#0f172a",
  backgroundSecondary: "#1e293b",
  backgroundTertiary: "#334155",
  border: "#334155",
  borderHover: "#475569",
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",
  cardBackground: "rgba(30, 41, 59, 0.8)",
  cardBorder: "rgba(59, 130, 246, 0.2)",
  navbarBackground: "rgba(15, 23, 42, 0.8)",
  navbarBorder: "rgba(59, 130, 246, 0.2)",
  buttonPrimary: "#3b82f6",
  buttonPrimaryHover: "#2563eb",
  buttonSecondary: "rgba(59, 130, 246, 0.2)",
  buttonSecondaryHover: "rgba(59, 130, 246, 0.3)",
  buttonText: "#ffffff",
  buttonTextSecondary: "#3b82f6",
  inputBackground: "#1e293b",
  inputBorder: "#334155",
  inputBorderFocus: "#3b82f6",
  inputText: "#f8fafc",
  placeholder: "#64748b",
  link: "#60a5fa",
  linkHover: "#93c5fd",
  codeBackground: "#1e293b",
  codeText: "#f8fafc",
  highlight: "rgba(59, 130, 246, 0.2)",
  overlay: "rgba(0, 0, 0, 0.7)",
  tooltipBackground: "#1e293b",
  tooltipText: "#f8fafc",
  scrollbar: "#334155",
  scrollbarHover: "#475569",
  selection: "rgba(59, 130, 246, 0.3)",
  focusRing: "rgba(59, 130, 246, 0.5)",
  animation: {
    duration: "0.3s",
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    spring: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  },
  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    desktop: "1024px",
    wide: "1200px",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
  },
  borderRadius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    full: "9999px",
  },
  typography: {
    fontFamily: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      secondary: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', 'Monaco', 'Cascadia Code', monospace",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
    },
    fontWeight: {
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
    },
    lineHeight: {
      tight: "1.25",
      normal: "1.5",
      relaxed: "1.75",
    },
  },
};

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    transition: all ${({ theme }) => theme.animation.duration} ${({ theme }) => theme.animation.easing};
    overflow-x: hidden;
  }

  ::selection {
    background: ${({ theme }) => theme.selection};
    color: ${({ theme }) => theme.text};
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.backgroundSecondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.scrollbar};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.scrollbarHover};
  }

  a {
    color: ${({ theme }) => theme.link};
    text-decoration: none;
    transition: color ${({ theme }) => theme.animation.duration} ${({ theme }) => theme.animation.easing};
  }

  a:hover {
    color: ${({ theme }) => theme.linkHover};
  }

  button {
    font-family: inherit;
    border: none;
    background: none;
    cursor: pointer;
    transition: all ${({ theme }) => theme.animation.duration} ${({ theme }) => theme.animation.easing};
  }

  input, textarea {
    font-family: inherit;
    border: none;
    outline: none;
    transition: all ${({ theme }) => theme.animation.duration} ${({ theme }) => theme.animation.easing};
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .focus-visible {
    outline: 2px solid ${({ theme }) => theme.focusRing};
    outline-offset: 2px;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Animation classes */
  .fade-in {
    animation: fadeIn 0.6s ease-out;
  }

  .slide-up {
    animation: slideUp 0.6s ease-out;
  }

  .scale-in {
    animation: scaleIn 0.4s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  /* Glass morphism utility classes */
  .glass {
    background: ${({ theme }) => theme.glass};
    backdrop-filter: blur(10px);
    border: 1px solid ${({ theme }) => theme.glassBorder};
  }

  .glass-hover:hover {
    background: ${({ theme }) => theme.glassHover};
    border-color: ${({ theme }) => theme.glassBorder};
  }

  /* Gradient text utility */
  .gradient-text {
    background: ${({ theme }) => theme.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Responsive utilities */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    .mobile-hidden {
      display: none !important;
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    .desktop-hidden {
      display: none !important;
    }
  }
`;