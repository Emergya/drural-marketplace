import { styled } from "@styles";

export const Container = styled.div`
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media (min-width: ${props => props.theme.breakpoints.smallScreen}) {
    margin-top: 50px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  margin-top: 8px;
  width: 95%;
  padding: ${props => props.theme.spacing.spacer};
  @media (min-width: ${props => props.theme.breakpoints.smallScreen}) {
    flex-direction: row-reverse;
    margin-top: 40px;
    width: 70%;
  }
  > p {
    font-size: ${props => props.theme.typography.baseFontSize};
    line-height: ${props => props.theme.typography.baseLineHeight};
    font-weight: ${props => props.theme.typography.lightFontWeight};
    text-align: center;
    @media (min-width: ${props => props.theme.breakpoints.smallScreen}) {
      font-size: ${props => props.theme.typography.lightTitleFontSize};
      line-height: ${props => props.theme.typography.lightTitleLineHeight};
      text-align: left;
    }
  }
`;

export const ImageDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10%;
  margin-bottom: 30%;

  svg {
    height: 336px;
    width: 214px;
  }

  @media (min-width: ${props => props.theme.breakpoints.smallScreen}) {
    margin-right: 85px;
    margin-top: 0;
    margin-bottom: 0;
    svg {
      height: 368px;
      width: 235px;
    }
  }
`;
