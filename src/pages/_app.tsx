import '@/styles/global.css';

import {
  GlobalCanvas,
  HijackedScrollbar,
  ScrollScene,
  useCanvas,
} from '@14islands/r3f-scroll-rig';

import { GlobalStyles } from '@/components';
import type { AppPropsWithLayout } from '@/types';

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(
    <>
      {/* @ts-ignore */}
      <Component {...pageProps} />
      <GlobalStyles />
    </>
  );
};

export default App;
