import styled from 'styled-components';
import Image from 'next/image';

export interface ButtonsProps {
  isPrimary: boolean;
  onClick?: () => unknown;
  icon?: StaticImageData;
  textContent: string;
}

export const Buttons = ({
  isPrimary,
  onClick,
  textContent,
  icon,
}: ButtonsProps) => {
  return (
    <Button
      style={{ cursor: onClick === undefined ? 'default' : 'pointer' }}
      onClick={onClick}
      isPrimary={isPrimary}>
      {icon && (
        <IconContainer>
          <Icon layout={'fixed'} alt="Button Icon" src={icon} />
        </IconContainer>
      )}
      <Text>{textContent}</Text>
    </Button>
  );
};

export interface ButtonsStyleProps {
  isPrimary: boolean;
}

const Button = styled.button<ButtonsStyleProps>`
  display: flex;
  align-items: center;
  color: ${(props) =>
    props.isPrimary ? 'white' : (props) => props.theme.colors.textPrimary};
  border-radius: 12px;
  padding: 12px 16px;
  border: ${(props) =>
    props.isPrimary ? '1px solid #4E4773' : '1px solid #E7DEFF'};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  background-color: ${(props) =>
    props.isPrimary
      ? (props) => props.theme.colors.brandPrimary
      : (props) => props.theme.colors.fillsOverlay};
`;

const Text = styled.span`
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
`;

const Icon = styled(Image)``;

const IconContainer = styled.div`
  width: 15px;
  margin-right: 4px;
`;
