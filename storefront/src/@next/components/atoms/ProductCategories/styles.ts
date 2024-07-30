import { styled } from "@styles";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Card = styled.div`
  background-color: ${props => props.theme.colors.primaryLight};
  padding: 4px 8px;
  border-radius: 4px;

  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

export const SamllText = styled.p`
  font-size: ${props => props.theme.typography.smallTextFontSize};
`;
