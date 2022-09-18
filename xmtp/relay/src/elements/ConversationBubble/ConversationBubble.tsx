import styled from 'styled-components';

export interface ConversationBubbleProps {
  fromMe?: boolean;
  timestamp?: string;
  messagecontent?: string;
}

export const ConversationBubble = ({
  fromMe,
  messagecontent,
  timestamp,
}: ConversationBubbleProps) => {
  return (
    <Container fromMe={fromMe}>
      <Message fromMe={fromMe}>{messagecontent}</Message>
      <Timestamp fromMe={fromMe}>{timestamp}</Timestamp>
    </Container>
  );
};
export interface ConversationBubbleProps {
  fromMe?: boolean;
}

const Container = styled.div<ConversationBubbleProps>`
  background-color: ${(props) => (props.fromMe ? '#5A46C6' : '#F8F7FF')};
  border-radius: ${(props) =>
    props.fromMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px;'};
  padding: 12px 16px;
  width: max-content;
  max-width: 220px;
  display: flex;
  flex-direction: column;
`;

const Message = styled.p<ConversationBubbleProps>`
  color: ${(props) => (props.fromMe ? 'white' : '##060028')};
  font-size: 14px;
  font-weight: 450;
  text-align: ${(props) => (props.fromMe ? 'right' : 'left')};
  line-height: 17.71px;
`;

const Timestamp = styled.span<ConversationBubbleProps>`
  color: ${(props) => (props.fromMe ? '#CFC6FF' : '#4E4773')};
  margin-top: 8px;
  font-weight: 450;
  font-size: 10px;
  text-align: ${(props) => (props.fromMe ? 'right' : 'left')};
`;
