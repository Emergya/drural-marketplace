/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PurchaseEmailInput, ProductErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ProductPurchaseEmailUpdate
// ====================================================

export interface ProductPurchaseEmailUpdate_productUpdate_errors {
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

export interface ProductPurchaseEmailUpdate_productUpdate_product_purchaseEmail {
  __typename: "PurchaseEmail";
  /**
   * Subject of the custom email template.
   */
  subject: string;
  /**
   * Title of the custom email template.
   */
  title: string;
  /**
   * Body of the custom email template.
   */
  content: string;
}

export interface ProductPurchaseEmailUpdate_productUpdate_product {
  __typename: "Product";
  purchaseEmail: ProductPurchaseEmailUpdate_productUpdate_product_purchaseEmail | null;
}

export interface ProductPurchaseEmailUpdate_productUpdate {
  __typename: "ProductUpdate";
  errors: ProductPurchaseEmailUpdate_productUpdate_errors[];
  product: ProductPurchaseEmailUpdate_productUpdate_product | null;
}

export interface ProductPurchaseEmailUpdate {
  /**
   * Updates an existing product.
   */
  productUpdate: ProductPurchaseEmailUpdate_productUpdate | null;
}

export interface ProductPurchaseEmailUpdateVariables {
  id: string;
  purchaseEmail?: PurchaseEmailInput | null;
}
