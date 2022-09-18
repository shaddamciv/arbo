import styled from 'styled-components';

export interface SwitchPrimaryProps {
  textContent: string;
  isPrimary: boolean;
  onClick?: () => unknown;
}

export const SwitchPrimary = ({
  textContent,
  isPrimary,
  onClick,
}: SwitchPrimaryProps) => {
  return (
    <Button
      style={{ cursor: onClick === undefined ? 'default' : 'pointer' }}
      onClick={onClick}
      isPrimary={isPrimary}>
      <ButtonText>{textContent}</ButtonText>
    </Button>
  );
};

export interface SwitchPrimaryStyleProps {
  isPrimary: boolean;
}

const Button = styled.button<SwitchPrimaryStyleProps>`
  font-size: 12px;
  line-height: 18px;
  padding: 8px 12px;
  color: ${(props) =>
    props.isPrimary ? 'white' : (props) => props.theme.colors.textSecondary};
  border-radius: 80px;
  background-color: ${(props) =>
    props.isPrimary
      ? (props) => props.theme.colors.brandPrimary
      : 'transparent'};
  border: ${(props) =>
    props.isPrimary ? '1px solid #4E4773' : '1px solid white'};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
`;

const ButtonText = styled.span``;
