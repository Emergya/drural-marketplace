import { styled } from "@styles";

import { Color, Size } from "./types";

export const ButtonLink = styled.button<{
  color?: Color;
  size?: Size;
}>`
  font-size: ${({ size, theme: { typography } }) =>
    size === "md" ? typography.baseFontSize : typography.smallFontSize};
  color: ${({ color, theme: { link } }) =>
    color === "secondary" ? link.secondary.color : link.base.color};
  background: transparent;
  outline: none;
  border: none;
  box-shadow: none;
  transform: none;
  text-decoration: none;
  padding: 0;
  transition: color 0.3s ease;
  &:hover {
    color: ${({ color, theme: { link } }) =>
      color === "secondary" ? link.secondary.hoverColor : link.base.hoverColor};
  }
`;
