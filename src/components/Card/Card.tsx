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

  @media (max-width: 480px) {
    width: calc(100% + var(--gap) * 2);
    margin-left: calc(var(--gap) * -1);
  }
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

const Title = styled.h3`
  font-size: ${`${22 / 16}rem`};
  font-weight: 600;
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

const Subtitle = styled.h4`
  font-size: ${`${14 / 16}rem`};
`;

interface Props {
  slug: string;
  image: string;
  title: string;
  subtitle?: string;
  summary: string;
}

export const Card = ({ slug, image, title, subtitle, summary }: Props) => {
  return (
    <Link href={slug} passHref>
      <Anchor>
        <Wrapper>
          <ImageWrapper>
            <Image src={image} layout="fill" objectFit="cover" />
          </ImageWrapper>
          <Content>
            <TitleWrapper>
              <Title>{title}</Title>
              <Line />
            </TitleWrapper>
            <Subtitle className="text-pink-800">{subtitle}</Subtitle>
            <Summary className="mt-4">{summary}</Summary>
          </Content>
        </Wrapper>
      </Anchor>
    </Link>
  );
};

Card.defaultProps = {
  subtitle: '',
};
