import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

export const CaptionDot: React.FC<IProps> = ({ caption, status }) => (
  <S.Wrapper>
    <S.Dot status={status} />
    <S.Caption>{caption}</S.Caption>
  </S.Wrapper>
);
