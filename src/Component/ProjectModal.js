import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { ModalContent, ModalImageWrapper, CloseButton } from '../Designs/Design';

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen) return null;

  const p = project || {};

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(3, 7, 17, 0.85)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            zIndex: 20000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
            overflowY: 'auto',
          }}
        >
          <ModalContent
            as={motion.div}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '1000px',
              padding: '2rem',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9), 0 0 20px var(--accent-glow)'
            }}
            role="dialog"
            aria-modal="true"
          >
            <CloseButton onClick={onClose} aria-label="Close project modal">
              <FaTimes />
            </CloseButton>

            <div className="modal-body">
              {/* Left Column: Image Area */}
              {p.image && (
                <ModalImageWrapper>
                  <div style={{ position: 'relative', height: '100%', border: '1px solid var(--surface-border)' }}>
                    <img
                      src={p.image}
                      alt={p.title || 'Project image'}
                      style={{ height: '350px', objectPosition: 'top' }}
                      draggable="false"
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-secondary) 0%, transparent 30%)' }} />
                  </div>
                </ModalImageWrapper>
              )}

              {/* Right Column: Project Details Area */}
              <div style={{ flex: 1 }}>
                <div className="category" style={{ color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, fontSize: '0.9rem' }}>
                  {p.category || 'Portfolio Project'}
                </div>
                
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.5rem 0 1rem' }}>
                  {p.title || 'Project Details'}
                </h2>

                <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>About</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: 0 }}>
                  {p.description || 'No description available for this project.'}
                </p>

                {p.techStack && p.techStack.length > 0 && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.8rem' }}>Technologies</h3>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      {p.techStack.map((t, i) => (
                        <span key={i} style={{ 
                          background: 'var(--surface-glass)', 
                          color: 'var(--text-primary)', 
                          padding: '6px 14px', 
                          borderRadius: 6, 
                          fontSize: '0.85rem',
                          border: '1px solid var(--surface-border)',
                          fontWeight: 500
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {p.role && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>My Role</h3>
                    <p style={{ color: 'var(--text-secondary)', marginTop: 0, lineHeight: 1.6 }}>{p.role}</p>
                  </div>
                )}

                <div style={{ display: 'flex', gap: 16, marginTop: '2rem', flexWrap: 'wrap' }}>
                  {p.link && (
                    <motion.a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, boxShadow: '0 0 15px var(--accent-glow)' }}
                      whileTap={{ scale: 0.95 }}
                      style={{ 
                        display: 'inline-flex', alignItems: 'center', gap: 10, 
                        background: 'var(--accent-primary)', color: '#000', 
                        padding: '12px 20px', borderRadius: 8, 
                        textDecoration: 'none', fontWeight: 700 
                      }}
                    >
                      <FaExternalLinkAlt />
                      Visit Live Site
                    </motion.a>
                  )}

                  {p.github && (
                    <motion.a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, background: 'var(--surface-glass)', borderColor: 'var(--accent-primary)', color: 'var(--accent-primary)' }}
                      whileTap={{ scale: 0.95 }}
                      style={{ 
                        display: 'inline-flex', alignItems: 'center', gap: 10, 
                        background: 'transparent', color: 'var(--text-primary)', 
                        padding: '12px 20px', borderRadius: 8, 
                        textDecoration: 'none', border: '1px solid var(--surface-border)',
                        fontWeight: 600, transition: 'background 0.3s ease'
                      }}
                    >
                      <FaGithub size={18} />
                      Source Code
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
            
            {/* Screenshots Gallery Section (Full Width Bottom) */}
            {p.screenshots && p.screenshots.length > 0 && (
              <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--surface-border)' }}>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.2rem' }}>Gallery</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem' }}>
                  {p.screenshots.map((s, i) => (
                    <img key={i} src={s} alt={`${p.title || 'screenshot'} ${i + 1}`} style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--surface-border)' }} draggable="false" />
                  ))}
                </div>
              </div>
            )}
            
          </ModalContent>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;