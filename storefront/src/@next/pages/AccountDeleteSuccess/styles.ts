import ReactSVG from "react-svg";

import { Button } from "@components/atoms";
import { media, styled } from "@styles";

// 1. Wrappers
export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ImageColumn = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 80px;
  flex-basis: 40%;

  ${media.mediumScreen`
    flex-basis: 100%;
  `}
`;

export const InfoColumn = styled.div`
  flex-basis: 60%;

  ${media.mediumScreen`
    flex-basis: 100%;
    text-align: center;
  `}
`;

export const MobileImageWrapper = styled.div`
  padding-bottom: 26px;
`;

export const TextWrapper = styled.div`
  padding-bottom: 3rem;
`;

// 2. Elements
export const Image = styled(ReactSVG)`
  svg {
    height: 175px;
    width: 171px;
  }

  ${media.mediumScreen`
    svg {
        height: 117px;
        width: 115px;
    }
  `}
`;

export const Title = styled.h2`
  padding-bottom: 2rem;
`;

export const LightTitle = styled.p`
  font-size: ${props => props.theme.typography.lightTitleFontSize};
  font-weight: ${props => props.theme.typography.lightFontWeight};
  line-height: ${props => props.theme.typography.lightTitleLineHeight};

  &:not(:last-child) {
    padding-bottom: 1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mediumScreen}) {
    font-size: ${props => props.theme.typography.baseFontSize};
    font-weight: ${props => props.theme.typography.normalFontWeight};
    line-height: ${props => props.theme.typography.baseLineHeight};
  }
`;

export const StyledButton = styled(Button)`
  width: 220px;

  ${media.mediumScreen`
    width: 100%
  `}
`;
