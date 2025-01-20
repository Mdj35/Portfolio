import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Plane } from '@react-three/drei';
import Lottie from 'lottie-react';
import projects from './Components/Projects';
import { motion } from 'framer-motion'; // Import framer-motion
import animationData from './Animation - 1737101876576.json'; 
import { FaFacebook, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa'; // Font Awesome Icons
import {Container,
  Header,
  Nav,
  HeroSection,
  HeroContent,
  CanvasContainer,
  AboutSection,
  ProjectsSection,
  ContactSection,
  Footer,
  ProjectCard,
  ModalBackdrop,
  ModalContent,
  CloseButton,
  LottieContainer,
  ContentWrapper,
  ImageWrapper,
  LottieWrapper,
  ModalContentWrapper,
  ModalImageWrapper
}  from './Designs/Design' ;
// Replace with your Lottie animation file

const App = () => {
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
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
    <motion.div
      key={project.id}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <ProjectCard onClick={() => openModal(project)}>
        <ContentWrapper>
          {/* Animation Section */}
          <LottieWrapper>
            <Lottie animationData={project.animation} loop={true} />
          </LottieWrapper>
          
          {/* Image Section */}
          <ImageWrapper>
            <img src={project.image} alt={project.title} />
          </ImageWrapper>
        </ContentWrapper>
        
        {/* Description Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </motion.div>
      </ProjectCard>
    </motion.div>
  ))}
</ProjectsSection>


{modalOpen && currentProject && (
  <ModalBackdrop onClick={closeModal}>
    <ModalContent onClick={(e) => e.stopPropagation()}>
      <CloseButton onClick={closeModal}>×</CloseButton>
      <h2>{currentProject.title}</h2>

      {/* Flexbox Layout for Lottie and Image */}
      <ModalContentWrapper>
        <LottieContainer>
          <Lottie animationData={currentProject.animation} loop={true} />
        </LottieContainer>
        <ModalImageWrapper>
          <img src={currentProject.image} alt={currentProject.title} />
        </ModalImageWrapper>
      </ModalContentWrapper>

      <p>{currentProject.description}</p>
      <a href={currentProject.link} target="_blank" rel="noopener noreferrer">
        View Project
      </a>
    </ModalContent>
  </ModalBackdrop>
)}

<ContactSection id="contact">
        {/* Framer Motion Animation for Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} // Trigger animation once in view
          transition={{ duration: 1 }}
        >
          <h2>Contact Me</h2>
          <p>Feel free to reach out through any of the platforms below!</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <a href="https://www.facebook.com/vynceian.oani.1" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={30} color="#4267B2" />
            </a>
            <a href="mailto:vynceian.oani@hcdc.edu.ph" target="_blank" rel="noopener noreferrer">
              <FaEnvelope size={30} color="#D44638" />
            </a>
            <a href="https://www.instagram.com/vynceian24" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={30} color="#E1306C" />
            </a>
            <a href="tel:+1234567890">
              <FaPhone size={30} color="#34A853" />
            </a>
          </div>
          <p style={{ marginTop: '1rem' }}>Phone: +123 456 7890</p>
        </motion.div>
      </ContactSection>
      <Footer>
        <p>© 2025 My Portfolio</p>
      </Footer>
    </Container>
  );
};

export default App;


