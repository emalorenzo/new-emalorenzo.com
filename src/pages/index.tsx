import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import type { NextPage } from 'next';
import React, { useEffect } from 'react';

import { Footer, Head, Hero } from '@/components';
import { useCursor } from '@/hooks';
import { ApartmentScene } from '@/scenes';
import { useGlobalCanvasStore, useGlobalStore } from '@/store';
import type { ArticleMeta } from '@/types';

interface Props {
  articles: ArticleMeta[];
  tags: string[];
}

const HomePage: NextPage<Props> = () => {
  const { setCursor } = useCursor();
  const dom = useGlobalStore((s) => s.dom);
  const { setBlob } = useGlobalCanvasStore.getState();

  useEffect(() => {
    setBlob({ status: 'idle' });
    setCursor({ type: 'default' });
  }, []);

  return (
    <>
      <Canvas
        shadows
        linear
        style={{ pointerEvents: 'none' }}
        onCreated={(state) => state.events.connect(dom.current)}
        className="canvas"
        camera={{ fov: 45, position: [0, 4, 10] }}
      >
        {/* <ambientLight intensity={0.5} /> */}
        <OrbitControls
          minPolarAngle={0}
          // maxPolarAngle={Math.PI / 2.2}
          minAzimuthAngle={-Math.PI / 2}
          maxAzimuthAngle={Math.PI / 2}
        />
        <ApartmentScene />
      </Canvas>
      <main className="relative flex flex-col justify-center max-w-center items-stretch flex-1">
        <Head />
        <Hero />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
