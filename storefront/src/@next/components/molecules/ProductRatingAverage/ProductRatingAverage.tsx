import React from "react";
import { FormattedMessage } from "react-intl";

import { StarsRating } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductRatingAverage: React.FC<IProps> = ({
  rating,
  reviewsCount,
  reviewsText = true,
}) => (
  <S.RattingWrapper>
    <StarsRating starsNumber={rating} readonly />
    <S.SmallText>
      <FormattedMessage
        defaultMessage="{reviewsCount} {reviews}"
        values={{
          reviewsCount,
          reviews: reviewsText ? "reviews" : "",
        }}
      />
    </S.SmallText>
  </S.RattingWrapper>
);
