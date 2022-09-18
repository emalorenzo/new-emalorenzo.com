import '@/styles/global.css';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { GlobalStyles } from '@/components';
import { Dom, GlobalCanvas } from '@/layouts';
import { useGlobalStore } from '@/store';
import type { AppPropsWithLayout } from '@/types';

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const router = useRouter();
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);
  console.log(Component.name);

  // The global canvan won't know that the router has changed
  // so we need to update it manually
  useEffect(() => {
    useGlobalStore.setState({ router });
  }, [router]);

  return (
    <>
      <Dom>
        {getLayout(
          <AnimatePresence mode="wait">
            <motion.div
              key={Component.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              {/* @ts-ignore */}
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        )}
      </Dom>
      {/* This bad boi won't rerender and it will hold the transitions */}
      <GlobalCanvas />
      <GlobalStyles />
    </>
  );
};

export default App;
