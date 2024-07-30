import React from "react";
import Rating from "react-rating";

import starEmpty from "../../../../images/dRuralImages/star-empty.svg";
import starFull from "../../../../images/dRuralImages/star-full.svg";
import * as S from "./styles";
import { IProps } from "./types";

export const StarsRating: React.FC<IProps> = ({
  starsNumber = 0,
  readonly = false,
  onClick,
}) => {
  return (
    <Rating
      emptySymbol={<S.Img src={starEmpty} alt="star-empty" />}
      fullSymbol={<S.Img src={starFull} alt="star-full" />}
      onClick={onClick}
      initialRating={starsNumber}
      readonly={readonly}
    />
  );
};
