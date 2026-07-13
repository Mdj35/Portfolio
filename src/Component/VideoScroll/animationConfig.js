/**
 * animationConfig.js
 *
 * Central source of truth for all three adaptive performance modes:
 *   - 'desktop'  → full cinematic Apple/Stripe-style experience
 *   - 'tablet'   → moderately reduced for mid-range devices
 *   - 'mobile'   → lightweight, GPU-safe, 60fps-first
 *
 * Why this file exists:
 *   Instead of scattering if/else isMobile checks across every component,
 *   we detect device capability once and expose typed config objects.
 *   Components stay pure and readable — they just consume the config.
 */

import { useEffect, useState } from 'react';

// ---------------------------------------------------------------------------
// 1. DEVICE PROFILE DETECTION
// ---------------------------------------------------------------------------

/**
 * detectCapability()
 *
 * Returns 'low' if the device signals it cannot handle heavy GPU work:
 *   - prefers-reduced-motion  → user explicitly requested less animation
 *   - hardwareConcurrency < 4 → fewer CPU cores (most entry-level phones)
 *   - deviceMemory < 2        → less than 2 GB RAM (cheap Android devices)
 *
 * We treat any one of these as sufficient reason to downgrade.
 * Note: deviceMemory is a Chrome-only API; we guard with typeof.
 */
function detectCapability() {
  if (typeof window === 'undefined') return 'high';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lowCores = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency < 4;
  const lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory < 2;

  return prefersReduced || lowCores || lowMemory ? 'low' : 'high';
}

/**
 * resolveProfile(width)
 *
 * Resolves one of three animation profiles based on viewport width and
 * hardware capability. Low-end devices are always forced to 'mobile'
 * even if their screen is large (e.g. a budget tablet with a big screen).
 */
export function resolveProfile(width) {
  const capability = detectCapability();

  // Force mobile performance on weak devices regardless of screen size
  if (capability === 'low') return 'mobile';

  if (width >= 1024) return 'desktop';
  if (width >= 768)  return 'tablet';
  return 'mobile';
}

/**
 * useDeviceProfile()
 *
 * React hook that tracks the current device profile and updates on resize.
 * Returns 'mobile' | 'tablet' | 'desktop'.
 */
export function useDeviceProfile() {
  const getProfile = () =>
    resolveProfile(typeof window !== 'undefined' ? window.innerWidth : 1280);

  const [profile, setProfile] = useState(getProfile);

  useEffect(() => {
    let rafId;
    const onResize = () => {
      // Debounce via requestAnimationFrame to avoid excessive re-renders
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setProfile(getProfile()));
    };

    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return profile;
}

// ---------------------------------------------------------------------------
// 2. PER-PROFILE ANIMATION CONSTANTS
// ---------------------------------------------------------------------------

/**
 * ANIMATION_CONFIG
 *
 * A lookup table of animation parameters per device profile.
 * All components import from here instead of hard-coding values.
 *
 * Design rationale per key:
 *
 *   containerHeight  — Mobile is 300vh (fast scroll, less fatigue on thumb);
 *                      Desktop is 900vh for a slow cinematic journey.
 *
 *   visibleImages    — Mobile renders only 2 project images to cut GPU
 *                      texture memory and reduce composited layers.
 *
 *   useSpring        — Spring physics adds a frame of latency per scroll tick.
 *                      On mobile, raw scrollYProgress is snappier and cheaper.
 *
 *   springConfig     — Desktop uses a slow, film-like spring. Tablet is tighter.
 *
 *   parallaxRange    — [startY, endY] passed to useTransform for floating images.
 *                      Smaller range = less GPU work compositing large offsets.
 *
 *   rotationRange    — [min, max] degrees. CSS rotation is cheap, but large
 *                      values cause sub-pixel anti-aliasing thrash on mobile.
 *
 *   sceneBlur        — blur() on scene text is a GPU filter operation. On mobile
 *                      we swap it for opacity which is composited for free.
 *
 *   cardBlur         — backdropFilter: blur() forces a new compositing layer AND
 *                      copies the background bitmap. Disabled on mobile.
 *
 *   cardShadow       — box-shadow triggers repaint on transform change. Mobile
 *                      uses a simple border highlight instead.
 *
 *   bgScaleAnimation — Animating a full-screen div's scale re-composites the
 *                      entire background. Disabled on mobile for free savings.
 *
 *   noiseTexture     — SVG noise is a CPU paint operation. Hidden on mobile.
 *
 *   scaleRange       — scene zoom in/out [from, to]. Reduced on mobile to cut
 *                      texture scaling overhead.
 */
export const ANIMATION_CONFIG = {
  desktop: {
    containerHeight: '900vh',
    visibleImages: 6,
    useSpring: true,
    springConfig: { stiffness: 60, damping: 20, restDelta: 0.001 },
    parallaxRange: [
      [500,  -1000],  // image 1
      [800,  -600],   // image 2
      [1000, -1200],  // image 3
      [1200, -400],   // image 4
      [1500, -800],   // image 5
      [1800, -500],   // image 6
    ],
    rotationRange: [
      [-10,  15],   // image 1
      [5,   -20],   // image 2
      [-5,  -15],   // image 3
      [15,   -5],   // image 4
      [-20,  10],   // image 5
      [10,  -10],   // image 6
    ],
    scaleRange:    [[0.8, 1.1, 0.9], [0.7, 1, 0.8], [0.9, 1.2, 1], [0.8, 1, 0.8], [0.7, 1.1, 0.9], [0.8, 1.1, 0.9]],
    opacityFade:   [[0, 0.1, 0.9, 1], [0, 0.2, 0.9, 1], [0, 0.3, 0.9, 1], [0, 0.4, 0.9, 1], [0, 0.5, 0.9, 1], [0, 0.6, 0.9, 1]],
    sceneBlur: true,
    cardBlur: true,
    cardShadow: true,
    card3dTilt: true,
    bgScaleAnimation: true,
    noiseTexture: true,
    sceneScaleRange: [0.8, 1.2],
    sceneYRange: [50, -50],
    bgScaleFrom: 1,
    bgScaleTo: 1.15,
  },

  tablet: {
    containerHeight: '700vh',
    visibleImages: 4,
    useSpring: true,
    // Tighter spring = quicker settle = fewer composited frames in flight
    springConfig: { stiffness: 80, damping: 25, restDelta: 0.001 },
    parallaxRange: [
      [300,  -500],   // image 1
      [500,  -300],   // image 2
      [700,  -600],   // image 3
      [800,  -200],   // image 4
    ],
    rotationRange: [
      [-5,   8],    // image 1
      [3,   -10],   // image 2
      [-3,   -8],   // image 3
      [8,    -3],   // image 4
    ],
    scaleRange:    [[0.85, 1.05, 0.95], [0.8, 1, 0.85], [0.9, 1.1, 0.95], [0.85, 1, 0.85]],
    opacityFade:   [[0, 0.1, 0.9, 1], [0, 0.2, 0.9, 1], [0, 0.3, 0.9, 1], [0, 0.4, 0.9, 1]],
    sceneBlur: true,   // reduced intensity applied in Scene.js
    cardBlur: true,    // reduced intensity applied in ProjectCard.js
    cardShadow: true,  // reduced intensity applied in ProjectCard.js
    card3dTilt: true,
    bgScaleAnimation: true,
    noiseTexture: true,
    sceneScaleRange: [0.85, 1.1],
    sceneYRange: [30, -30],
    bgScaleFrom: 1,
    bgScaleTo: 1.08,
  },

  mobile: {
    containerHeight: '300vh',
    visibleImages: 2,
    // Mobile: skip spring entirely — raw scrollYProgress is cheaper and snappier.
    // Spring adds ~1 frame of latency per tick and keeps motion values "hot"
    // longer, consuming CPU cycles in the background.
    useSpring: false,
    springConfig: null,
    parallaxRange: [
      [120, -120],  // image 1 — minimal parallax, just enough to feel alive
      [200, -100],  // image 2
    ],
    rotationRange: [
      [-3,  3],     // image 1 — very subtle rotation, avoids sub-pixel aliasing
      [2,  -2],     // image 2
    ],
    scaleRange:    [[0.9, 1.0, 0.95], [0.9, 1.0, 0.95]],
    opacityFade:   [[0, 0.1, 0.9, 1], [0, 0.2, 0.9, 1]],
    // Mobile: blur() is disabled. It forces an offscreen compositing layer
    // (GPU copy of the backdrop) which causes frame drops on mobile GPUs.
    // We use opacity transitions instead — free to composite.
    sceneBlur: false,
    // Mobile: backdropFilter is disabled. Same reason as sceneBlur.
    // Cards get an opaque dark background instead.
    cardBlur: false,
    // Mobile: box-shadow is disabled. Large shadows repaint on every
    // transform tick. We use a thin border highlight — paint-free.
    cardShadow: false,
    // Mobile: 3D tilt requires spring-based mouse tracking which is both
    // a CPU (spring computation) and GPU (3D perspective) cost. Disabled.
    card3dTilt: false,
    // Mobile: animating a full-screen background div's scale re-composites
    // the entire viewport texture every frame. Static background saves ~20% GPU.
    bgScaleAnimation: false,
    // Mobile: SVG noise is a browser-rendered paint, not a GPU texture.
    // Hiding it cuts one full-page repaint.
    noiseTexture: false,
    sceneScaleRange: [0.92, 1.02],  // minimal zoom
    sceneYRange: [20, -20],         // minimal y movement
    bgScaleFrom: 1,
    bgScaleTo: 1,
  },
};
