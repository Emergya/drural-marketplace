import { styled } from "@styles";

export const Wrapper = styled.div``;

export const Divider = styled.div`
  width: 100%;
  height: 2rem;
`;

export const Title = styled.h3`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  padding: 0 0 42px 0;
`;

export const StyledCheckbox = styled.div`
  & > div {
    margin-bottom: 0;
    padding-bottom: 2rem;
  }
`;
