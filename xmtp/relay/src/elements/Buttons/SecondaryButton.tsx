import { Buttons } from './Buttons';

export interface SecondaryButtonProps {
  onClick?: () => unknown;
  textContent: string;
  icon?: StaticImageData;
}

export const SecondaryButton = ({
  onClick,
  textContent,
  icon,
}: SecondaryButtonProps) => {
  return (
    <Buttons
      icon={icon}
      textContent={textContent}
      onClick={onClick}
      isPrimary={false}
    />
  );
};
