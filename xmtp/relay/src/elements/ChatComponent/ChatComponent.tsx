import { ReactChildren } from 'react';
import styled from 'styled-components';

export interface ChatComponentProps {
  children: ReactChildren;
}

export const ChatComponent = (props: ChatComponentProps) => {
  return <Container>{props.children}</Container>;
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.colors.fillsBackground};
`;
