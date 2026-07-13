/**
 * BackgroundEffects.js
 *
 * Renders the cinematic atmosphere behind all other layers.
 *
 * PERFORMANCE STRATEGY BY PROFILE:
 *
 *   Desktop & Tablet:
 *     - Animated background scale (motion.div with scale MotionValue)
 *     - SVG noise texture overlay (fractal noise for film-grain feel)
 *     - Vignette overlay
 *     - Subtle grid overlay
 *
 *   Mobile:
 *     - Background scale animation DISABLED. Animating scale on a full-screen
 *       div forces the compositor to re-rasterize the entire viewport texture
 *       every frame. On a 390×844 phone at 2×DPR, that's ~660K pixels per
 *       frame. Removing it saves the GPU's most expensive operation.
 *       The static gradient looks identical when stationary.
 *
 *     - SVG noise texture DISABLED. SVG filters (feTurbulence) are rendered
 *       by the CPU's SVG engine, not the GPU. At 100vw × 100vh it's a full
 *       page CPU paint. Hidden on mobile — imperceptible at small sizes anyway.
 *
 *     - Vignette and grid are kept as pure CSS static divs — zero animation
 *       cost, they don't change during scroll.
 *
 *   willChange: 'transform' added to the animated background div so the
 *   browser promotes it to a GPU layer before animation begins.
 */

import React from 'react';
import { motion, useTransform } from 'framer-motion';

const BackgroundEffects = ({ smoothProgress, profile }) => {
  const isMobile = profile === 'mobile';

  // bgScale is still derived even on mobile (hooks must be called unconditionally),
  // but it's only attached to a motion.div when bgScaleAnimation is enabled.
  const bgScale = useTransform(
    smoothProgress,
    [0, 1],
    // Mobile config sets bgScaleFrom/To both to 1 (no-op), but we gate
    // rendering entirely below to avoid even a static motion.div layer.
    profile === 'desktop' ? [1, 1.15] : profile === 'tablet' ? [1, 1.08] : [1, 1]
  );

  return (
    <>
      {/* ---- Background gradient ---- */}
      {isMobile ? (
        /**
         * Mobile: plain static div.
         * No motion.div = no compositor layer promotion = no per-frame GPU cost.
         * The gradient is identical to the animated version when at rest.
         */
        <div
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'radial-gradient(circle at center, var(--bg-tertiary) 0%, var(--bg-primary) 100%)',
            zIndex: 0,
          }}
        />
      ) : (
        /**
         * Desktop/Tablet: animated scale creates the "breathing" zoom that
         * makes the background feel alive during scroll.
         * willChange: 'transform' ensures GPU layer is created in advance.
         */
        <motion.div
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'radial-gradient(circle at center, var(--bg-tertiary) 0%, var(--bg-primary) 100%)',
            scale: bgScale,
            transformOrigin: 'center center',
            willChange: 'transform',
            zIndex: 0,
          }}
        />
      )}

      {/* ---- Cinematic noise texture (Desktop & Tablet only) ---- */}
      {!isMobile && (
        /**
         * The SVG feTurbulence filter generates film-grain noise via the browser's
         * SVG rasterizer. Visually premium, but CPU-rendered — hidden on mobile
         * where the processing cost outweighs the subtle visual benefit.
         */
        <div
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            opacity: 0.05,
            mixBlendMode: 'overlay',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* ---- Cinematic vignette (all profiles) ---- */}
      {/*
       * Pure CSS radial gradient — static, no animation, no GPU layer needed.
       * Kept on mobile because it's free and dramatically improves text legibility
       * by darkening the edges where project cards float.
       */}
      <div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(circle, transparent 40%, rgba(10, 11, 16, 0.9) 130%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* ---- Subtle grid overlay (all profiles) ---- */}
      {/*
       * Static CSS background-image grid. Pure CSS — no JS, no animation,
       * no additional composited layer. Kept on all profiles.
       * Reduced opacity on mobile (0.3 vs 0.5) for a subtler look at small sizes.
       */}
      <div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: [
            'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '100px 100px',
          opacity: isMobile ? 0.3 : 0.5,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
    </>
  );
};

export default BackgroundEffects;
