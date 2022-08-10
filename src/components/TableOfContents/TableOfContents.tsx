import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.aside`
  display: none;

  @media (min-width: 967.12px) {
    display: block;
    max-width: 250px;
    margin-left: auto;
    position: sticky;
    top: 0;
  }
`;

const TableNavigation = styled.ul`
  display: flex;
  flex-direction: column;
  font-size: ${18 / 16}rem;
  position: sticky;
  top: calc(var(--header-height) + var(--gap) * 4);

  a {
    font-size: 0.8em;
    margin-top: calc(var(--gap) / 3);
  }
`;

export const TableOfContents = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const elements: HTMLElement[] = Array.from(
      document.querySelectorAll('h2#contenido+ul>li>a')
    );
    const allSections = elements.map((element: HTMLElement) => ({
      href: element.getAttribute('href'),
      text: element.textContent,
    }));

    setSections(allSections);

    (document.querySelector('h2#contenido+ul') as HTMLElement).style.display =
      'none';
    (document.querySelector('h2#contenido') as HTMLElement).style.display =
      'none';
  }, []);
  return (
    <Wrapper>
      <h2>Contenido</h2>
      <TableNavigation>
        {sections.map(({ href, text }) => (
          <li key={href}>
            <a href={href}>{text}</a>
          </li>
        ))}
      </TableNavigation>
    </Wrapper>
  );
};
