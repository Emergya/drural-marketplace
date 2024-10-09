import { UilTrashAlt } from "@iconscout/react-unicons";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";

import { StyledLink } from "@components/atoms";
import { ProductRatingAverage, Review } from "@components/molecules";

import * as S from "./styles";
// TODO - add types from codegen
import { IProps } from "./types";

export const ProductReviews: React.FC<IProps> = ({
  isStaff,
  product,
  onClick,
  onDelete,
}) => {
  const reviewsCount = product?.reviews?.totalCount || 0;
  const { push } = useRouter();

  const alreadyReviewed = product?.reviews?.edges[0]?.node.createdByUser;

  return (
    <S.Container>
      <S.HeaderWrapper>
        <S.Title>
          <FormattedMessage defaultMessage="Reviews" />
        </S.Title>
        {product?.reviews && (
          <ProductRatingAverage
            rating={product.rating || 0}
            reviewsCount={reviewsCount}
          />
        )}
      </S.HeaderWrapper>
      <S.ContentWrapper>
        {product?.consumedByUser && !alreadyReviewed && (
          <S.StyledButton
            color="ghost"
            testingContext="leave-review-button"
            onClick={onClick}
          >
            <FormattedMessage defaultMessage="Leave my review" />
          </S.StyledButton>
        )}
        <S.ReviewsWrapper>
          {product?.reviews?.edges.map((review, index) => (
            <S.ReviewTile key={index}>
              <Review key={index} review={review.node} />
              {(review.node.createdByUser || isStaff ) && (
                <S.DeleteIcon
                  onClick={e => {
                    e.stopPropagation();
                    onDelete(review.node.id);
                  }}
                >
                  <UilTrashAlt size="24" color="#23C290" />
                </S.DeleteIcon>
              )}
            </S.ReviewTile>
          ))}
        </S.ReviewsWrapper>
      </S.ContentWrapper>
      <S.FooterWrapper>
        {reviewsCount > 3 && (
          <StyledLink
            underline
            onClick={() => push(`/reviews/${product.slug}`)}
          >
            <FormattedMessage defaultMessage="See all reviews" />
          </StyledLink>
        )}
      </S.FooterWrapper>
    </S.Container>
  );
};
