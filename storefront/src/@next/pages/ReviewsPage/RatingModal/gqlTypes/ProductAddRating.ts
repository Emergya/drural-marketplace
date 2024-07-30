/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ProductAddRating
// ====================================================

export interface ProductAddRating_productRatingCreate_errors {
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

export interface ProductAddRating_productRatingCreate_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  rating: number;
}

export interface ProductAddRating_productRatingCreate {
  __typename: "ProductRatingCreate";
  errors: ProductAddRating_productRatingCreate_errors[];
  /**
   * Product with review included.
   */
  product: ProductAddRating_productRatingCreate_product | null;
}

export interface ProductAddRating {
  /**
   * Creates a new rating for product
   */
  productRatingCreate: ProductAddRating_productRatingCreate | null;
}

export interface ProductAddRatingVariables {
  id: string;
  rating: number;
  review?: string | null;
}
