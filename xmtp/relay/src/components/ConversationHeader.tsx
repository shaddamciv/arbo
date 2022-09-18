import styled from 'styled-components';
import Image from 'next/image';
import { useRouterEnsData } from 'hooks';
import ArrowLeft from '../../../public/assets/images/ArrowLeft.svg';
import MobileMenu from '../../../public/assets/images/MobileMenu.svg';
import { useRouter } from 'next/router';
import Avatar from './Avatar';

interface ConversationHeaderProps {
  peerAddress: string;
}

const ConversationHeader = ({ peerAddress }: ConversationHeaderProps) => {
  const { name } = useRouterEnsData();
  const router = useRouter();
  return (
    <FixedTop>
      <StyledImage
        width={20}
        height={20}
        src={ArrowLeft}
        onClick={() => router.push('/conversations')}
      />
      <Peer>
        <Avatar address={peerAddress} />
        <p>{name}</p>
      </Peer>
      <StyledImage
        width={20}
        height={20}
        src={MobileMenu}
        onClick={() => router.push('/conversations')}
      />
    </FixedTop>
  );
};

const FixedTop = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 96px;
  background: #100817;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 2px solid #191027;
`;

const StyledImage = styled(Image)`
  border-radius: 46px;
  cursor: pointer;
`;

const Peer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  color: white;
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  letter-spacing: -0.01em;
`;

export default ConversationHeader;
