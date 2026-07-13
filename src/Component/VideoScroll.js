/**
 * VideoScroll.js
 *
 * Main orchestrator for the cinematic scroll section.
 *
 * PERFORMANCE ARCHITECTURE:
 *   - useDeviceProfile() resolves 'mobile' | 'tablet' | 'desktop' once on mount
 *     and on window resize (debounced via rAF).
 *   - useSpring is conditionally applied: desktop/tablet get smooth spring
 *     physics; mobile uses raw scrollYProgress (snappier, zero overhead).
 *   - Only config.visibleImages are rendered — mobile shows 2, tablet 4,
 *     desktop all 6. Fewer mounted nodes = fewer composited layers.
 *   - useMemo wraps projectAnimations so the array ref stays stable
 *     across renders, preventing unnecessary child re-renders.
 */

import React, { useRef, useMemo } from 'react';
import { useScroll, useSpring, useTransform } from 'framer-motion';

import BackgroundEffects from './VideoScroll/BackgroundEffects';
import Scene from './VideoScroll/Scene';
import ProjectCard from './VideoScroll/ProjectCard';
import ScrollIndicator from './VideoScroll/ScrollIndicator';

import { useDeviceProfile, ANIMATION_CONFIG } from './VideoScroll/animationConfig';

// ---------------------------------------------------------------------------
// Image imports — we import all 6 at the module level (webpack tree-shaking
// handles bundling), but we conditionally render only config.visibleImages.
// On mobile, 4 images never mount as <img> tags, so they're not decoded.
// ---------------------------------------------------------------------------
import sample   from './sample.jpg';
import church   from './1.png';
import alampat  from './alampat.png';
import hcdc     from './hcdc.jpg';
import skonnect from './skonnect.png';
import compass  from './compass.jpeg';

// Full project data — sliced by config.visibleImages before rendering
const ALL_PROJECTS = [
  {
    id: 1, image: sample,
    title: "Chic Station", category: "Web Design",
    description: "A beautifully crafted web experience focusing on seamless interactions.",
    tech: ["React", "Framer Motion"],
    top: '10%', left: '5%', bottom: 'auto', right: 'auto', zIndex: 1,
  },
  {
    id: 2, image: church,
    title: "Our Lady Of Guadalupe Parish", category: "Full-Stack",
    description: "A comprehensive portal for community engagement and events.",
    tech: ["Next.js", "Tailwind"],
    top: 'auto', left: 'auto', bottom: '15%', right: '10%', zIndex: 2,
  },
  {
    id: 3, image: alampat,
    title: "Alampat", category: "Full-Stack",
    description: "Modern storefront with dynamic cart and checkout flows.",
    tech: ["React", "Node.js"],
    top: '40%', left: '10%', bottom: 'auto', right: 'auto', zIndex: 3,
  },
  {
    id: 4, image: hcdc,
    title: "HCDC Website", category: "Dashboard",
    description: "Internal management system for tracking student and faculty records.",
    tech: ["React", "Firebase"],
    top: 'auto', left: 'auto', bottom: '10%', right: '25%', zIndex: 1,
  },
  {
    id: 5, image: skonnect,
    title: "SKonnect", category: "Social Platform",
    description: "Connecting users through real-time chat and interactive feeds.",
    tech: ["React Native", "Socket.io"],
    top: '20%', left: 'auto', bottom: 'auto', right: '5%', zIndex: 2,
  },
  {
    id: 6, image: compass,
    title: "Compass", category: "Utility",
    description: "A navigation tool with advanced routing and location tracking.",
    tech: ["React", "Maps API"],
    top: '60%', left: '5%', bottom: 'auto', right: 'auto', zIndex: 3,
  },
];

// ---------------------------------------------------------------------------
// Per-scene scroll keyframes — evenly distributed across [0, 1]
// Scenes: 1→0.15, 2→0.30, 3→0.45, 4→0.60, 5→0.75, 6→1.00
// ---------------------------------------------------------------------------
const SCENE_KEYFRAMES = [
  { in: [0,    0.05, 0.12, 0.15] },   // Scene 1
  { in: [0.15, 0.20, 0.27, 0.30] },   // Scene 2
  { in: [0.30, 0.35, 0.42, 0.45] },   // Scene 3
  { in: [0.45, 0.50, 0.57, 0.60] },   // Scene 4
  { in: [0.60, 0.65, 0.72, 0.75] },   // Scene 5
  { in: null },                        // Scene 6 — stays on screen till end
];

const SCENE_CONTENT = [
  { title: "My Perspective",      subtitle: "Transforming ideas into meaningful digital experiences" },
  { title: "Designing Solutions", subtitle: "Combining creativity, technology, and user experience" },
  { title: "Building Systems",    subtitle: "From web applications to intelligent platforms" },
  { title: "Exploring Innovation",subtitle: "AI, automation, and modern software development" },
  { title: "My Projects",         subtitle: "Real-world solutions built with passion" },
  { title: "Explore My Work",     subtitle: "Scroll down to discover my projects ↓" },
];

// ---------------------------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------------------------
const VideoScroll = () => {
  const containerRef = useRef(null);

  // Single source of truth for the current performance profile
  const profile = useDeviceProfile();
  const config  = ANIMATION_CONFIG[profile];

  // ----- Scroll progress -----
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  /**
   * Conditionally apply spring smoothing.
   *
   * Desktop/Tablet: useSpring adds cinematic momentum — scroll feels weighted.
   * Mobile: raw scrollYProgress is used directly. Spring on mobile causes the
   * motion value to remain "in flight" for hundreds of ms after scrolling stops,
   * keeping the animation thread hot and draining battery.
   */
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const desktopSpring = useSpring(scrollYProgress, config.springConfig ?? { stiffness: 60, damping: 20 });
  const progress = config.useSpring ? desktopSpring : scrollYProgress;

  // ----- Scene transforms (memoised per profile to avoid redundant hook calls) -----
  // Scene opacity/scale/y/filter values are always derived from `progress`.
  // Scenes 1-5 use the same pattern; scene 6 is the "stay on screen" finale.

  const s1_opacity = useTransform(progress, SCENE_KEYFRAMES[0].in, [0, 1, 1, 0]);
  const s1_scale   = useTransform(progress, [0, 0.15], config.sceneScaleRange);
  const s1_y       = useTransform(progress, [0, 0.15], config.sceneYRange);
  const s1_filter  = useTransform(progress, SCENE_KEYFRAMES[0].in,
    config.sceneBlur ? ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(10px)'] : [1, 1, 1, 1]);

  const s2_opacity = useTransform(progress, SCENE_KEYFRAMES[1].in, [0, 1, 1, 0]);
  const s2_scale   = useTransform(progress, [0.15, 0.30], config.sceneScaleRange);
  const s2_y       = useTransform(progress, [0.15, 0.30], config.sceneYRange);
  const s2_filter  = useTransform(progress, SCENE_KEYFRAMES[1].in,
    config.sceneBlur ? ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(10px)'] : [1, 1, 1, 1]);

  const s3_opacity = useTransform(progress, SCENE_KEYFRAMES[2].in, [0, 1, 1, 0]);
  const s3_scale   = useTransform(progress, [0.30, 0.45], config.sceneScaleRange);
  const s3_y       = useTransform(progress, [0.30, 0.45], config.sceneYRange);
  const s3_filter  = useTransform(progress, SCENE_KEYFRAMES[2].in,
    config.sceneBlur ? ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(10px)'] : [1, 1, 1, 1]);

  const s4_opacity = useTransform(progress, SCENE_KEYFRAMES[3].in, [0, 1, 1, 0]);
  const s4_scale   = useTransform(progress, [0.45, 0.60], config.sceneScaleRange);
  const s4_y       = useTransform(progress, [0.45, 0.60], config.sceneYRange);
  const s4_filter  = useTransform(progress, SCENE_KEYFRAMES[3].in,
    config.sceneBlur ? ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(10px)'] : [1, 1, 1, 1]);

  const s5_opacity = useTransform(progress, SCENE_KEYFRAMES[4].in, [0, 1, 1, 0]);
  const s5_scale   = useTransform(progress, [0.60, 0.75], config.sceneScaleRange);
  const s5_y       = useTransform(progress, [0.60, 0.75], config.sceneYRange);
  const s5_filter  = useTransform(progress, SCENE_KEYFRAMES[4].in,
    config.sceneBlur ? ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(10px)'] : [1, 1, 1, 1]);

  // Scene 6 — finale: fades in at 0.75 and stays visible
  const s6_opacity = useTransform(progress, [0.75, 0.85, 1], [0, 1, 1]);
  const s6_scale   = useTransform(progress, [0.75, 1], [config.sceneScaleRange[0], 1.0]);
  const s6_y       = useTransform(progress, [0.75, 1], [config.sceneYRange[0], 0]);
  const s6_filter  = useTransform(progress, [0.75, 0.85, 1],
    config.sceneBlur ? ['blur(10px)', 'blur(0px)', 'blur(0px)'] : [0, 1, 1]);

  // ----- Project card parallax transforms -----
  /**
   * useMemo keeps the projectAnimations array reference stable.
   * Without it, re-renders caused by profile/resize changes would recreate
   * the array and force all ProjectCard children to re-render unnecessarily.
   *
   * Note: useTransform calls inside useMemo are safe because the profile
   * only changes on resize (not during scroll), so hook call count is stable.
   */
  // We must call all 6 useTransform sets unconditionally (Rules of Hooks),
  // then slice based on config.visibleImages when rendering.
  const p1_y       = useTransform(progress, [0, 1], config.parallaxRange[0] ?? [0, 0]);
  const p1_rotate  = useTransform(progress, [0, 1], config.rotationRange[0]  ?? [0, 0]);
  const p1_scale   = useTransform(progress, [0, 0.5, 1], config.scaleRange[0]   ?? [1, 1, 1]);
  const p1_opacity = useTransform(progress, config.opacityFade[0] ?? [0,0.1,0.9,1], [0, 1, 1, 0]);

  const p2_y       = useTransform(progress, [0, 1], config.parallaxRange[1] ?? [0, 0]);
  const p2_rotate  = useTransform(progress, [0, 1], config.rotationRange[1]  ?? [0, 0]);
  const p2_scale   = useTransform(progress, [0, 0.5, 1], config.scaleRange[1]   ?? [1, 1, 1]);
  const p2_opacity = useTransform(progress, config.opacityFade[1] ?? [0,0.1,0.9,1], [0, 1, 1, 0]);

  // Images 3-6: only used on tablet and desktop.
  // On mobile, config.parallaxRange only has 2 entries, so we fall back to [0,0].
  // These hooks still execute (Rules of Hooks), but the resulting MotionValues
  // are never attached to any DOM node, so they have zero rendering cost.
  const p3_y       = useTransform(progress, [0, 1], config.parallaxRange[2] ?? [0, 0]);
  const p3_rotate  = useTransform(progress, [0, 1], config.rotationRange[2]  ?? [0, 0]);
  const p3_scale   = useTransform(progress, [0, 0.5, 1], config.scaleRange[2]   ?? [1, 1, 1]);
  const p3_opacity = useTransform(progress, config.opacityFade[2] ?? [0,0.1,0.9,1], [0, 1, 1, 0]);

  const p4_y       = useTransform(progress, [0, 1], config.parallaxRange[3] ?? [0, 0]);
  const p4_rotate  = useTransform(progress, [0, 1], config.rotationRange[3]  ?? [0, 0]);
  const p4_scale   = useTransform(progress, [0, 0.5, 1], config.scaleRange[3]   ?? [1, 1, 1]);
  const p4_opacity = useTransform(progress, config.opacityFade[3] ?? [0,0.1,0.9,1], [0, 1, 1, 0]);

  const p5_y       = useTransform(progress, [0, 1], config.parallaxRange[4] ?? [0, 0]);
  const p5_rotate  = useTransform(progress, [0, 1], config.rotationRange[4]  ?? [0, 0]);
  const p5_scale   = useTransform(progress, [0, 0.5, 1], config.scaleRange[4]   ?? [1, 1, 1]);
  const p5_opacity = useTransform(progress, config.opacityFade[4] ?? [0,0.1,0.9,1], [0, 1, 1, 0]);

  const p6_y       = useTransform(progress, [0, 1], config.parallaxRange[5] ?? [0, 0]);
  const p6_rotate  = useTransform(progress, [0, 1], config.rotationRange[5]  ?? [0, 0]);
  const p6_scale   = useTransform(progress, [0, 0.5, 1], config.scaleRange[5]   ?? [1, 1, 1]);
  const p6_opacity = useTransform(progress, config.opacityFade[5] ?? [0,0.1,0.9,1], [0, 1, 1, 0]);

  // All 6 animation sets — we slice to config.visibleImages before rendering
  const allProjectAnimations = useMemo(() => [
    { y: p1_y, rotate: p1_rotate, scale: p1_scale, opacity: p1_opacity },
    { y: p2_y, rotate: p2_rotate, scale: p2_scale, opacity: p2_opacity },
    { y: p3_y, rotate: p3_rotate, scale: p3_scale, opacity: p3_opacity },
    { y: p4_y, rotate: p4_rotate, scale: p4_scale, opacity: p4_opacity },
    { y: p5_y, rotate: p5_rotate, scale: p5_scale, opacity: p5_opacity },
    { y: p6_y, rotate: p6_rotate, scale: p6_scale, opacity: p6_opacity },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], []); // MotionValues are stable references — no deps needed

  // Slice to only the visible images for this profile
  const visibleProjects    = ALL_PROJECTS.slice(0, config.visibleImages);
  const visibleAnimations  = allProjectAnimations.slice(0, config.visibleImages);

  return (
    <div
      ref={containerRef}
      style={{ height: config.containerHeight, position: 'relative' }}
    >
      {/* Sticky viewport — the entire cinematic experience lives here */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: 'var(--bg-primary)',
      }}>

        {/* Layer 0: Background atmosphere */}
        <BackgroundEffects smoothProgress={progress} profile={profile} />

        {/* Layer 1: Scroll progress indicator (desktop/tablet only) */}
        {profile !== 'mobile' && (
          <ScrollIndicator smoothProgress={progress} profile={profile} />
        )}

        {/* Layer 2: Floating project image cards — count driven by profile */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          zIndex: 2,
          pointerEvents: 'none',
        }}>
          {visibleProjects.map((proj, idx) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              profile={profile}
              {...visibleAnimations[idx]}
            />
          ))}
        </div>

        {/* Layer 3: Cinematic text scenes — always 6 scenes regardless of profile */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 3,
          pointerEvents: 'none',
        }}>
          <Scene {...SCENE_CONTENT[0]} opacity={s1_opacity} scale={s1_scale} y={s1_y} filter={s1_filter} profile={profile} />
          <Scene {...SCENE_CONTENT[1]} opacity={s2_opacity} scale={s2_scale} y={s2_y} filter={s2_filter} profile={profile} />
          <Scene {...SCENE_CONTENT[2]} opacity={s3_opacity} scale={s3_scale} y={s3_y} filter={s3_filter} profile={profile} />
          <Scene {...SCENE_CONTENT[3]} opacity={s4_opacity} scale={s4_scale} y={s4_y} filter={s4_filter} profile={profile} />
          <Scene {...SCENE_CONTENT[4]} opacity={s5_opacity} scale={s5_scale} y={s5_y} filter={s5_filter} profile={profile} />
          <Scene {...SCENE_CONTENT[5]} opacity={s6_opacity} scale={s6_scale} y={s6_y} filter={s6_filter} profile={profile} />
        </div>

      </div>
    </div>
  );
};

export default VideoScroll;
