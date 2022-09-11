import type React from 'react';
import create from 'zustand';

import type { CursorController } from '@/components3D/Cursor/Cursor';

interface CursorStore {
  cursorPosition: { x: number; y: number };
  cursorControllerRef: React.MutableRefObject<CursorController>;
  setCursorPosition: ({ x, y }) => void;
  setCursorController: (ref: React.MutableRefObject<CursorController>) => void;
}

export const useCursorStore = create<CursorStore>((set) => ({
  cursorControllerRef: null,
  cursorPosition: {
    x: 0,
    y: 0,
  },

  // saves the mouse position relative to a div
  // wrapping the app
  setCursorPosition: (cursorPosition) => {
    set((state) => ({ ...state, cursorPosition }));
  },
  // sets the ref to be used within useImperativeHandle for Cursors
  setCursorController: (cursorControllerRef) => {
    set((state) => ({ ...state, cursorControllerRef }));
  },
}));
