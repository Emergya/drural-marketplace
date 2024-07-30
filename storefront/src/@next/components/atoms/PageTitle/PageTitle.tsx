import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

export const PageTitle: React.FC<IProps> = ({ title }) => {
  return <S.Title>{title}</S.Title>;
};
