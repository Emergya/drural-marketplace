/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RefundOrderLineFragment
// ====================================================

export interface RefundOrderLineFragment_unitPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface RefundOrderLineFragment_unitPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: RefundOrderLineFragment_unitPrice_gross;
}

export interface RefundOrderLineFragment_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface RefundOrderLineFragment {
  __typename: "OrderLine";
  /**
   * The ID of the object.
   */
  id: string;
  productName: string;
  quantity: number;
  /**
   * Price of the single item in the order line.
   */
  unitPrice: RefundOrderLineFragment_unitPrice;
  /**
   * The main thumbnail for the ordered product.
   */
  thumbnail: RefundOrderLineFragment_thumbnail | null;
}
