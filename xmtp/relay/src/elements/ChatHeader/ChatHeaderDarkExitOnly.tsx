import { ChatHeaderAll, ChatHeaderAllProps } from './ChatHeaderAll';

export interface ChatHeaderDarkExitOnlyProps extends ChatHeaderAllProps {
  badgeCount: string;
  leftTitleText: string;
  onExitClick: () => unknown;
}

export const ChatHeaderDarkExitOnly = ({
  leftTitleText,
  onExitClick,
}: ChatHeaderDarkExitOnlyProps) => {
  return (
    <ChatHeaderAll
      isLeftIcon={false}
      onExitClick={onExitClick}
      isMenuIcon={false}
      isDarkMode={true}
      LeftTitleText={leftTitleText}
    />
  );
};
