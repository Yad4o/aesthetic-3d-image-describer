import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function StarField() {
  const ref = useRef<THREE.Points>(null!);
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(5000 * 3);
    const cols = new Float32Array(5000 * 3);
    const color = new THREE.Color();
    
    for (let i = 0; i < 5000; i++) {
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 50;
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      
      const hue = Math.random() * 0.1 + 0.6; // Deep blue to purple
      color.setHSL(hue, 0.8, 0.7);
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }
    return [pos, cols];
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function FloatingSpheres() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh position={[5, 2, -5]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#0EA5E9" emissive="#0EA5E9" emissiveIntensity={0.5} roughness={0} metalness={1} transparent opacity={0.6} />
      </mesh>
      <mesh position={[-5, -2, -10]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="#6366F1" emissive="#6366F1" emissiveIntensity={0.5} roughness={0} metalness={1} transparent opacity={0.4} />
      </mesh>
    </Float>
  );
}

export const ThreeBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#020617]">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <StarField />
        <FloatingSpheres />
      </Canvas>
      <div className="absolute inset-0 bg-nebula pointer-events-none" />
    </div>
  );
};
