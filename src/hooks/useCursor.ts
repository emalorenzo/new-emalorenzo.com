import type { ICursor } from '@/components3D/Cursor/Cursor';
import { useCursorStore } from '@/store';

/**
 * sets global cursor type and config
 */
export const useCursor = () => {
  const cursorController = useCursorStore((s) => s.cursorControllerRef);

  const setCursor = (cursor: ICursor) => {
    cursorController?.current?.setCursor(cursor);
  };

  return {
    setCursor,
  };
};
