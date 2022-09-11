import create from 'zustand';

interface GlobalStore {
  dom: React.MutableRefObject<HTMLElement> | null;
  likeRef: React.MutableRefObject<HTMLElement | null>;
  cursorPosition: { x: number; y: number };
  setCursorPosition: ({ x, y }) => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  dom: null,
  likeRef: null,
  cursorPosition: {
    x: 0,
    y: 0,
  },

  // saves the mouse position relative to a div
  // wrapping the app
  setCursorPosition: (cursorPosition) => {
    set((state) => ({ ...state, cursorPosition }));
  },
}));
