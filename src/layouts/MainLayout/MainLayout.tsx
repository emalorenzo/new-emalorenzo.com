import Link from 'next/link';
import React from 'react';

import { Header } from '@/components';

import { Wrapper } from './styles';

export const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Wrapper>
        {children}
        <footer className="border-t p-8 flex justify-between max-w-center">
          <div className="flex flex-row uppercase">
            <Link href="https://www.linkedin.com/in/emanuellorenzo/" passHref>
              <a className="mb-2 mr-4">LinkedIn</a>
            </Link>
            <Link href="https://www.linkedin.com/in/emanuellorenzo/" passHref>
              <a className="mb-2 mr-4">Instagram</a>
            </Link>
            <Link href="https://www.linkedin.com/in/emanuellorenzo/" passHref>
              <a>Twitter</a>
            </Link>
          </div>
          <span className="min-w-fit">
            © 2022 Emanuel Lorenzo —— Buenos Aires
          </span>
        </footer>
      </Wrapper>
    </>
  );
};
