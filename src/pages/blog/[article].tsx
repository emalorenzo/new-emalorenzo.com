/* eslint-disable sort-keys */
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

import { Head, MaxWidthWrapper, MDX, Typography } from '@/components';
import { MainLayout } from '@/layouts';
import { getMDX, listFiles } from '@/lib/cms';
import type { NextPageWithLayout } from '@/types';

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

const TableContents = styled.aside`
  display: none;

  @media (min-width: 967.12px) {
    display: block;
    max-width: 250px;
    margin-left: auto;
    position: sticky;
    top: 0;
  }
`;

const TableNavigation = styled.nav`
  display: flex;
  flex-direction: column;
  font-size: ${18 / 16}rem;
  position: sticky;
  top: calc(var(--header-height) + var(--gap) * 4);

  a {
    font-size: 0.8em;
    margin-top: calc(var(--gap) / 3);
  }
`;

// margin-top: 2rem;
// margin-bottom: 5rem;

const ArticlePage: NextPageWithLayout = ({ mdx, metadata }: any) => {
  const { title, image, subtitle } = metadata;
  return (
    <Wrapper>
      <Head />
      <ImageWrapper>
        <Image src={image} layout="fill" objectFit="cover" />
      </ImageWrapper>
      <MaxWidthWrapper>
        <Typography.Title className="mt-24">{title}</Typography.Title>
        <Typography.Subtitle className="mb-16">{subtitle}</Typography.Subtitle>
      </MaxWidthWrapper>
      <MaxWidthWrapper className="flex flex-row-reverse relative justify-end">
        <TableContents>
          <TableNavigation>
            <h2 className="uppercase font-bold tracking-widest">Contenido</h2>
            <a href="asdasda">Quien controla los gráficos</a>
            <a href="asdasda">Three.js y React Three Fiber</a>
            <a href="asdasda">Geometrias</a>
            <a href="asdasda">Materiales</a>
          </TableNavigation>
        </TableContents>
        <Article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="prose prose-invert"
        >
          <MDX source={mdx} />
        </Article>
      </MaxWidthWrapper>
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
