import styled from 'styled-components';
import { useRef } from 'react';

export interface TextAreaProps {
  onChange?: () => unknown;
  onSubmit?: () => unknown;
}

export const TextArea = ({ onChange, onSubmit }: TextAreaProps) => {
  const TextInputRef = useRef(null);

  return (
    <Container>
      <Input
        ref={TextInputRef}
        onChange={onChange}
        onSubmit={onSubmit}
        placeholder="Write message here..."
      />
    </Container>
  );
};

const Input = styled.textarea`
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.colors.fillsTextbox};
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #fbfbfb;
  color: ${(props) => props.theme.colors.textSecondary};
  outline: none;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  resize: none;
  font-family: 'inter';

  ::placeholder {
    font-size: 14px;
    font-weight: 450;
    line-height: 17.71px;
    color: ${(props) => props.theme.colors.textSecondary};
    font-family: 'inter';
  }
`;

const Container = styled.div`
  height: 500px;
  width: 500px;
`;
