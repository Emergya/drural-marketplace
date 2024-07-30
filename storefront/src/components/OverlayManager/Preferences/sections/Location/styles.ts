import { styled } from "@styles";

export const Wrapper = styled.div`
  margin-top: 22px;
  margin-bottom: 22px;
  @media (min-width: ${props => props.theme.breakpoints.mediumScreen}) {
    margin-top: 50px;
    margin-bottom: 50px;
  }
`;

export const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    margin-bottom: 20px;
  }
  > p {
    width: 90%;
    font-size: ${props => props.theme.typography.baseFontSize};
    font-weight: ${props => props.theme.typography.lightFontWeight};
    text-align: center;
    margin-bottom: 32px;
    @media (min-width: ${props => props.theme.breakpoints.mediumScreen}) {
      font-size: ${props => props.theme.typography.lightTitleFontSize};
      width: 70%;
    }
  }
`;
export const Container = styled.div`
  display: flex;
  margin-left: 5%;
  margin-right: 5%;
  @media (min-width: ${props => props.theme.breakpoints.mediumScreen}) {
    margin-left: 10%;
    margin-right: 10%;
  }
  justify-content: center;
`;

export const LocationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media (min-width: ${props => props.theme.breakpoints.mediumScreen}) {
    width: 60%;
  }
`;
export const ImageWrapper = styled.div`
  display: none;
  @media (min-width: ${props => props.theme.breakpoints.mediumScreen}) {
    display: flex;
    width: 40%;
  }
`;
export const SwitchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom:40px;
  @media (min-width: ${props => props.theme.breakpoints.mediumScreen}) {
    justify-content: space-between
    width: 80%;
  }
  > p {
    font-size: ${props => props.theme.typography.baseFontSize};
    font-weight: ${props => props.theme.typography.boldFontWeight};
  }
`;
export const DistanceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-rop: 40px;
  width: 100%;
  @media (min-width: ${props => props.theme.breakpoints.mediumScreen}) {
    width: 80%;
  }
  > p {
    font-size: ${props => props.theme.typography.baseFontSize};
    font-weight: ${props => props.theme.typography.boldFontWeight};
    margin-bottom: 16px;
  }
`;
