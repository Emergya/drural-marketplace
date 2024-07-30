import ReactSVG from "react-svg";

import { Button } from "@components/atoms";
import { media, styled } from "@styles";

// 1. Wrappers
export const Wrapper = styled.div`
  display: flex;
  ${media.mediumScreen`
    flex-wrap: wrap;  
  `}
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
  svg {
    width: 270px;
    height: 270px;
  }
`;

export const Title = styled.h2`
  padding-bottom: 2rem;
`;

export const Text = styled.p`
  padding-bottom: 3.5rem;
  width: 470px;

  @media (max-width: ${props => props.theme.breakpoints.largeScreen}) {
    width: 100%;
  }

  @media (max-width: ${props => props.theme.breakpoints.mediumScreen}) {
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
