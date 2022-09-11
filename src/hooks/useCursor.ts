import { useCursorStore } from '@/store';

/**
 * sets global cursor type and config
 */
export const useCursor = () => {
  const cursorController = useCursorStore((s) => s.cursorControllerRef);

  const setCursor = (cursor) => {
    cursorController.current.setCursor(cursor);
  };

  return {
    setCursor,
  };
};
