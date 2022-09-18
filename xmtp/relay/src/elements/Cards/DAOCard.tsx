import styled from 'styled-components';
import Image from 'next/image';
import externalWindowBlue from '../../../public/assets/images/externalWindowBlue.png';
import Link from 'next/link';

export interface DAOCardProps {
  title: string;
  daoWebsite: string;
  daoLogo: StaticImageData;
  onClickImage?: () => unknown;
}

export const DAOCard = ({
  title,
  daoWebsite,
  daoLogo,
  onClickImage,
}: DAOCardProps) => {
  return (
    <Container>
      <FlexRowGroup>
        <LeftLogoContainer
          onClick={onClickImage}
          style={{
            cursor: onClickImage === undefined ? 'default' : 'pointer',
          }}>
          <LeftLogo
            height={60}
            width={60}
            src={daoLogo}
            alt={`${title} logo`}
          />
        </LeftLogoContainer>
        <TwentyPxSpace />
        <Title>{title}</Title>
      </FlexRowGroup>
      <Link href={daoWebsite} passHref>
        <RightIconLink target="_blank">
          <RightIcon
            height={12}
            width={12}
            src={externalWindowBlue}
            alt={`Open external window to ${title}`}
          />
        </RightIconLink>
      </Link>
    </Container>
  );
};

// Keep this aligned with the width of the right icon and the sum of left and right margin of the icon
const RightIconSpace = '12px';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #dbdbdb;
  border-radius: 12px;
  height: 84px;
  padding: 12px 26px 12px 12px;
`;

const Title = styled.h3`
  color: #2b2b2b;
  font-weight: 500;
  font-size: 14px;
  line-height: 19.6px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const RightIcon = styled(Image)`
  cursor: pointer;
`;

const LeftLogoContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 12px;
  min-height: 60px;
  min-width: 60px;
`;

const LeftLogo = styled(Image)`
  border-radius: 12px;
`;

const RightIconLink = styled.a`
  margin-left: 15px;
  min-height: 12px;
  min-width: 12px;
`;

const FlexRowGroup = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - ${RightIconSpace});
`;

const TwentyPxSpace = styled.div`
  width: 20px;
`;
