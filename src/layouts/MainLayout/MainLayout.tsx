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
          <div className="flex flex-col uppercase">
            <Link href="https://www.linkedin.com/in/emanuellorenzo/" passHref>
              <a className="mb-2">LinkedIn</a>
            </Link>
            <Link href="https://www.linkedin.com/in/emanuellorenzo/" passHref>
              <a className="mb-2">Instagram</a>
            </Link>
            <Link href="https://www.linkedin.com/in/emanuellorenzo/" passHref>
              <a>Twitter</a>
            </Link>
          </div>
          © 2022 Emanuel Lorenzo —— Buenos Aires
        </Footer>
      </Wrapper>
    </>
  );
};
