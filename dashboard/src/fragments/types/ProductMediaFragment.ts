/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductMediaType } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: ProductMediaFragment
// ====================================================

export interface ProductMediaFragment {
  __typename: "ProductMedia";
  /**
   * The ID of the object.
   */
  id: string;
  alt: string;
  sortOrder: number | null;
  /**
   * The URL of the media.
   */
  url: string;
  type: ProductMediaType;
  oembedData: any;
}
