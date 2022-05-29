import { motion } from 'framer-motion';
import styled from 'styled-components';

const Wrapper = styled.section`
  min-height: 40vh;
  display: grid;
  place-items: center;
`;

export const Hero = () => {
  return (
    <Wrapper>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        In the search for more beauty on the web.Here I share about React, CSS,
        Three.js and more.
      </motion.p>
    </Wrapper>
  );
};
