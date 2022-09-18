import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const LogoWrapper = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.3rem 0;
  margin: 0;
  overflow: hidden;
  height: 1.5rem;
  min-width: 200px;
  /* width: ${({ roomForIcon }) => (roomForIcon ? '120px' : '100px')}; */
  transition: width 0.5s ease-in-out;
  transition-delay: ${({ roomForIcon }) => (roomForIcon ? '0s' : '0.7s')};
  user-select: none;

  &:hover {
    cursor: pointer;
  }
`;

const Door = styled(motion.polyline)`
  fill-opacity: 0;
  transition: fill-opacity 0.3s ease-in-out;
  /* margin-bottom: -2px; */

  ${LogoWrapper}:hover & {
    fill-opacity: 1;
  }
`;

const SVGText = styled.span`
  position: absolute;
  left: ${({ roomForIcon }) => (roomForIcon ? 'calc(18px + 0.2em)' : '0')};
  height: 100%;
  display: flex;
  transition: left 0.5s ease-in-out;
  transition-delay: ${({ roomForIcon }) => (roomForIcon ? '0s' : '0.7s')};
`;

const Line = styled(motion.div)`
  bottom: 0px;
  left: 0;
  position: absolute;
  height: 2px;
  background: white;
  width: 0%;
  transition: width 0.2s ease-in-out;

  ${LogoWrapper}:hover & {
    width: 100%;
  }
`;

const SVGTransition: any = {
  duration: 3,
  repeat: false,
};

const HomeIcon = ({ delay }) => (
  <motion.svg
    className="absolute"
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    initial={{ y: '120%' }}
    animate={{ y: '0%' }}
    exit={{ y: '150%', transition: { delay: delay * 0.5 } }}
    transition={{ duration: 0.5 }}
  >
    <motion.path
      d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={SVGTransition}
    />
    <Door
      points="9 22 9 12 15 12 15 22"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={SVGTransition}
      fill="white"
    />
  </motion.svg>
);

const Section = ({ section, href, isLink }) => {
  return (
    <motion.div
      className="relative overflow-hidden flex items-center pl-2 ml-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { delay: 0.5 } }}
      transition={{ duration: 0.5 }}
    >
      {isLink ? (
        <Link href={href} passHref>
          <a className="font-light hover:font-bold ml-2">{section}</a>
        </Link>
      ) : (
        <motion.p
          className="font-bold ml-2"
          initial={{ x: '-120%', opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.5 } }}
          exit={{ x: '-120%', opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {section}
        </motion.p>
      )}
      <motion.span className="absolute left-0">/</motion.span>
    </motion.div>
  );
};

export const Header = () => {
  // const [section, setSection] = useState(null);
  const router = useRouter();
  const { pathname, asPath } = router;

  // useEffect(() => {
  //   const hostname = window.location.hostname.split('.');
  //   const subdomain = hostname.length >= 2 ? hostname[0] : null;

  //   if (subdomain) {
  //     setSection(subdomain);
  //   }
  // }, [pathname]);

  const urlsChunks = pathname !== '/' ? asPath.split('/') : [''];

  const urls = urlsChunks.map((chunk, index) => {
    const url = urlsChunks.slice(0, index + 1).join('/') || '/';
    const name = chunk ? chunk.split('-').join(' ') : 'emalorenzo.com';

    return { url, name };
  });

  return (
    <header className="fixed z-20 top-0 py-3 font-light h-20 flex justify-between left-0 right-0 items-center max-w-center">
      <LogoWrapper roomForIcon={pathname !== '/'}>
        <AnimatePresence mode="wait">
          {/* Home url */}
          {urls.length > 1 && (
            <Link href="/" passHref>
              <a className="w-[18px] h-[18px] relative">
                {/* we dont need delay for home,
                but for the other sections we wait for them to be hidden */}
                <HomeIcon delay={urls.length - 1} />
              </a>
            </Link>
          )}
          {urls.length === 1 && (
            <motion.span
              key="emalorenzo.com"
              className="font-bold"
              initial={{ x: '-100%' }}
              animate={{ x: '0' }}
              exit={{ x: '-100%', position: 'absolute' }}
              transition={{ duration: 1 }}
            >
              {urls[0].name}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Section url */}
        <AnimatePresence mode="wait">
          {urls.length >= 2 && (
            <Section
              key="section"
              section={urls[1].name}
              href={urls[1].url}
              isLink={urls.length > 2}
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {/* Detail url */}
          {urls.length === 3 && (
            <Section
              key="section2"
              section={urls[2].name}
              href={urls[2].url}
              isLink={urls.length > 3}
            />
          )}
        </AnimatePresence>
        {/* <Line /> */}
      </LogoWrapper>
      <Link href="/about" passHref>
        <a>about</a>
      </Link>
    </header>
  );
};
