import { ChatHeaderAll, ChatHeaderAllProps } from './ChatHeaderAll';

export interface ChatHeaderLightNewMessageToggleProps
  extends ChatHeaderAllProps {
  subText: string;
  leftTitleText: string;
  toggleIconLeft: StaticImageData;
  toggleIconRight: StaticImageData;
  onExitClick: () => unknown;
  onMinimizeClick: () => unknown;
}

export const ChatHeaderLightNewMessageToggle = ({
  subText,
  leftTitleText,
  onExitClick,
  onMinimizeClick,
  toggleIconLeft,
  toggleIconRight,
}: ChatHeaderLightNewMessageToggleProps) => {
  return (
    <ChatHeaderAll
      onMinimizeClick={onMinimizeClick}
      toggleIconLeft={toggleIconLeft}
      toggleIconRight={toggleIconRight}
      onExitClick={onExitClick}
      isMinimizeIcon={true}
      isLeftIcon={false}
      isMenuIcon={false}
      isDarkMode={false}
      subText={subText}
      LeftTitleText={leftTitleText}
    />
  );
};
