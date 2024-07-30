/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MetadataInput, MetadataErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateMetadata
// ====================================================

export interface UpdateMetadata_updateMetadata_errors {
  __typename: "MetadataError";
  /**
   * The error code.
   */
  code: MetadataErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}

export interface UpdateMetadata_updateMetadata {
  __typename: "UpdateMetadata";
  errors: UpdateMetadata_updateMetadata_errors[];
}

export interface UpdateMetadata_deleteMetadata_errors {
  __typename: "MetadataError";
  /**
   * The error code.
   */
  code: MetadataErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}

export interface UpdateMetadata_deleteMetadata_item_metadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface UpdateMetadata_deleteMetadata_item_privateMetadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface UpdateMetadata_deleteMetadata_item {
  __typename: "ProductVariant" | "Product" | "ProductType" | "Attribute" | "Category" | "Collection" | "DigitalContent" | "Warehouse" | "ShippingZone" | "ShippingMethod" | "App" | "User" | "Checkout" | "Order" | "Voucher" | "Fulfillment" | "Invoice" | "Page" | "PageType" | "Sale" | "MenuItem" | "Menu";
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (UpdateMetadata_deleteMetadata_item_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (UpdateMetadata_deleteMetadata_item_privateMetadata | null)[];
  /**
   * The ID of the object.
   */
  id: string;
}

export interface UpdateMetadata_deleteMetadata {
  __typename: "DeleteMetadata";
  errors: UpdateMetadata_deleteMetadata_errors[];
  item: UpdateMetadata_deleteMetadata_item | null;
}

export interface UpdateMetadata {
  /**
   * Updates metadata of an object.
   */
  updateMetadata: UpdateMetadata_updateMetadata | null;
  /**
   * Delete metadata of an object.
   */
  deleteMetadata: UpdateMetadata_deleteMetadata | null;
}

export interface UpdateMetadataVariables {
  id: string;
  input: MetadataInput[];
  keysToDelete: string[];
}
