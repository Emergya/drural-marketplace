import { styled } from "@styles";
import { smallScreen } from "@styles/constants-drural";

// 1. Wrappers
export const Wrapper = styled.div<{ isClickable: boolean }>`
  cursor: ${props => (props.isClickable ? "pointer" : "auto")};
`;

export const CompanyWrapper = styled.div`
  align-items: center;
  display: flex;
`;

export const ContentWrapper = styled.div`
  padding-left: 12px;
`;

// 2. Elements
export const Image = styled.img`
  background-color: ${props => props.theme.colors.druralGray_200}
  border-radius: 100px;
  height: 112px;
  width: 112px;
`;

export const Title = styled.h4`
  margin-bottom: 22px;

  @media (max-width: ${smallScreen}px) {
    font-size: ${props => props.theme.typography.baseFontSize};
    line-height: ${props => props.theme.typography.baseLineHeight};
    margin-bottom: 1rem;
  }
`;

export const Subtitle = styled.h4`
  margin-bottom: 1rem;

  @media (max-width: ${smallScreen}px) {
    font-size: 18px;
    line-height: 1.5rem;
    margin-bottom: 6px;
  }
`;

export const SmallText = styled.p`
  font-size: ${props => props.theme.typography.smallTextFontSize};
  line-height: ${props => props.theme.typography.linkLineHeight};
  margin-bottom: 12px;
`;
