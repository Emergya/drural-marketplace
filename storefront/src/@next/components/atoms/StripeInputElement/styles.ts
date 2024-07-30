import { DruralTheme, styled } from "@styles";

type WrapperProps = {
  active: boolean;
  error: boolean;
  theme: DruralTheme;
};

const getEdgeColor = (
  { active, error, theme }: WrapperProps,
  hovered = false
) => {
  if (error) {
    return theme.colors.error;
  }

  if (hovered) {
    return theme.colors.primaryLight;
  }

  return active ? theme.colors.primary : "rgba(0,0,0,0.6)";
};

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  background-color: transparent;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 4px;
  color: ${props => getEdgeColor(props)};
  outline: ${props =>
    props.active
      ? `1px solid ${getEdgeColor(props)};`
      : `1px solid ${props.theme.colors.druralGray_100}`};
  transition: all 0.3s ease;
  padding-top: 3px;
  .InputContainer {
    margin-top: 3px;
  }
  &:hover {
    background-color: ${props => {
      if (props.error || props.active) {
        return "none";
      }
      return props.theme.colors.primaryTransparent;
    }};
    color: ${props => (props.error ? `rgba(0, 0, 0, 0.5)` : `#23c290`)};
    outline-width: 1px;
    outline-style: solid;
    border-color: ${props => getEdgeColor(props, true)};
    outline-color: ${props => getEdgeColor(props, true)};
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
