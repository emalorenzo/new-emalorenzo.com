/* eslint-disable sort-keys */
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';

import { Card, Flex, Footer, Head } from '@/components';
import { useBlob, useCursor } from '@/hooks';
import { MainLayout } from '@/layouts';
import { getMDX, listFiles } from '@/lib/cms';
import { groupTags } from '@/lib/utils';
import type { ArticleMeta, NextPageWithLayout } from '@/types';

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

interface Props {
  articles: ArticleMeta[];
  tags: string[];
}

const Hero = () => (
  <section className="w-full p-8 flex justify-center items-center h-[40vh]">
    Algun efecto copado
  </section>
);

const BlogPage: NextPageWithLayout<Props> = ({ articles, tags }) => {
  const { setCursor } = useCursor();
  const { setBlob } = useBlob();
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

  useEffect(() => {
    setBlob({ status: 'idle' });
    setCursor({ type: 'default' });
  }, []);

  return (
    <>
      <main className="flex flex-col max-w-center items-stretch h-full">
        <Head />
        <Hero />
        <section className="relative flex mb-20">
          <aside className="absolute left-0 top-0 hidden xl:block">
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
          </aside>
          <div className="flex flex-col mx-auto">
            {filteredArticles.map((card) => (
              <Card key={card.title} {...card} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

BlogPage.getLayout = function getLayout(page) {
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

export default BlogPage;
