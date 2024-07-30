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
  padding-right: 84px;
  flex-basis: 45%;

  ${media.mediumScreen`
    flex-basis: 100%;
  `}
`;

export const InfoColumn = styled.div`
  flex-basis: 55%;

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

export const ButtonsWrapper = styled.div``;

// 2. Elements
export const Image = styled(ReactSVG)`
  ${media.largeScreen`
    svg {
        width: 100%;
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
  padding-bottom: 3.5rem;
  width: 470px;

  @media (max-width: ${props => props.theme.breakpoints.largeScreen}) {
    width: 100%;
  }

  @media (max-width: ${props => props.theme.breakpoints.mediumScreen}) {
    font-size: ${props => props.theme.typography.baseFontSize};
    font-weight: ${props => props.theme.typography.normalFontWeight};
    line-height: ${props => props.theme.typography.baseLineHeight};
    padding-bottom: 1.5rem;
  }
`;

export const StyledButton = styled(Button)`
  width: 205px;

  &:first-child {
    margin-right: 1rem;
  }

  ${media.mediumScreen`
    width: 100%
  `}
`;
