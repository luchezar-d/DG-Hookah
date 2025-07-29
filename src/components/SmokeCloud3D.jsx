import { motion, useTransform } from 'framer-motion';
import { useState } from 'react';

const SmokeCloud3D = ({ 
  scrollProgress, 
  mousePosition, 
  cloudIndex, 
  position = { x: 50, y: 50, z: 0 },
  size = 100,
  opacity = 0.3 
}) => {
  const [cloudLayers] = useState(() => {
    // Generate random positions for cloud layers to create volume - reduced for performance
    return Array.from({ length: 4 }, (_, i) => ({
      x: (Math.random() - 0.5) * 40,
      y: (Math.random() - 0.5) * 30,
      z: (Math.random() - 0.5) * 60,
      scale: 0.7 + Math.random() * 0.6,
      rotation: Math.random() * 360,
      opacity: 0.4 + Math.random() * 0.3,
      delay: Math.random() * 2,
    }));
  });

  // 3D rotation based on scroll and mouse using useTransform
  const baseRotationX = useTransform(scrollProgress, [0, 1], [0, 360]);
  const baseRotationY = useTransform(scrollProgress, [0, 1], [0, 180]);
  const baseRotationZ = useTransform(scrollProgress, [0, 1], [0, 90]);
  
  // Additional rotation from mouse movement
  const mouseRotateX = mousePosition.y * 20;
  const mouseRotateY = mousePosition.x * 30;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translateZ(${position.z}px)`,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        rotateX: baseRotationX,
        rotateY: baseRotationY,
        rotateZ: baseRotationZ,
      }}
      animate={{
        rotateX: mouseRotateX + cloudIndex * 30,
        rotateY: mouseRotateY + cloudIndex * 45,
        rotateZ: cloudIndex * 15,
      }}
      transition={{
        duration: 20 + cloudIndex * 2,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {cloudLayers.map((layer, i) => (
        <motion.div
          key={i}
          className="absolute w-24 h-24 rounded-full bg-white/20 blur-lg"
          style={{
            transform: `translate3d(${layer.x}px, ${layer.y}px, ${layer.z}px) scale(${layer.scale})`,
            opacity: layer.opacity * opacity,
            width: `${size + layer.scale * 30}px`,
            height: `${size * 0.7 + layer.scale * 20}px`,
          }}
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 180],
            rotateZ: [layer.rotation, layer.rotation + 180],
            scale: [layer.scale, layer.scale * 1.2, layer.scale],
            opacity: [layer.opacity * opacity, layer.opacity * opacity * 1.5, layer.opacity * opacity],
          }}
          transition={{
            duration: 25 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: layer.delay,
          }}
        />
      ))}

      {/* Central cloud core for more density */}
      <motion.div
        className="absolute w-32 h-20 rounded-full bg-white/15 blur-xl"
        style={{
          transform: 'translate3d(-50%, -50%, 0)',
          left: '50%',
          top: '50%',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [opacity, opacity * 1.8, opacity],
          rotateY: [0, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default SmokeCloud3D;
