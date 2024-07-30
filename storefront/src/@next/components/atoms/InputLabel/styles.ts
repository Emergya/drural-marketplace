import { DruralTheme, styled } from "@styles";

export const activeLabelStyles = (
  theme: DruralTheme,
  labelBackground: string | null
) => `
  left: 0.5rem;
  padding: 0 0.5rem;
  background: none;
  font-size: ${theme.input.labelFontSize};
  top: 30%;
`;

const labelStyles = (theme: DruralTheme) => `
  left: 1rem;
  padding: 0 0rem;
  background: none;
  font-size: ${theme.typography.baseFontSize};
  top: 50%;
`;

export const Label = styled.label<{
  active: boolean;
  labelBackground: string | null;
}>`
  position: absolute;
  ${props =>
    props.active
      ? activeLabelStyles(props.theme, props.labelBackground)
      : labelStyles(props.theme)};
  transform: translateY(-50%);
  transition: all 0.3s ease, color 0s;
  pointer-events: none;
`;
