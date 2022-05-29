/* eslint-disable sort-keys */
import React from 'react';
import styled from 'styled-components';

import { Card, Head, Hero } from '@/components';
import { MainLayout } from '@/layouts';
import { getMDX, listFiles } from '@/lib/cms';
import type { NextPageWithLayout } from '@/types';

const Wrapper = styled.main`
  display: grid;
  place-items: center;
  min-height: 100%;
  max-width: 1200px;
  flex: 1;
  padding-left: var(--gap);
  padding-right: var(--gap);
`;

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gap);
  padding-bottom: calc(var(--gap) * 8);
`;

const HomePage: NextPageWithLayout = ({ articles }: any) => {
  return (
    <Wrapper>
      <Head />
      <Hero />
      <Cards>
        {articles.map((card) => (
          <Card key={card.title} {...card} />
        ))}
      </Cards>
    </Wrapper>
  );
};

HomePage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export const getStaticProps = async () => {
  // get all articles files names
  const files = await listFiles('blog');

  // get all articles contents
  const getAllArticles = files.map((file) => getMDX(`blog/${file}`));
  const articles = await Promise.all(getAllArticles);

  // use filename as slug
  const getSlug = (file) => {
    const fileName = file.replace('.mdx', '');
    return `/blog/${fileName}`;
  };

  // use only frontMatter data, we dont need mdx on home page
  const articlesMetadata = articles.map((article, i) => ({
    ...article.frontMatter,
    slug: getSlug(files[i]),
  }));

  return {
    props: {
      articles: articlesMetadata,
    },
  };
};

export default HomePage;
