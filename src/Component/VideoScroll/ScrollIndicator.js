/**
 * ScrollIndicator.js
 *
 * Vertical progress indicator shown at the right edge of the viewport.
 * Displays scroll percentage and 6 scene markers.
 *
 * Only rendered on desktop and tablet (parent VideoScroll.js gates this
 * component behind `profile !== 'mobile'`).
 *
 * PERFORMANCE NOTES:
 *   - Uses useMotionValueEvent instead of the deprecated smoothProgress.onChange().
 *     The new API is tree-shakeable and integrates with Framer Motion's
 *     internal batching, reducing unnecessary React re-render scheduling.
 *   - State update (setPercent) is wrapped in Math.round to prevent sub-pixel
 *     floating point values from triggering rerenders for invisible changes.
 *   - The six marker divs use CSS transitions instead of Framer Motion
 *     animations — no extra JS cost, just a CSS paint update on active change.
 */

import React, { useState } from 'react';
import { useMotionValueEvent } from 'framer-motion';

const ScrollIndicator = ({ smoothProgress, profile }) => {
  const [percent, setPercent] = useState(0);

  /**
   * useMotionValueEvent replaces the deprecated MotionValue.onChange() API.
   * It subscribes to the MotionValue's "change" event and automatically
   * cleans up on unmount — no manual unsubscribe needed.
   *
   * We clamp to [0, 100] and round to avoid React scheduling re-renders
   * for sub-integer floating point changes (e.g. 42.0001 → 42.0002).
   */
  useMotionValueEvent(smoothProgress, 'change', (v) => {
    setPercent(Math.min(100, Math.max(0, Math.round(v * 100))));
  });

  // Tablet: slightly smaller UI to leave more room for content
  const isTablet = profile === 'tablet';

  return (
    <div
      style={{
        position: 'absolute',
        right: isTablet ? '1.25rem' : '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      {/* Percentage counter */}
      <div
        style={{
          color: 'var(--accent-primary)',
          fontSize: isTablet ? '0.85rem' : '1rem',
          fontWeight: 800,
          fontFamily: 'monospace',
          letterSpacing: '2px',
          background: 'rgba(10, 11, 16, 0.7)',
          padding: isTablet ? '0.4rem 0.75rem' : '0.5rem 1rem',
          borderRadius: '30px',
          border: '1px solid var(--accent-primary)',
          // Reduced blur on tablet vs desktop for slightly lower GPU cost
          backdropFilter: isTablet ? 'blur(8px)' : 'blur(12px)',
          WebkitBackdropFilter: isTablet ? 'blur(8px)' : 'blur(12px)',
          boxShadow: '0 0 15px rgba(108, 99, 255, 0.3)',
          textShadow: '0 0 10px var(--accent-glow)',
        }}
      >
        {percent}%
      </div>

      {/* Scene markers — 6 segments matching the 6 cinematic scenes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'center' }}>
        {[0, 1, 2, 3, 4, 5].map((step) => {
          const startPercent = step * (100 / 6);
          const endPercent   = (step + 1) * (100 / 6);
          const isActive     = percent >= startPercent && percent < endPercent + 5;

          return (
            <div
              key={step}
              style={{
                width: isTablet ? '3px' : '4px',
                height: isActive ? '32px' : '10px',
                background: isActive ? 'var(--accent-primary)' : 'rgba(255,255,255,0.15)',
                borderRadius: '4px',
                // Pure CSS transition — no Framer Motion overhead for simple size/color changes
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: isActive ? '0 0 12px var(--accent-glow)' : 'none',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ScrollIndicator;
