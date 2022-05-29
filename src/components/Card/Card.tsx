import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const Anchor = styled.a`
  text-decoration: none;
`;

const Wrapper = styled.article`
  height: 280px;
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
`;

const ImageWrapper = styled.div`
  height: 100%;
  flex: 4;
  position: relative;

  img {
    filter: saturate(0);
    transition: filter 0.2s ease-in-out;
    will-change: filter;

    ${Anchor}:hover & {
      filter: saturate(1);
    }
  }
`;

const Content = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: var(--gap);
  color: var(--color);
`;

const TitleWrapper = styled.div`
  width: fit-content;
`;

const Title = styled.h2`
  font-size: ${`${21 / 16}rem`};
  font-weight: 400;
  transition: transform 0.2s ease-in-out;
  will-change: transform;

  ${Anchor}:hover & {
    transform: translateY(-2px);
  }
`;

const Summary = styled.p`
  font-size: ${`${14 / 16}rem`};
  font-weight: 300;
`;

const Line = styled(motion.div)`
  height: 1px;
  background: white;
  width: 0%;
  transition: width 0.2s ease-in-out;
  transform: translateY(-4px);

  ${Anchor}:hover & {
    width: 100%;
  }
`;

export const Card = ({ slug, image, title, summary }) => {
  return (
    <Link href={slug} passHref>
      <Anchor>
        <Wrapper>
          <ImageWrapper>
            <Image src={image} layout="fill" />
          </ImageWrapper>
          <Content>
            <TitleWrapper>
              <Title>{title}</Title>
              <Line />
            </TitleWrapper>
            <Summary>{summary}</Summary>
          </Content>
        </Wrapper>
      </Anchor>
    </Link>
  );
};
