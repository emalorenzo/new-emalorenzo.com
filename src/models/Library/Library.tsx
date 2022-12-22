import { useGLTF } from '@react-three/drei';
import React from 'react';

import type { GLTFResult } from './types';

export const Library = (props: JSX.IntrinsicElements['group']) => {
  const { nodes, materials } = useGLTF(
    '/models/library.glb'
  ) as unknown as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group scale={0.32}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube009.geometry}
          material={materials.MetalBlack}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube009_1.geometry}
          material={materials.WoodCubes}
        />
      </group>
    </group>
  );
};

useGLTF.preload('/models/library.glb');
