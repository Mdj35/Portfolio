import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import sample from './sample.jpg';
import church from './1.png';
import alampat from './alampat.png';
import hcdc from "./hcdc.jpg";
import skonnect from "./skonnect.png";
import compass from "./compass.jpeg";

const VideoScroll = () => {
  const containerRef = useRef(null);
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive values based on screen size
  const isMobile = screenSize.width < 768;
  const isTablet = screenSize.width >= 768 && screenSize.width < 1024;

  const getTitleSize = () => {
    if (isMobile) return '2rem';
    if (isTablet) return '3rem';
    return '4.5rem';
  };

  const getSubtitleSize = () => {
    if (isMobile) return '0.9rem';
    if (isTablet) return '1.2rem';
    return '1.5rem';
  };

  const getMainTitleSize = () => {
    if (isMobile) return '2.5rem';
    if (isTablet) return '3.5rem';
    return '5rem';
  };

  const getImageSize = (baseSize) => {
    if (isMobile) return Math.round(baseSize * 0.5);
    if (isTablet) return Math.round(baseSize * 0.75);
    return baseSize;
  };

  const getContainerHeight = () => {
    if (isMobile) return '500vh';
    if (isTablet) return '450vh';
    return '400vh';
  };

  // Tracks the overall scroll of the 300vh container (starts at 0 when top is hit, ends at 1 when bottom is hit)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Apply physics spring for that buttery-smooth Shopify-style scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001
  });

  // ================= SCENE 1 =================
  // fades in at 0, max at 10%, fades out by 30%
  const opacity1 = useTransform(smoothProgress, [0, 0.1, 0.2, 0.3], [0, 1, 1, 0]);
  const scale1 = useTransform(smoothProgress, [0, 0.3], [0.8, 1.3]);
  const y1 = useTransform(smoothProgress, [0, 0.3], [50, -50]);

  // ================= SCENE 2 =================
  // fades in by 40%, out by 65%
  const opacity2 = useTransform(smoothProgress, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0]);
  const scale2 = useTransform(smoothProgress, [0.35, 0.65], [0.9, 1.2]);
  const y2 = useTransform(smoothProgress, [0.35, 0.65], [100, -100]);

  // ================= SCENE 3 =================
  // text enters from 0.65 to 0.75
  const opacity3 = useTransform(smoothProgress, [0.65, 0.75, 1], [0, 1, 1]);
  const scale3 = useTransform(smoothProgress, [0.65, 0.75], [0.9, 1.1]);
  const y3 = useTransform(smoothProgress, [0.65, 0.75], [150, 0]);
  
  // Progress bar fills strictly AFTER the text is on-screen (0.75 to 0.9)
  const progressBarWidth = useTransform(smoothProgress, [0.75, 0.9], ["0%", "100%"]);

  // ================= SHOPIFY-STYLE LAYERED PARALLAX =================
  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.1]); // Subtle background breath

  // Cards float up at highly varied speeds, simulating 3D depth
  const img1Y = useTransform(smoothProgress, [0, 1], [300, -800]); 
  const img1Rotate = useTransform(smoothProgress, [0, 1], [-10, 15]);

  const img2Y = useTransform(smoothProgress, [0, 1], [800, -400]);
  const img2Rotate = useTransform(smoothProgress, [0, 1], [5, -20]);

  const img3Y = useTransform(smoothProgress, [0, 1], [500, -1200]);
  const img3Rotate = useTransform(smoothProgress, [0, 1], [-5, -15]);

  const img4Y = useTransform(smoothProgress, [0, 1], [1200, -600]);
  const img4Rotate = useTransform(smoothProgress, [0, 1], [15, -5]);

  const img5Y = useTransform(smoothProgress, [0, 1], [600, -900]);
  const img5Rotate = useTransform(smoothProgress, [0, 1], [-20, 10]);

  // Overall opacity for floating images (fade out towards the very end to spotlight the progress bar)
  const floatOpacity = useTransform(smoothProgress, [0, 0.8, 1], [0.4, 0.4, 0]);

  return (
    // 400vh forces the user to scroll for 4 full screen-heights before they pass this section
    <div ref={containerRef} style={{ height: getContainerHeight(), position: 'relative' }}>
      
      {/* Sticky section anchors to the top while you scroll within the 400vh container */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden', background: 'var(--bg-primary)' }}>
        
        {/* PARALLAX LAYER 1: Deep Background */}
        <motion.div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(circle at center, var(--bg-tertiary) 0%, var(--bg-primary) 100%)',
          scale: bgScale,
          transformOrigin: 'center center',
          zIndex: 0
        }} />

        {/* SHOPIFY-STYLE PARALLAX IMAGES */}
        <motion.div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: floatOpacity, zIndex: 1, pointerEvents: 'none' }}>
          {/* Top Left, slow */}
          <motion.img src={sample} style={{ position: 'absolute', top: '10%', left: '5%', width: `${getImageSize(300)}px`, borderRadius: '16px', y: img1Y, rotate: img1Rotate, filter: 'blur(2px) brightness(0.7)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }} />
          
          {/* Bottom Right, medium */}
          <motion.img src={church} style={{ position: 'absolute', top: '70%', right: '10%', width: `${getImageSize(400)}px`, borderRadius: '16px', y: img2Y, rotate: img2Rotate, filter: 'blur(0px) brightness(0.8)', boxShadow: '0 30px 60px rgba(0,0,0,0.6)' }} />
          
          {/* Middle Left, super fast */}
          <motion.img src={alampat} style={{ position: 'absolute', top: '40%', left: '15%', width: `${getImageSize(250)}px`, borderRadius: '16px', y: img3Y, rotate: img3Rotate, filter: 'blur(1px) brightness(0.6)', boxShadow: '0 15px 30px rgba(0,0,0,0.4)' }} />
          
          {/* Very Bottom Right, huge and slow */}
          <motion.img src={hcdc} style={{ position: 'absolute', top: '90%', right: '25%', width: `${getImageSize(500)}px`, borderRadius: '16px', y: img4Y, rotate: img4Rotate, filter: 'blur(4px) brightness(0.5)', boxShadow: '0 25px 50px rgba(0,0,0,0.7)' }} />

          {/* Top Right, fast */}
          <motion.img src={skonnect} style={{ position: 'absolute', top: '20%', right: '5%', width: `${getImageSize(280)}px`, borderRadius: '16px', y: img5Y, rotate: img5Rotate, filter: 'blur(1px) brightness(0.7)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }} />
          
          {/* Extra: Center Left, medium */}
          <motion.img src={compass} style={{ position: 'absolute', top: '60%', left: '5%', width: `${getImageSize(320)}px`, borderRadius: '16px', y: img5Y, rotate: img1Rotate, filter: 'blur(3px) brightness(0.4)', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }} />
        </motion.div>
        
        {/* PARALLAX LAYER 3: Cinematic Text Sequences */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2, pointerEvents: 'none'
        }}>
          
          {/* Timeline Node 1 */}
          <motion.div style={{ opacity: opacity1, scale: scale1, y: y1, position: 'absolute', textAlign: 'center', padding: isMobile ? '0 1rem' : '0' }}>
            <h2 style={{ fontSize: getTitleSize(), fontWeight: 900, color: 'var(--text-primary)', textShadow: '0 10px 30px rgba(0,0,0,0.8)', margin: 0, textTransform: 'uppercase', letterSpacing: isMobile ? '2px' : '4px' }}>
              My Perspective
            </h2>
            <p className="text-gradient" style={{ fontSize: getSubtitleSize(), fontWeight: 600, marginTop: '1rem', letterSpacing: isMobile ? '1px' : '2px' }}>
              Turning Complexity into Clarity
            </p>
          </motion.div>

          {/* Timeline Node 2 */}
          <motion.div style={{ opacity: opacity2, scale: scale2, y: y2, position: 'absolute', textAlign: 'center', padding: isMobile ? '0 1rem' : '0' }}>
            <h2 style={{ fontSize: getTitleSize(), fontWeight: 900, color: 'var(--text-primary)', textShadow: '0 10px 30px rgba(0,0,0,0.8)', margin: 0, textTransform: 'uppercase', letterSpacing: isMobile ? '2px' : '4px' }}>
              Crafting Experiences
            </h2>
            <p className="text-gradient" style={{ fontSize: getSubtitleSize(), fontWeight: 600, marginTop: '1rem', letterSpacing: isMobile ? '1px' : '2px' }}>
              Beyond the Digital Interface
            </p>
          </motion.div>

          {/* Timeline Node 3 */}
          <motion.div style={{ opacity: opacity3, scale: scale3, y: y3, position: 'absolute', textAlign: 'center', padding: isMobile ? '0 1rem' : '0' }}>
            <h2 style={{ fontSize: getMainTitleSize(), fontWeight: 900, color: 'var(--accent-primary)', textShadow: '0 0 20px var(--accent-glow)', margin: 0, textTransform: 'uppercase', letterSpacing: isMobile ? '4px' : '8px' }}>
              Explore Everything
            </h2>
            <p style={{ fontSize: isMobile ? '0.85rem' : '1.2rem', color: 'var(--text-secondary)', marginTop: '2rem', letterSpacing: isMobile ? '2px' : '4px', textTransform: 'uppercase' }}>
              Scroll down to view my projects ↓
            </p>
            {/* Scroll Progress Indicator */}
            <div style={{ width: isMobile ? 'calc(100vw - 2rem)' : '500px', maxWidth: '80vw', height: '4px', background: 'rgba(255, 255, 255, 0.1)', margin: '1.5rem auto 0', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--surface-border)' }}>
              <motion.div style={{ width: progressBarWidth, height: '100%', background: 'var(--accent-primary)', boxShadow: '0 0 10px var(--accent-glow)' }} />
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default VideoScroll;
