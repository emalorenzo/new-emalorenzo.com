import type { GLTF } from 'three-stdlib';

export type GLTFResult = GLTF & {
  nodes: {
    Cube007: THREE.Mesh;
    Cube007_1: THREE.Mesh;
  };
  materials: {
    MetalBlack: THREE.MeshStandardMaterial;
    DeskWood: THREE.MeshStandardMaterial;
  };
};
