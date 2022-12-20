import { Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

import { Blob, Cursor, TransitionManager } from '@/components3D';

const Scene = () => {
  return (
    <Suspense fallback={null}>
      <Environment preset="city" />
      <ambientLight />
      <Cursor />
      <Blob />
      <TransitionManager />
    </Suspense>
  );
};

export const GlobalCanvas = () => {
  return (
    <Canvas
      orthographic
      camera={{ fov: 12, zoom: 100, position: [0, 0, 100] }}
      className="!fixed !inset-0 !pointer-events-none"
    >
      <Scene />
    </Canvas>
  );
};
