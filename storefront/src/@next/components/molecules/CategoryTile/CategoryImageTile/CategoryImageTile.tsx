import React from "react";

import { Thumbnail } from "../../Thumbnail";
import * as S from "../styles";
import { CategoryImageTileProps } from "../types";

export const CategoryImageTile: React.FC<CategoryImageTileProps> = ({
  category,
}) => {
  /*  const { backgroundImage } = category; */

  const source = {
    ...category,
    thumbnail: null /* backgroundImage */,
  };

  return (
    <S.Wrapper>
      <S.ImageWrapper data-test="categoryThumbnail">
        <Thumbnail source={source} />
      </S.ImageWrapper>
      <S.Title data-test="categoryTile">{category.name}</S.Title>
    </S.Wrapper>
  );
};
