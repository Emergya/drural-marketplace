/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductMediaType } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: ProductMediaById
// ====================================================

export interface ProductMediaById_product_mainImage {
  __typename: "ProductMedia";
  /**
   * The ID of the object.
   */
  id: string;
  alt: string;
  /**
   * The URL of the media.
   */
  url: string;
  type: ProductMediaType;
  oembedData: any;
}

export interface ProductMediaById_product_media {
  __typename: "ProductMedia";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The URL of the media.
   */
  url: string;
  alt: string;
  type: ProductMediaType;
  oembedData: any;
}

export interface ProductMediaById_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * Get a single product media by ID.
   */
  mainImage: ProductMediaById_product_mainImage | null;
  /**
   * List of media for the product.
   */
  media: ProductMediaById_product_media[] | null;
}

export interface ProductMediaById {
  /**
   * Look up a product by ID.
   */
  product: ProductMediaById_product | null;
}

export interface ProductMediaByIdVariables {
  productId: string;
  sellerRequest?: boolean | null;
  mediaId: string;
}
