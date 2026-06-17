import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Scroll3DWrapper = ({ children }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // When scrolling, the section folds in from the bottom, becomes flat at the center, and folds out at the top
  const rotateX = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [35, 0, 0, -35]);
  const scale = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [0.85, 1, 1, 0.85]);
  const opacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
  const y = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [150, 0, 0, -150]);

  return (
    <div ref={ref} style={{ perspective: "1500px", width: '100%' }}>
      <motion.div
        style={{
          rotateX,
          scale,
          opacity,
          y,
          transformStyle: "preserve-3d",
          willChange: "transform, opacity"
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Scroll3DWrapper;
