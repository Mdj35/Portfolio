/**
 * ProjectCard.js
 *
 * Floating project image card with parallax scroll and optional 3D tilt.
 *
 * PERFORMANCE STRATEGY BY PROFILE:
 *
 *   Desktop:
 *     - Full 3D perspective tilt on mouse move (spring-based)
 *     - backdropFilter: blur(16px) for glass morphism
 *     - Heavy box-shadow for depth
 *     - whileHover animation
 *     - transformStyle: preserve-3d for genuine 3D layering
 *
 *   Tablet:
 *     - 3D tilt kept (tablets can be used with stylus/mouse)
 *     - backdropFilter: blur(8px) — reduced from 16px
 *     - Lighter box-shadow
 *     - whileHover kept
 *
 *   Mobile:
 *     - 3D tilt DISABLED. Tilt requires continuous spring computation on
 *       touch-move events, burning CPU during scroll. Touch devices have
 *       no meaningful "hover" anyway.
 *     - backdropFilter DISABLED. This forces the browser to copy the
 *       background bitmap into an offscreen buffer per composited layer.
 *       With 2 cards, that's 2 full-screen copies in GPU memory = stutter.
 *       Replaced with an opaque semi-dark background.
 *     - box-shadow DISABLED. Shadow compositing happens on CPU for
 *       transformed elements in many mobile browsers, causing per-frame
 *       repaints. Replaced with a thin 1px border highlight.
 *     - whileHover DISABLED. Touch devices fire touchstart/end, not hover.
 *       Keeping it adds a Framer Motion listener for nothing.
 *     - transformStyle: preserve-3d REMOVED. Without tilt, 3D context is
 *       unnecessary and adds compositing overhead.
 *
 *   All profiles:
 *     - willChange: 'transform' on the outer motion.div
 *     - loading="lazy" + decoding="async" on <img>
 *     - transform: 'translateZ(0)' for GPU promotion on older Safari
 */

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ project, opacity, y, rotate, scale, profile }) => {
  const isMobile  = profile === 'mobile';
  const isTablet  = profile === 'tablet';
  const isDesktop = profile === 'desktop';

  // ----- 3D Tilt (Desktop & Tablet only) -----
  /**
   * Mouse-tracking springs: on mobile we still call these hooks (Rules of Hooks),
   * but we never attach the resulting values to any DOM node, so they're
   * computationally inert — Framer Motion only runs spring integration when
   * the MotionValue actually changes, which never happens without handlers.
   */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Tighter spring on tablet = less motion overshoot on less precise touch input
  const springOpts = isTablet
    ? { stiffness: 250, damping: 50 }
    : { stiffness: 300, damping: 40 };

  const mouseXSpring = useSpring(mouseX, springOpts);
  const mouseYSpring = useSpring(mouseY, springOpts);

  const tiltRotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const tiltRotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);

  const handleMouseMove = (e) => {
    const rect   = e.currentTarget.getBoundingClientRect();
    const xPct   = (e.clientX - rect.left) / rect.width  - 0.5;
    const yPct   = (e.clientY - rect.top)  / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // ----- Layout -----
  const cardWidth = isMobile ? '240px' : isTablet ? '300px' : '350px';

  // ----- Style objects -----

  /**
   * Outer wrapper — carries the scroll-driven parallax transforms.
   * willChange: 'transform' tells the browser to keep this element on
   * its own GPU layer continuously, avoiding layer promotion/demotion
   * stutters during scroll.
   */
  const outerStyle = {
    position: 'absolute',
    top:    project.top,
    left:   project.left,
    right:  project.right,
    bottom: project.bottom,
    width:  cardWidth,
    y,
    opacity,
    scale,
    rotate,
    zIndex: project.zIndex,
    pointerEvents: 'auto',
    willChange: 'transform',
    // GPU compositing hint for older Safari / WebKit
    transform: 'translateZ(0)',
  };

  /**
   * Inner card — carries optional 3D tilt.
   *
   * Mobile card style: no blur, no shadow, thin accent border.
   * The opaque background (rgba(20,21,30,0.88)) replaces glassmorphism —
   * visually similar at mobile sizes where backdrop detail is less noticeable.
   */
  const innerStyleMobile = {
    width: '100%',
    background: 'rgba(20, 21, 30, 0.88)',
    borderRadius: '20px',
    // Thin luminous border instead of box-shadow — zero GPU repaint cost
    border: '1px solid rgba(108, 99, 255, 0.3)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  };

  const innerStyleTablet = {
    width: '100%',
    background: 'rgba(20, 21, 30, 0.65)',
    // Reduced blur intensity on tablet vs desktop (8px vs 16px)
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    // Lighter shadow than desktop — reduces repaint area
    boxShadow: '0 15px 30px -8px rgba(0, 0, 0, 0.45)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    rotateX: tiltRotateX,
    rotateY: tiltRotateY,
    transformStyle: 'preserve-3d',
  };

  const innerStyleDesktop = {
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
    rotateX: tiltRotateX,
    rotateY: tiltRotateY,
    transformStyle: 'preserve-3d',
  };

  const innerStyle = isMobile
    ? innerStyleMobile
    : isTablet
    ? innerStyleTablet
    : innerStyleDesktop;

  // whileHover: only meaningful on pointer devices
  const hoverAnimation = isMobile ? undefined : {
    borderColor: 'rgba(108, 99, 255, 0.5)',
    boxShadow: isTablet
      ? '0 20px 40px rgba(108, 99, 255, 0.15)'
      : '0 30px 60px rgba(108, 99, 255, 0.2)',
  };

  // Event handlers: skip on mobile (touch doesn't fire mousemove meaningfully)
  const mouseHandlers = isMobile
    ? {}
    : { onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };

  // Image height slightly smaller on mobile to reduce decode cost
  const imgHeight = isMobile ? '150px' : '180px';

  return (
    <motion.div style={outerStyle}>
      <motion.div
        {...mouseHandlers}
        style={innerStyle}
        whileHover={hoverAnimation}
      >
        {/* Project thumbnail */}
        <div style={{ width: '100%', height: imgHeight, overflow: 'hidden' }}>
          <img
            src={project.image}
            alt={project.title}
            /**
             * loading="lazy" — browser defers decode until card is near
             * the viewport. On mobile with 2 cards, still helpful since
             * they start far off-screen.
             *
             * decoding="async" — image decode runs off the main thread,
             * preventing jank on first paint. Critical on mobile where
             * the main thread is also running JS animation frames.
             */
            loading="lazy"
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              // translateZ on image avoids sub-pixel rounding issues during 3D tilt
              transform: isDesktop || isTablet ? 'translateZ(20px)' : 'none',
            }}
          />
        </div>

        {/* Card body */}
        <div style={{
          padding: isMobile ? '1rem' : '1.5rem',
          transform: isDesktop || isTablet ? 'translateZ(30px)' : 'none',
        }}>
          <span style={{
            color: 'var(--accent-primary)',
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            {project.category}
          </span>
          <h3 style={{
            fontSize: isMobile ? '1.1rem' : '1.4rem',
            margin: '0.5rem 0',
            color: 'var(--text-primary)',
          }}>
            {project.title}
          </h3>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            lineHeight: 1.5,
            marginBottom: '1rem',
          }}>
            {project.description}
          </p>

          {/* Tech badges */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {project.tech.map((t, i) => (
              <span
                key={i}
                style={{
                  fontSize: '0.75rem',
                  padding: '0.2rem 0.6rem',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '12px',
                  color: 'var(--text-secondary)',
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Action links */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => {}}
              style={{
                color: 'var(--text-primary)',
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                fontSize: '0.9rem', fontWeight: 600,
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              }}
            >
              <FaGithub /> Code
            </button>
            <button
              onClick={() => {}}
              style={{
                color: 'var(--text-primary)',
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                fontSize: '0.9rem', fontWeight: 600,
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              }}
            >
              <FaExternalLinkAlt /> Live
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
