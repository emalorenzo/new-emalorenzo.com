/* eslint-disable camelcase */
import { Abstract } from 'lamina/vanilla';

export class FillMaterial extends Abstract {
  // Define stuff as static properties!

  // Uniforms: Must begin with prefix "u_".
  // Assign them their default value.
  // Any unifroms here will automatically be set as properties on the class as setters and getters.
  // There setters and getters will update the underlying unifrom.
  static u_color = 'black'; // Can be accessed as FillMaterial.color

  static u_percent = 0.6; // Can be accessed as FillMaterial.alpha

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
    // @ts-ignore
    super(FillMaterial, {
      name: 'FillMaterial',
      ...props,
    });
  }
}
