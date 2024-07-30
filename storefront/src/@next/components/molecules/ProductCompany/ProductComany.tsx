import React from "react";
import { FormattedMessage } from "react-intl";

import { CompanyTile } from "../CompanyTile";
import * as S from "./styles";
import { IProps } from "./types";

export const ProductCompany: React.FC<IProps> = ({ company, onClick }) => (
  <S.Wrapper onClick={() => !!onClick && onClick()} isClickable={!!onClick}>
    <S.Title>
      <FormattedMessage defaultMessage="Service provided by" />
    </S.Title>
    <CompanyTile
      image={{ url: company.imageUrl }}
      publishedProducts={company.products?.totalCount || 0}
      rating={company.rating}
      title={company.publicName}
    />
  </S.Wrapper>
);
