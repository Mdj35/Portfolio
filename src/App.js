import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import projects from './Component/Projects';
import { FaFacebook, FaInstagram, FaEnvelope, FaPhone, FaBars, FaTimes, FaDownload } from 'react-icons/fa'; // Font Awesome Icons
import { motion, useScroll, useTransform } from 'framer-motion'; // Import framer-motion
import certificates from './Component/Certificates'; 
import splashAnimation from './splash.json'; // Replace with your splash screen animation
import {
  Container,
  ProjectsSection,
  ContactSection,
  Footer,
  CertificatesSection,
  CertificateList,
  CertificateCard,
  SplashScreenWrapper
  // Add a wrapper for the splash screen
} from './Designs/Design';
import AboutSection from './Component/AboutSection';

const App = () => {


  const [showSplash, setShowSplash] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // added: scroll-driven values for header animation
  const { scrollY } = useScroll(); // framer-motion hook already imported
  const headerY = useTransform(scrollY, [0, 150], [0, -6]); // slight upward translate on scroll
  const headerBg = useTransform(
    scrollY,
    [0, 150],
    ['rgba(0,0,0,0)', 'rgba(255,255,255,0.95)']
  ); // transparent -> light background
  const headerShadow = useTransform(
    scrollY,
    [0, 150],
    ['0px 0px 0px rgba(0,0,0,0)', '0 10px 30px rgba(0,0,0,0.12)']
  );
  const headerPadding = useTransform(scrollY, [0, 150], ['1.2rem 2rem', '0.5rem 2rem']);
  // Track a simple boolean for text color (safer cross-browser than animating color MotionValue)
  useEffect(() => {
    const unsubscribe = scrollY.onChange((v) => {
      setIsScrolled(v > 120); // toggle threshold, tweak as needed
    });
    return () => unsubscribe && unsubscribe();
  }, [scrollY]);

  useEffect(() => {
    // Hide splash screen after 3 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const downloadPortfolio = async () => {
    try {
      const res = await fetch('/Oani-portfolio.pdf');
      if (!res.ok) {
        // File missing — show actionable message instead of opening an HTML 404
        alert('Portfolio PDF not found. Please add `Oani-portfolio.pdf` to the `public/` folder or provide a hosted URL.');
        return;
      }
      const blob = await res.blob();
      const filename = 'Oani-portfolio.pdf';
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Download failed', err);
      alert('Unable to download portfolio. Please check your network connection or upload `Oani-portfolio.pdf` to the `public/` folder.');
    }
  };

  return (
    <>
      {/* fixed, scroll-animated header (moved outside Container) */}
     <motion.header
  style={{
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    height: 64,
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    padding: "0 1.5rem",
    y: headerY,
    background: headerBg,
    boxShadow: headerShadow,
    padding: headerPadding,
  }}
  aria-label="Main header"
>
  {/* === Logo / Brand === */}
  <h1
    style={{
      margin: 0,
      fontSize: "1.25rem",
      color: isScrolled ? "#111" : "#fff",
      zIndex: 1001,
    }}
  >
    My Portfolio
  </h1>

  {/* === Desktop Navigation === */}
  <nav
    className="desktop-nav"
    style={{
      display: "flex",
      gap: "1rem",
    }}
  >
    <a style={{ color: isScrolled ? "#111" : "#fff", textDecoration: "none" }} href="#about">
      About
    </a>
    <a style={{ color: isScrolled ? "#111" : "#fff", textDecoration: "none" }} href="#projects">
      Projects
    </a>
    <a style={{ color: isScrolled ? "#111" : "#fff", textDecoration: "none" }} href="#certificates">
      Certificates
    </a>
    <a style={{ color: isScrolled ? "#111" : "#fff", textDecoration: "none" }} href="#contact">
      Contact
    </a>
  </nav>

  {/* === Mobile Menu Toggle === */}
  <div
    className="mobile-menu-icon"
    style={{
      display: "none", // This will be overridden by media query
      cursor: "pointer",
      zIndex: 1001,
      padding: "0.5rem",
      marginLeft: "auto", // Push to right side
    }}
    onClick={() => setMenuOpen((prev) => !prev)}
  >
    {menuOpen ? (
      <FaTimes size={22} color={isScrolled ? "#111" : "#fff"} />
    ) : (
      <FaBars size={22} color={isScrolled ? "#111" : "#fff"} />
    )}
  </div>

  {/* === Mobile Menu Dropdown === */}
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    style={{
      position: "absolute",
      top: "64px",
      left: 0,
      right: 0,
      background: isScrolled ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.95)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1.2rem",
      padding: "1.5rem 0",
      pointerEvents: menuOpen ? "auto" : "none",
      zIndex: 1000,
    }}
  >
    <a onClick={() => setMenuOpen(false)} href="#about" style={{ color: isScrolled ? "#111" : "#fff", textDecoration: "none" }}>
      About
    </a>
    <a onClick={() => setMenuOpen(false)} href="#projects" style={{ color: isScrolled ? "#111" : "#fff", textDecoration: "none" }}>
      Projects
    </a>
    <a onClick={() => setMenuOpen(false)} href="#certificates" style={{ color: isScrolled ? "#111" : "#fff", textDecoration: "none" }}>
      Certificates
    </a>
    <a onClick={() => setMenuOpen(false)} href="#contact" style={{ color: isScrolled ? "#111" : "#fff", textDecoration: "none" }}>
      Contact
    </a>
  </motion.div>

  {/* === Mobile Responsive Styling === */}
  <style>{`
    @media screen and (max-width: 768px) {
      .desktop-nav {
        display: none !important;
      }
      .mobile-menu-icon {
        display: flex !important;
        align-items: center;
        justify-content: center;
      }
      /* Ensure header padding is consistent */
      motion.header {
        padding: 0 1rem !important;
      }
    }
  `}</style>
</motion.header>
      {showSplash ? (
        <SplashScreenWrapper>
          <Lottie animationData={splashAnimation} loop={false} />
        </SplashScreenWrapper>
      ) : (
        <>
          {/* Container needs top padding to avoid header overlap */}
          <Container>
            <AboutSection />  {/* Applied About Section */}

      <ProjectsSection
  id="projects"
  style={{
    backgroundColor: '#0b0d18',
    color: '#fff',
    padding: '6rem 2rem',
    position: 'relative',
    overflow: 'hidden',
  }}
>
  {/* Animated Title */}
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
    style={{ textAlign: 'center', marginBottom: '3.5rem' }}
  >
    <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
      My Projects
    </h2>
    <p style={{ color: '#ff4d6d', fontSize: '1.1rem' }}>
      Some Of My Distinguished Works
    </p>
  </motion.div>

  {/* Scroll Animation Wrapper */}
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false, amount: 0.2 }}
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.2,
        },
      },
    }}
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '2rem',
      justifyItems: 'center',
    }}
  >
    {projects.map((project, index) => (
      <motion.div
        key={project.id}
        variants={{
          hidden: { opacity: 0, y: 80, scale: 0.95 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.8, ease: 'easeOut' },
          },
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: '0 12px 25px rgba(255, 77, 109, 0.3)',
        }}
        style={{
          background: '#111324',
          borderRadius: '1rem',
          overflow: 'hidden',
          boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
          width: '100%',
          maxWidth: '340px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
      >
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: 'none',
            color: 'inherit',
            display: 'block',
          }}
        >
          {/* Image Parallax Scroll */}
          <motion.img
            src={project.image}
            alt={project.title}
            draggable="false"
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
            }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
          />
          <div style={{ padding: '1rem' }}>
            <p
              style={{
                color: '#ff4d6d',
                fontSize: '0.9rem',
                marginBottom: '0.3rem',
              }}
            >
              {project.category || 'Project'}
            </p>
            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{project.title}</h3>
            <p
              style={{
                color: '#ff4d6d',
                fontSize: '0.9rem',
                marginTop: '0.5rem',
                textDecoration: 'underline',
              }}
            >
              View Project →
            </p>
          </div>
        </a>
      </motion.div>
    ))}
  </motion.div>
</ProjectsSection>


  
            {/* Certificates Section */}
            <CertificatesSection id="certificates">
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                Certificates
              </motion.h2>
              <CertificateList
                as={motion.div}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.12 } },
                }}
              >
                {certificates.map((certificate, index) => (
                  <CertificateCard
                    as={motion.div}
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 40, scale: 0.98 },
                      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } },
                    }}
                    whileHover={{ y: -8, scale: 1.03, boxShadow: '0 14px 40px rgba(0,0,0,0.18)' }}
                    whileTap={{ scale: 0.995 }}
                    style={{ borderRadius: '12px', overflow: 'hidden', minHeight: '260px', display: 'flex', flexDirection: 'column' }}
                  >
                    <motion.img
                      src={certificate.image}
                      alt={certificate.title}
                      draggable="false"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.06, rotate: 1 }}
                      transition={{ duration: 0.45 }}
                      style={{ width: '100%', height: '200px', objectFit: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                    />
                    <div style={{ padding: '0.9rem' }}>
                      <h3 style={{ margin: '0.25rem 0 0.5rem' }}>{certificate.title}</h3>
                      <p style={{ margin: 0 }}>{certificate.description}</p>
                    </div>
                  </CertificateCard>
                ))}
              </CertificateList>
            </CertificatesSection>
  
            <ContactSection id="contact">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 1 }}
              >
                <h2>Contact Me</h2>
                <p>Feel free to reach out through any of the platforms below!</p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                  }}
                >
                  <motion.a
                    href="https://www.facebook.com/vynceian.oani.1"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, rotate: 8, y: -6, boxShadow: '0 12px 30px rgba(66,103,178,0.16)' }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 360, damping: 18 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(66,103,178,0.12), rgba(66,103,178,0.04))',
                    }}
                  >
                    <FaFacebook size={18} color="#4267B2" />
                  </motion.a>

                  <motion.a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=vynceian.oani@hcdc.edu.ph"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.12, rotate: -10, y: -4, boxShadow: '0 12px 30px rgba(212,70,56,0.14)' }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 340, damping: 18 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(212,70,56,0.10), rgba(212,70,56,0.04))',
                    }}
                  >
                    <FaEnvelope size={18} color="#D44638" />
                  </motion.a>

                  <motion.a
                    href="https://www.instagram.com/vynceian35"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.18, y: -6, boxShadow: '0 12px 30px rgba(225,48,108,0.14)' }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 18 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(225,48,108,0.10), rgba(225,48,108,0.04))',
                    }}
                  >
                    <FaInstagram size={18} color="#E1306C" />
                  </motion.a>

                  <motion.div
                    style={{ position: 'relative', display: 'inline-block' }}
                    whileHover={{}}
                  >
                    <motion.button
                      onClick={downloadPortfolio}
                      title="Download Portfolio (PDF)"
                      style={{
                        background: 'linear-gradient(135deg,#6c63ff,#9a8bff)',
                        border: 'none',
                        padding: 8,
                        borderRadius: '50%',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      whileHover={{ scale: 1.2, rotate: [0, 8, -6, 0] }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.6, type: 'spring', stiffness: 320, damping: 22 }}
                      aria-label="Download Portfolio"
                    >
                      <FaDownload size={18} color="#fff" />
                    </motion.button>

                    <motion.span
                      initial={{ opacity: 0, y: 6 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18 }}
                      style={{
                        position: 'absolute',
                        bottom: 'calc(100% + 8px)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: '6px 8px',
                        borderRadius: 6,
                        background: 'rgba(0,0,0,0.8)',
                        color: '#fff',
                        fontSize: '0.72rem',
                        pointerEvents: 'none',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Download PDF
                    </motion.span>
                  </motion.div>

                  <motion.a
                    href="tel:09943189625"
                    whileHover={{ scale: 1.12, y: -4, boxShadow: '0 12px 30px rgba(52,168,83,0.10)' }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 340, damping: 18 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(52,168,83,0.08), rgba(52,168,83,0.03))',
                    }}
                  >
                    <FaPhone size={18} color="#34A853" />
                  </motion.a>
                </div>
                <p style={{ marginTop: '1rem' }}>Phone: 09943189625</p>
              </motion.div>
            </ContactSection>
  
            <Footer>
              <p>© 2026 My Portfolio</p>
            </Footer>
          </Container>
        </>
      )}
    </>
  );
  
  };

  export default App;


