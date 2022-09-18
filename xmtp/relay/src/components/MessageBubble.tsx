import styled, { CSSProperties } from 'styled-components';

interface TextBubbleProps {
  message: string;
  backgroundColor: string;
  color: string;
  borderBottomRightRadius: string;
  borderBottomLeftRadius: string;
  dateColor: string;
}

const MessageBubble = (props: TextBubbleProps) => {
  return (
    <TextWrapper
      style={
        {
          '--background': props.backgroundColor,
          '--border-bottom-right-radius': props.borderBottomRightRadius,
          '--border-bottom-left-radius': props.borderBottomLeftRadius,
        } as CSSProperties
      }>
      <MessageText style={{ '--color': props.color } as CSSProperties}>
        {props.message}
      </MessageText>
    </TextWrapper>
  );
};

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 16px 20px;
  border-radius: 8px;
  border-bottom-right-radius: var(--border-bottom-right-radius);
  border-bottom-left-radius: var(--border-bottom-left-radius);
  width: 100%;
  background-color: var(--background);
  hyphens: auto;
`;

const MessageText = styled.p`
  font-family: ${({ theme }) => theme.fontFamily.Montserrat};
  color: var(--color);
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  word-break: break-word;
`;

export default MessageBubble;
