import '@/styles/global.css';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Footer, GlobalStyles, Header } from '@/components';
import { Dom, GlobalCanvas } from '@/layouts';
import { useGlobalStore } from '@/store';
import type { AppPropsWithLayout } from '@/types';

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const router = useRouter();
  console.log('Get new page: ', Component.name);

  // The global canvan won't know that the router has changed
  // so we need to update it manually
  useEffect(() => {
    useGlobalStore.setState({ router });
  }, [router]);

  return (
    <>
      <GlobalStyles />
      <Dom>
        <Header />
        <AnimatePresence mode="wait">
          <motion.div
            key={Component.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            {/* @ts-ignore */}
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Dom>
      {/* GlobalCanvas won't rerender and it will hold the transitions */}
      <GlobalCanvas />
    </>
  );
};

export default App;
