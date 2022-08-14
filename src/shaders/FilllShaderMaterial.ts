import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import glsl from 'babel-plugin-glsl/macro';

export const FilllShaderMaterial = shaderMaterial(
  // Uniform
  {
    uPercent: 0.0,
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
      float color = 1.0 - step(0.4, vUv.y);

      gl_FragColor = vec4(0.0, 0.0, 1.0, color);
    }
  `
);

extend({ FilllShaderMaterial });
