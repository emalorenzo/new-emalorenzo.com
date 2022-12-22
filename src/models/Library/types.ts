import type { GLTF } from 'three-stdlib';

export type GLTFResult = GLTF & {
  nodes: {
    Cube009: THREE.Mesh;
    Cube009_1: THREE.Mesh;
  };
  materials: {
    MetalBlack: THREE.MeshStandardMaterial;
    WoodCubes: THREE.MeshStandardMaterial;
  };
};
