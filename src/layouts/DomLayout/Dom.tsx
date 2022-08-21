import { useEffect, useRef } from 'react';

import { useGlobalStore } from '@/store';

export const Dom = ({ children }) => {
  const ref = useRef(null);
  useEffect(() => {
    useGlobalStore.setState({ dom: ref });
  }, []);

  return (
    <div className="relative" ref={ref}>
      {children}
    </div>
  );
};
