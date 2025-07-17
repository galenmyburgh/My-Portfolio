import React from 'react'
import { useState } from 'react'
import { Container, Wrapper, Title, Desc, CardContainer, ToggleButtonGroup, ToggleButton, Divider } from './ProjectsStyle'
import ProjectCard from '../Cards/ProjectCards'
import { projects } from '../../data/constants'


const Projects = ({openModal,setOpenModal}) => {
  const [toggle, setToggle] = useState('all');
  return (
    <Container id="projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc>
          My portfolio features projects spanning various technologies and platforms.        </Desc>
        <ToggleButtonGroup >
          {toggle === 'all' ?
            <ToggleButton active value="all" onClick={() => setToggle('all')}>All</ToggleButton>
            :
            <ToggleButton value="all" onClick={() => setToggle('all')}>All</ToggleButton>
          }
          <Divider />
          {toggle === 'flutter' ?
            <ToggleButton active value="flutter" onClick={() => setToggle('flutter')}>Flutter</ToggleButton>
            :
            <ToggleButton value="flutter" onClick={() => setToggle('flutter')}>Flutter</ToggleButton>
          }
          <Divider />
          {toggle === 'react' ?
            <ToggleButton active value="react" onClick={() => setToggle('react')}>React</ToggleButton>
            :
            <ToggleButton value="react" onClick={() => setToggle('react')}>React</ToggleButton>
          }
          <Divider />
          {toggle === 'flutterflow' ?
            <ToggleButton active value="flutterflow" onClick={() => setToggle('flutterflow')}>FlutterFlow</ToggleButton>
            :
            <ToggleButton value="flutterflow" onClick={() => setToggle('flutterflow')}>FlutterFlow</ToggleButton>
          }
          <Divider />
          {toggle === 'python' ?
            <ToggleButton active value="python" onClick={() => setToggle('python')}>Python</ToggleButton>
            :
            <ToggleButton value="python" onClick={() => setToggle('python')}>Python</ToggleButton>
          }
          <Divider />
          {toggle === 'wordpress' ?
            <ToggleButton active value="wordpress" onClick={() => setToggle('wordpress')}>WordPress</ToggleButton>
            :
            <ToggleButton value="wordpress" onClick={() => setToggle('wordpress')}>WordPress</ToggleButton>
          }
        </ToggleButtonGroup>
        <CardContainer>
          {toggle === 'all' && projects
            .map((project) => (
              <ProjectCard project={project} openModal={openModal} setOpenModal={setOpenModal}/>
            ))}
          {projects
            .filter((item) => item.category == toggle)
            .map((project) => (
              <ProjectCard project={project} openModal={openModal} setOpenModal={setOpenModal}/>
            ))}
        </CardContainer>
      </Wrapper>
    </Container>
  )
}

export default Projects