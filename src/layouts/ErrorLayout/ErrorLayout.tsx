import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.main`
  height: 100%;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 1rem;

  a {
    color: var(--text-color);
  }
`;

export const ErrorLayout = ({ children }) => {
  return (
    <Wrapper>
      {children}
      <Link href="/" passHref>
        <a>Go back to home</a>
      </Link>
    </Wrapper>
  );
};
