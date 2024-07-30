import { styled } from "@styles";

import { IProps } from "./types";

export const Banner = styled.section<IProps>`
  background-image: url(${props => props.imageUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 480px;

  @media (max-width: ${props => props.theme.breakpoints.smallScreen}) {
    height: 300px;
  }
`;
