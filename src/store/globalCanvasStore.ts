import create from 'zustand';

import type { IBlobStatus } from '@/types/globalcanvas';

export interface IModelTransition {
  type: 'model';
}

export interface ICursorImageTransition {
  type: 'cursor-image';
  src: string;
  background: string;
}

export type ITransition = ICursorImageTransition | IModelTransition | null;

interface IGlobalCanvas {
  transition: ITransition;
  setTransition: (transition: ITransition) => void;
  blob: IBlobStatus;
  setBlob: (blob: IBlobStatus | null) => void;
}

export const useGlobalCanvasStore = create<IGlobalCanvas>((set) => ({
  transition: null,
  setTransition: (transition) => {
    set((state) => ({ ...state, transition }));
  },
  blob: null,
  setBlob: (blob) => {
    set((state) => ({ ...state, blob }));
  },
}));
