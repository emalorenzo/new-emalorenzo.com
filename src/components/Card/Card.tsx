import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useCursor } from '@/hooks';

const Wrapper = styled.article`
  /* height: 280px; */
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  padding: var(--gap);
  color: var(--color);

  @media (max-width: 480px) {
    width: calc(100% + var(--gap) * 2);
    margin-left: calc(var(--gap) * -1);
  }
`;

// const ImageWrapper = styled.div`
//   height: 100%;
//   flex: 4;
//   position: relative;

//   img {
//     filter: saturate(0);
//     transition: filter 0.2s ease-in-out;
//     will-change: filter;

//     a:hover & {
//       filter: saturate(1);
//     }
//   }
// `;

const TitleWrapper = styled.div`
  width: fit-content;
`;

const Title = styled.h3`
  font-size: ${`${22 / 16}rem`};
  font-weight: 600;
  transition: transform 0.2s ease-in-out;
  will-change: transform;

  a:hover & {
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

  a:hover & {
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
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);
  const { setCursor } = useCursor();

  const handlePointerEnter = () => {
    setHovered(true);
  };
  const handlePointerLeave = () => {
    setHovered(false);
  };
  const handlePointerDown = () => {
    setCursor({ type: 'image', config: { src: image, useAsHero: true } });
  };

  useEffect(() => {
    if (hovered) {
      setCursor({ type: 'image', config: { src: image } });
    } else {
      setCursor({ type: 'default' });
    }
  }, [hovered]);

  useEffect(() => {
    if (selected) {
      setCursor({ type: 'image', config: { src: image } });
    }
  }, [selected]);
  return (
    <Link href={slug} passHref>
      <a
        onPointerOver={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerUp={handlePointerDown}
        className="mb-4 border border-[#030103] hover:border-stone-900 rounded-lg"
      >
        <Wrapper>
          <TitleWrapper>
            <Title>{title}</Title>
            <Line />
          </TitleWrapper>
          <Subtitle className="text-pink-800">{subtitle}</Subtitle>
          <Summary className="mt-4">{summary}</Summary>
        </Wrapper>
      </a>
    </Link>
  );
};

Card.defaultProps = {
  subtitle: '',
};
