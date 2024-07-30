import { styled } from "@styles";

export const SwitchStyled = styled.div`
  .rc-switch {
    width: 64px;
    height: 40px;
    border-color: ${props => props.theme.colors.grayLight};
    background-color: ${props => props.theme.colors.grayLight};

    &:focus {
      box-shadow: none;
    }

    &:after {
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
      height: 32px;
      left: 3px;
      top: 3px;
      width: 32px;
    }
  }
  .rc-switch-checked {
    border-color: ${props => props.theme.colors.primary_400};
    background-color: ${props => props.theme.colors.primary_400};

    &:after {
      left: 27px;
    }
  }
  .rc-switch-disabled {
    opacity: 0.4;

    &:after {
      background-color: ${props => props.theme.colors.white};
    }
  }
  .rc-switch-inner {
    font-size: 16px;
    left: 40px;
    top: 10px;
  }
`;
