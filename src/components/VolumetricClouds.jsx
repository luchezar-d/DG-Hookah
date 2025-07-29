import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';

const VolumetricClouds = ({ 
  active = false, 
  mousePosition = { x: 0, y: 0 },
  intensity = 1,
  cloudCount = 15 
}) => {
  // Generate cloud particles with proper size and opacity ranges
  const cloudParticles = useMemo(() => {
    const particles = [];
    
    for (let i = 0; i < cloudCount; i++) {
      const size = 24 + Math.random() * 24; // 24-48px as specified
      particles.push({
        id: i,
        size,
        x: Math.random() * 100, // Percentage positioning
        y: Math.random() * 100,
        z: (Math.random() - 0.5) * 200, // 3D depth
        opacity: 0.05 + Math.random() * 0.25, // 0.05-0.3 range
        rotation: Math.random() * 360,
        speed: 0.8 + Math.random() * 1.2,
        floatAmplitude: 20 + Math.random() * 30,
        delay: Math.random() * 5,
      });
    }
    return particles;
  }, [cloudCount]);

  // Mouse interaction for subtle rotation
  const mouseRotateX = mousePosition.y * 5; // Subtle interaction
  const mouseRotateY = mousePosition.x * 8;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d',
            zIndex: 20, // Above section content
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: intensity }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {cloudParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute will-change-transform"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                transform: `translateZ(${particle.z}px)`,
                transformStyle: 'preserve-3d',
              }}
              initial={{
                opacity: 0,
                scale: 0.5,
                rotateX: particle.rotation,
              }}
              animate={{
                opacity: particle.opacity,
                scale: [1, 1.2, 1],
                rotateX: [particle.rotation, particle.rotation + 360],
                rotateY: [0, 180, 360],
                rotateZ: [0, mouseRotateY + particle.rotation, mouseRotateY + particle.rotation + 180],
                x: [
                  0,
                  Math.sin(particle.id * 0.5) * particle.floatAmplitude,
                  Math.cos(particle.id * 0.7) * particle.floatAmplitude,
                  0
                ],
                y: [
                  0,
                  Math.cos(particle.id * 0.3) * (particle.floatAmplitude * 0.6),
                  Math.sin(particle.id * 0.4) * (particle.floatAmplitude * 0.8),
                  0
                ],
              }}
              transition={{
                duration: 20 + particle.speed * 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: particle.delay,
                opacity: { duration: 2, delay: particle.delay * 0.3 },
                scale: { duration: 25 + particle.speed * 5 },
              }}
            >
              {/* Main cloud particle */}
              <div
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  background: `radial-gradient(circle at center, rgba(255,255,255,${particle.opacity * 0.8}) 0%, rgba(255,255,255,${particle.opacity * 0.4}) 40%, rgba(255,255,255,0) 80%)`,
                  borderRadius: '50%',
                  mixBlendMode: 'screen',
                  filter: 'blur(2px)',
                }}
              />
              
              {/* Secondary layer for volume */}
              <div
                className="absolute top-1 left-1"
                style={{
                  width: `${particle.size * 0.7}px`,
                  height: `${particle.size * 0.7}px`,
                  background: `radial-gradient(circle at 60% 30%, rgba(255,255,255,${particle.opacity * 0.6}) 0%, rgba(255,255,255,${particle.opacity * 0.2}) 50%, rgba(255,255,255,0) 80%)`,
                  borderRadius: '50%',
                  mixBlendMode: 'screen',
                  filter: 'blur(3px)',
                }}
              />

              {/* Tertiary wispy layer */}
              <div
                className="absolute -top-1 -left-1"
                style={{
                  width: `${particle.size * 1.3}px`,
                  height: `${particle.size * 0.8}px`,
                  background: `radial-gradient(ellipse 70% 50% at 40% 60%, rgba(255,255,255,${particle.opacity * 0.3}) 0%, rgba(255,255,255,${particle.opacity * 0.1}) 60%, rgba(255,255,255,0) 100%)`,
                  borderRadius: '50%',
                  mixBlendMode: 'screen',
                  filter: 'blur(4px)',
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VolumetricClouds;
