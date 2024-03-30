import React from 'react';
import styled from 'styled-components';
import { ArrowCircleUp } from '@mui/icons-material';

const ScrollToTopButton = styled.button`
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: none; /* Initially hidden */
    background-color: ${({ theme }) => theme.primary};
    color: white;
    border: none;
    padding: 10px;
    border-radius: 8px;
    font-size: 20px; 
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
        background-color: ${({ theme }) => theme.primary + 99};
    }

    @media (max-width: 600px) {
        bottom: 15px;
        right: 15px;
    }
`;

const ScrollToTop = () => {
    const [showButton, setShowButton] = React.useState(false);

    // Show button after scrolling a certain distance
    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    });

    // Smooth scroll to top function
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <ScrollToTopButton 
            onClick={scrollToTop} 
            style={{ display: showButton ? 'block' : 'none' }}
        >
            <ArrowCircleUp />
        </ScrollToTopButton>
    );
};

export default ScrollToTop;