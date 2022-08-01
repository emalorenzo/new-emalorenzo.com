import NextHead from 'next/head';

interface Props {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
}

export const Head = ({
  title,
  description,
  keywords,
  author,
  ogTitle,
  ogDescription,
  ogUrl,
  ogImage,
}: Props) => (
  <NextHead>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta name="author" content={author} />
    <meta property="og:title" content={ogTitle} />
    <meta property="og:description" content={ogDescription} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={ogUrl} />
    <meta property="og:image" content={ogImage} />
    <meta name="robots" content="follow, index" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@emalorenzo_" />
    <meta name="twitter:title" content="Ema Lorenzo: Creative Developer" />
    <meta
      name="twitter:description"
      content="👋 Hi! I'm Ema, a Frontend Developer in the search for more beauty on the web. Here I share about React, CSS, Three.js and more."
    />
    <meta
      name="twitter:image"
      content="https://emalorenzo.com/images/og-index.png"
    />
  </NextHead>
);

Head.defaultProps = {
  author: 'Emanuel Lorenzo',
  description:
    "👋 Hi! I'm Ema, a Frontend Developer with infinite curiosity in the search for more beauty on the web. Here I share about React, CSS, Three.js and more.",
  keywords: 'creative, developer, frontend, tech, art, react',
  ogDescription:
    "👋 Hi! I'm Ema, a Frontend Developer with infinite curiosity in the search for more beauty on the web. Here I share about React, CSS, Three.js and more.",
  ogImage: 'https://emalorenzo.com/images/og-index.png',
  ogTitle: 'Ema Lorenzo: Creative Developer',
  ogUrl: 'https://emalorenzo.com/',
  title: 'Ema Lorenzo',
};
