import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: hsl(250 100% 80%);
    --background: hsl(300 50% 1%);
    --foreground: hsl(0 0% 100%);
    --text-color: hsl(0 100% 100%);
    --background-active: hsl(0 0% 60%);
    --color: hsl(0 0% 100%);
    --gap: 2rem;
    --max-width: 1100px;
    --header-height: 5rem;

    @media (max-width: 480px) {
      --gap: 1rem;
    }
  }
`;
