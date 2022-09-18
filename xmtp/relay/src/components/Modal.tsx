import styled from 'styled-components';

interface ModalProps {
  active: boolean;
  title: string;
  footer?: React.ReactNode; // if we need to use Button for closing the modal
  children: React.ReactNode;
  hideModal: () => void;
}

const Modal = ({ title, children, active, hideModal }: ModalProps) => {
  return (
    <>
      {active && (
        <ModalBlock>
          <ModalOverlay onClick={() => hideModal()}></ModalOverlay>
          <ModalContainer>
            <ModalHeader>
              <ModalTitle>{title}</ModalTitle>
              <ModalClose onClick={() => hideModal()}>X</ModalClose>
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
            {/* <ModalFooter>{footer}</ModalFooter> */}
          </ModalContainer>
        </ModalBlock>
      )}
    </>
  );
};

const ModalBlock = styled.div`
  align-items: center;
  bottom: 0;
  justify-content: center;
  left: 0;
  overflow: hidden;
  padding: 0.4rem;
  position: fixed;
  right: 0;
  top: 0;
  display: flex;
  opacity: 1;
  z-index: 400;
`;

const ModalOverlay = styled.a`
  background: rgba(16, 8, 23, 0.8);
  bottom: 0;
  cursor: default;
  display: block;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

const ModalContainer = styled.div`
  background: ${({ theme }) => theme.colors.newMessageColor};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  max-height: 75vh;
  max-width: 850px;
  padding: 0 0.8rem;
  width: 100%;
  z-index: 1;
  box-shadow: 0px 0px 10px 2px rgb(52 57 66);
  animation: fadein 1s linear forwards;

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const ModalHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: #303742;
  padding: 20px 5px 10px 5px;
`;

const ModalTitle = styled.span`
  font-size: 30px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white};
`;

const ModalClose = styled.a`
  position: absolute;
  text-decoration: none !important;
  cursor: pointer;
  font-size: 1rem;
  top: 10px;
  right: 0px;
  color: ${({ theme }) => theme.colors.white};
`;

const ModalBody = styled.div`
  overflow-y: auto;
  padding: 30px 10px;
  position: relative;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
`;

export default Modal;
