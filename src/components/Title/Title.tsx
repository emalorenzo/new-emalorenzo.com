import { motion } from 'framer-motion';
import styled from 'styled-components';

const OverflowHidden = styled.div`
  overflow: hidden;
  margin-top: 2rem;
  margin-bottom: 5rem;
`;

const Text = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 400;
`;

export const Title = ({ children }) => (
  <OverflowHidden>
    <Text
      initial={{ opacity: 0, y: '120%' }}
      animate={{ opacity: 1, y: '0%' }}
      transition={{ duration: 1.5 }}
    >
      {children}
    </Text>
  </OverflowHidden>
);
