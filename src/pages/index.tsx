import React, { useEffect } from 'react';

import { Head, Hero } from '@/components';
import { useBlob, useCursor } from '@/hooks';
import { MainLayout } from '@/layouts';
import type { ArticleMeta, NextPageWithLayout } from '@/types';

interface Props {
  articles: ArticleMeta[];
  tags: string[];
}

const HomePage: NextPageWithLayout<Props> = () => {
  const { setCursor } = useCursor();
  const { setBlob } = useBlob();

  useEffect(() => {
    setBlob({ status: 'idle' });
    setCursor({ type: 'default' });
  }, []);

  return (
    <main className="flex flex-col max-w-center items-stretch h-full">
      <Head />
      <Hero />
    </main>
  );
};

HomePage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default HomePage;
