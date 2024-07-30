import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

export const IconButtonDrural: React.FC<IProps> = ({
  children,
  color = "primary",
  onClick,
}) => (
  <div>
    <S.IconWrapper color={color} onClick={onClick}>
      {children}
    </S.IconWrapper>
  </div>
);
