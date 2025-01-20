import styled from 'styled-components';

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
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
  }
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
  text-align: center;

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
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
const ProjectCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 1rem;
  margin: 1rem auto;
  max-width: 800px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
  }

  h3 {
    font-size: 1.5rem;
    margin: 1rem 0;
  }

  p {
    font-size: 1rem;
    color: #666;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const ImageWrapper = styled.div`
  max-width: 200px;
  max-height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    object-fit: cover;
  }
`;

const LottieWrapper = styled.div`
  width: 200px;
  height: 200px;

  /* Ensure Lottie stays contained */
  svg {
    width: 100%;
    height: 100%;
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
  max-width: 700px; /* Increased width for better layout */
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin-bottom: 1rem;
    font-size: 1.8rem;
    color: #333;
  }

  p {
    margin: 1rem 0;
    font-size: 1rem;
    color: #666;
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
const ModalContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem; /* Space between the Lottie and image */
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack on smaller screens */
  }
`;

const ModalImageWrapper = styled.div`
  max-width: 300px;
  max-height: 300px;
  overflow: hidden;
  border-radius: 8px;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
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


export {Container,
    Header,
    Nav,
    HeroSection,
    HeroContent,
    LottieContainer,
    CanvasContainer,
    AboutSection,
    ProjectsSection,
    ContactSection,
    Footer,
    ProjectCard,
    ModalBackdrop,
    ModalContent,
    CloseButton,
    ContentWrapper,
    ImageWrapper,
    LottieWrapper,
    ModalContentWrapper,
    ModalImageWrapper
};