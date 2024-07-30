import { CloseIcon } from "@components/atoms/CloseIcon";
import { styled } from "@styles";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-beetween;
  margin: 40px auto 30px;
  h2 {
    margin-bottom: 30px;
  }
  @media (max-width: ${props => props.theme.breakpoints.smallScreen}) {
    margin-top: 14px;
  }
`;

export const CloseIconRestyled = styled(CloseIcon)`
  position: absolute;
  top: 5%;
  left: 94%;
  @media (max-width: ${props => props.theme.breakpoints.smallScreen}) {
    svg {
      height: 20px;
    }
    top: 5%;
    left: 92%;
  }
`;

export const Div = styled.div`
  position: relative;
  width: 100%;
`;

export const ServiceInfo = styled.div`
  display: flex;
  width: min(550px, 90vw);
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  p {
    text-align: center;
  }
`;
