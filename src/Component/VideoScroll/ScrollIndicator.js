import React, { useState, useEffect } from 'react';

const ScrollIndicator = ({ smoothProgress }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const unsubscribe = smoothProgress.onChange((v) => {
      setPercent(Math.min(100, Math.max(0, Math.round(v * 100))));
    });
    return () => unsubscribe && unsubscribe();
  }, [smoothProgress]);

  return (
    <div style={{
      position: 'absolute',
      right: '2rem',
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem',
      zIndex: 10,
      pointerEvents: 'none'
    }}>
      {/* Percentage Counter */}
      <div style={{
        color: 'var(--accent-primary)',
        fontSize: '1rem',
        fontWeight: 800,
        fontFamily: 'monospace',
        letterSpacing: '2px',
        background: 'rgba(10, 11, 16, 0.7)',
        padding: '0.5rem 1rem',
        borderRadius: '30px',
        border: '1px solid var(--accent-primary)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 0 15px rgba(108, 99, 255, 0.3)',
        textShadow: '0 0 10px var(--accent-glow)'
      }}>
        {percent}%
      </div>

      {/* Markers (6 scenes) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'center' }}>
        {[0, 1, 2, 3, 4, 5].map((step) => {
          // Each scene takes about 16.6% of the scroll
          const startPercent = step * (100 / 6);
          const endPercent = (step + 1) * (100 / 6);
          const isActive = percent >= startPercent && percent < endPercent + 5;
          
          return (
            <div key={step} style={{
              width: '4px',
              height: isActive ? '32px' : '10px',
              background: isActive ? 'var(--accent-primary)' : 'rgba(255,255,255,0.15)',
              borderRadius: '4px',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              boxShadow: isActive ? '0 0 12px var(--accent-glow)' : 'none'
            }} />
          );
        })}
      </div>
    </div>
  );
};

export default ScrollIndicator;
