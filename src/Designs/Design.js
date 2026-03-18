import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 4rem;
  background-color: var(--surface-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--surface-border);
  color: var(--text-primary);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 1rem 2rem;
  }
`;

export const LottieContainer = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: auto;
  }
`;

export const ProjectsSection = styled.section`
  padding: 6rem 2rem;
  position: relative;
  overflow: hidden;
  background-color: var(--bg-primary);
  z-index: 1;

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2.5rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  @media (max-width: 768px) {
    padding: 4rem 1rem;
    .projects-grid {
      grid-template-columns: 1fr;
    }
  }
`;

export const CertificatesSection = styled.section`
  padding: 6rem 2rem;
  background-color: var(--bg-secondary);
  position: relative;
  z-index: 1;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 3.5rem;
    color: var(--text-primary);
  }

  @media (max-width: 768px) {
    padding: 4rem 1rem;
    h2 {
      font-size: 2rem;
      margin-bottom: 2rem;
    }
  }
`;

export const CertificateList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const CertificateCard = styled.div`
  background: var(--surface-glass);
  backdrop-filter: blur(12px);
  border: 1px solid var(--surface-border);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    border-color: rgba(108, 99, 255, 0.3);
  }

  img {
    width: 100%;
    height: 220px;
    object-fit: cover;
  }

  .content {
    padding: 1.5rem;
    text-align: left;
    flex-grow: 1;

    h3 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
      color: var(--text-primary);
    }

    p {
      font-size: 1rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }
  }
`;

export const ContactSection = styled.section`
  padding: 6rem 2rem;
  background-color: var(--bg-primary);
  text-align: center;
  position: relative;
  z-index: 1;

  &&::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--surface-border), transparent);
  }

  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--text-primary);
  }

  p {
    font-size: 1.1rem;
    color: var(--text-secondary);
    margin-bottom: 2.5rem;
  }

  .social-grid {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

export const Footer = styled.footer`
  padding: 2rem;
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--surface-border);
  color: var(--text-secondary);
  text-align: center;
  font-size: 0.9rem;
`;

export const SplashScreenWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  z-index: 9999;
  
  &::before {
    content: '';
    position: absolute;
    width: 60vh;
    height: 60vh;
    background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
    filter: blur(80px);
    animation: float 6s ease-in-out infinite;
  }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 11, 16, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 2rem;
`;

export const ModalContent = styled.div`
  background: var(--bg-secondary);
  border: 1px solid var(--surface-border);
  padding: 2.5rem;
  border-radius: 20px;
  max-width: 800px;
  width: 100%;
  text-align: left;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);

  .modal-body {
    display: flex;
    gap: 2.5rem;
    align-items: flex-start;
  }

  h2 {
    font-size: 2rem;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }

  .category {
    color: var(--accent-primary);
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  p {
    margin: 1rem 0;
    font-size: 1.05rem;
    color: var(--text-secondary);
    line-height: 1.6;
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-primary);
    background: var(--accent-primary);
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    margin-top: 1rem;
    transition: all 0.3s ease;

    &:hover {
      background: var(--accent-secondary);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px var(--accent-secondary-glow);
    }
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    .modal-body {
      flex-direction: column;
      gap: 1.5rem;
    }
    h2 {
      font-size: 1.5rem;
    }
  }
`;

export const ModalImageWrapper = styled.div`
  flex: 0 0 300px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    flex: 0 0 auto;
    width: 100%;
    max-height: 250px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  background: var(--surface-glass);
  border: 1px solid var(--surface-border);
  color: var(--text-primary);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: rotate(90deg);
  }
`;

export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;