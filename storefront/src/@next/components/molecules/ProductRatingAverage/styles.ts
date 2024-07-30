import { styled } from "@styles";

export const RattingWrapper = styled.div`
  align-items: flex-start;
  display: flex;
`;

export const SmallText = styled.p`
  font-size: ${props => props.theme.typography.smallFontSize};
  line-height: ${props => props.theme.typography.linkLineHeight};
  margin-left: 0.5rem;
`;
