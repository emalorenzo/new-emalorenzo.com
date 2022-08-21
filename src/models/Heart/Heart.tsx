import { useGLTF } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import gsap from 'gsap';
import { Fresnel, LayerMaterial } from 'lamina';
import React, { useRef } from 'react';
import * as THREE from 'three';

import { transformRangedValue } from '@/lib/utils';
import type { FillMaterialType } from '@/shaders/FillMaterial';
import { FillMaterial } from '@/shaders/FillMaterial';

import type { GLTFResult } from './types';

extend({ FillMaterial });

type Props = {
  maxCount: number;
  scaleFactor: number;
} & JSX.IntrinsicElements['group'];

export const Heart: React.FC<Props> = ({ maxCount, scaleFactor, ...props }) => {
  const ref = useRef<THREE.Group>(null);
  const clicks = useRef<number>(0);
  const percentRef = useRef(0);
  const targetPercentRef = useRef(0);
  const fillRef = useRef<FillMaterialType>();
  const fresnelRef = useRef<typeof Fresnel & { alpha: number }>(null);
  const { nodes, materials } = useGLTF(
    '/models/heart.glb'
  ) as unknown as GLTFResult;

  useFrame(() => {
    if (ref.current && percentRef.current > 1) {
      ref.current.rotation.y += 0.01;
    }

    if (percentRef.current < targetPercentRef.current) {
      percentRef.current += 0.002;

      const filled = transformRangedValue(
        percentRef.current,
        0.0,
        1.0,
        0.13,
        0.27
      );
      fillRef.current.percent = filled;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();

    clicks.current += 1;
    const isFull = clicks.current > maxCount;

    if (!isFull) {
      targetPercentRef.current += 1 / maxCount;
    }

    let nextRotation;
    if (isFull) {
      const moved = ref.current.rotation.y % Math.PI;
      const remaining = 2 * Math.PI - moved;

      nextRotation = ref.current.rotation.y + remaining;
    } else {
      nextRotation = Math.PI * clicks.current;
    }

    gsap.to(ref.current.rotation, {
      duration: 1.2,
      y: Math.PI / 2 + nextRotation,
      repeat: 0,
      ease: 'expo.out',
    });

    gsap.to(ref.current.scale, {
      duration: 0.6,
      y: scaleFactor + scaleFactor * 0.5,
      ease: 'expo.out',
    });
    gsap.to(ref.current.scale, {
      duration: 0.4,
      y: scaleFactor,
      ease: 'back.out',
      delay: 0.6,
    });
    gsap.to(ref.current.scale, {
      duration: 0.6,
      x: scaleFactor + scaleFactor * 0.5,
      ease: 'expo.out',
    });
    gsap.to(ref.current.scale, {
      duration: 0.4,
      x: scaleFactor,
      ease: 'back.out',
      delay: 0.6,
    });
    gsap.to(ref.current.scale, {
      duration: 0.6,
      z: scaleFactor + scaleFactor * 0.5,
      ease: 'expo.out',
    });
    gsap.to(ref.current.scale, {
      duration: 0.4,
      z: scaleFactor,
      ease: 'back.out',
      delay: 0.6,
    });

    fresnelRef.current.alpha = percentRef.current;
  };

  return (
    <motion.group
      // @ts-ignore
      ref={ref}
      {...props}
      dispose={null}
      scale={scaleFactor}
      rotation-y={Math.PI / 2}
      position={[0, 0, -0.2]}
      onClick={handleClick}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Heart.geometry}
        material={materials.Heart}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.25}
      >
        <meshBasicMaterial
          attach="material"
          side={THREE.BackSide}
          color="#f5f5f5"
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Heart.geometry}
        material={materials.Heart}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.24}
      >
        <LayerMaterial color="black">
          <fillMaterial ref={fillRef} color="#E70023" percent={0} />
          <Fresnel
            // @ts-ignore
            ref={fresnelRef}
            color="#ffbd9d"
            mode="lighten"
            alpha={0}
          />
        </LayerMaterial>
      </mesh>
    </motion.group>
  );
};

useGLTF.preload('/models/heart.glb');
