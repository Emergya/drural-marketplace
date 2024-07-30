/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductPurchaseEmail
// ====================================================

export interface ProductPurchaseEmail_product_purchaseEmail {
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

export interface ProductPurchaseEmail_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  isBookable: boolean;
  purchaseEmail: ProductPurchaseEmail_product_purchaseEmail | null;
}

export interface ProductPurchaseEmail {
  /**
   * Look up a product by ID.
   */
  product: ProductPurchaseEmail_product | null;
}

export interface ProductPurchaseEmailVariables {
  id: string;
  channel?: string | null;
  sellerRequest: boolean;
}
