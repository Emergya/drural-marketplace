import { styled } from "@styles";

export const Checkbox = styled.div<{ disabled?: boolean }>`
  width: 100%;
  margin-bottom: 1.25rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  cursor: pointer;
  position: relative;
  margin-left: -4px;
  color: ${props => props.disabled && props.theme.colors.druralGray_200};
`;

export const Label = styled.label`
  display: flex;
  cursor: pointer;
  justify-content: flex-start;
  align-items: center;
  padding-right: 0.25rem;
  input[type="checkbox"] {
    display: none;
    position: relative;
    right: -999em;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
    width: 26px;

    span {
      background-color: ${props => props.theme.colors.white};
      border: 1px solid #1a1a1a;
      width: 16px;
      height: 16px;
      display: inline-block;
      border-radius: 2px;
    }

    :focus {
      outline: none;
    }
  }

  input:checked + div {
    span {
      background-clip: content-box;
      background-color: ${props => props.theme.colors.primaryDark};
      border: 0;
      transition: all ease 0.3s;

      div {
        position: absolute;
        top: 0px;
        left: 0px;
      }
    }
  }

  input:checked:disabled + div {
    span {
      background-color: ${props => props.theme.colors.druralGray_200};
    }
  }

  input:disabled + div {
    span {
      border: 1px solid ${props => props.theme.colors.druralGray_200};
    }
  }

  &:hover {
    input:checked + div {
      span {
        background-color: ${props => props.theme.colors.primary};
      }
    }

    input:checked:disabled + div {
      span {
        background-color: ${props => props.theme.colors.druralGray_200};
      }
    }

    input:disabled + div {
      span {
        border: 1px solid ${props => props.theme.colors.druralGray_200};
      }
    }
  }
`;

export const HelpText = styled.p<{
  disabled?: boolean;
}>`
  color: #000000;
  font-size: ${props => props.theme.typography.extraSmallTextFontSize};
  line-height: ${props => props.theme.typography.extraSmallTextLineHeight};
  margin-top: 3px;
  opacity: ${props => (props.disabled ? 0.2 : 0.5)};
`;
