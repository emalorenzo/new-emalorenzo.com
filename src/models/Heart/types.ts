import type { GLTF } from 'three-stdlib';

export type GLTFResult = GLTF & {
  nodes: {
    Heart: THREE.Mesh;
  };
  materials: {
    Heart: THREE.MeshStandardMaterial;
  };
};
