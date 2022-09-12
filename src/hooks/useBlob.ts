import type { IBlob } from '@/components3D/Blob/Blob';
import { useBlobStore } from '@/store';

/**
 * sets global cursor type and config
 */
export const useBlob = () => {
  const blobController = useBlobStore((s) => s.blobControllerRef);

  const setBlob = (newBlob: IBlob) => {
    blobController?.current?.setBlob(newBlob);
  };

  return {
    setBlob,
  };
};
