import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

export const CaptionBox: React.FC<IProps> = ({
  children,
  hoverable,
  isSelected,
  status = "success",
  onClick,
}) => (
  <S.Wrapper
    hoverable={hoverable}
    isSelected={isSelected}
    status={status}
    onClick={onClick}
  >
    {children}
  </S.Wrapper>
);
