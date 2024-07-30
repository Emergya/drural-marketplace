import { CloseIcon } from "@components/atoms/CloseIcon";
import { styled } from "@styles";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-beetween;
  margin: 40px auto 10px;
  h2 {
    margin-bottom: 10px;
  }
  > div {
    margin-bottom: 0px;
    margin-left: 16px;
    margin-right: 16px;
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
