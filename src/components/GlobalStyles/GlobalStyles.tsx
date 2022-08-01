import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

  :root {
    --primary-color: hsl(250 100% 80%);
    --background: hsl(300 50% 1%);
    --foreground: hsl(0 0% 100%);
    --text-color: hsl(0 100% 100%);
    --background-act ive: hsl(0 0% 60%);
    --color: hsl(0 0% 100%);
    --gap: 2rem;
    --max-width: 1100px;
    --header-height: 5rem;

    @media (max-width: 480px) {
      --gap: 1rem;
    }
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }

  html, body {
    height: 100%;
    scroll-behavior: smooth;
    background-color: var(--background);
  }

  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    font-family: 'Poppins', sans-serif;
    color: var(--text-color);
    accent-color: var(--primary-color);
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
    line-height: calc(1em + 0.725rem);
  }

  ul {
    padding-inline-start: 0px;
  }

  li {
    list-style: none;
  }
  
  #root, #__next {
    isolation: isolate;
    height: 100%;
  }
`;
