import type { FillMaterial } from './FillMaterial';

export type FillMaterialType = FillMaterial & {
  color: string;
  percent: number;
};
