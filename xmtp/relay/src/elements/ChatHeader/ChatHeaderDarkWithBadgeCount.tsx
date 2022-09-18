import { ChatHeaderAll, ChatHeaderAllProps } from './ChatHeaderAll';

export interface ChatHeaderDarkWithBadgeCountProps extends ChatHeaderAllProps {
  badgeCount: string;
  leftTitleText: string;
  onExitClick: () => unknown;
}

export const ChatHeaderDarkWithBadgeCount = ({
  leftTitleText,
  onExitClick,
  badgeCount,
}: ChatHeaderDarkWithBadgeCountProps) => {
  return (
    <ChatHeaderAll
      badgeCount={badgeCount}
      isLeftIcon={false}
      onExitClick={onExitClick}
      isMenuIcon={false}
      isDarkMode={true}
      LeftTitleText={leftTitleText}
    />
  );
};
