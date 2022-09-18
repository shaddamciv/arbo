import { Buttons } from './Buttons';

export interface PrimaryButtonProps {
  onClick?: () => unknown;
  textContent: string;
  icon?: StaticImageData;
}

export const PrimaryButton = ({
  onClick,
  textContent,
  icon,
}: PrimaryButtonProps) => {
  return (
    <Buttons
      icon={icon}
      textContent={textContent}
      onClick={onClick}
      isPrimary={true}
    />
  );
};
