/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductCreateInput, ProductErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ProductCreate
// ====================================================

export interface ProductCreate_productCreate_errors {
  __typename: "ProductError";
  /**
   * The error code.
   */
  code: ProductErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
  /**
   * List of attributes IDs which causes the error.
   */
  attributes: string[] | null;
}

export interface ProductCreate_productCreate_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface ProductCreate_productCreate {
  __typename: "ProductCreate";
  errors: ProductCreate_productCreate_errors[];
  product: ProductCreate_productCreate_product | null;
}

export interface ProductCreate {
  /**
   * Creates a new product.
   */
  productCreate: ProductCreate_productCreate | null;
}

export interface ProductCreateVariables {
  input: ProductCreateInput;
}
