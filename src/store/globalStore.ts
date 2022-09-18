import type { NextRouter } from 'next/router';
import type React from 'react';
import create from 'zustand';

interface GlobalStore {
  router: NextRouter;
  dom: React.MutableRefObject<HTMLElement> | null;
  likeRef: React.MutableRefObject<HTMLElement | null>;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  router: null,
  dom: null,
  likeRef: null,
}));
