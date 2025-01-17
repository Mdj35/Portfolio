import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Plane } from '@react-three/drei';
import styled from 'styled-components';

const App = () => {
  const [hovered, setHovered] = useState(false);

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
        <HeroContent>
          <h2>Welcome to My Interactive Portfolio</h2>
          <p>Explore my projects and learn more about me!</p>
        </HeroContent>
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
        <h2>About Me</h2>
        <p>
          I am a passionate developer specializing in creating interactive and visually stunning web experiences.
        </p>
      </AboutSection>

      <ProjectsSection id="projects">
        <h2>Projects</h2>
        <ProjectCard 
          onMouseEnter={() => setHovered(true)} 
          onMouseLeave={() => setHovered(false)}
        >
          <h3>Project 1</h3>
          <p>A cool project description. Hover to see the sphere change color!</p>
        </ProjectCard>
        <ProjectCard>
          <h3>Project 2</h3>
          <p>Another amazing project description.</p>
        </ProjectCard>
      </ProjectsSection>

      <ContactSection id="contact">
        <h2>Contact Me</h2>
        <p>Feel free to reach out to me at <a href="mailto:example@example.com">example@example.com</a>.</p>
      </ContactSection>

      <Footer>
        <p>© 2025 My Portfolio</p>
      </Footer>
    </Container>
  );
};

export default App;

// Styled Components
const Container = styled.div`
  font-family: 'Arial, sans-serif';
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
