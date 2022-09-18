import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useDisconnect } from 'wagmi';

interface SidePanelProps {
  isHorizontal?: boolean;
}

const SidePanel = ({ isHorizontal = false }: SidePanelProps) => {
  const router = useRouter();
  const { disconnect } = useDisconnect();

  const goToGithub = useCallback(() => {
    router.push('https://github.com/daopanel');
  }, [router]);

  const changeTheme = useCallback(() => {
    console.log('IMPLEMENT THIS');
  }, []);

  const doDisconnect = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return (
    <Container isHorizontal={isHorizontal}>
      <StyledImage
        src={'/assets/images/github.svg'}
        width={24}
        height={24}
        alt="github"
        onClick={goToGithub}
      />
      <StyledImage
        src={'/assets/images/lightbulb.svg'}
        width={24}
        height={24}
        alt="lightbulb"
        onClick={changeTheme}
      />
      <StyledImage
        src={'/assets/images/exit-door.svg'}
        width={24}
        height={24}
        alt="exit-door"
        onClick={doDisconnect}
      />
    </Container>
  );
};

const Container = styled.div<{ isHorizontal: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  border-right: 2px solid #191027;
  width: 93px;
  gap: 2rem;
  padding-bottom: 2rem;
`;

const StyledImage = styled(Image)`
  cursor: pointer;
`;

export default SidePanel;
