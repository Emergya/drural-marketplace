import { styled } from "@styles";

import arrowImage from "../../../images/dRuralImages/chevron-left.svg";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: ${props => props.theme.header.height.desktop} auto;
  @media (max-width: ${props => props.theme.breakpoints.smallScreen}) {
    width: 95%;
    margin: ${props => props.theme.header.height.mobile} auto;
  }
`;

export const ListsContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 16px;
  justify-content: space-between;
`;

export const BackToListsLink = styled.div`
  align-items: center;
  color: ${props => props.theme.colors.primaryDark};
  display: inline-flex;
  font-size: ${props => props.theme.typography.smallFontSize};
  font-weight: ${props => props.theme.typography.extraBoldFontWeight};
  text-decoration: underline;
  cursor: pointer;
  margin-top: 24px;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &:before {
    content: url(${arrowImage});
    display: inline-block;
    height: 18px;
  }
`;
