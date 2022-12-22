import { useGLTF } from '@react-three/drei';
import React, { useRef } from 'react';

import type { GLTFResult } from './types';

export const Desk = (props) => {
  const { nodes, materials } = useGLTF(
    '/models/desk.glb'
  ) as unknown as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group scale={[0.81, 1.04, 0.9]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube007.geometry}
          material={materials.MetalBlack}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube007_1.geometry}
          material={materials.DeskWood}
        />
      </group>
    </group>
  );
};

useGLTF.preload('/models/desk.glb');
