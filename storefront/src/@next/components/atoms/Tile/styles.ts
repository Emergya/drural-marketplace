import { css } from "styled-components";

import { styled } from "@styles";

interface WrapperProps {
  readonly tileType?: "hover" | "addNew";
  boxShadow?: string;
  mobilePadding?: string;
  padding?: string;
  height?: string;
  left?: boolean;
  noShadow?: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  background-color: ${props => props.theme.tile.backgroundColor};
  box-shadow: ${props =>
    props.boxShadow ? props.boxShadow : props.theme.boxShadow.light};
  overflow: auto;
  height: ${props => (props.height ? props.height : "100%")};
  overflow: visible;
  padding: ${props => (props.padding ? props.padding : "1.5rem 2rem 2rem")};
  transition: all 0.3s, color 0s, fill 0s;
  display: flex;
  flex-direction: column;
  align-items: left;
  ${props => {
    if (props.tileType === "hover") {
      return css`
        :hover {
          cursor: pointer;
          border-color: ${props.theme.tile.hoverBorder};
        }
      `;
    }
    if (props.tileType === "addNew") {
      return css`
        color: ${props.theme.colors.primaryDark};
        align-items: ${props.left ? "flex-start" : "center"};
        justify-content: center;
        :hover {
          cursor: pointer;
          svg path {
            // fill: ${props.theme.colors.white};
          }
        }
      `;
    }
  }};

  @media (max-width: ${props => props.theme.breakpoints.smallScreen}) {
    padding: ${props => (props.mobilePadding ? props.mobilePadding : "1.5rem")};
  }
`;

Wrapper.displayName = "Tile";

export const Header = styled.div`
  padding-bottom: 30px;
`;

export const Content = styled.div<{
  hasFooter: boolean;
}>`
  padding-bottom: ${props => (props.hasFooter ? "2rem" : "")};
`;

export const Footer = styled.div`
  margin-top: auto;
`;
