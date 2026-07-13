import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ project, opacity, y, rotate, scale, isMobile }) => {
  // Custom 3D Tilt Effect
  const x = useMotionValue(0);
  const cardY = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(cardY, { stiffness: 300, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    cardY.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    cardY.set(0);
  };

  const cardWidth = isMobile ? '280px' : '350px';

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: project.top,
        left: project.left,
        right: project.right,
        bottom: project.bottom,
        width: cardWidth,
        y,
        opacity,
        scale,
        rotate,
        zIndex: project.zIndex,
        pointerEvents: 'auto', // Important for hover interaction
      }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          width: '100%',
          background: 'rgba(20, 21, 30, 0.6)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
        }}
        whileHover={{
          borderColor: 'rgba(108, 99, 255, 0.5)',
          boxShadow: '0 30px 60px rgba(108, 99, 255, 0.2)',
        }}
      >
        <div style={{ width: '100%', height: '180px', overflow: 'hidden', transform: 'translateZ(20px)' }}>
          <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        
        <div style={{ padding: '1.5rem', transform: 'translateZ(30px)' }}>
          <span style={{ color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
            {project.category}
          </span>
          <h3 style={{ fontSize: '1.4rem', margin: '0.5rem 0', color: 'var(--text-primary)' }}>{project.title}</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1rem' }}>
            {project.description}
          </p>
          
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {project.tech.map((t, i) => (
              <span key={i} style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', color: 'var(--text-secondary)' }}>
                {t}
              </span>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
              <FaGithub /> Code
            </a>
            <a href="#" style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
              <FaExternalLinkAlt /> Live
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
