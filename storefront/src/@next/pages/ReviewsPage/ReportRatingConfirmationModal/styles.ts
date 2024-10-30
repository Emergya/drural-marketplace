import { CloseIcon } from "@components/atoms/CloseIcon";
import { styled } from "@styles";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-beetween;
  align-items: center;
  margin: 40px 64px 10px 64px;
  > div {
    width: 100%;
  }
  h2 {
    margin-bottom: 40px;
    text-align: center;
    @media (max-width: ${props => props.theme.breakpoints.smallScreen}) {
      margin-bottom: 20px;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.smallScreen}) {
    margin: 14px 16px 24px 16px;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  svg {
    width: 100%;
  }
`;

export const Text = styled.p`
  font-size: ${props => props.theme.typography.lightTitleFontSize};
  font-weight: ${props => props.theme.typography.lightFontWeight};
  margin-bottom: 40px;
  margin-top: 36px;
  width: 100%;
  text-align: center;
  @media (max-width: ${props => props.theme.breakpoints.smallScreen}) {
    margin-bottom: 6px;
    margin-top: 15px;
    font-size: ${props => props.theme.typography.baseFontSize};
    font-weight: ${props => props.theme.typography.normalFontWeight};
  }
`;
