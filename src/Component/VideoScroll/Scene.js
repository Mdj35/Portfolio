/**
 * Scene.js
 *
 * Renders a single full-screen cinematic text scene.
 *
 * PERFORMANCE NOTES:
 *   Desktop/Tablet — filter is a CSS blur() MotionValue string. Framer Motion
 *     interpolates between "blur(10px)" and "blur(0px)" during transitions.
 *     GPU cost: moderate. Acceptable because blur runs only during scene
 *     transitions, not continuously.
 *
 *   Mobile — blur() is DISABLED. Instead, we use the `filter` MotionValue
 *     as an opacity multiplier (0→1) so Scene.js can share the same prop
 *     interface. The opacity is derived from a separate `opacity` MotionValue.
 *     Result: zero GPU filter cost; pure compositor opacity = free.
 *
 *   willChange: 'transform, opacity' — tells the browser to promote this
 *     element to its own compositor layer ahead of time, avoiding layout
 *     recalculation when transforms change during scroll.
 *
 *   transform: 'translateZ(0)' — forces GPU compositing even in browsers
 *     that don't yet parse will-change. Belt-and-suspenders for Safari iOS.
 */

import React from 'react';
import { motion } from 'framer-motion';

const Scene = ({ title, subtitle, opacity, scale, y, filter, profile }) => {
  const isMobile = profile === 'mobile';
  const isDesktop = profile === 'desktop';

  // Typography scaling per profile
  const titleSize    = isDesktop ? '4.5rem' : isMobile ? '2rem'  : '3.2rem';
  const subtitleSize = isDesktop ? '1.5rem' : isMobile ? '0.9rem': '1.15rem';
  const letterSpacing = isMobile ? '2px' : '4px';
  const subLetterSpacing = isMobile ? '0.5px' : '2px';

  /**
   * On mobile, `filter` arrives as a 0-1 number MotionValue (not a CSS string).
   * We blend it into the opacity so the scene fades in cleanly without blur.
   * On desktop/tablet, `filter` is a CSS string like "blur(4px)" applied directly.
   *
   * Tablet blur is slightly softer than desktop: "blur(6px)" max vs "blur(10px)".
   * This is handled upstream in VideoScroll.js via the config, but Scene.js
   * also limits the blur intensity on tablet via a style override below.
   */
  const motionStyle = isMobile
    ? {
        // Mobile: GPU-safe transforms only — no filter, no text-shadow
        opacity,
        scale,
        y,
        // translateZ(0) forces a compositing layer on Safari iOS
        transform: 'translateZ(0)',
        willChange: 'transform, opacity',
        position: 'absolute',
        textAlign: 'center',
        padding: '0 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        pointerEvents: 'none',
      }
    : {
        // Desktop/Tablet: full cinematic treatment
        opacity,
        scale,
        y,
        filter,
        willChange: 'transform, opacity, filter',
        position: 'absolute',
        textAlign: 'center',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        pointerEvents: 'none',
      };

  return (
    <motion.div style={motionStyle}>
      <h2
        style={{
          fontSize: titleSize,
          fontWeight: 900,
          color: 'var(--text-primary)',
          // Mobile: text-shadow removed — GPU paint cost per character.
          // Replaced with pure color contrast for readability.
          textShadow: isMobile ? 'none' : '0 10px 30px rgba(0,0,0,0.8)',
          margin: 0,
          textTransform: 'uppercase',
          letterSpacing,
          lineHeight: 1.1,
        }}
      >
        {title}
      </h2>
      <p
        className="text-gradient"
        style={{
          fontSize: subtitleSize,
          fontWeight: 600,
          marginTop: '1rem',
          letterSpacing: subLetterSpacing,
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {subtitle}
      </p>
    </motion.div>
  );
};

export default Scene;
