/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ProductDeleteMyRating
// ====================================================

export interface ProductDeleteMyRating_productRatingDelete_errors {
  __typename: "RatingError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface ProductDeleteMyRating_productRatingDelete_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  rating: number;
}

export interface ProductDeleteMyRating_productRatingDelete_review {
  __typename: "ProductRating";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface ProductDeleteMyRating_productRatingDelete {
  __typename: "ProductRatingDelete";
  errors: ProductDeleteMyRating_productRatingDelete_errors[];
  /**
   * Product with without review.
   */
  product: ProductDeleteMyRating_productRatingDelete_product | null;
  review: ProductDeleteMyRating_productRatingDelete_review | null;
}

export interface ProductDeleteMyRating {
  /**
   * Creates a new rating for product
   */
  productRatingDelete: ProductDeleteMyRating_productRatingDelete | null;
}

export interface ProductDeleteMyRatingVariables {
  id: string;
}
