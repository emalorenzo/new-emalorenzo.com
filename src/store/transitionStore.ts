import type React from 'react';
import create from 'zustand';

import type { TransitionController } from '@/components3D/TransitionManager/TransitionManager';

interface TransitionStore {
  transitionControllerRef: React.MutableRefObject<TransitionController>;
  setTransitionController: (
    ref: React.MutableRefObject<TransitionController>
  ) => void;
}

export const useTransitionStore = create<TransitionStore>((set) => ({
  transitionControllerRef: null,
  setTransitionController: (transitionControllerRef) => {
    set((state) => ({ ...state, transitionControllerRef }));
  },
}));
