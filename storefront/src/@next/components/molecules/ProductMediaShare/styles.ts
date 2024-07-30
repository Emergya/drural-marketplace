import { styled } from "@styles";
import { smallScreen } from "@styles/constants-drural";

export const Wrapper = styled.div``;

export const Title = styled.h4`
  margin-bottom: 22px;

  @media (max-width: ${smallScreen}px) {
    font-size: ${props => props.theme.typography.baseFontSize};
    line-height: ${props => props.theme.typography.baseLineHeight};
    margin-bottom: 1rem;
  }
`;
