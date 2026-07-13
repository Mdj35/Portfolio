import React from 'react';
import { motion, useTransform } from 'framer-motion';

const BackgroundEffects = ({ smoothProgress }) => {
  // Subtle breath effect for the background
  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.15]);

  return (
    <>
      {/* Deep Space Gradient */}
      <motion.div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(circle at center, var(--bg-tertiary) 0%, var(--bg-primary) 100%)',
          scale: bgScale,
          transformOrigin: 'center center',
          zIndex: 0
        }}
      />
      
      {/* Cinematic Noise Texture */}
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

      {/* Cinematic Vignette Overlay */}
      <div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(circle, transparent 40%, rgba(10, 11, 16, 0.9) 130%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Grid Overlay for Tech feel */}
      <div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
          opacity: 0.5,
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />
    </>
  );
};

export default BackgroundEffects;
