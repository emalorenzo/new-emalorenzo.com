/* eslint-disable sort-keys */
/* eslint-disable import/order */
import fs from 'fs';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';

const root = process.cwd();

export const listFiles = (url) => {
  return fs.readdirSync(path.join(root, 'public/', url));
};

export const getMDX = async (url) => {
  const source = fs.readFileSync(path.join(root, 'public/', url), 'utf8');

  const { data, content } = matter(source);
  const mdxSource = await serialize(content);

  return {
    mdxSource,
    frontMatter: data,
  };
};
