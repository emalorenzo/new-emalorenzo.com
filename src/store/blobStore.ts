import type React from 'react';
import create from 'zustand';

import type { BlobController } from '@/components3D/Blob/Blob';

interface BlobStore {
  blobControllerRef: React.MutableRefObject<BlobController>;
  setBlobController: (ref: React.MutableRefObject<BlobController>) => void;
}

export const useBlobStore = create<BlobStore>((set) => ({
  blobControllerRef: null,

  // sets the ref to be used within useImperativeHandle for the main Blob
  setBlobController: (blobControllerRef) => {
    set((state) => ({ ...state, blobControllerRef }));
  },
}));
