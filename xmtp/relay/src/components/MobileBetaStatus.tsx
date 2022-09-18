import styled from 'styled-components';
import Image from 'next/image';
import Github from './Github';
import MirrorWhite from '../../public/assets/images/mirror-white.png';
import WhiteLogo from '../../public/assets/images/whitelogo.png';
import twitter from '../../public/assets/images/twitterwhite.png';
import discord from '../../public/assets/images/discordwhite.png';
import Link from 'next/link';

export default function MobileBetaStatus() {
  return (
    <Wrapper>
      <Space>
        <Link href="https://try.relay.cc" passHref>
          <a target="_blank" rel="noreferrer">
            <Image
              src={WhiteLogo.src}
              width="28"
              height="24"
              alt="white-logo"
            />
          </a>
        </Link>
      </Space>
      <Space>
        <Link href="https://github.com/relaycc" passHref>
          <a target="_blank" rel="noreferrer">
            <Github />
          </a>
        </Link>
      </Space>
      <Space>
        <Link href="https://twitter.com/relay_eth" passHref>
          <Twitter
            href="https://twitter.com/relay_eth"
            target="_blank"
            rel="noreferrer">
            <Image
              width={32}
              height={32}
              alt="link to relay twitter page"
              src={twitter}
            />
          </Twitter>
        </Link>
      </Space>
      <Space>
        <Link href="https://mirror.xyz/relaycc.eth" passHref>
          <Mirror target="_blank" rel="noreferrer" />
        </Link>
      </Space>
      <Space>
        <Discord
          href="https://discord.gg/DTMKf63ZSf"
          target="_blank"
          rel="noreferrer">
          <Image
            width={32}
            height={32}
            alt="link to relay discord"
            src={discord}
          />
        </Discord>
      </Space>
    </Wrapper>
  );
}

const Mirror = styled.a`
  display: block;
  background-image: url(${MirrorWhite.src});
  background-repeat: no-repeat;
  background-size: contain;
  height: 24px;
  width: 22px;
  margin-right: -4px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #7349e5;
  border: 2px solid #9771ff;
  border-radius: 12px;
  padding: 5px 0px;

  & > a {
    margin-right: 0.5rem;
  }
`;

const Discord = styled.a`
  margin-left: -3px;
  margin-bottom: -3px;
`;

const Twitter = styled.a`
  margin-bottom: -4px;
  margin-left: -2px;
`;

const Space = styled.div`
  height: 35px;
  width: 50px;
  border-right: 1px solid #9771ff;
  display: flex;
  align-items: center;
  justify-content: center;
  &:last-of-type {
    border-right: none;
  }
`;
