/* eslint-disable sort-keys */
import { MDXRemote } from 'next-mdx-remote';
import styled from 'styled-components';

const H1 = styled.h2`
  font-size: 3.5rem;
  font-weight: 300;
  margin-top: 4rem;
  margin-bottom: 0.75rem;
`;
const H2 = styled.h2`
  font-size: 2rem;
  font-weight: 300;
  margin-top: 4rem;
  margin-bottom: 0.75rem;
`;
const H3 = styled.h2`
  font-size: 1.5rem;
  font-weight: 300;
  margin-top: 4rem;
  margin-bottom: 0.75rem;
`;
const Paragraph = styled.p`
  font-size: ${`${18 / 16}rem`};
  line-height: calc(1em + 0.725rem);
`;

export const MDX = ({ source }) => {
  return (
    <MDXRemote
      {...source}
      components={{
        h1: ({ children }) => <H1>{children}</H1>,
        h2: ({ children }) => <H2>{children}</H2>,
        h3: ({ children }) => <H3>{children}</H3>,
        p: Paragraph,
      }}
    />
  );
};
