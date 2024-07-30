import { styled } from "@styles";

export const Wrapper = styled.div<{
  disabled?: boolean;
  fullWidth?: boolean;
  theming?: "light" | "dark";
}>`
  align-items: center;
  background-color: ${props =>
    props.theming === "dark" ? "#434245" : props.theme.colors.white};
  border-radius: 100px;
  color: ${props =>
    props.theming === "dark"
      ? props.theme.colors.white
      : props.theme.colors.black};
  display: flex;
  height: 2rem;
  justify-content: space-between;
  padding: 0 14px;
  opacity: ${props => (props.disabled ? "0.6" : "1")};
  width: ${props => (props.fullWidth ? "100%" : "300px")};
`;

export const Input = styled.input<{
  textSize?: "normal" | "small";
  theming?: "light" | "dark";
}>`
  background-color: ${props =>
    props.theming === "dark" ? "#434245" : props.theme.colors.white};
  border: none;
  color: ${props =>
    props.theming === "dark"
      ? props.theme.colors.white
      : props.theme.colors.black};
  cursor: ${props => (props.disabled ? "not-allowed" : "auto")};
  font-size: ${props =>
    props.textSize === "small"
      ? props.theme.typography.smallFontSize
      : props.theme.typography.baseFontSize};
  width: 91%;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${props =>
      props.theming === "dark"
        ? props.theme.colors.white
        : props.theme.colors.black};
  }
`;
