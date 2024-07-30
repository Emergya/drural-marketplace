import { media, styled } from "@styles";

import backgroundImage from "../../../../images/dRuralImages/register-shop.svg";
import backgroundImageMobile from "../../../../images/dRuralImages/register-shop-mobile.svg";

export const Container = styled.div`
  background-image: url(${backgroundImage});
  background-position: center;
  background-size: cover;
  padding: 170px 0 144px;
  text-align: center;

  ${media.smallScreen`
    background-image: url(${backgroundImageMobile});
    padding: 112px 0 64px;
  `}
`;

export const ContainerInner = styled.div`
  margin-top: 0 !important;
`;

export const Title = styled.h2`
  font-size: ${props => props.theme.typography.h1FontSize};
  line-height: ${props => props.theme.typography.h1LineHeight};
  padding-bottom: 22px;

  @media (max-width: ${props => props.theme.breakpoints.smallScreen}) {
    font-size: ${props => props.theme.typography.h1MovilFontSize};
    line-height: ${props => props.theme.typography.h1MovilLineHeight};
    padding-bottom: 16px;
  }
`;

export const Description = styled.p`
  font-size: ${props => props.theme.typography.lightTitleFontSize};
  font-weight: ${props => props.theme.typography.lightFontWeight};
  line-height: ${props => props.theme.typography.lightTitleLineHeight};
  padding-bottom: 48px;
`;
