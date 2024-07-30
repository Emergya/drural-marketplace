import { styled } from "@styles";

import { Button } from "../../atoms/Button";

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 90px;
  @media (max-width: ${props => props.theme.breakpoints.mediumScreen}) {
  }
`;

export const RestyledButton = styled(Button)`
  padding-right: 1.7rem;
  padding-left: 2rem;
  @media (max-width: ${props => props.theme.breakpoints.mediumScreen}) {
    width: 100%;
    padding-right: 0.5rem;
    padding-left: 0.7rem;
  }
  span {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 140px;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  @media (max-width: ${props => props.theme.breakpoints.mediumScreen}) {
    justify-content: center;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  @media (max-width: ${props => props.theme.breakpoints.mediumScreen}) {
    justify-content: center;
  }
`;
