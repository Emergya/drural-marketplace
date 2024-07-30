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

export const CategoriesDiv = styled.div`
  height: 54vh;
  overflow-y: scroll;
`;
