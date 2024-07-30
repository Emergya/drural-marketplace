import React from "react";

import * as S from "../styles";
import { CategoryIconTileProps } from "../types";

export const CategoryIconTile: React.FC<CategoryIconTileProps> = ({
  category,
  iconSize,
  iconBackgroundSize,
}) => {
  const { icon: Icon } = category;

  return (
    <S.Wrapper>
      <S.IconWrapper iconBackgroundSize={iconBackgroundSize}>
        <Icon size={iconSize} />
      </S.IconWrapper>
      <S.Title data-test="categoryTile">{category.name}</S.Title>
    </S.Wrapper>
  );
};
