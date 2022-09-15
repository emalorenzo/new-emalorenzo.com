import { motion } from 'framer-motion';
import Link from 'next/link';

export const Hero = () => {
  return (
    <section className="h-full flex flex-col justify-center items-center">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        This will be a cool showcase of my work. Someday.
      </motion.p>
      <Link passHref href="/blog">
        <a className="mt-4">Go to blog</a>
      </Link>
    </section>
  );
};
