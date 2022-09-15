import '@/styles/global.css';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { GlobalStyles } from '@/components';
import { Dom, GlobalCanvas } from '@/layouts';
import type { AppPropsWithLayout } from '@/types';

const TransitionManager = () => {
  const router = useRouter();

  useEffect(() => {
    // TODO: add transition manager
  }, [router.asPath]);
  return null;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);
  console.log(Component.name);
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
      <GlobalCanvas />
      <TransitionManager />
      <GlobalStyles />
    </>
  );
};

export default App;
