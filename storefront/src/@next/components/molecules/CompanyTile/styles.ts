import { styled } from "@styles";
import { smallScreen } from "@styles/constants-drural";

// 1. Wrappers
export const Wrapper = styled.div`
  align-items: flex-start;
  display: flex;
`;

export const ImageWrapper = styled.div`
  img {
    border-radius: 100px;
    height: 112px;
    width: 112px;
  }
`;

export const ContentWrapper = styled.div`
  padding-left: 12px;
`;

export const AddressWrapper = styled.div`
  align-items: center;
  display: flex;
  margin-top: 20px;

  p {
    margin-bottom: 0;
    margin-left: 6px;
  }
`;

// 2. Elements
export const Title = styled.h4`
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
