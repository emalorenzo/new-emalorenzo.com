import type { FillMaterial, FillMaterialType } from '@/shaders/FillMaterial';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      fillMaterial: ReactThreeFiber.Object3DNode<
        FillMaterial,
        FillMaterialType
      >;
    }
  }
}
