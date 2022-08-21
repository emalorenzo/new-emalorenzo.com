import create from 'zustand';
import { devtools } from 'zustand/middleware';

export const useGlobalStore = create<any>(
  devtools(
    (set) => ({
      dom: null,
      likeRef: null,
    }),
    { name: 'GlobalStore' }
  )
);
