import { CloseRounded, GitHub, LinkedIn } from '@mui/icons-material';
import { Modal } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import styled from 'styled-components'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const Container = styled.div`
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
background-color: #000000a7;
display: flex;
align-items: top;
justify-content: center;
overflow-y: scroll;
transition: all 0.5s ease;
`;

const Wrapper = styled.div`
max-width: 800px;
width: 100%;
border-radius: 16px;
margin: 50px 12px;
height: min-content;
background-color: #ffffff;
color: #000000;
padding: 20px;
display: flex;
flex-direction: column;
position: relative;
box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: #000000;
  margin: 8px 6px 0px 6px;
  @media only screen and (max-width: 600px) {
      font-size: 24px;
      margin: 6px 6px 0px 6px;
  }
`;

const Date = styled.div`
    font-size: 16px;
    margin: 2px 6px;
    font-weight: 400;
    color: #666666;
    @media only screen and (max-width: 768px){
        font-size: 12px;
    }
`;



const Desc = styled.div`
    font-size: 16px;
    font-weight: 400;
    color: #000000;
    margin: 8px 6px;
    @media only screen and (max-width: 600px) {
        font-size: 14px;
        margin: 6px 6px;
    }
`;

const Image = styled.img`
    max-width: 100%;    /* Limit maximum width */
    max-height: 480px;
    height: auto;       /* Maintain aspect ratio */
    object-fit: contain; /* Fit image within bounds, keep aspect ratio */
    border-radius: 12px;
    margin-top: 30px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);

    /* Styles for transparent borders (optional) */
    display: block;    
    margin: 0 auto;  /* Center the image */
    padding: 0 10px;  /* Add 10px padding on left and right */
    background-color: transparent; 

    /* Additional constraint for mobile screenshots */
    @media (max-width: 600px) {  /* Adjust breakpoint as needed */
        max-height: 400px;  /* Set a maximum height for mobile */
        width: calc(400px * 3/4);
    }
`;

const Label = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: #000000;
    margin: 8px 6px;
    @media only screen and (max-width: 600px) {
        font-size: 16px;
        margin: 8px 6px;
    }
`;

const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 8px 0px;
    @media only screen and (max-width: 600px) {
        margin: 4px 0px;
    }
`;

const Tag = styled.div`
    font-size: 14px;
    font-weight: 400;
    color: #ffffff;
    margin: 4px;
    padding: 4px 8px;
    border-radius: 8px;
    background-color: #007bff;
    @media only screen and (max-width: 600px) {
        font-size: 12px;
    }
`;

const Members = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex-wrap: wrap;
    margin: 12px 6px;
    @media only screen and (max-width: 600px) {
        margin: 4px 6px;
    }
`;

const Member = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const MemberImage = styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 4px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);
    @media only screen and (max-width: 600px) {
        width: 32px;
        height: 32px;
    }
`;

const MemberName = styled.div`
    font-size: 16px;
    font-weight: 500;
    width: 200px;
    color: #000000;
    @media only screen and (max-width: 600px) {
        font-size: 14px;
    }
`;


const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 12px 0px;
    gap: 12px;
`;

const Button = styled.a`
    width: 100%;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    padding: 12px 16px;
    border-radius: 8px;
    background-color: #007bff;
    ${({ dull }) => dull && `
        background-color: #6c757d;
        color: #ffffff;
        &:hover {
            background-color: #5a6268;
        }
    `}
    cursor: pointer;
    text-decoration: none;
    transition: all 0.5s ease;
    &:hover {
        background-color: #0056b3;
    }
    @media only screen and (max-width: 600px) {
        font-size: 12px;
    }
`;




// const IndicatorContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   padding: 10px;
// `;

// const Indicator = styled.div`
//   border: 1px solid ${({ theme }) => theme.text_primary}; /* Adjust based on your theme */
//   width: 10px;
//   height: 10px;
//   border-radius: 50%;
//   margin: 0 5px;
//   background-color: ${({ active, theme }) => active ? theme.text_primary : "transparent"};
//   cursor: pointer;
// `;

// class ImageSlider extends React.Component {
//   state = { activeIndex: 0 };

//   goToPrevious = () => {
//     this.setState((prevState) => ({
//       activeIndex: (prevState.activeIndex - 1 + this.props.images.length) % this.props.images.length,
//     }));
//   };

//   goToNext = () => {
//     this.setState((prevState) => ({
//       activeIndex: (prevState.activeIndex + 1) % this.props.images.length,
//     }));
//   };

//   setActiveIndex = (index) => {
//     this.setState({ activeIndex: index });
//   };

//   render() {
//     const { images } = this.props;
//     const { activeIndex } = this.state;
//     return (
//       <SliderContainer>
//         {images.map((image, index) => (
//           <SliderImage
//             key={index}
//             src={image}
//             style={{ display: index === activeIndex ? 'block' : 'none' }}
//           />
//         ))}
//         <button onClick={this.goToPrevious}>Previous</button>
//         <button onClick={this.goToNext}>Next</button>
//         <IndicatorContainer>
//           {images.map((_, index) => (
//             <Indicator
//               key={index}
//               active={index === activeIndex}
//               onClick={() => this.setActiveIndex(index)}
//             />
//           ))}
//         </IndicatorContainer>
//       </SliderContainer>
//     );
//   }
// }



const Index = ({ openModal, setOpenModal }) => {
    const project = openModal?.project;
    const slides = project?.image.map((img, index) => ({
        url: img,
        // Add caption if you want:
        // caption: 'Slide Image Caption' 
    }));
    const [showSlideshow, setShowSlideshow] = useState(true);

    return (
        <Modal open={true} onClose={() => setOpenModal({ state: false, project: null })}>
            <Container>
                <Wrapper>
                    <CloseRounded
                        style={{
                            fontSize: "30px", 
                            position: "absolute",
                            top: "10px",
                            right: "20px",
                            cursor: "pointer",
                            backgroundColor: "#ffffff",
                            color: "#000000",
                            padding: "8px",       
                            borderRadius: '50%',
                            zIndex: 10,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                        }}
                        onClick={() => setOpenModal({ state: false, project: null })}
                    />
                    {/* <Image src={project?.image} /> */}
                    {showSlideshow ? (
                        <Slide easing="ease"> 
                            {slides.map((slide, index) => (
                                <div key={index}>
                                    <Image src={slide.url} alt={`Slide ${index + 1}`} />
                                </div>
                            ))}  
                        </Slide>
                    ) : (
                        <> 
                            {project?.image && project?.image[0] ? ( // Access the first image (index 0)
                                <Image src={project.image[0]} />
                            ) : (
                                <div>No image found.</div> 
                            )}
                        </>
                    )}
                    <Title>{project?.title}</Title>
                    <Date>{project.date}</Date>
                    <Tags>
                        {project?.tags.map((tag) => (
                            <Tag>{tag}</Tag>
                        ))}
                    </Tags>
                    <Desc>{project?.description}</Desc>
                    {project.member && (
                        <>
                            <Label>Members</Label>
                            <Members>
                                {project?.member.map((member) => (
                                    <Member>
                                        <MemberImage src={member.img} />
                                        <MemberName>{member.name}</MemberName>
                                        <a href={member.github} target="new" style={{textDecoration: 'none', color: 'inherit'}}>
                                            <GitHub />
                                        </a>
                                        <a href={member.linkedin} target="new" style={{textDecoration: 'none', color: 'inherit'}}>
                                            <LinkedIn />
                                        </a>
                                    </Member>
                                ))}
                            </Members>
                        </>
                    )}
                    {/* <Button onClick={() => setShowSlideshow(true)}>View Slideshow</Button> */}

                </Wrapper>
            </Container>

        </Modal>
    )
}

export default Index