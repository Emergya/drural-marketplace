import { UilAngleLeft } from "@iconscout/react-unicons";
import React from "react";

import { StyledLink } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const BackLink: React.FC<IProps> = ({ children, onClick }) => (
  <S.Wrapper>
    <UilAngleLeft />
    <StyledLink onClick={onClick} underline>
      {children}
    </StyledLink>
  </S.Wrapper>
);
