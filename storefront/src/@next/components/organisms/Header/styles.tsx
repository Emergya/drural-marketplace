import ReactSVG from "react-svg";

import { styled } from "@styles";

import { Button } from "../../atoms/Button";

export const HeaderContainer = styled.header<{
  color: string;
  scroll: boolean;
}>`
  position: fixed;
  z-index: 10;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  background-color: ${props => props.theme.colors.white};
  @media (min-width: ${props => props.theme.breakpoints.mediumScreen}) {
    position: ${props =>
      props.color === "/" && !props.scroll ? "absolute" : "fixed"};
    background-color: ${props =>
      props.color === "/" && !props.scroll
        ? "transparent"
        : props.theme.colors.white};
    box-shadow: ${props =>
      props.color === "/" && !props.scroll
        ? "none"
        : "0px 4px 16px rgba(0, 0, 0, 0.1)"};
    top: 0;
    left: 0;
  }
`;

export const RestyledButton = styled(Button)`
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 0;
  padding-left: 0;
  width: auto;
  span {
    font-weight: 700;
  }
`;

export const GridContainer = styled.header<{
  color: string;
  scroll: boolean;
}>`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-auto-rows: minmax(${props => props.theme.header.height.mobile}, auto);

  @media (min-width: ${props => props.theme.breakpoints.mediumScreen}) {
    grid-template-columns: 1fr 1fr 1fr;

    grid-auto-rows: minmax(${props => props.theme.header.height.desktop}, auto);
  }
`;

export const GridItem = styled.div`
  display: flex;
  align-items: center;

  &.grid-item {
    display: flex;
    align-items: center;
  }
  &.grid-item-1 {
    padding-left: 16px;
  }
  &.grid-item-2 {
    display: flex;
    justify-content: flex-end;

    @media (max-width: ${props => props.theme.breakpoints.mediumScreen}) {
      div {
        height: 40px;
        width: 40px;
      }
    }
  }
  &.grid-item-3 {
    justify-content: flex-end;
    padding-right: 16px;
  }
  @media (min-width: ${props => props.theme.breakpoints.mediumScreen}) {
    &.grid-item-1 {
      padding-left: 50px;
      padding-right: 25px;
    }
    &.grid-item-2 {
      display: flex;
      justify-content: center;
    }
    &.grid-item-3 {
      padding-right: 50px;
    }
  }
  @media (min-width: ${props => props.theme.breakpoints.largeScreen}) {
    &.grid-item-1 {
      padding-left: 150px;
    }
    &.grid-item-3 {
      padding-right: 150px;
    }
  }
`;

export const SearchWrapper = styled.div`
  color: ${props => props.theme.colors.primaryLight};
`;

export const SearchPopUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  > div {
    @media (min-width: ${props => props.theme.breakpoints.mediumScreen}) {
      width: 90%;
      margin-bottom: 12px;
    }
  }
`;

export const LogoWrapper = styled(ReactSVG)`
  line-height: 0;
  svg {
    width: 112px;
    height: 40px;
  }
  @media (min-width: ${props => props.theme.breakpoints.mediumScreen}) {
    svg {
      width: 157px;
      height: 56px;
    }
  }
`;
