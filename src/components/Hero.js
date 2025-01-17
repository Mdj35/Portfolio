// Hero.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshWobbleMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';

const Hero = () => {
  const sphereMotion = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 1 } },
  };

  return (
    <div className="hero-container" style={{ height: '100vh', position: 'relative' }}>
      <Canvas>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} />
        <motion.group
          initial="hidden"
          animate="visible"
          variants={sphereMotion}
          whileHover={{ scale: 1.1 }}
        >
          <Sphere args={[1, 64, 64]} position={[0, 0, 0]}>
            <MeshWobbleMaterial attach="material" color="#ff6f61" factor={1} speed={1.5} />
          </Sphere>
        </motion.group>
        <OrbitControls enableZoom={false} />
      </Canvas>
      <div className="hero-overlay">
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Welcome to My Portfolio
        </motion.h1>
        <motion.p
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Scroll down to explore
        </motion.p>
      </div>
    </div>
  );
};

export default Hero;
