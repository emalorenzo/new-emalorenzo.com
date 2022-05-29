/* eslint-disable sort-keys */
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

import { Head, MDX, Title } from '@/components';
import { MainLayout } from '@/layouts';
import { getMDX, listFiles } from '@/lib/cms';
import type { NextPageWithLayout } from '@/types';

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 100%;
  max-width: 1200px;
  flex: 1;
  margin-top: 100px;
  padding-bottom: calc(var(--gap) * 8);
  padding-left: calc(var(--gap) * 6);
  padding-right: calc(var(--gap) * 6);
`;

const ImageWrapper = styled.div`
  position: relative;
  width: calc(100% + var(--gap) * 12);
  height: 300px;
  margin-left: calc(var(--gap) * -6);
`;

const Article = styled(motion.article)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: min(686px, 100%);
`;

const ArticlePage: NextPageWithLayout = ({ mdx, metadata }: any) => {
  const { title, image } = metadata;
  return (
    <Wrapper>
      <Head />
      <ImageWrapper>
        <Image src={image} layout="fill" objectFit="cover" />
      </ImageWrapper>
      <Title>{title}</Title>
      <Article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.7 }}
      >
        <MDX source={mdx} />
      </Article>
    </Wrapper>
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
