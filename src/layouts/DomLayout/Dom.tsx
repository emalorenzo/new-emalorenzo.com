import { useEffect, useRef } from 'react';

import { useCursorStore, useGlobalStore } from '@/store';

export const Dom = ({ children }) => {
  const dom = useRef(null);
  const { setCursorPosition } = useCursorStore.getState();

  useEffect(() => {
    useGlobalStore.setState({ dom });
  }, []);

  const handleMouseMove = (e) => {
    let x;
    let y;

    if (e.touches) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else {
      x = e.clientX;
      y = e.clientY;
    }

    setCursorPosition({ x, y });
  };

  return (
    <div
      ref={dom}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      className="dom min-h-full flex flex-col items-stretch"
    >
      {children}
    </div>
  );
};
