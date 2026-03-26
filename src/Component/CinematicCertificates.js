import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import certificates from './Certificates';

const useSceneTransforms = (smoothProgress, start, peak, end) => {
    const opacity = useTransform(smoothProgress, [start - 0.1, peak, end], [0, 1, 0]);
    const scale = useTransform(smoothProgress, [start - 0.1, peak, end], [0.8, 1, 1.2]);
    const y = useTransform(smoothProgress, [start - 0.1, peak, end], [50, 0, -50]);
    return { opacity, scale, y };
};

const CinematicCertificates = () => {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70, damping: 25, restDelta: 0.001
    });

    const scene1 = useSceneTransforms(smoothProgress, 0, 0.15, 0.33);
    const scene2 = useSceneTransforms(smoothProgress, 0.33, 0.50, 0.66);
    const scene3 = useSceneTransforms(smoothProgress, 0.66, 0.85, 1);

    const scenes = [scene1, scene2, scene3];

    const bgOrb1Y = useTransform(smoothProgress, [0, 1], [0, 500]);
    const bgOrb2Y = useTransform(smoothProgress, [0, 1], [0, -400]);

    return (
        <div ref={containerRef} style={{ height: '300vh', position: 'relative' }} id="certificates">
            <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden', background: 'var(--bg-primary)' }}>

                {/* PARALLAX LAYER */}
                <motion.div className="bg-orb bg-orb-1" style={{ y: bgOrb1Y, zIndex: 1, opacity: 0.5, top: '10%', right: '20%' }} />
                <motion.div className="bg-orb bg-orb-2" style={{ y: bgOrb2Y, zIndex: 1, opacity: 0.5, bottom: '10%', left: '20%' }} />

                <div style={{ position: 'absolute', top: '10%', width: '100%', textAlign: 'center', zIndex: 3 }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Certificates & Awards</h2>
                    <p className="text-gradient" style={{ fontSize: '1.2rem', fontWeight: 600 }}>My Learning Milestones</p>
                </div>

                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, pointerEvents: 'none' }}>
                    {certificates.map((cert, index) => {
                        const { opacity, scale, y } = scenes[index];
                        return (
                            <motion.div
                                key={index}
                                className="glass-panel"
                                style={{
                                    opacity, scale, y,
                                    position: 'absolute',
                                    maxWidth: '500px',
                                    width: '90%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    overflow: 'hidden',
                                    pointerEvents: 'auto',
                                }}
                            >
                                <img src={cert.image} alt={cert.title} style={{ width: '100%', height: '260px', objectFit: 'cover' }} />
                                <div style={{ padding: '2rem' }}>
                                    <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: '1.4' }}>{cert.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.6' }}>{cert.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CinematicCertificates;
