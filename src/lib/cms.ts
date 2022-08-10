/* eslint-disable sort-keys */
/* eslint-disable import/order */
import fs from 'fs';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkToc from 'remark-toc';

const root = process.cwd();

export const listFiles = (url) => {
  return fs.readdirSync(path.join(root, 'public/', url));
};

export const getMDX = async (url) => {
  const source = fs.readFileSync(path.join(root, 'public/', url), 'utf8');

  const { data, content } = matter(source);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [[remarkToc, { heading: 'Contenido' }]],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behaviour: 'wrap' }],
      ],
    },
  });

  return {
    mdxSource,
    frontMatter: data,
  };
};
