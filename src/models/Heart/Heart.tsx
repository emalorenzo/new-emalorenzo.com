import { shaderMaterial, useGLTF } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import glsl from 'babel-plugin-glsl/macro';
import gsap from 'gsap';
import { Color, Depth, Fresnel, LayerMaterial } from 'lamina';
import { BlendModes } from 'lamina/types';
import { Abstract } from 'lamina/vanilla';
import { useControls } from 'leva';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import { transformRangedValue } from '@/lib/utils';

import type { GLTFResult } from './types';

// Extend the Abstract layer
class CustomLayer extends Abstract {
  // Define stuff as static properties!

  // Uniforms: Must begin with prefix "u_".
  // Assign them their default value.
  // Any unifroms here will automatically be set as properties on the class as setters and getters.
  // There setters and getters will update the underlying unifrom.
  static u_color = 'black'; // Can be accessed as CustomLayer.color

  static u_percent = 0.6; // Can be accessed as CustomLayer.alpha

  // Optionally Define a vertex shader!
  // Same rules as fragment shaders, except no blend modes.
  // Return a non-projected vec3 position.
  static vertexShader = `   
    varying vec2 v_Uv;

    void main() {
      v_Uv = uv;
      return position;
    }
  `;

  // Define your fragment shader just like you already do!
  // Only difference is, you must return the final color of this layer
  static fragmentShader = `   
    uniform vec3 u_color;
    uniform float u_percent;

    // Varyings must be prefixed by "v_"
    varying vec2 v_Uv;

    vec4 main() {
      // Local variables must be prefixed by "f_"
      float f_alpha = 1.0 - step(u_percent, v_Uv.y);
      vec4 f_color = vec4(u_color, f_alpha);
      return f_color;
    }
  `;

  constructor(props) {
    // You MUST call `super` with the current constructor as the first argument.
    // Second argument is optional and provides non-uniform parameters like blend mode, name and visibility.
    super(CustomLayer, {
      name: 'CustomLayer',
      // mode: 'multiply',
      ...props,
    });
  }
}

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

      gl_FragColor = vec4(0.799, 0.0, 0.017, color);
    }
  `
);

extend({ CustomLayer });
extend({ FilllShaderMaterial });

export const Heart = (props) => {
  const ref = useRef<THREE.Group>();
  const percentRef = useRef(0);
  const shaderRef = useRef<typeof FilllShaderMaterial>();
  const fresnelRef = useRef(0);
  // const [percent, setPercent] = useState(0);
  const { nodes, materials } = useGLTF(
    '/models/heart.glb'
  ) as unknown as GLTFResult;

  // const { percent } = useControls({ percent: 0.0 });

  useFrame(({ clock }) => {
    if (ref.current) {
      // ref.current.rotation.y = clock.getElapsedTime() / 4;
    }
  });

  const handleClick = () => {
    // gsap.to(ref.current.rotation, {
    //   y: Math.PI * 2,
    //   yoyo: true,
    //   repeat: 1,
    //   duration: 0.5,
    //   ease: 'power1.inOut',
    // });

    // setPercent(percent + 0.1);

    console.log('click');

    percentRef.current += 0.05;

    const filled = transformRangedValue(
      percentRef.current,
      0.0,
      1.0,
      0.13,
      0.27
    );
    shaderRef.current.percent = filled;

    fresnelRef.current.alpha = percentRef.current;
  };

  // console.log(percent);

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
        {/* <filllShaderMaterial
          ref={shaderRef}
          attach="material"
          side={THREE.FrontSide}
          color="#040104"
          uPercent={uPercent}
          // wireframe
        /> */}
        <LayerMaterial color="black">
          {/* <Depth
            near={0.4854}
            far={0.7661999999999932}
            origin={[-0.4920000000000004, 0.4250000000000003, 0]}
            colorA="#8baafe"
            colorB="#0079f9"
          /> */}
          {/* <Color color="#E70023" alpha={percent} /> */}
          <customLayer
            ref={shaderRef}
            // ref={ref}     // Imperative instance of CustomLayer. Can be used to animate unifroms
            color="#E70023" // Uniforms can be set directly
            percent={0} // Uniforms can be set directly
            // percent={percent}
            // mode="multiply" // Blend mode can be set directly
            // mode="multiply"
          />
          <Fresnel
            ref={fresnelRef}
            color="#ffbd9d"
            mode="lighten"
            alpha={fresnelRef.current}
          />
        </LayerMaterial>
      </mesh>
    </group>
  );
};

useGLTF.preload('/models/heart.glb');
