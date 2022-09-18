import styled from 'styled-components';
import Image from 'next/image';
import exitwhite from '../../../public/assets/images/exitwhite.png';
import exitblack from '../../../public/assets/images/exitblack.png';
import minimizewhite from '../../../public/assets/images/minimizewhite.png';
import minimizeblack from '../../../public/assets/images/minimizeblack.png';
import threedotmenuwhite from '../../../public/assets/images/threedotmenuwhite.png';
import threedotmenublack from '../../../public/assets/images/threedotmenublack.png';
import backarrowwhite from '../../../public/assets/images/backarrowwhite.png';
import backarrowblack from '../../../public/assets/images/backarrowblack.png';
import { useState } from 'react';

export interface ChatHeaderAllProps {
  LeftTitleText: string;
  badgeCount?: string;
  isDarkMode: boolean;
  isMinimizeIcon?: boolean;
  isMenuIcon: boolean;
  subText?: string;
  isLeftIcon: boolean;
  toggleIconLeft?: StaticImageData;
  toggleIconRight?: StaticImageData;
  onExitClick: () => unknown;
  onMinimizeClick?: () => unknown;
  onMenuClick?: () => unknown;
}

export const ChatHeaderAll = ({
  LeftTitleText,
  badgeCount,
  isMenuIcon,
  isMinimizeIcon,
  subText,
  isLeftIcon,
  toggleIconLeft,
  toggleIconRight,
  onExitClick,
  onMinimizeClick,
  onMenuClick,
  isDarkMode,
}: ChatHeaderAllProps) => {
  const [leftToggle, setLeftToggle] = useState(false);

  const handleLeftToggle = () => {
    setLeftToggle(true);
  };

  const handleRightToggle = () => {
    setLeftToggle(false);
  };
  return (
    <Container isDarkMode={isDarkMode}>
      <LeftContainer>
        {isLeftIcon && (
          <LeftIcon>
            <Image
              layout={'fixed'}
              src={isDarkMode ? backarrowwhite : backarrowblack}
              alt="back"
            />
          </LeftIcon>
        )}
        <FlexCol>
          <H2 isDarkMode={isDarkMode}>{LeftTitleText}</H2>
          {subText && <Subtext isDarkMode={isDarkMode}>{subText}</Subtext>}
        </FlexCol>
        {badgeCount && <Badge isDarkMode={isDarkMode}>{badgeCount}+</Badge>}
      </LeftContainer>
      <FlexRow>
        <ToggleContainer>
          {toggleIconLeft && (
            <LeftToggleItem leftToggle={leftToggle} onClick={handleLeftToggle}>
              <Image
                height={36}
                width={36}
                src={toggleIconLeft}
                alt="left toggle"
              />
            </LeftToggleItem>
          )}
          {toggleIconRight && (
            <RightToggleItem
              leftToggle={leftToggle}
              onClick={handleRightToggle}>
              <Image
                height={36}
                width={36}
                src={toggleIconRight}
                alt="right toggle"
              />
            </RightToggleItem>
          )}
        </ToggleContainer>
        <IconContainer>
          {isMenuIcon && (
            <Icon onClick={onMenuClick}>
              <Image
                layout={'fixed'}
                src={isDarkMode ? threedotmenuwhite : threedotmenublack}
                alt="Toggle menu"
              />
            </Icon>
          )}
          {isMinimizeIcon && (
            <Icon onClick={onMinimizeClick}>
              <Image
                layout={'fixed'}
                src={isDarkMode ? minimizewhite : minimizeblack}
                alt="Minimize window"
              />
            </Icon>
          )}
          <Icon onClick={onExitClick}>
            <Image
              layout={'fixed'}
              src={isDarkMode ? exitwhite : exitblack}
              alt="close window"
            />
          </Icon>
        </IconContainer>
      </FlexRow>
    </Container>
  );
};

interface ChatHeaderAllStyleProps {
  isDarkMode?: boolean;
  leftToggle?: boolean;
}

const Container = styled.div<ChatHeaderAllStyleProps>`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) =>
    props.isDarkMode
      ? (props) => props.theme.colors.brandPrimary
      : props.theme.colors.fillsBackground};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 31px 25px 31px 20px;
`;

const H2 = styled.h2<ChatHeaderAllStyleProps>`
  font-size: 14px;
  font-weight: 500;
  line-height: 17.71px;
  margin-right: 8px;
  color: ${(props) =>
    props.isDarkMode ? '#F7F7F7' : (props) => props.theme.colors.textPrimary};
`;
const Badge = styled.div<ChatHeaderAllStyleProps>`
  border-radius: 99rem;
  padding: 4px 6px;
  background-color: white;
  font-size: 10px;
  font-weight: 450;
  border: ${(props) => (props.isDarkMode ? '1px solid #4E4773' : 'none')};
  box-shadow: ${(props) =>
    props.isDarkMode ? 'none' : '0px 0px 4px rgba(0, 0, 0, 0.1)'};
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Icon = styled.div`
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 20px;
  width: 20px;
`;

const Subtext = styled.span<ChatHeaderAllStyleProps>`
  color: #515151;
  color: #f7f7f7;
  font-size: 10px;
  font-weight: 450;
  line-height: 12.65px;
  margin-top: 2px;
  color: ${(props) => (props.isDarkMode ? '#F7F7F7' : '#515151')};
`;

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;
const FlexRow = styled.div`
  display: flex;
  align-items: center;
`;

const LeftIcon = styled(Icon)`
  margin-left: 0px;
  align-self: center;
  margin-right: 10px;
`;

const ToggleContainer = styled.ul`
  display: flex;
  align-items: center;
  list-style-type: none;
`;

const ToggleItem = styled.li`
  border-radius: 12px;
  height: 36px;
  width: 36px;
  cursor: pointer;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
`;

const LeftToggleItem = styled(ToggleItem)<ChatHeaderAllStyleProps>`
  border: ${(props) => (props.leftToggle ? '2px solid #5A46C6' : 'none')};
`;

const RightToggleItem = styled(ToggleItem)<ChatHeaderAllStyleProps>`
  border: ${(props) => (props.leftToggle ? 'none' : '2px solid #5A46C6')};
  margin-left: 7px;
`;
