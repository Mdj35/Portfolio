import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import experiences from './Experiences';

const ExperienceSection = ({ 
  viewportSettings, 
  sectionHeaderVariants, 
  staggerContainer 
}) => {
  const experienceRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth < 480);
  
  const { scrollYProgress } = useScroll({
    target: experienceRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const indicatorY = useTransform(smoothProgress, [0.1, 0.9], ["0%", "100%"]);
  const indicatorOpacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSmallMobile(window.innerWidth < 480);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.section
      ref={experienceRef}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      style={{
        backgroundColor: 'var(--bg-secondary)',
        padding: isSmallMobile ? '3rem 1rem' : isMobile ? '4rem 1.5rem' : '6rem 2rem',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
        borderRadius: '3rem',
        border: '1px solid rgba(255, 255, 255, 0.05)'
      }}
      id="experience"
    >
      <div style={{
        position: 'absolute',
        top: '2.5rem',
        right: '-10%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'rgba(59, 130, 246, 0.1)',
        filter: 'blur(80px)',
        zIndex: -1
      }} />

      <motion.div
        variants={sectionHeaderVariants}
        style={{ 
          textAlign: 'center', 
          marginBottom: '4rem' 
        }}
      >
        <h2 style={{ 
          fontSize: isSmallMobile ? '1.5rem' : isMobile ? '2rem' : '2.5rem', 
          fontWeight: '800', 
          marginBottom: '0.5rem', 
          color: 'var(--text-primary)' 
        }}>
          Experience
        </h2>
        <p className="text-gradient" style={{ 
          fontSize: isSmallMobile ? '1rem' : isMobile ? '1.1rem' : '1.2rem', 
          fontWeight: 600 
        }}>
          My Professional Journey
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        style={{ 
          maxWidth: '1000px', 
          margin: '0 auto', 
          position: 'relative', 
          paddingLeft: isSmallMobile ? '1rem' : isMobile ? '1.5rem' : '2rem', 
          paddingRight: isSmallMobile ? '1rem' : isMobile ? '1.5rem' : '2rem' 
        }}
      >
        {/* Creative Timeline Line - Centered on Desktop, Left on Mobile */}
        <div style={{
          position: 'absolute',
          left: isMobile ? '20px' : '50%',
          top: '0',
          bottom: '0',
          width: '2px',
          background: 'rgba(255, 255, 255, 0.1)',
          zIndex: 0,
          overflow: 'hidden',
          transform: isMobile ? 'translateX(0)' : 'translateX(-50%)'
        }}>
          <motion.div 
            style={{ 
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              background: 'linear-gradient(to bottom, var(--accent-primary), var(--accent-secondary), transparent)',
              height: '100%',
              scaleY: smoothProgress,
              transformOrigin: 'top'
            }}
          />
          
          {/* Scrolling Indicator Pulse */}
          <motion.div 
            style={{ 
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: 'var(--accent-primary)',
              boxShadow: '0 0 15px var(--accent-primary), 0 0 30px var(--accent-secondary)',
              zIndex: 10,
              top: indicatorY,
              opacity: indicatorOpacity
            }}
          >
            <div style={{
              position: 'absolute',
              inset: '0',
              borderRadius: '50%',
              background: 'var(--accent-secondary)',
              animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
            }} />
          </motion.div>
        </div>

        {experiences.map((exp, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={exp.id}
              variants={{
                hidden: { opacity: 0, x: isEven ? -100 : 100 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: { duration: 0.8, type: 'spring', bounce: 0.3 } 
                }
              }}
              style={{
                position: 'relative',
                marginBottom: '3rem',
                marginLeft: isMobile ? '3rem' : 0,
                display: 'flex',
                justifyContent: isMobile ? 'center' : (isEven ? 'flex-start' : 'flex-end'),
                zIndex: 1
              }}
            >
              {/* Timeline Dot - Outside the card */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                style={{
                  position: 'absolute',
                  left: isMobile ? '-1.75rem' : '50%',
                  top: '32px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: 'var(--bg-secondary)',
                  border: '4px solid var(--accent-primary)',
                  zIndex: 20,
                  boxShadow: '0 0 10px var(--accent-primary)',
                  transform: 'translateX(-50%)'
                }}
              />

              {/* Content Card */}
              <motion.div
                className="glass-panel"
                style={{
                  padding: isSmallMobile ? '1rem' : isMobile ? '1.5rem' : '2rem',
                  borderRadius: '1.5rem',
                  border: '1px solid var(--surface-border)',
                  transition: 'border-color 0.3s ease',
                  width: isMobile ? '100%' : '45%'
                }}
                whileHover={{ scale: 1.02, borderColor: 'var(--accent-secondary)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: isSmallMobile ? '1rem' : isMobile ? '1.1rem' : '1.4rem', 
                      color: 'var(--text-primary)' 
                    }}>
                      {exp.position}
                    </h3>
                    <p style={{ 
                      margin: '0.2rem 0 0', 
                      color: 'var(--text-secondary)', 
                      fontSize: isSmallMobile ? '0.85rem' : '1rem', 
                      fontWeight: 500 
                    }}>
                      {exp.company}
                    </p>
                  </div>
                  <span style={{
                    background: 'rgba(108, 99, 255, 0.15)',
                    color: 'var(--text-primary)',
                    padding: isSmallMobile ? '0.3rem 0.8rem' : '0.4rem 1rem',
                    borderRadius: '20px',
                    fontSize: isSmallMobile ? '0.75rem' : '0.9rem',
                    fontWeight: '600',
                    border: '1px solid rgba(108, 99, 255, 0.3)',
                    whiteSpace: 'nowrap'
                  }}>
                    {exp.duration}
                  </span>
                </div>

                <p style={{ 
                  margin: '1rem 0', 
                  color: 'var(--text-primary)', 
                  lineHeight: '1.7', 
                  opacity: 0.9,
                  fontSize: isSmallMobile ? '0.9rem' : '1rem'
                }}>
                  {exp.description}
                </p>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                  {exp.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: 'var(--surface-border)',
                        color: 'var(--text-secondary)',
                        padding: isSmallMobile ? '4px 10px' : '6px 14px',
                        borderRadius: '8px',
                        fontSize: isSmallMobile ? '0.7rem' : '0.85rem',
                        fontWeight: 500
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      <style>{`
        @keyframes ping {
          0%, 100% { opacity: 1; transform: scale(1); }
          75% { opacity: 0; transform: scale(2); }
        }
      `}</style>
    </motion.section>
  );
};

export default ExperienceSection;
