import React from 'react';
import { motion } from 'framer-motion';

const Scene = ({ title, subtitle, opacity, scale, y, filter, isMobile }) => {
  const getTitleSize = () => {
    if (isMobile) return '2.5rem';
    return '4.5rem';
  };

  const getSubtitleSize = () => {
    if (isMobile) return '1rem';
    return '1.5rem';
  };

  return (
    <motion.div 
      style={{ 
        opacity, scale, y, filter, 
        position: 'absolute', 
        textAlign: 'center', 
        padding: isMobile ? '0 1.5rem' : '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        pointerEvents: 'none' // optimize interactions (text scenes usually don't need interactions)
      }}
    >
      <h2 style={{ 
        fontSize: getTitleSize(), 
        fontWeight: 900, 
        color: 'var(--text-primary)', 
        textShadow: '0 10px 30px rgba(0,0,0,0.8)', 
        margin: 0, 
        textTransform: 'uppercase', 
        letterSpacing: isMobile ? '2px' : '4px',
        lineHeight: 1.1
      }}>
        {title}
      </h2>
      <p className="text-gradient" style={{ 
        fontSize: getSubtitleSize(), 
        fontWeight: 600, 
        marginTop: '1rem', 
        letterSpacing: isMobile ? '1px' : '2px',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        {subtitle}
      </p>
    </motion.div>
  );
};

export default Scene;
