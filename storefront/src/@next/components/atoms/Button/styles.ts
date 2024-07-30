import { media, styled } from "@styles";

import { Size } from "./types";

const fontSize = (fontSize: string, smallFontSize: string) => ({
  md: fontSize,
  sm: smallFontSize,
});

// 1. Button
export const Button = styled.button<{
  color: "primary" | "secondary" | "ghost" | "labelOnly" | "labelOnlyPrimary";
  fullWidth?: boolean;
  size: Size;
}>`
  background-color: ${props =>
    props.theme.button.colors[props.color].background};
  border: 2px solid;
  border-color: ${props => {
    if (props.color === "ghost") {
      return props.theme.button.colors.ghost.borderColor;
    }
    if (props.color === "primary" || props.color === "secondary") {
      return props => props.theme.button.colors[props.color].background;
    }
    return "transparent";
  }};
  border-radius: ${props => props.theme.button.border.radius};
  cursor: pointer;
  color: ${props => props.theme.button.colors[props.color].color};
  height: ${props => props.theme.button.height};
  outline: none;
  padding: ${props => props.theme.button.padding[props.size]};
  transition: 0.3s;
  width: ${props => (props.fullWidth ? "100%" : "auto")}

  &:hover {
    background-color: ${props =>
      props.theme.button.colors[props.color].hoverBackground};
    border-color: ${props => {
      if (props.color === "ghost") {
        return props.theme.button.colors.ghost.hoverBorderColor;
      }
      if (props.color === "primary" || props.color === "secondary") {
        return props => props.theme.button.colors[props.color].hoverBackground;
      }
      return "transparent";
    }};
    color: ${props => props.theme.button.colors[props.color].hoverColor};
  }

  &:active {
    background-color: ${props =>
      props.theme.button.colors[props.color].activeBackground};
    border-color: ${props =>
      props.color === "ghost"
        ? props.theme.button.colors.ghost.hoverBorderColor
        : "transparent"}
  }

  &:disabled {
    background-color: ${props =>
      props.theme.button.colors[props.color].disabledBackground};
    border-color: ${props =>
      props.color === "ghost"
        ? props.theme.button.colors.ghost.disabledBorderColor
        : "transparent"}
    color: ${props => props.theme.button.colors[props.color].disabledColor};

    &,
    &:hover {
      cursor: default;
    }
  }
  
  ${media.smallScreen`
    width: ${(props: { fullWidth: boolean }) =>
      props.fullWidth ? "100%" : "88%"};
  `}
`;

export const Text = styled.span<{ size: Size }>`
  display: inline-block;
  font-size: ${({
    size,
    theme: {
      button: { typography },
    },
  }) => fontSize(typography.fontSize, typography.smallFontSize)[size]};
  font-weight: ${props => props.theme.typography.normalFontWeight};
  line-height: ${props => props.theme.typography.baseLineHeight};
`;
