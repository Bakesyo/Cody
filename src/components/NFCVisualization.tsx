import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { easing } from 'maath';

export function NFCVisualization() {
  const { nodes, materials } = useGLTF('/models/nfc-chip.glb');
  const groupRef = useRef();

  useFrame((state, delta) => {
    easing.damp3(groupRef.current.rotation, [0, state.clock.elapsedTime * 0.2, 0], 0.25, delta);
  });

  return (
    <group ref={groupRef}>
      <mesh
        geometry={nodes.chip.geometry}
        material={materials.metal}
        receiveShadow
        castShadow
      />
    </group>
  );
} 