import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import profileImage from '../prof.jpg';
import projects from './Projects';
import certificates from './Certificates';

const AboutSection = () => {
  const skills = [
    { name: 'React', desc: 'Component-based UI library' },
    { name: 'JavaScript (ES6+)', desc: 'Modern web scripting' },
    { name: 'HTML & CSS', desc: 'Web structure & styling' },
    { name: 'Framer Motion', desc: 'React animation library' },
    { name: 'Node.js', desc: 'JavaScript runtime' },
    { name: 'Express', desc: 'Backend web framework' },
    { name: 'MongoDB', desc: 'NoSQL document database' },
    { name: 'SQL', desc: 'Relational databases' },
    { name: 'Git', desc: 'Version control system' },
    { name: 'RESTful APIs', desc: 'Web integration services' },
    { name: 'Docker', desc: 'Containerization tool' },
    { name: 'AWS', desc: 'Cloud computing platform' }
  ];
  
  const stats = [
    { label: 'Projects', value: projects.length },
    { label: 'Certificates', value: certificates.length },
    { label: 'Years', value: 2 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: 'spring', stiffness: 100 } }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.8, type: 'spring', stiffness: 80 } }
  };

  return (
    <section
      id="about"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 2rem 4rem',
        boxSizing: 'border-box',
        overflow: 'hidden',
        zIndex: 1
      }}
    >
      <div className="bg-orb bg-orb-1" style={{ animation: 'float 8s ease-in-out infinite' }} />
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        position: 'relative',
        zIndex: 5
      }}>
        <motion.div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4rem',
            flexWrap: 'wrap-reverse',
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Text and Details */}
          <motion.div style={{ flex: '1 1 500px', minWidth: '300px' }} variants={containerVariants}>
            <motion.h2
              className="text-gradient"
              style={{ fontSize: '3.5rem', margin: '0 0 0.5rem', fontWeight: 800, lineHeight: 1.1 }}
              variants={itemVariants}
            >
              Vynce Ian Oani
            </motion.h2>

            <motion.h4
              style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: 500, color: 'var(--text-secondary)' }}
              variants={itemVariants}
            >
              Full-Stack Developer · Software Engineer
            </motion.h4>

            <motion.p
              style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem', color: 'var(--text-secondary)' }}
              variants={itemVariants}
            >
              I build complete web applications from front to back, combining modern UI/UX with robust server-side solutions. 
              Focused on scalable architecture, clean code, and optimal performance across the entire stack.
            </motion.p>

            <motion.div
              style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}
              variants={itemVariants}
            >
              <motion.a
                href="https://github.com/Mdj35"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  textDecoration: 'none', color: 'var(--text-primary)',
                  padding: '10px 20px', borderRadius: '30px',
                  background: 'var(--surface-border)',
                  border: '1px solid var(--surface-border)',
                  fontWeight: 600,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                }}
                whileHover={{ scale: 1.05, backgroundColor: 'var(--accent-primary)', borderColor: 'var(--accent-primary)', y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <FaGithub size={20} /> GitHub
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/vynce-ian-oani-832080323/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  textDecoration: 'none', color: 'var(--text-primary)',
                  padding: '10px 20px', borderRadius: '30px',
                  background: 'var(--surface-border)',
                  border: '1px solid var(--surface-border)',
                  fontWeight: 600,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                }}
                whileHover={{ scale: 1.05, backgroundColor: '#0a66c2', borderColor: '#0a66c2', y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <FaLinkedin size={20} /> LinkedIn
              </motion.a>
            </motion.div>

            {/* Skills */}
            <motion.div
              style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}
              variants={containerVariants}
            >
              {skills.map((s, idx) => (
                <motion.div
                  key={s.name}
                  style={{ position: 'relative', cursor: 'default' }}
                  variants={itemVariants}
                  whileHover="hover"
                  initial="initial"
                  animate="initial"
                >
                  <motion.span
                    style={{
                      background: 'var(--surface-glass)',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      color: 'var(--accent-primary)',
                      border: '1px solid rgba(108, 99, 255, 0.2)',
                      fontWeight: 500,
                      display: 'inline-block'
                    }}
                    variants={{
                      hover: { scale: 1.1, backgroundColor: 'rgba(108, 99, 255, 0.2)' }
                    }}
                  >
                    {s.name}
                  </motion.span>
                  <motion.div
                    variants={{
                      initial: { opacity: 0, y: 10, pointerEvents: 'none', x: '-50%' },
                      hover: { opacity: 1, y: 0, pointerEvents: 'auto', x: '-50%' }
                    }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute',
                      bottom: 'calc(100% + 10px)',
                      left: '50%',
                      background: 'rgba(0,0,0,0.85)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      color: '#fff',
                      whiteSpace: 'nowrap',
                      zIndex: 10,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    {s.desc}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Details & Stats Right Side */}
          <motion.div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2rem',
              flex: '1 1 400px',
            }}
            variants={containerVariants}
          >
            <motion.div style={{ position: 'relative' }} variants={imageVariants}>
              <motion.div 
                style={{
                  position: 'absolute',
                  inset: '-10px',
                  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                  borderRadius: '30px',
                  filter: 'blur(20px)',
                  opacity: 0.6,
                  zIndex: 0
                }} 
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.6, 0.8, 0.6] 
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <img
                src={profileImage}
                alt="Vynce Ian Oani"
                style={{
                  width: '320px',
                  height: '320px',
                  borderRadius: '24px',
                  objectFit: 'cover',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                  position: 'relative',
                  zIndex: 1,
                  display: 'block'
                }}
              />
            </motion.div>

            {/* Stats */}
            <motion.div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              width: '100%',
              flexWrap: 'wrap'
            }} variants={containerVariants}>
              {stats.map((s) => (
                <motion.div
                  key={s.label}
                  className="glass-panel"
                  variants={itemVariants}
                  whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(108, 99, 255, 0.3)' }}
                  style={{
                    padding: '1.25rem',
                    borderRadius: '16px',
                    textAlign: 'center',
                    flex: '1 1 120px',
                  }}
                >
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    >
                      {s.value}+
                    </motion.span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      <style>{`
        @media (max-width: 768px) {
          #about h2 { font-size: 2.5rem !important; text-align: center; }
          #about h4 { text-align: center; }
          #about p { text-align: center; }
          #about > div > div > div:first-child > div { justify-content: center; }
          #about img { width: 260px !important; height: 260px !important; }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
