import React, { useRef, useState, useEffect } from 'react';
import { useScroll, useSpring, useTransform } from 'framer-motion';

import BackgroundEffects from './VideoScroll/BackgroundEffects';
import Scene from './VideoScroll/Scene';
import ProjectCard from './VideoScroll/ProjectCard';
import ScrollIndicator from './VideoScroll/ScrollIndicator';

import sample from './sample.jpg';
import church from './1.png';
import alampat from './alampat.png';
import hcdc from "./hcdc.jpg";
import skonnect from "./skonnect.png";
import compass from "./compass.jpeg";

const projectsData = [
  { id: 1, image: sample, title: "Chic Station", category: "Web Design", description: "A beautifully crafted web experience focusing on seamless interactions.", tech: ["React", "Framer Motion"], top: '10%', left: '5%', bottom: 'auto', right: 'auto', zIndex: 1 },
  { id: 2, image: church, title: "Our Lady Of Guadalupe Parish", category: "Full-Stack", description: "A comprehensive portal for community engagement and events.", tech: ["Next.js", "Tailwind"], top: 'auto', left: 'auto', bottom: '15%', right: '10%', zIndex: 2 },
  { id: 3, image: alampat, title: "Alampat", category: "Full-Stack", description: "Modern storefront with dynamic cart and checkout flows.", tech: ["React", "Node.js"], top: '40%', left: '10%', bottom: 'auto', right: 'auto', zIndex: 3 },
  { id: 4, image: hcdc, title: "HCDC Website", category: "Dashboard", description: "Internal management system for tracking student and faculty records.", tech: ["React", "Firebase"], top: 'auto', left: 'auto', bottom: '10%', right: '25%', zIndex: 1 },
  { id: 5, image: skonnect, title: "SKonnect", category: "Social Platform", description: "Connecting users through real-time chat and interactive feeds.", tech: ["React Native", "Socket.io"], top: '20%', left: 'auto', bottom: 'auto', right: '5%', zIndex: 2 },
  { id: 6, image: compass, title: "Compass", category: "Utility", description: "A navigation tool with advanced routing and location tracking.", tech: ["React", "Maps API"], top: '60%', left: '5%', bottom: 'auto', right: 'auto', zIndex: 3 }
];

const VideoScroll = () => {
  const containerRef = useRef(null);
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenSize.width < 768;

  // 800vh ensures a long enough scroll for 6 distinct scenes
  const getContainerHeight = () => isMobile ? '800vh' : '900vh';

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001
  });

  // SCENES MAPPING (6 Scenes evenly distributed across 0 to 1)
  // Scene 1: 0.00 - 0.15
  const s1_opacity = useTransform(smoothProgress, [0, 0.05, 0.12, 0.15], [0, 1, 1, 0]);
  const s1_scale = useTransform(smoothProgress, [0, 0.15], [0.8, 1.2]);
  const s1_y = useTransform(smoothProgress, [0, 0.15], [50, -50]);
  const s1_filter = useTransform(smoothProgress, [0, 0.05, 0.12, 0.15], ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(10px)']);

  // Scene 2: 0.15 - 0.30
  const s2_opacity = useTransform(smoothProgress, [0.15, 0.20, 0.27, 0.30], [0, 1, 1, 0]);
  const s2_scale = useTransform(smoothProgress, [0.15, 0.30], [0.8, 1.2]);
  const s2_y = useTransform(smoothProgress, [0.15, 0.30], [50, -50]);
  const s2_filter = useTransform(smoothProgress, [0.15, 0.20, 0.27, 0.30], ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(10px)']);

  // Scene 3: 0.30 - 0.45
  const s3_opacity = useTransform(smoothProgress, [0.30, 0.35, 0.42, 0.45], [0, 1, 1, 0]);
  const s3_scale = useTransform(smoothProgress, [0.30, 0.45], [0.8, 1.2]);
  const s3_y = useTransform(smoothProgress, [0.30, 0.45], [50, -50]);
  const s3_filter = useTransform(smoothProgress, [0.30, 0.35, 0.42, 0.45], ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(10px)']);

  // Scene 4: 0.45 - 0.60
  const s4_opacity = useTransform(smoothProgress, [0.45, 0.50, 0.57, 0.60], [0, 1, 1, 0]);
  const s4_scale = useTransform(smoothProgress, [0.45, 0.60], [0.8, 1.2]);
  const s4_y = useTransform(smoothProgress, [0.45, 0.60], [50, -50]);
  const s4_filter = useTransform(smoothProgress, [0.45, 0.50, 0.57, 0.60], ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(10px)']);

  // Scene 5: 0.60 - 0.75
  const s5_opacity = useTransform(smoothProgress, [0.60, 0.65, 0.72, 0.75], [0, 1, 1, 0]);
  const s5_scale = useTransform(smoothProgress, [0.60, 0.75], [0.8, 1.2]);
  const s5_y = useTransform(smoothProgress, [0.60, 0.75], [50, -50]);
  const s5_filter = useTransform(smoothProgress, [0.60, 0.65, 0.72, 0.75], ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(10px)']);

  // Scene 6 (Final): 0.75 - 1.00 (Stays on screen till the end)
  const s6_opacity = useTransform(smoothProgress, [0.75, 0.85, 1], [0, 1, 1]);
  const s6_scale = useTransform(smoothProgress, [0.75, 1], [0.8, 1.05]);
  const s6_y = useTransform(smoothProgress, [0.75, 1], [50, 0]);
  const s6_filter = useTransform(smoothProgress, [0.75, 0.85, 1], ['blur(10px)', 'blur(0px)', 'blur(0px)']);


  // PROJECT CARDS MAPPING
  // Each card floats up at different speeds over the entire scroll duration
  const p1_y = useTransform(smoothProgress, [0, 1], [500, -1000]);
  const p1_rotate = useTransform(smoothProgress, [0, 1], [-10, 15]);
  const p1_scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]);
  const p1_opacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  const p2_y = useTransform(smoothProgress, [0, 1], [800, -600]);
  const p2_rotate = useTransform(smoothProgress, [0, 1], [5, -20]);
  const p2_scale = useTransform(smoothProgress, [0, 0.5, 1], [0.7, 1, 0.8]);
  const p2_opacity = useTransform(smoothProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  const p3_y = useTransform(smoothProgress, [0, 1], [1000, -1200]);
  const p3_rotate = useTransform(smoothProgress, [0, 1], [-5, -15]);
  const p3_scale = useTransform(smoothProgress, [0, 0.5, 1], [0.9, 1.2, 1]);
  const p3_opacity = useTransform(smoothProgress, [0, 0.3, 0.9, 1], [0, 1, 1, 0]);

  const p4_y = useTransform(smoothProgress, [0, 1], [1200, -400]);
  const p4_rotate = useTransform(smoothProgress, [0, 1], [15, -5]);
  const p4_scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const p4_opacity = useTransform(smoothProgress, [0, 0.4, 0.9, 1], [0, 1, 1, 0]);

  const p5_y = useTransform(smoothProgress, [0, 1], [1500, -800]);
  const p5_rotate = useTransform(smoothProgress, [0, 1], [-20, 10]);
  const p5_scale = useTransform(smoothProgress, [0, 0.5, 1], [0.7, 1.1, 0.9]);
  const p5_opacity = useTransform(smoothProgress, [0, 0.5, 0.9, 1], [0, 1, 1, 0]);

  const p6_y = useTransform(smoothProgress, [0, 1], [1800, -500]);
  const p6_rotate = useTransform(smoothProgress, [0, 1], [10, -10]);
  const p6_scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]);
  const p6_opacity = useTransform(smoothProgress, [0, 0.6, 0.9, 1], [0, 1, 1, 0]);

  const projectAnimations = [
    { y: p1_y, rotate: p1_rotate, scale: p1_scale, opacity: p1_opacity },
    { y: p2_y, rotate: p2_rotate, scale: p2_scale, opacity: p2_opacity },
    { y: p3_y, rotate: p3_rotate, scale: p3_scale, opacity: p3_opacity },
    { y: p4_y, rotate: p4_rotate, scale: p4_scale, opacity: p4_opacity },
    { y: p5_y, rotate: p5_rotate, scale: p5_scale, opacity: p5_opacity },
    { y: p6_y, rotate: p6_rotate, scale: p6_scale, opacity: p6_opacity },
  ];

  return (
    <div ref={containerRef} style={{ height: getContainerHeight(), position: 'relative' }}>

      {/* Sticky Scroll Area */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden', background: 'var(--bg-primary)' }}>

        {/* Modern UI Background Effects */}
        <BackgroundEffects smoothProgress={smoothProgress} />

        {/* Scroll Indicator */}
        {!isMobile && <ScrollIndicator smoothProgress={smoothProgress} />}

        {/* Layer 2: Project Cards Parallax */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2, pointerEvents: 'none' }}>
          {projectsData.map((proj, idx) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              isMobile={isMobile}
              {...projectAnimations[idx]}
            />
          ))}
        </div>

        {/* Layer 3: Cinematic Text Scenes */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3, pointerEvents: 'none' }}>

          <Scene title="My Perspective" subtitle="Transforming ideas into meaningful digital experiences" opacity={s1_opacity} scale={s1_scale} y={s1_y} filter={s1_filter} isMobile={isMobile} />
          <Scene title="Designing Solutions" subtitle="Combining creativity, technology, and user experience" opacity={s2_opacity} scale={s2_scale} y={s2_y} filter={s2_filter} isMobile={isMobile} />
          <Scene title="Building Systems" subtitle="From web applications to intelligent platforms" opacity={s3_opacity} scale={s3_scale} y={s3_y} filter={s3_filter} isMobile={isMobile} />
          <Scene title="Exploring Innovation" subtitle="AI, automation, and modern software development" opacity={s4_opacity} scale={s4_scale} y={s4_y} filter={s4_filter} isMobile={isMobile} />
          <Scene title="My Projects" subtitle="Real-world solutions built with passion" opacity={s5_opacity} scale={s5_scale} y={s5_y} filter={s5_filter} isMobile={isMobile} />

          {/* Final Scene with progress bar override if needed */}
          <Scene title="Explore My Work" subtitle="Scroll down to discover my projects ↓" opacity={s6_opacity} scale={s6_scale} y={s6_y} filter={s6_filter} isMobile={isMobile} />

        </div>

      </div>
    </div>
  );
};

export default VideoScroll;
