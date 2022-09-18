import styled from 'styled-components';
import sendblack from '../icons/sendblack.png';
import Image from 'next/image';

export const ChatBox = () => {
  return (
    <Container>
      <Input type="text" placeholder="Write a Message..." />
      <ImageContainer>
        <Image height={20} width={20} src={sendblack} alt="send message" />
      </ImageContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.fillsTextbox};
  display: flex;
  align-items: center;
  padding-right: 20px;
`;

const Input = styled.input`
  border: none;
  width: 100%;
  height: 100%;
  padding: 15px 20px;
  background-color: ${(props) => props.theme.colors.fillsTextbox};
  outline: none;
  color: ${(props) => props.theme.colors.textPrimary};

  ::placeholder {
    color: #c8c1f2;
  }
`;

const ImageContainer = styled.div`
  min-height: 20px;
  min-width: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
