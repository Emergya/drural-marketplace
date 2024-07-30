import React from "react";

import { TaxedMoney } from "@components/containers";
import { ProductRatingAverage, Thumbnail } from "@components/molecules";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductTile: React.FC<IProps> = ({ product }: IProps) => {
  const price =
    product.pricing &&
    product.pricing.priceRangeUndiscounted &&
    product.pricing.priceRangeUndiscounted.start
      ? product.pricing.priceRangeUndiscounted.start
      : undefined;

  const maxPrice =
    product.pricing &&
    product.pricing.priceRangeUndiscounted &&
    product.pricing.priceRangeUndiscounted.stop
      ? product.pricing.priceRangeUndiscounted.stop
      : undefined;

  const Range = React.useMemo(() => {
    if (price && maxPrice) {
      return maxPrice.gross.amount - price.gross.amount;
    }
    return 0;
  }, [price, maxPrice]);

  return (
    <S.Wrapper>
      <S.Image data-test="productThumbnail">
        <Thumbnail source={product} />
      </S.Image>
      <S.Title data-test="productTile">{product.name}</S.Title>
      <ProductRatingAverage
        rating={product.rating || 0}
        reviewsCount={product.reviews?.totalCount || 0}
        reviewsText={false}
      />
      {!product.hasNoPrice && (
        <S.Price data-test="productPrice">
          <TaxedMoney taxedMoney={price} />
          {Range > 0 && (
            <>
              <span> - </span>
              <TaxedMoney taxedMoney={maxPrice} />
            </>
          )}
        </S.Price>
      )}
    </S.Wrapper>
  );
};
