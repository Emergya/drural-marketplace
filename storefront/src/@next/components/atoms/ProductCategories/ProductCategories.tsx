import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductCategories: React.FC<IProps> = ({ categories }) => (
  <S.Wrapper>
    {categories.map(category => {
      const { id, name } = category;
      return (
        <S.Card key={id}>
          <S.SamllText>{name}</S.SamllText>
        </S.Card>
      );
    })}
  </S.Wrapper>
);
