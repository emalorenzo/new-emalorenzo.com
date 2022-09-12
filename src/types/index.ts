import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout<T = unknown> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout<T = unknown> = AppProps & {
  Component: NextPageWithLayout<T>;
};

export interface ArticleMeta {
  title: string;
  publishedAt: string;
  summary: string;
  image: string;
  tags: string[];
  slug: string;
  background: string;
}
