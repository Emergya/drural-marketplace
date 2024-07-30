import { styled } from "@styles";

export const Link = styled.a<{ fullWidth: boolean; activeClassName?: string }>`
  cursor: pointer;
  font-weight: ${({ theme }) => theme.typography.boldFontWeight};
  transition: 300ms;

  ${({ fullWidth }) =>
    fullWidth &&
    `
      display: block;
      width: 100%;
  `}

  &:hover, &:focus {
    outline: none;
    text-decoration: underline;
  }

  /* Active URL styles
  &.${props => props.activeClassName} {
    
  } 
  */
`;
