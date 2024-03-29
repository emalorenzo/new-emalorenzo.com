import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

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

export const Footer = () => (
  <>
    <FooterLine />
    <footer className="p-12 flex justify-between max-w-center text-sm">
      <div className="flex flex-row items-center">
        <Link href="https://www.linkedin.com/in/emanuellorenzo/" passHref>
          <a className="mr-4">LinkedIn</a>
        </Link>
        <Link href="https://www.github.com/emaLorenzo" passHref>
          <a className="mr-4">GitHub</a>
        </Link>
        <Link href="https://www.linkedin.com/in/emanuellorenzo/" passHref>
          <a className="mr-4">Instagram</a>
        </Link>
        <Link href="https://www.linkedin.com/in/emanuellorenzo/" passHref>
          <a>Twitter</a>
        </Link>
      </div>
      <span className="min-w-fit text-xs">
        © 2022 Emanuel Lorenzo. All Rights Reserved.
      </span>
    </footer>
  </>
);
