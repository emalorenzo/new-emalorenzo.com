import Link from 'next/link';
import React from 'react';

import { Header } from '@/components';

import { Footer, LinkButton, Wrapper } from './styles';

export const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Wrapper>
        {children}
        <Footer>
          <Link href="https://www.linkedin.com/in/emanuellorenzo/" passHref>
            <a>LinkedIn</a>
          </Link>
        </Footer>
      </Wrapper>
    </>
  );
};
