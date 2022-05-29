import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: hsl(250 100% 80%);
    --background: hsl(0 0% 0%);
    --foreground: hsl(0 0% 100%);
    --text-color: hsl(0 100% 100%);
    --background-active: hsl(0 0% 60%);
    --color: hsl(0 0% 100%);
    --gap: 2rem;
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
  }
  
  #root, #__next {
    isolation: isolate;
    height: 100%;
  }
`;
