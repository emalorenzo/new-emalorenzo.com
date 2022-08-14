import { FiAlertTriangle, FiEdit } from 'react-icons/fi';
import styled from 'styled-components';

const Wrapper = styled.aside`
  margin: 2rem 0;
  position: relative;
  border-radius: 0.5rem;
  padding: 2rem;

  h3 {
    margin-top: 0.5rem;
  }

  p {
    margin: 0;
  }

  a {
    color: ${(p) => p.linkColor} !important;
    font-weight: 500;
  }
`;

export const SideNote = ({ children, variant, title }) => {
  const bg = {
    lecture: 'bg-violet-800',
    material: 'bg-violet-800',
    disclaimer: 'bg-zinc-900',
  }[variant];
  const iconBg = {
    lecture: 'bg-violet-900',
    material: 'bg-violet-900',
    disclaimer: 'bg-zinc-800',
  }[variant];
  const iconColor = {
    lecture: 'text-violet-300',
    material: 'text-violet-300',
    disclaimer: 'text-zinc-300',
  }[variant];
  const Icon = {
    lecture: FiEdit,
    material: FiEdit,
    disclaimer: FiAlertTriangle,
  }[variant];
  const linkColor = {
    lecture: 'text-purple-200',
    material: 'text-purple-200',
    disclaimer: 'text-violet-300',
  }[variant];
  return (
    <Wrapper linkColor={linkColor} className={`${bg}`}>
      <div
        className={`rounded-full p-4 w-fit absolute left-[-16px] top-[-16px] ${iconBg} ${iconColor}`}
      >
        <Icon size={24} />
      </div>
      {title && <h3>{title}</h3>}
      {children}
    </Wrapper>
  );
};

SideNote.defaultProps = {
  variant: 'lecture',
};
