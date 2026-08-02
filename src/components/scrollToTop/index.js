import React, { useEffect, useState } from 'react';
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
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const onScroll = () => setShowButton(window.scrollY > 300);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    };

    return (
        <ScrollToTopButton
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            style={{ display: showButton ? 'block' : 'none' }}
        >
            <ArrowCircleUp aria-hidden="true" />
        </ScrollToTopButton>
    );
};

export default ScrollToTop;