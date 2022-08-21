import '@/styles/global.css';

import { GlobalStyles } from '@/components';
import { Dom } from '@/layouts';
import type { AppPropsWithLayout } from '@/types';

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(
    <>
      <Dom>
        {/* @ts-ignore */}
        <Component {...pageProps} />
      </Dom>
      <GlobalStyles />
    </>
  );
};

export default App;
