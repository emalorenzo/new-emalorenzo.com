/* eslint-disable sort-keys */
import { MDXRemote } from 'next-mdx-remote';
import styled from 'styled-components';

import { Figure, Link, SideNote, Typography } from '@/components';

const H1 = styled.h1`
  font-size: 3.5rem;
  font-weight: 400;
  margin-top: 4rem;
  margin-bottom: 0.75rem;
`;
const H2 = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  margin-top: 4rem;
  margin-bottom: 0.75rem;
`;
const H3 = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 4rem;
  margin-bottom: 0.75rem;
`;

export const MDX = ({ source }) => {
  return (
    <MDXRemote
      {...source}
      components={{
        h1: ({ children }) => <H1>{children}</H1>,
        h2: ({ children }) => <H2>{children}</H2>,
        h3: ({ children }) => <H3>{children}</H3>,
        p: Typography.Paragraph,
        blockquote: Typography.Blockquote,
        a: Link,
        Figure,
        SideNote,
        Link,
      }}
    />
  );
};
