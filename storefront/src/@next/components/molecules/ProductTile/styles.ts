import { styled } from "@styles";

export const Wrapper = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  transition: 0.3s;
`;

export const Title = styled.h4`
  font-weight: ${props => props.theme.typography.semiBoldFontWeight};
  font-size: ${props => props.theme.typography.baseFontSize};
  margin-top: 1rem;
  @media (max-width: ${props => props.theme.breakpoints.smallScreen}) {
    font-size: ${props => props.theme.typography.smallFontSize};
  }
`;

export const Rate = styled.p`
  font-size: ${props => props.theme.typography.smallFontSize};
`;

export const Price = styled.p`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  font-size: ${props => props.theme.typography.p20FontSize};
  @media (max-width: ${props => props.theme.breakpoints.smallScreen}) {
    font-size: ${props => props.theme.typography.baseFontSize};
  }
`;

export const Image = styled.div`
  display: flex;
  width: min(20vw, 270px);
  height: 200px;

  @media (max-width: ${props => props.theme.breakpoints.largeScreen}) {
    width: 270px;
    height: 200px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mediumScreen}) {
    width: min(40vw, 270px);
    height: 200px;
  }
  @media (max-width: ${props => props.theme.breakpoints.smallScreen}) {
    width: 184px;
    height: 184px;
  }

  > img {
    object-fit: cover;
    width: min(20vw, 270px);
    height: 200px;
    @media (max-width: ${props => props.theme.breakpoints.largeScreen}) {
      width: 270px;
      height: 200px;
    }
    @media (max-width: ${props => props.theme.breakpoints.mediumScreen}) {
      width: min(40vw, 270px);
      height: 200px;
    }
    @media (max-width: ${props => props.theme.breakpoints.smallScreen}) {
      width: 184px;
      height: 184px;
    }
  }
`;
