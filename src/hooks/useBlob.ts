import type { IBlobStatus } from '@/components3D/Blob/Blob';
import { useBlobStore } from '@/store';

/**
 * sets global cursor type and config
 */
export const useBlob = () => {
  const blobController = useBlobStore((s) => s.blobControllerRef);

  const setBlobStatus = (newStatus: IBlobStatus) => {
    blobController?.current?.setBlobStatus(newStatus);
  };

  return {
    setBlobStatus,
  };
};
