import { styled } from "@styles";

export const Wrapper = styled.div`
  strong {
    font-weight: ${props => props.theme.typography.boldFontWeight};
    display: inline-block;
  }
`;
