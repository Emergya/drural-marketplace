import { styled } from "@styles";

export const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: min(100%, 500px);
  background-color: ${props => props.theme.colors.white};
  padding: 16px 24px 26px 26px;
`;

export const RatingChip = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.colors.primary100};
  border-radius: 20px;
  > span {
    padding-top: 4px;
  }
  margin-bottom: 8px;
  padding-left: 24px;
  padding-right: 24px;
`;
export const P = styled.p`
  margin-bottom: 15px;
`;
export const Span = styled.span`
  padding-top: 0px !important;
  font-size: ${props => props.theme.typography.smallFontSize};
`;
export const PercentageTile = styled.div`
  display: grid;
  grid-template-columns: 2fr 5fr 1.4fr;
  align-items: center;
  width: 100%;
  height: 31px;
  cursor: pointer;
`;
export const StarNumber = styled.span`
  font-size: ${props => props.theme.typography.smallFontSize};
  color: ${props => props.theme.colors.primary700};
  white-space: nowrap;
  &:hover {
    text-decoration: underline;
  }
`;
export const Percentage = styled.span`
  font-size: ${props => props.theme.typography.smallFontSize};
  text-align: end;
`;

export const ProgressBarWrapper = styled.div`
  > div {
    > div {
      background-color: ${props =>
        props.theme.colors.druralGray_100} !important;
      > div {
        background-color: ${props => props.theme.colors.primary} !important;
      }
    }
  }
`;
