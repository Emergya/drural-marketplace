import { media, styled } from "@styles";
import { smallScreen } from "@styles/constants";

// 1. Wrappers
export const Container = styled.div``;

export const Wrapper = styled.div`
  padding-bottom: 46px;
  ${media.smallScreen`
    padding-bottom: 2rem;
  `}
`;

export const HeaderWrapper = styled.div`
  align-items: center;
  display: flex;
  padding-bottom: 0.5rem;
  ${media.smallScreen`
    padding-bottom: 0.25rem;
  `}
`;

export const MessageWrapper = styled.div`
  padding-top: 0.5rem;
  ${media.smallScreen`
    padding-top: 0;
  `}
`;

// 2. Typografy
export const Text = styled.p`
  display: inline;
  margin-right: 8px;
  span {
    margin-right: 5px;
  }
  @media (max-width: ${smallScreen}px) {
    font-size: ${props => props.theme.typography.smallFontSize};
    line-height: ${props => props.theme.typography.extraSmallTextLineHeight};
  }
`;

export const ExtraSmallText = styled.p`
  color: ${props => props.theme.colors.druralGray};
  font-size: ${props => props.theme.typography.extraSmallTextFontSize};
  line-height: ${props => props.theme.typography.extraSmallTextLineHeight};
`;
