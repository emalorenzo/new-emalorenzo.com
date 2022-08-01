/* eslint-disable sort-keys */
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Card, Flex, Head, Hero } from '@/components';
import { MainLayout } from '@/layouts';
import { getMDX, listFiles } from '@/lib/cms';
import { groupTags } from '@/lib/utils';
import type { ArticleMeta, NextPageWithLayout } from '@/types';

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
  max-width: 1200px;
  flex: 1;
  padding-left: var(--gap);
  padding-right: var(--gap);
`;

const PostsLayout = styled.section`
  display: flex;
  gap: 2rem;
  position: relative;
`;

const PostsFilterWrapper = styled(Flex)`
  flex: 1 999 20rem;
  position: sticky;
  top: var(--header-height);
  height: fit-content;
`;

const PostFilter = styled.a`
  text-decoration: none;
  color: white;
  font-weight: 300;
  opacity: ${(p) => (p.selected ? 1 : 0.7)};
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 400;
`;

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gap);
  padding-bottom: calc(var(--gap) * 8);
`;

interface Props {
  articles: ArticleMeta[];
  tags: string[];
}

const HomePage: NextPageWithLayout<Props> = ({ articles, tags }) => {
  const router = useRouter();
  const { filter } = router.query;

  const filteredArticles = useMemo(() => {
    if (filter) {
      return articles.filter((article) =>
        article.tags.map((tag) => tag.toLowerCase()).includes(filter as string)
      );
    }
    return articles;
  }, [filter]);

  return (
    <Wrapper>
      <Head />
      <Hero />
      <PostsLayout>
        <PostsFilterWrapper column as="aside">
          <Title>Articulos</Title>
          <ul>
            <li>
              <Link
                passHref
                href={{
                  pathname: '/',
                }}
              >
                <PostFilter selected={!filter}>All</PostFilter>
              </Link>
            </li>
            {tags.map((tag) => (
              <li key={tag}>
                <Link
                  passHref
                  href={{
                    pathname: '/',
                    query: { filter: tag.toLowerCase() },
                  }}
                >
                  <PostFilter selected={filter === tag.toLowerCase()}>
                    {tag}
                  </PostFilter>
                </Link>
              </li>
            ))}
          </ul>
        </PostsFilterWrapper>
        <Cards>
          {filteredArticles.map((card) => (
            <Card key={card.title} {...card} />
          ))}
        </Cards>
      </PostsLayout>
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

  const tags = groupTags(articles);

  // use only frontMatter data, we dont need mdx on home page
  const articlesMetadata = articles.map((article, i) => ({
    ...article.frontMatter,
    slug: getSlug(files[i]),
  }));

  return {
    props: {
      articles: articlesMetadata,
      tags,
    },
  };
};

export default HomePage;
