import type { NextRouter } from 'next/router';
import type React from 'react';
import create from 'zustand';

interface GlobalStore {
  router: NextRouter;
  dom: React.RefObject<HTMLElement> | null;
  likeRef: React.RefObject<HTMLElement | null>;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  router: null,
  dom: null,
  likeRef: null,
}));
