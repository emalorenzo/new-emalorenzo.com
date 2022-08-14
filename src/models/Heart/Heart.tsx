import { shaderMaterial, useGLTF } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import glsl from 'babel-plugin-glsl/macro';
import gsap from 'gsap';
import { useControls } from 'leva';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const FilllShaderMaterial = shaderMaterial(
  // Uniform
  {
    uPercent: 1.0,
  },
  // Vertex Shader
  glsl`
    uniform float uPercent;
    varying vec2 vUv;

    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      vUv = uv;
    }
  `,
  // Fragment Shader
  glsl`
    uniform float uPercent;
    varying vec2 vUv;

    void main() {
      float color = 1.0 - step(uPercent, vUv.y);

      gl_FragColor = vec4(1.0, 0.0, 0.0, color);
    }
  `
);

extend({ FilllShaderMaterial });

export const Heart = (props) => {
  const ref = useRef<THREE.Group>();
  const shaderRef = useRef<typeof FilllShaderMaterial>();
  const { nodes, materials } = useGLTF('/models/heart.glb');

  const { uPercent } = useControls({ uPercent: 0.0 });

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() / 4;
    }
  });

  useEffect(() => {
    // if (ref.current) {
    // }
  }, []);

  const handleClick = () => {
    console.log('rotate');
    gsap.to(ref.current.rotation, {
      y: Math.PI * 2,
      yoyo: true,
      repeat: 1,
      duration: 0.5,
      ease: 'power1.inOut',
    });

    shaderRef.current.uPercent = gsap.utils.interpolate(
      shaderRef.current.uPercent,
      shaderRef.current.uPercent + 0.2,
      0.1
    );
  };

  return (
    <group
      {...props}
      ref={ref}
      dispose={null}
      scale={0.015}
      rotation-y={Math.PI / 2}
      position={[1.2, -2.6, 0]}
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
        <meshStandardMaterial
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
        scale={0.23}
      >
        <filllShaderMaterial
          ref={shaderRef}
          attach="material"
          side={THREE.FrontSide}
          color="#040104"
          uPercent={uPercent}
          // wireframe
        />
      </mesh>
    </group>
  );
};

useGLTF.preload('/models/heart.glb');
