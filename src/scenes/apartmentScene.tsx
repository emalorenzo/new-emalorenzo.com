import { Environment, View } from '@react-three/drei';
import { Suspense } from 'react';

import { Apartment } from '@/models';

// import { Heart } from '@/models';
// import { useGlobalStore } from '@/store';

export const ApartmentScene = () => {
  // const likeRef = useGlobalStore((s) => s.likeRef);
  return (
    <Suspense fallback={null}>
      <Apartment />
      <Environment preset="city" />
    </Suspense>
  );
};
