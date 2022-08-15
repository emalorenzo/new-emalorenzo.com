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

export const Heart = (props) => {
  const ref = useRef<THREE.Group>();
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
      percentRef.current += 0.001;

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

    if (percentRef.current < 1) {
      targetPercentRef.current += 0.05;
    }

    gsap.to(ref.current.rotation, {
      duration: 1.2,
      y: ref.current.rotation.y + Math.PI * (percentRef.current < 1 ? 1 : 2),
      repeat: 0,
      ease: 'expo.out',
    });

    gsap.to(ref.current.scale, {
      duration: 0.6,
      y: 0.015 + 0.005,
      ease: 'expo.out',
    });
    gsap.to(ref.current.scale, {
      duration: 0.4,
      y: 0.015,
      ease: 'back.out',
      delay: 0.6,
    });
    gsap.to(ref.current.scale, {
      duration: 0.6,
      x: 0.015 + 0.005,
      ease: 'expo.out',
    });
    gsap.to(ref.current.scale, {
      duration: 0.4,
      x: 0.015,
      ease: 'back.out',
      delay: 0.6,
    });
    gsap.to(ref.current.scale, {
      duration: 0.6,
      z: 0.015 + 0.005,
      ease: 'expo.out',
    });
    gsap.to(ref.current.scale, {
      duration: 0.4,
      z: 0.015,
      ease: 'back.out',
      delay: 0.6,
    });

    fresnelRef.current.alpha = percentRef.current;
  };

  return (
    <motion.group
      {...props}
      ref={ref}
      dispose={null}
      scale={0.015}
      rotation-y={Math.PI / 2}
      position={[2.5, 0, 0]}
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
