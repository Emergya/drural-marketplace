import { CloseIcon } from "@components/atoms/CloseIcon";
import { styled } from "@styles";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-beetween;
  align-items: center;
  margin: 40px 64px 10px 64px;
  > div {
    width: 100%;
  }
  h2 {
    margin-bottom: 10px;
    text-align: center;
  }

  @media (max-width: ${props => props.theme.breakpoints.smallScreen}) {
    margin: 14px 16px 24px 16px;
    button {
      width: 100%;
    }
  }
`;

export const CloseIconRestyled = styled(CloseIcon)`
  position: absolute;
  top: 3%;
  left: 94%;
  @media (max-width: ${props => props.theme.breakpoints.smallScreen}) {
    svg {
      height: 20px;
    }
    top: 2.5%;
    left: 90%;
  }
`;

export const Div = styled.div`
  position: relative;
  width: 100%;
`;

export const Image = styled.div`
  display: flex;
  width: 85px;
  height: 64px;
  margin-right: 1rem;

  > img {
    object-fit: cover;
    width: 85px;
    height: 64px;
  }
`;
export const ServiceInfo = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: space-beetween;
  margin-bottom: 15px;
  position: relative;
  height: 85px;
  &:before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 1px;
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.colors.druralGray_100};
  }
`;
export const RatingDiv = styled.div`
  position: relative;
  height: 100px;
  width: 100%;
  img {
    height: 20px;
  }
  &:before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 1px;
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.colors.druralGray_100};
  }
`;
export const Footer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
`;
export const RateTitle = styled.p`
  font-size: ${props => props.theme.typography.h5FontSize};
  font-weight: ${props => props.theme.typography.boldFontWeight};
  margin-bottom: 16px;
  width: 100%;
`;

export const Reason = styled.div`
  margin-top: 10px;
`;

export const CheckBox = styled.input`
  accent-color: ${props => props.theme.colors.primary};
`;