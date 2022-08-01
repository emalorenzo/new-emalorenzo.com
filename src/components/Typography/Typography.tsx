import { motion } from 'framer-motion';
import styled from 'styled-components';

const OverflowHidden = styled.div`
  overflow: hidden;
`;

const Text = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 2rem;
    line-height: 1.2;
  }
`;

export const Subtitle = styled(motion.h2)`
  font-size: 1.2rem;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const Paragraph = styled.p`
  font-size: ${`${18 / 16}rem`};
  line-height: calc(1em + 0.725rem);
  margin-bottom: 1.5rem;

  a {
    color: #c2c2c2;
    text-decoration: underline;
  }
`;

export const Blockquote = styled.blockquote`
  padding: 1rem;
  margin: 2rem 0;

  p {
    font-size: 1.5rem;
    font-style: italic;
  }
`;

export const Title = ({ children, ...props }) => (
  <OverflowHidden {...props}>
    <Text
      initial={{ opacity: 0, y: '120%' }}
      animate={{ opacity: 1, y: '0%' }}
      transition={{ duration: 1.5 }}
    >
      {children}
    </Text>
  </OverflowHidden>
);
