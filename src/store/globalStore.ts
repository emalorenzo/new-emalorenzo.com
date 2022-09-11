import type React from 'react';
import create from 'zustand';

interface GlobalStore {
  dom: React.MutableRefObject<HTMLElement> | null;
  likeRef: React.MutableRefObject<HTMLElement | null>;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  dom: null,
  likeRef: null,
}));
