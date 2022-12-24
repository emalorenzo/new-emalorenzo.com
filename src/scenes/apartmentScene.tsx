import {
  AccumulativeShadows,
  Environment,
  Grid,
  RandomizedLight,
  Sphere,
  TransformControls,
  View,
} from '@react-three/drei';
import { useControls } from 'leva';
import { memo, Suspense, useRef } from 'react';
import type { Object3D } from 'three';
import { DirectionalLight } from 'three';

import { Apartment, Desk, Library } from '@/models';

// import { Heart } from '@/models';
// import { useGlobalStore } from '@/store';

const Shadows = memo(() => (
  <AccumulativeShadows
    temporal
    frames={100}
    color="#9d4b4b"
    colorBlend={0.5}
    alphaTest={0.9}
    scale={20}
  >
    <RandomizedLight amount={8} radius={4} position={[5, 5, -10]} />
  </AccumulativeShadows>
));

export const ApartmentScene = () => {
  const lightRef = useRef<Object3D>();

  // const likeRef = useGlobalStore((s) => s.likeRef);
  const { gridSize, ...gridConfig } = useControls({
    gridSize: [20.5, 20.5],
    cellSize: { value: 0.6, min: 0, max: 10, step: 0.1 },
    cellThickness: { value: 1, min: 0, max: 5, step: 0.1 },
    cellColor: '#6f6f6f',
    sectionSize: { value: 3.3, min: 0, max: 10, step: 0.1 },
    sectionThickness: { value: 0, min: 0, max: 5, step: 0.1 },
    sectionColor: '#9d4b4b',
    fadeDistance: { value: 18, min: 0, max: 100, step: 1 },
    fadeStrength: { value: 1, min: 0, max: 1, step: 0.1 },
    followCamera: false,
    infiniteGrid: false,
  });

  return (
    <Suspense fallback={null}>
      <Sphere ref={lightRef} position={[0, 0, 1]} scale={0.1}>
        <meshBasicMaterial color="hotpink" />
      </Sphere>
      <group position={[0, -0.05, 0]}>
        <Apartment position={[0, 0, 0]} />
        <Desk position={[-4.42, 0, -1.68]} />
        <Library position={[-4.55, 0, -0.42]} />
        <AccumulativeShadows
          temporal
          frames={100}
          color="#9d4b4b"
          colorBlend={0.5}
          alphaTest={0.9}
          scale={20}
          position={[0, 0, 0]}
        >
          <RandomizedLight amount={8} radius={4} position={[5, 1.5, -10]} />
        </AccumulativeShadows>
      </group>
      <Environment preset="city" />
      {/* <fog attach="fog" args={[0xffffff, 9.0, 30.0]} /> */}
      <ambientLight intensity={0.2} />
      <color attach="background" args={['#fff']} />
      {/* <gridHelper args={[25, 25, 0xf30000, 0x6f6f6f]} /> */}
      <Grid position={[0, -0.01, 0]} args={gridSize} {...gridConfig} />
      <Shadows />
      <directionalLight
        target={lightRef.current}
        intensity={0.3}
        castShadow
        position={[2, 2, -2]}
        shadow-camera-near={0.1}
        shadow-camera-far={200}
        shadow-camera-left={-1}
        shadow-camera-right={1}
        shadow-camera-top={1}
        shadow-camera-bottom={-1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </Suspense>
  );
};
