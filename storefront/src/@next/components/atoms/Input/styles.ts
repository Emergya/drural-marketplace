import { DruralTheme, styled } from "@styles";

import { activeLabelStyles } from "../InputLabel";

type WrapperProps = {
  active: boolean;
  error: boolean;
  disabled: boolean;
  theme: DruralTheme;
};

const getEdgeColor = (
  { active, error, disabled, theme }: WrapperProps,
  hovered = false
) => {
  if (disabled) {
    return theme.colors.disabled;
  }

  if (error) {
    return theme.colors.error;
  }

  if (hovered) {
    return theme.colors.primaryLight;
  }

  return active ? theme.colors.primary : theme.colors.borderGray;
};

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  border: ${props => {
    if (props.error) {
      return `2px solid ${getEdgeColor(props)}`;
    }
    if (props.active) {
      return `2px solid ${getEdgeColor(props)}`;
    }
    return `1px solid ${getEdgeColor(props)}`;
  }}};
  color: rgba(0, 0, 0, 0.6);
  // transition: all 0.3s ease;
  border-radius: 4px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);

  &:hover {
    border-color: ${props => {
      if (props.active) {
        return getEdgeColor(props);
      }
      return getEdgeColor(props, true);
    }};
    background-color: ${props => {
      if (props.error || props.active) {
        return "none";
      }
      return props.theme.colors.primaryTransparent;
    }};
    color: ${props =>
      props.error || props.disabled
        ? `rgba(0, 0, 0, 0.5)`
        : props.theme.colors.primary};
  }
  &:focus {
    border: 2px solid ${props => props.theme.colors.primary};
  }
`;

export const Content = styled.span`
  display: flex;
  align-items: center;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Input = styled.input<{
  active: boolean;
  labelBackground: string | null;
}>`
  padding: ${props => (props.active ? "1.2rem 1rem 0.4rem" : "0.8rem 1rem")};
  margin: 0;
  border: none;
  width: 100%;
  font-size: ${props => props.theme.typography.baseFontSize};
  outline: none;
  background-color: transparent;
  &:-webkit-autofill {
    & + label {
      ${props => activeLabelStyles(props.theme, props.labelBackground)};
    }
  }
  &
`;
