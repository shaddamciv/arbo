import styled from 'styled-components';

enum TagsEnum {
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'span',
}

type TagsType = keyof typeof TagsEnum;

interface TextProps {
  text: string;
  tag: TagsType;
  className?: string;
  onClick?: () => void;
  // children?: React.ReactNode;
}

const Text = ({ text, tag, onClick, className }: TextProps) => {
  return (
    <Wrapper as={tag} className={className} onClick={onClick}>
      {text}
    </Wrapper>
  );
};

// This is just a general style if needed
const Wrapper = styled.h1`
  /* color: red; */
`;

export default Text;
