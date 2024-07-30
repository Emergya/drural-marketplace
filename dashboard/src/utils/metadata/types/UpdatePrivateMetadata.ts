/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MetadataInput, MetadataErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdatePrivateMetadata
// ====================================================

export interface UpdatePrivateMetadata_updatePrivateMetadata_errors {
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

export interface UpdatePrivateMetadata_updatePrivateMetadata {
  __typename: "UpdatePrivateMetadata";
  errors: UpdatePrivateMetadata_updatePrivateMetadata_errors[];
}

export interface UpdatePrivateMetadata_deletePrivateMetadata_errors {
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

export interface UpdatePrivateMetadata_deletePrivateMetadata_item_metadata {
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

export interface UpdatePrivateMetadata_deletePrivateMetadata_item_privateMetadata {
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

export interface UpdatePrivateMetadata_deletePrivateMetadata_item {
  __typename: "ProductVariant" | "Product" | "ProductType" | "Attribute" | "Category" | "Collection" | "DigitalContent" | "Warehouse" | "ShippingZone" | "ShippingMethod" | "App" | "User" | "Checkout" | "Order" | "Voucher" | "Fulfillment" | "Invoice" | "Page" | "PageType" | "Sale" | "MenuItem" | "Menu";
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (UpdatePrivateMetadata_deletePrivateMetadata_item_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (UpdatePrivateMetadata_deletePrivateMetadata_item_privateMetadata | null)[];
  /**
   * The ID of the object.
   */
  id: string;
}

export interface UpdatePrivateMetadata_deletePrivateMetadata {
  __typename: "DeletePrivateMetadata";
  errors: UpdatePrivateMetadata_deletePrivateMetadata_errors[];
  item: UpdatePrivateMetadata_deletePrivateMetadata_item | null;
}

export interface UpdatePrivateMetadata {
  /**
   * Updates private metadata of an object.
   */
  updatePrivateMetadata: UpdatePrivateMetadata_updatePrivateMetadata | null;
  /**
   * Delete object's private metadata.
   */
  deletePrivateMetadata: UpdatePrivateMetadata_deletePrivateMetadata | null;
}

export interface UpdatePrivateMetadataVariables {
  id: string;
  input: MetadataInput[];
  keysToDelete: string[];
}
