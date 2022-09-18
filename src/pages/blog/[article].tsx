/* eslint-disable sort-keys */
import { PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
// import Image from 'next/image';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';

import {
  Head,
  Like,
  MaxWidthWrapper,
  MDX,
  TableOfContents,
  Typography,
} from '@/components';
import { useBlob, useCursor, useTransition } from '@/hooks';
import { MainLayout } from '@/layouts';
import { getMDX, listFiles } from '@/lib/cms';
import { ArticleScene } from '@/scenes';
import { useGlobalStore } from '@/store';
import type { ArticleMeta, NextPageWithLayout } from '@/types';

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 100%;
  width: 100%;
  max-width: 1200px;
  flex: 1;
  margin-top: 100px;
  padding-bottom: calc(var(--gap) * 8);
  /* margin-left: calc(var(--gap) * 6); */
  /* margin-right: calc(var(--gap) * 6); */
  /* padding-left: calc(var(--gap) * 1);
  padding-right: calc(var(--gap) * 1); */

  @media (max-width: 480px) {
    margin-left: 0;
    margin-right: 0;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  /* width: calc(100% + var(--gap) * 2); */
  height: 300px;
  /* margin-left: calc(var(--gap) * -1); */

  @media (max-width: 480px) {
    width: calc(100% + var(--gap) * 2);
    margin-left: calc(var(--gap) * -1);
  }
`;

const Article = styled(motion.article)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: min(65ch, 100%);
  /* padding-inline: var(--gap); */
  /* margin: 0 auto; */
`;

interface Props {
  metadata: ArticleMeta;
  mdx: any;
}

const ArticlePage: NextPageWithLayout<Props> = ({ mdx, metadata }) => {
  const likeRef = useRef(null);
  const { title, image, subtitle, background } = metadata;
  const dom = useGlobalStore((s) => s.dom);
  const { setBlob } = useBlob();
  const { setCursor } = useCursor();
  const { setTransition } = useTransition();

  useEffect(() => {
    if (likeRef.current) {
      useGlobalStore.setState({ likeRef });
    }
  }, [likeRef]);

  useEffect(() => {
    setTransition({
      type: 'cursor-image',
      src: image,
      background,
    });

    return () => {
      setTransition(null);
    };
  }, []);

  return (
    <>
      <motion.main
        className="flex flex-col relative z-10 bg-black"
        initial={{ y: '100vh' }}
        animate={{ y: '70vh' }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <Head />
        {/* <ImageWrapper>
          <Image src={image} layout="fill" objectFit="cover" />
        </ImageWrapper> */}
        <MaxWidthWrapper>
          <Typography.Title className="mt-24">{title}</Typography.Title>
          <Typography.Subtitle className="mb-16">
            {subtitle}
          </Typography.Subtitle>
        </MaxWidthWrapper>
        <MaxWidthWrapper className="flex flex-row-reverse relative justify-end">
          <div className="flex flex-col ml-40">
            <div className="sticky top-16">
              <TableOfContents />
              <div ref={likeRef} className="w-32 h-32" />
            </div>
          </div>
          <Article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="prose lg:prose-xl 2xl:prose-2xl prose-invert"
          >
            <MDX source={mdx} />
          </Article>
        </MaxWidthWrapper>
      </motion.main>
      <Canvas
        onCreated={(state) => state.events.connect(dom.current)}
        className="canvas"
      >
        <PerspectiveCamera makeDefault fov={20} far={1000} />
        <ArticleScene />
      </Canvas>
    </>
  );
};

ArticlePage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export const getStaticPaths = async () => {
  // get all articles files names
  const files = await listFiles('blog');
  const paths = files.map((file) => `/blog/${file.replace('.mdx', '')}`);

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const { article } = params;

  // get mdx file content from article url
  const { mdxSource, frontMatter } = await getMDX(`blog/${article}.mdx`);

  return {
    props: { mdx: mdxSource, metadata: frontMatter },
  };
};

export default ArticlePage;
