import { MDXRemote } from 'next-mdx-remote';
import styled from 'styled-components';

const H1 = styled.h2`
  font-size: 3.5rem;
  font-weight: 300;
  padding-top: 2rem;
`;
const H2 = styled.h2`
  font-size: 2rem;
  font-weight: 300;
  padding-top: 2rem;
`;
const H3 = styled.h2`
  font-size: 1.5rem;
  font-weight: 300;
  padding-top: 2rem;
`;

export const MDX = ({ source }) => {
  return (
    <MDXRemote
      {...source}
      components={{
        h1: ({ children }) => <H1>{children}</H1>,
        h2: ({ children }) => <H2>{children}</H2>,
        h3: ({ children }) => <H3>{children}</H3>,
      }}
    />
  );
};
