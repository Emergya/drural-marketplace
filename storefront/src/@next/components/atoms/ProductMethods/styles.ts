import { styled } from "@styles";
import { smallScreen } from "@styles/constants-drural";

// 1. Wrappers
export const Wrapper = styled.div`
  padding-bottom: 10px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ItemWrapper = styled.div`
  display: flex;
  flex-basis: 50%;
  padding-bottom: 1rem;

  &:nth-last-of-type(-n + 2) {
    padding-bottom: 0;
  }
`;

// 2. Typographies
export const Title = styled.h4`
  margin-bottom: 22px;

  @media (max-width: ${smallScreen}px) {
    font-size: ${props => props.theme.typography.baseFontSize};
    line-height: ${props => props.theme.typography.baseLineHeight};
    margin-bottom: 1rem;
  }
`;

export const SamllText = styled.p`
  font-size: ${props => props.theme.typography.smallTextFontSize};
  margin-left: 0.5rem;
`;
