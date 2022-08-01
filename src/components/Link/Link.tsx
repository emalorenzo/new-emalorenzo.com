import { FiGithub, FiTwitter } from 'react-icons/fi';
import styled from 'styled-components';

const Wrapper = styled.a`
  text-decoration: none !important;
  font-weight: 400;
  display: inline-block;
`;

type Props = {
  variant?: 'repo' | 'twitter' | 'default';
} & JSX.IntrinsicElements['a'];

export const Link = ({ href, children, variant, ...props }: Props) => {
  const Icon = {
    repo: FiGithub,
    twitter: FiTwitter,
    default: null,
  }[variant];
  const color = {
    repo: '!text-gray-500',
    twitter: '!text-blue-500',
    default: '!text-violet-600',
  }[variant];
  return (
    <Wrapper href={href} className={`${color}`} {...props}>
      {Icon && <Icon size={24} className="inline-block mx-1" />}
      {children}
    </Wrapper>
  );
};

Link.defaultProps = {
  variant: 'default',
};
