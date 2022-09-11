import {
  Box,
  Center,
  Environment,
  GradientTexture,
  MeshDistortMaterial,
  useCursor,
} from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';

import { DOMtoThreeCoords } from '@/lib/utils';
import { useGlobalStore } from '@/store';

const cursorPosition = new THREE.Vector3();
const WIDTH = 3;
const HEIGHT = 2;
const OFFSET = 0.2;

const Cursor = () => {
  console.log('render cursor');

  const ref = useRef<THREE.Group>(null);
  const cursorRef = useRef(useGlobalStore.getState().cursorPosition);

  useEffect(
    () =>
      useGlobalStore.subscribe((state) => {
        cursorRef.current = state.cursorPosition;
      }),
    []
  );

  const { viewport } = useThree();
  useFrame(() => {
    if (ref.current) {
      const { x, y } = DOMtoThreeCoords(
        cursorRef.current.x,
        cursorRef.current.y,
        viewport
      );

      cursorPosition.set(x, y, 0);
      ref.current.position.lerp(cursorPosition, 0.1);
    }
  });
  return (
    <group ref={ref}>
      <mesh
        scale={[WIDTH, HEIGHT, 1]}
        position={[WIDTH / 2 + OFFSET, HEIGHT / 2 + OFFSET, 2]}
      >
        <planeGeometry args={[1, 1, 32, 32]} />
        <MeshDistortMaterial ref={ref} speed={3}>
          <GradientTexture
            stops={[0, 0.8, 1]}
            colors={['#e63946', '#f1faee', '#a8dadc']}
            size={100}
          />
        </MeshDistortMaterial>
      </mesh>
    </group>
  );
};

const Scene = () => {
  return (
    <Suspense fallback={null}>
      <Environment preset="city" />
      <ambientLight />
      <Cursor />
    </Suspense>
  );
};

export const GlobalCanvas = () => {
  console.log('render global canvas');
  return (
    <Canvas
      orthographic
      camera={{ fov: 12, zoom: 100, position: [0, 0, 100] }}
      className="!fixed inset-0 pointer-events-none"
    >
      <Scene />
    </Canvas>
  );
};
