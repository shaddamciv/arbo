import styled from 'styled-components';
import externalWindowBlue from '../../../public/assets/images/externalWindowBlue.png';

import Image from 'next/image';
import Link from 'next/link';

export interface NFTCardProps {
  title: string;
  nftWebsite: string;
  nftLogo: StaticImageData;
  onClickImage?: () => unknown;
}

export const NFTCard = ({
  title,
  nftWebsite,
  nftLogo,
  onClickImage,
}: NFTCardProps) => {
  return (
    <Container>
      <ImageContainer
        onClick={onClickImage}
        style={{ cursor: onClickImage === undefined ? 'default' : 'pointer' }}>
        <TopLogo layout="fill" alt="yay" src={nftLogo} />
      </ImageContainer>
      <BottomLabel>
        <Title>{title}</Title>
        <Link href={nftWebsite} passHref>
          <RightIconLink target="_blank">
            <Image
              height={12}
              width={12}
              src={externalWindowBlue}
              alt={`Open external window to ${title}`}
            />
          </RightIconLink>
        </Link>
      </BottomLabel>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid #dbdbdb;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  padding: 8px;
  height: 100%;
  border-radius: 16px;
`;

const Title = styled.h3`
  color: #2b2b2b;
  font-weight: 500;
  font-size: 14px;
  line-height: 19.6px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 80%;
`;

const BottomLabel = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 5px 15px 15px 15px;
  padding-bottom: 0px;
  width: 100%;
  margin-top: 5px;
`;

const RightIconLink = styled.a`
  margin-left: 15px;
  min-height: 12px;
  min-width: 12px;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  border-radius: 12px;
`;

const TopLogo = styled(Image)`
  object-fit: cover;
  border-radius: 16px;
`;
