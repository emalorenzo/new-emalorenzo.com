import { View } from '@react-three/drei';
import { Suspense } from 'react';

import { Heart } from '@/models';
import { useGlobalStore } from '@/store';

export const ArticleScene = () => {
  const likeRef = useGlobalStore((s) => s.likeRef);
  return (
    <Suspense fallback={null}>
      {/* @ts-ignore */}
      <View track={likeRef}>
        <Heart scaleFactor={0.0008} maxCount={5} />
      </View>
    </Suspense>
  );
};
