import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

export const ItemTile: React.FC<IProps> = ({
  name,
  picture,
  pictureSize,
  onClick = () => null,
}) => (
  <S.Wrapper onClick={onClick}>
    <S.PictureWrapper pictureSize={pictureSize}>{picture}</S.PictureWrapper>
    <S.Name>{name}</S.Name>
  </S.Wrapper>
);
