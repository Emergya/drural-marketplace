import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

export const StyledLink: React.FC<IProps> = ({
  children,
  onClick,
  underline,
}) => (
  <S.Link onClick={onClick} underline={underline}>
    {children}
  </S.Link>
);
