import React, { useEffect } from 'react';

import { Footer, Head, Hero } from '@/components';
import { useCursor } from '@/hooks';
import { useGlobalCanvasStore } from '@/store';
import type { ArticleMeta, NextPageWithLayout } from '@/types';

interface Props {
  articles: ArticleMeta[];
  tags: string[];
}

const HomePage: NextPageWithLayout<Props> = () => {
  const { setCursor } = useCursor();
  const { setBlob } = useGlobalCanvasStore.getState();

  useEffect(() => {
    setBlob({ status: 'idle' });
    setCursor({ type: 'default' });
  }, []);

  return (
    <>
      <main className="flex flex-col justify-center max-w-center items-stretch flex-1">
        <Head />
        <Hero />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
