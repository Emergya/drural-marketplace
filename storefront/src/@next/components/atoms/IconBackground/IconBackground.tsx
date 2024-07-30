import React from "react";

import { getUnicon } from "@utils/icons";

import * as S from "./styles";
import { IProps } from "./types";

export const IconBackground: React.FC<IProps> = ({
  iconId,
  iconSize,
  iconBackgroundSize,
}) => {
  const Icon = getUnicon(iconId);
  return (
    <S.IconWrapper iconBackgroundSize={iconBackgroundSize}>
      <Icon size={iconSize} />
    </S.IconWrapper>
  );
};
