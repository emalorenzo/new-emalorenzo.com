import { Box, Environment } from '@react-three/drei';
import { Suspense } from 'react';

import { Heart } from '@/models';

export const ArticleScene = () => {
  return (
    <Suspense fallback={null}>
      <Environment preset="city" />
      <Heart />
    </Suspense>
  );
};
