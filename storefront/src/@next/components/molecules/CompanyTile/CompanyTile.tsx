import { UilLocationPoint } from "@iconscout/react-unicons";
import React from "react";
import { FormattedMessage } from "react-intl";

import { StarsRating } from "@components/atoms";

import { Thumbnail } from "../Thumbnail";
import * as S from "./styles";
import { IProps } from "./types";

export const CompanyTile: React.FC<IProps> = ({
  address,
  image,
  publishedProducts,
  rating,
  title,
}) => (
  <S.Wrapper>
    <S.ImageWrapper>
      <Thumbnail
        source={{
          thumbnail: {
            alt: image.alt || "",
            url: image.url || "",
          },
        }}
      />
    </S.ImageWrapper>
    <S.ContentWrapper>
      <S.Title>{title}</S.Title>
      <S.SmallText>
        <FormattedMessage
          defaultMessage="{productCount} services published"
          values={{
            productCount: publishedProducts || 0,
          }}
        />
      </S.SmallText>
      <StarsRating starsNumber={rating} readonly />
      {address && (
        <S.AddressWrapper>
          <UilLocationPoint />
          <S.SmallText>{address}</S.SmallText>
        </S.AddressWrapper>
      )}
    </S.ContentWrapper>
  </S.Wrapper>
);
