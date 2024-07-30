import React from "react";

import { RichTextEditorContent } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductInfo: React.FC<IProps> = ({ title, data }) => (
  <S.Wrapper>
    <S.Title>{title}</S.Title>
    <RichTextEditorContent jsonData={data} />
  </S.Wrapper>
);
