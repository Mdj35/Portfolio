import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import projects from './Component/Projects';
import ProjectModal from './Component/ProjectModal';
import { FaFacebook, FaInstagram, FaEnvelope, FaPhone, FaBars, FaTimes, FaDownload } from 'react-icons/fa';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import certificates from './Component/Certificates';
import splashAnimation from './splash.json';
import {
  Container,
  ProjectsSection,
  ContactSection,
  Footer,
  CertificatesSection,
  CertificateList,
  CertificateCard,
  SplashScreenWrapper,
  Header
} from './Designs/Design';
import AboutSection from './Component/AboutSection';
import experiences from './Component/Experiences';
import ParticleBackground from './Component/ParticleBackground';
import VideoScroll from './Component/VideoScroll';
import myVideo from './Component/download.mp4';


const App = () => {
  const [splashState, setSplashState] = useState(0); // 0 = Lottie, 1 = Aenex, 2 = Main
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState('All');

  // Scroll Progress Hooks
  const { scrollY, scrollYProgress } = useScroll();
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -150]);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((v) => {
      setIsScrolled(v > 50);
    });
    return () => unsubscribe && unsubscribe();
  }, [scrollY]);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setSplashState(1);
    }, 2500);
    const timer2 = setTimeout(() => {
      setSplashState(2);
    }, 5500);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const downloadPortfolio = async () => {
    try {
      const res = await fetch('/Oani-portfolio.pdf');
      if (!res.ok) {
        alert('Portfolio PDF not found. Please add `Oani-portfolio.pdf` to the `public/` folder.');
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
      alert('Unable to download portfolio.');
    }
  };

  // Reusable scroll animation settings
  const viewportSettings = { once: false, amount: 0.2 };

  const sectionHeaderVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const popInVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, type: 'spring', stiffness: 100 } }
  };


  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, type: 'spring' } }
  };

  return (
    <>
      <Header
        className={isScrolled ? 'scrolled' : ''}
        style={{
          background: isScrolled ? 'var(--surface-glass)' : 'transparent',
          boxShadow: isScrolled ? '0 10px 30px rgba(0,0,0,0.3)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--surface-border)' : '1px solid transparent',
          padding: isScrolled ? '1rem 4rem' : '1.5rem 4rem',
        }}
        as={motion.header}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1
          className="text-gradient"
          style={{
            margin: 0,
            fontSize: '1.5rem',
            fontWeight: 800,
            zIndex: 1001,
            cursor: 'pointer'
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          My Portfolio
        </h1>

        <nav
          className="desktop-nav"
          style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}
        >
          {['About', 'Projects', 'Experience', 'Certificates', 'Contact'].map((item) => (
            <a
              key={item}
              style={{
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
                transition: 'color 0.3s ease',
              }}
              href={`#${item.toLowerCase()}`}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
            >
              {item}
            </a>
          ))}
        </nav>

        <div
          className="mobile-menu-icon"
          style={{ cursor: 'pointer', zIndex: 1001, display: 'none' }}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <FaTimes size={24} color="#fff" /> : <FaBars size={24} color="#fff" />}
        </div>

        {/* Mobile Dropdown */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--surface-border)',
            display: menuOpen ? 'flex' : 'none',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            padding: '2rem 0',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            zIndex: 1000,
          }}
        >
          {['About', 'Projects', 'Experience', 'Certificates', 'Contact'].map((item) => (
            <a
              key={item}
              onClick={() => setMenuOpen(false)}
              href={`#${item.toLowerCase()}`}
              style={{
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '1.2rem',
                fontWeight: 600
              }}
            >
              {item}
            </a>
          ))}
        </motion.div>

        <style>{`
          @media screen and (max-width: 768px) {
            .desktop-nav { display: none !important; }
            .mobile-menu-icon { display: flex !important; margin-left: auto; }
            header { padding: 1rem 1.5rem !important; }
          }
        `}</style>
      </Header>

      <ParticleBackground />

      {splashState < 2 ? (
        <SplashScreenWrapper>
          <AnimatePresence mode="wait">
            {splashState === 0 ? (
              <motion.div
                key="loading-lottie"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }}
                transition={{ duration: 0.6 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <Lottie animationData={splashAnimation} loop={false} style={{ width: 300 }} />
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  style={{ color: '#fff', marginTop: '1rem', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '1.2rem' }}
                >
                  Loading Portfolio
                </motion.h2>
              </motion.div>
            ) : (
              <motion.div
                key="ign-aenex"
                initial={{ opacity: 0, scale: 0.9, filter: 'contrast(100%)' }}
                animate={{ opacity: 1, scale: 1, filter: 'contrast(150%)' }}
                exit={{ opacity: 0, scale: 1.5, filter: 'blur(20px)' }}
                transition={{ duration: 0.8 }}
                style={{ textAlign: 'center', fontFamily: '"Share Tech Mono", monospace' }}
              >
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <motion.h1
                    style={{ fontSize: '7rem', fontWeight: 900, margin: 0, letterSpacing: '14px', textTransform: 'uppercase', color: 'var(--text-primary)' }}
                    animate={{
                      textShadow: [
                        '2px 2px 0 var(--accent-primary), -2px -2px 0 var(--accent-secondary)',
                        '-2px -2px 0 var(--accent-primary), 2px 2px 0 var(--accent-secondary)',
                        '0px 0px 20px var(--accent-primary), 0px 0px 40px var(--accent-secondary)',
                        '2px -2px 0 var(--accent-primary), -2px 2px 0 var(--accent-secondary)',
                        '0px 0px 0px transparent'
                      ],
                      x: [0, -3, 3, -1, 1, 0],
                      opacity: [1, 0.8, 1, 0.5, 1]
                    }}
                    transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2.5 }}
                  >
                    AENEX
                  </motion.h1>
                  {/* Glitch Overlay */}
                  <motion.h1
                    style={{ fontSize: '7rem', fontWeight: 900, margin: 0, letterSpacing: '14px', textTransform: 'uppercase', color: 'var(--accent-primary)', position: 'absolute', top: 0, left: 0, zIndex: -1, mixBlendMode: 'screen', opacity: 0.5 }}
                    animate={{
                      x: [-4, 4, -4],
                      clipPath: [
                        'inset(10% 0 80% 0)',
                        'inset(80% 0 10% 0)',
                        'inset(40% 0 40% 0)'
                      ]
                    }}
                    transition={{ duration: 0.2, repeat: Infinity, repeatType: 'mirror' }}
                  >
                    AENEX
                  </motion.h1>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  style={{ color: 'var(--accent-secondary)', fontSize: '1.5rem', letterSpacing: '8px', textTransform: 'uppercase', marginTop: '1rem', fontWeight: 600, textShadow: '0 0 10px var(--accent-secondary-glow)' }}
                >
                  SYSTEM INITIALIZED
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </SplashScreenWrapper>
      ) : (
        <>
          <Container>
            <AboutSection />
          </Container>

          <VideoScroll videoSrc={myVideo} />

          <Container>

            <ProjectsSection id="projects">
              <motion.div className="bg-orb bg-orb-2" style={{ y: orb1Y, animation: 'float 10s ease-in-out infinite' }} />

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={sectionHeaderVariants}
                style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative', zIndex: 2 }}
              >
                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                  My Projects
                </h2>
                <p className="text-gradient" style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                  Some Of My Distinguished Works
                </p>
              </motion.div>

              <motion.div variants={sectionHeaderVariants} style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem', position: 'relative', zIndex: 2 }}>
                {['All', 'Capstone', 'IM', 'Freelance', 'Other Projects'].map(filter => (
                  <motion.button
                    key={filter}
                    onClick={() => setProjectFilter(filter)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '0.6rem 1.5rem',
                      borderRadius: '30px',
                      border: `1px solid ${projectFilter === filter ? 'rgba(0, 240, 255, 0.4)' : 'var(--surface-border)'}`,
                      background: projectFilter === filter ? 'rgba(0, 240, 255, 0.1)' : 'var(--surface-glass)',
                      color: projectFilter === filter ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: projectFilter === filter ? '0 0 15px rgba(0, 240, 255, 0.2)' : 'none',
                      backdropFilter: 'blur(5px)'
                    }}
                  >
                    {filter}
                  </motion.button>
                ))}
              </motion.div>

              <motion.div
                className="projects-grid"
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={staggerContainer}
                style={{
                  position: 'relative',
                  zIndex: 2,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: '2.5rem',
                  alignItems: 'stretch'
                }}
              >
                <AnimatePresence mode="popLayout">
                  {projects.filter(p => projectFilter === 'All' || p.category === projectFilter).map((project, index) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="glass-panel"
                      variants={popInVariants}
                      whileHover={{
                        y: -15,
                        scale: 1.03,
                        boxShadow: '0 25px 50px rgba(0,0,0,0.6)',
                        borderColor: 'rgba(108, 99, 255, 0.6)'
                      }}
                      onClick={() => handleProjectClick(project)}
                      style={{
                        cursor: 'pointer',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'border-color 0.3s ease',
                      }}
                    >
                      <div style={{ overflow: 'hidden', height: '220px' }}>
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          whileHover={{ scale: 1.15 }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                      <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <span style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
                          {project.category || 'Development'}
                        </span>
                        <h3 style={{ fontSize: '1.4rem', margin: '0 0 1rem', color: 'var(--text-primary)' }}>{project.title}</h3>
                        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.9rem' }}>
                          View Details <span style={{ color: 'var(--accent-secondary)' }}>&rarr;</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </ProjectsSection>

            {/* Experience Section */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                padding: '6rem 2rem',
                position: 'relative',
                zIndex: 1,
                overflow: 'hidden'
              }}
              id="experience"
            >
              <motion.div className="bg-orb bg-orb-1" style={{ y: orb2Y, opacity: 0.3, left: 'auto', right: '-10%' }} />

              <motion.div
                variants={sectionHeaderVariants}
                style={{ textAlign: 'center', marginBottom: '4rem' }}
              >
                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                  Experience
                </h2>
                <p className="text-gradient" style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                  My Professional Journey
                </p>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}
              >
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: '100%' }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  style={{ position: 'absolute', left: '26px', top: '0', bottom: '0', width: '2px', background: 'linear-gradient(to bottom, var(--accent-primary), var(--accent-secondary), transparent)', zIndex: 0 }}
                />

                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    variants={slideInLeft}
                    className="glass-panel"
                    style={{
                      position: 'relative',
                      padding: '2rem',
                      marginBottom: '2rem',
                      marginLeft: '4rem',
                      zIndex: 1
                    }}
                    whileHover={{ scale: 1.02, x: 10, borderColor: 'var(--accent-secondary)' }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
                      style={{ position: 'absolute', left: '-50px', top: '32px', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--bg-secondary)', border: '4px solid var(--accent-secondary)', zIndex: 2, boxShadow: '0 0 10px var(--accent-secondary-glow)' }}
                    />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-primary)' }}>{exp.position}</h3>
                        <p style={{ margin: '0.2rem 0 0', color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 500 }}>{exp.company}</p>
                      </div>
                      <span style={{
                        background: 'rgba(108, 99, 255, 0.15)',
                        color: 'var(--text-primary)',
                        padding: '0.4rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        border: '1px solid rgba(108, 99, 255, 0.3)'
                      }}>
                        {exp.duration}
                      </span>
                    </div>

                    <p style={{ margin: '1rem 0', color: 'var(--text-primary)', lineHeight: '1.7', opacity: 0.9 }}>
                      {exp.description}
                    </p>

                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                      {exp.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          style={{
                            background: 'var(--surface-border)',
                            color: 'var(--text-secondary)',
                            padding: '6px 14px',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            fontWeight: 500
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            <CertificatesSection id="certificates">
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={sectionHeaderVariants}
              >
                Certificates & Awards
              </motion.h2>
              <CertificateList
                as={motion.div}
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={staggerContainer}
              >
                {certificates.map((certificate, index) => (
                  <CertificateCard
                    as={motion.div}
                    key={index}
                    variants={popInVariants}
                    whileHover={{
                      y: -15,
                      scale: 1.03,
                      boxShadow: '0 25px 50px rgba(0,0,0,0.6)',
                      borderColor: 'rgba(108, 99, 255, 0.6)'
                    }}
                    style={{ cursor: 'pointer', transition: 'border-color 0.3s ease' }}
                  >
                    <img src={certificate.image} alt={certificate.title} draggable="false" />
                    <div className="content">
                      <h3>{certificate.title}</h3>
                      <p>{certificate.description}</p>
                    </div>
                  </CertificateCard>
                ))}
              </CertificateList>
            </CertificatesSection>

            <ContactSection id="contact">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={sectionHeaderVariants}
                style={{ maxWidth: '600px', margin: '0 auto' }}
              >
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>Let's Work Together</h2>
                <p>Feel free to reach out through any of the platforms below. I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.</p>

                <motion.div
                  className="social-grid"
                  style={{ marginTop: '3rem' }}
                  variants={staggerContainer}
                >
                  {[
                    { icon: FaFacebook, link: "https://www.facebook.com/vynceian.oani.1", color: "#4267B2" },
                    { icon: FaEnvelope, link: "https://mail.google.com/mail/?view=cm&fs=1&to=vynceian.oani@hcdc.edu.ph", color: "#D44638" },
                    { icon: FaInstagram, link: "https://www.instagram.com/vynceian35", color: "#E1306C" },
                    { icon: FaPhone, link: "tel:09943189625", color: "#34A853" }
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-panel"
                      variants={popInVariants}
                      whileHover={{ y: -8, scale: 1.15, boxShadow: `0 15px 30px ${social.color}33`, borderColor: social.color }}
                      whileTap={{ scale: 0.9 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        textDecoration: 'none',
                        transition: 'border-color 0.3s'
                      }}
                    >
                      <social.icon size={26} color={social.color} />
                    </motion.a>
                  ))}

                  <motion.button
                    onClick={downloadPortfolio}
                    className="glass-panel"
                    variants={popInVariants}
                    whileHover={{ y: -8, scale: 1.15, boxShadow: '0 15px 30px rgba(108, 99, 255, 0.4)', borderColor: 'var(--accent-primary)' }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      border: '1px solid var(--surface-border)',
                      cursor: 'pointer',
                      background: 'var(--accent-primary)',
                      color: '#fff'
                    }}
                    title="Download Portfolio PDF"
                  >
                    <FaDownload size={22} />
                  </motion.button>
                </motion.div>

                <motion.div
                  variants={popInVariants}
                  whileHover={{ scale: 1.05 }}
                  style={{ marginTop: '3rem', display: 'inline-block', padding: '1rem 2rem', borderRadius: '30px', background: 'var(--surface-glass)', border: '1px solid var(--surface-border)', cursor: 'default' }}
                >
                  <span style={{ color: 'var(--text-secondary)' }}>Prefer to call? </span>
                  <span className="text-gradient" style={{ fontWeight: 700, fontSize: '1.2rem', marginLeft: '0.5rem' }}>09943189625</span>
                </motion.div>
              </motion.div>
            </ContactSection>

            <Footer>
              <p>© {new Date().getFullYear()} Vynce Ian Oani. Built with React & Framer Motion.</p>
            </Footer>
          </Container>

          <ProjectModal
            project={selectedProject}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        </>
      )}
    </>
  );
};

export default App;
