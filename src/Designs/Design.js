import styled, { keyframes } from 'styled-components';

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

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
    align-items: flex-start;
  }
`;

const Nav = styled.nav`
  a {
    color: #fff;
    text-decoration: none;
    margin: 0 1rem;

    &:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      margin: 0.5rem;
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

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const HeroContent = styled.div`
  max-width: 600px;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 1rem;
  }
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

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const CanvasContainer = styled.div`
  width: 300px;
  height: 300px;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const AboutSection = styled.section`
  padding: 4rem 2rem;
  background-color: #f9f9f9;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const ProjectsSection = styled.section`
  padding: 4rem 2rem;
  text-align: center;

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    padding: 2rem;
    h2 {
      font-size: 1.5rem;
    }
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

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const Footer = styled.footer`
  padding: 1rem 2rem;
  background-color: #333;
  color: #fff;

  @media (max-width: 768px) {
    padding: 1rem;
  }
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

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0.8rem;
    h3 {
      font-size: 1.3rem;
    }
    p {
      font-size: 0.9rem;
    }
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ImageWrapper = styled.div`
  max-width: 200px;
  max-height: 200px;

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    max-width: 150px;
    max-height: 150px;
  }
`;

const LottieWrapper = styled.div`
  width: 200px;
  height: 200px;

  svg {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
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
  max-width: 700px;
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

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 1.5rem;
    h2 {
      font-size: 1.5rem;
    }
  }
`;

const ModalContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
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

  @media (max-width: 768px) {
    max-width: 200px;
    max-height: 200px;
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

export const SplashScreenWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #000000, #8C8EFF);
  z-index: 9999;
`;

export const CertificatesSection = styled.section`
  padding: 3rem 2rem;
  background-color: #f8f9fa;
  text-align: center;

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    padding: 2rem;
    h2 {
      font-size: 1.5rem;
    }
  }
`;

export const CertificateList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const CertificateCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10px);
  }

  img {
    width: 100%;
    height: auto;
  }

  h3 {
    font-size: 1.2rem;
    margin: 1rem 0;
  }

  p {
    font-size: 1rem;
    padding: 0 1rem 1rem;
    color: #666;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 1rem;
    }
    p {
      font-size: 0.9rem;
    }
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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