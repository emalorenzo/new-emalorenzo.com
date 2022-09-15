import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { Header } from '@/components';

import { Wrapper } from './styles';

const FooterLine = styled.div`
  width: 100%;
  height: 3px;
  background: linear-gradient(
    90deg,
    #010101 13.74%,
    rgba(170, 170, 170, 0.32) 50%,
    #010101 86.25%
  );
`;

export const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Wrapper>
        {children}
        <FooterLine />
        <footer className="border-t p-8 flex justify-between max-w-center">
          <div className="flex flex-row items-center uppercase">
            <Link href="https://www.linkedin.com/in/emanuellorenzo/" passHref>
              <a className="mr-4">LinkedIn</a>
            </Link>
            <Link href="https://www.linkedin.com/in/emanuellorenzo/" passHref>
              <a className="mr-4">Instagram</a>
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
