import styled from 'styled-components';
import _default from '../../themes/default';

export const Container = styled.div`
    background: linear-gradient(343.07deg, rgba(132, 59, 206, 0.06) 5.71%, rgba(132, 59, 206, 0) 64.83%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    clip-path: polygon(0 0, 100% 0, 100% 100%,100% 98%, 0 100%);
`;

export const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1350px;
    padding: 10px 0px 100px 0;
    gap: 12px;
    @media (max-width: 960px) {
        flex-direction: column;
    }
`;

export const Title = styled.div`
font-size: 42px;
text-align: center;
font-weight: 600;
margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
      margin-top: 12px;
      font-size: 32px;
  }
`;

export const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 16px;
    }
`;

export const ToggleButtonGroup = styled.div`
    display: flex;
    background: ${({ theme }) => theme.card};
    border: 2px solid ${({ theme }) => theme.primary + 20};
    color: ${({ theme }) => theme.text_primary};
    font-size: 16px;
    border-radius: 20px;
    font-weight: 600;
    margin: 32px 0px;
    padding: 4px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, ${({ theme }) => theme.primary + 10} 0%, ${({ theme }) => theme.primary + 5} 100%);
        border-radius: 18px;
        z-index: -1;
    }
    
    @media (max-width: 768px) {
        font-size: 14px;
        margin: 24px 0px;
        border-radius: 16px;
        flex-wrap: wrap;
        justify-content: center;
        gap: 4px;
    }
    
    @media (max-width: 480px) {
        font-size: 12px;
        margin: 20px 0px;
        border-radius: 14px;
    }
`

export const ToggleButton = styled.div`
    padding: 12px 24px;
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    font-size: 0.9em;
    
    ${({ active, theme }) =>
        active && `
        background: linear-gradient(135deg, ${theme.primary} 0%, ${theme.primary + 20} 100%);
        color: white;
        box-shadow: 0 4px 20px ${theme.primary + 40};
        transform: translateY(-2px);
        `
    }
    
    &:hover {
        background: ${({ active, theme }) => 
            active 
                ? `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primary + 20} 100%)`
                : `${theme.primary + 15}`
        };
        color: ${({ active, theme }) => active ? 'white' : theme.primary};
        transform: translateY(-1px);
        box-shadow: 0 6px 25px ${({ theme }) => theme.primary + 30};
    }
    
    &:active {
        transform: translateY(0px);
        transition: all 0.1s ease;
    }
    
    @media (max-width: 768px) {
        padding: 10px 16px;
        border-radius: 12px;
        font-size: 0.8em;
        letter-spacing: 0.3px;
    }
    
    @media (max-width: 480px) {
        padding: 8px 12px;
        border-radius: 10px;
        font-size: 0.75em;
        letter-spacing: 0.2px;
    }
`

export const Divider = styled.div`
    width: 2px;
    background: linear-gradient(180deg, transparent 0%, ${({ theme }) => theme.primary + 30} 50%, transparent 100%);
    margin: 8px 0;
    border-radius: 1px;
    
    @media (max-width: 768px) {
        width: 1px;
        margin: 4px 0;
    }
`


export const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 28px;
    flex-wrap: wrap;
    // display: grid;
    // grid-template-columns: repeat(3, 1fr);
    // grid-gap: 32px;
    // grid-auto-rows: minmax(100px, auto);
    // @media (max-width: 960px) {
    //     grid-template-columns: repeat(2, 1fr);
    // }
    // @media (max-width: 640px) {
    //     grid-template-columns: repeat(1, 1fr);
    // }
`;