import create from 'zustand';

import type { ITransition } from '@/components3D/TransitionManager/TransitionManager';

interface TransitionStore {
  transition: ITransition;
  setTransition: (transition: ITransition) => void;
}

export const useTransitionStore = create<TransitionStore>((set) => ({
  transition: null,
  setTransition: (transition) => {
    set((state) => ({ ...state, transition }));
  },
}));
