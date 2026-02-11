import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen) return null; // render only when modal is requested

  const p = project || {}; // fallback to avoid crashes when project is null

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
            background: 'rgba(0,0,0,0.72)',
            zIndex: 20000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: 920,
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: 12,
              background: '#0b0d18',
              boxShadow: '0 20px 60px rgba(0,0,0,0.85)',
              padding: '1.25rem',
              position: 'relative',
            }}
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={onClose}
              aria-label="Close project modal"
              style={{
                position: 'absolute',
                right: 16,
                top: 16,
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(255,77,109,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 2,
              }}
            >
              <FaTimes color="#ff4d6d" />
            </button>

            {/* Content */}
            <div style={{ paddingTop: 8 }}>
              {p.image && (
                <img
                  src={p.image}
                  alt={p.title || 'Project image'}
                  style={{ width: '100%', height: 320, objectFit: 'cover', borderRadius: 8, display: 'block' }}
                  draggable="false"
                />
              )}

              <div style={{ marginTop: 16 }}>
                <p style={{ color: '#ff4d6d', margin: 0, fontWeight: 600 }}>{p.category || 'Project'}</p>
                <h2 style={{ color: '#fff', margin: '8px 0 12px' }}>{p.title || 'Project details'}</h2>

                <h3 style={{ color: '#ff4d6d', marginBottom: 6 }}>About</h3>
                <p style={{ color: '#ddd', marginTop: 0, lineHeight: 1.6 }}>{p.description || 'No description available.'}</p>

                {p.techStack && p.techStack.length > 0 && (
                  <>
                    <h3 style={{ color: '#ff4d6d', marginTop: 14, marginBottom: 8 }}>Tech Stack</h3>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {p.techStack.map((t, i) => (
                        <span key={i} style={{ background: 'rgba(255,77,109,0.12)', color: '#ff4d6d', padding: '6px 10px', borderRadius: 18, fontSize: 13 }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </>
                )}

                {p.role && (
                  <>
                    <h3 style={{ color: '#ff4d6d', marginTop: 14, marginBottom: 8 }}>My Role</h3>
                    <p style={{ color: '#ddd', marginTop: 0 }}>{p.role}</p>
                  </>
                )}

                {p.screenshots && p.screenshots.length > 0 && (
                  <>
                    <h3 style={{ color: '#ff4d6d', marginTop: 14, marginBottom: 8 }}>Screenshots</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 8 }}>
                      {p.screenshots.map((s, i) => (
                        <img key={i} src={s} alt={`${p.title || 'screenshot'} ${i + 1}`} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8 }} draggable="false" />
                      ))}
                    </div>
                  </>
                )}

                <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg,#ff4d6d,#ff6b7a)', color: '#fff', padding: '10px 14px', borderRadius: 8, textDecoration: 'none' }}
                    >
                      <FaExternalLinkAlt />
                      Live Project
                    </a>
                  )}

                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,77,109,0.08)', color: '#ff4d6d', padding: '10px 14px', borderRadius: 8, textDecoration: 'none', border: '1px solid rgba(255,77,109,0.18)' }}
                    >
                      <FaGithub />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;