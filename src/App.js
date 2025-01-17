import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Plane } from '@react-three/drei';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion'; // Import framer-motion
import animationData from './Animation - 1737101876576.json'; 
import projectAnimation from './Animation - 1737107473256.json'; // Replace with your project's Lottie animation file
// Replace with your Lottie animation file

const App = () => {
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'Chic Station',
      description: 'This is a cool project.',
      image: '/sample.jpg', // Replace with your project image path
      link: 'https://stationchic-reservation.vercel.app/', // Replace with your project link
      animation: projectAnimation,
    },
    {
      id: 2,
      title: 'Project 2',
      description: 'This is another amazing project.',
      image: '/project2.png', // Replace with your project image path
      link: 'https://example.com/project2', // Replace with your project link
      animation: projectAnimation,
    },
  ];

  const openModal = (project) => {
    setCurrentProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentProject(null);
  };


  return (
    <Container>
      <Header>
        <h1>My Portfolio</h1>
        <Nav>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </Nav>
      </Header>

      <HeroSection>
        {/* Framer Motion Wrapper for Animations */}
        <motion.div
          initial={{ x: '-100vw' }} // Start position
          animate={{ x: 0 }} // End position
          transition={{ type: 'spring', stiffness: 50, duration: 1 }}
        >
          <HeroContent>
            <h2>Welcome to My Interactive Portfolio</h2>
            <p>Explore my projects and learn more about me!</p>
          </HeroContent>
        </motion.div>

        <LottieContainer>
          {/* Add Framer Motion Animation for Lottie */}
          <motion.div
            initial={{ x: '100vw', opacity: 0 }} // Start position and transparency
            animate={{ x: 0, opacity: 1 }} // Slide in and fade in
            transition={{ type: 'spring', stiffness: 50, duration: 1, delay: 0.5 }}
          >
            <Lottie animationData={animationData} loop={true} />
          </motion.div>
        </LottieContainer>

        <CanvasContainer>
          <Canvas>
            <OrbitControls enableZoom={false} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 5, 2]} intensity={1} />
            <Sphere visible args={[1, 100, 200]} scale={2}>
              <MeshDistortMaterial
                color={hovered ? "#FF5733" : "#000000"}
                attach="material"
                distort={0.5}
                speed={2}
              />
            </Sphere>
            <Plane
              args={[10, 10]}
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, -2, 0]}
            >
              <meshStandardMaterial color="#444" />
            </Plane>
          </Canvas>
        </CanvasContainer>
      </HeroSection>

      <AboutSection id="about">
        {/* Slide-in Animation for About Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <h2>About Me</h2>
          <p>
            I am a passionate developer specializing in creating interactive and visually stunning web experiences.
          </p>
        </motion.div>
      </AboutSection>

      <ProjectsSection id="projects">
        <h2>Projects</h2>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            onClick={() => openModal(project)}
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </ProjectCard>
        ))}
      </ProjectsSection>

      {modalOpen && currentProject && (
        <ModalBackdrop onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>×</CloseButton>
            <h2>{currentProject.title}</h2>
            <p>{currentProject.description}</p>
            <LottieContainer>
              <Lottie animationData={currentProject.animation} loop={true} />
            </LottieContainer>
            <img src={currentProject.image} alt={currentProject.title} />
            <a href={currentProject.link} target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </ModalContent>
        </ModalBackdrop>
      )}

      <Footer>
        <p>© 2025 My Portfolio</p>
      </Footer>
    </Container>
  );
};

export default App;

// Styled Components
const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  color: #333;
  text-align: center;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #000000;
  color: #fff;
`;

const Nav = styled.nav`
  a {
    color: #fff;
    text-decoration: none;
    margin: 0 1rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #000000, #8C8EFF);
  color: #fff;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 600px;
  margin-bottom: 2rem;
`;

const LottieContainer = styled.div`
  width: 300px;
  height: 300px;
  margin: 0 auto;
`;

const CanvasContainer = styled.div`
  width: 300px;
  height: 300px;
`;

const AboutSection = styled.section`
  padding: 4rem 2rem;
  background-color: #f9f9f9;
`;

const ProjectsSection = styled.section`
  padding: 4rem 2rem;
`;




const ContactSection = styled.section`
  padding: 4rem 2rem;
  background-color: #f9f9f9;

  a {
    color: #6C63FF;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer = styled.footer`
  padding: 1rem 2rem;
  background-color: #333;
  color: #fff;
`;
const ProjectCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 1rem;
  margin: 1rem auto;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  max-width: 500px;
  text-align: center;
  position: relative;

  img {
    max-width: 100%;
    margin: 1rem 0;
  }

  a {
    color: #6C63FF;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;
