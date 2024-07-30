import { styled } from "@styles";

export const Link = styled.button<{
  underline?: boolean;
}>`
  color: ${props => props.theme.colors.primaryDark};
  font-size: ${props => props.theme.typography.linkFontSize};
  font-weight: ${props => props.theme.typography.extraBoldFontWeight};
  line-height: ${props => props.theme.typography.linkLineHeight};
  text-decoration: ${props => (props.underline ? "underline" : "")};
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;
