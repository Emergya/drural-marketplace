/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AttributeInputTypeEnum, AttributeEntityTypeEnum, MeasurementUnitsEnum, ProductMediaType } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: ProductVariantCreateData
// ====================================================

export interface ProductVariantCreateData_product_media {
  __typename: "ProductMedia";
  /**
   * The ID of the object.
   */
  id: string;
  sortOrder: number | null;
  /**
   * The URL of the media.
   */
  url: string;
}

export interface ProductVariantCreateData_product_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface ProductVariantCreateData_product_channelListings {
  __typename: "ProductChannelListing";
  channel: ProductVariantCreateData_product_channelListings_channel;
}

export interface ProductVariantCreateData_product_productType_selectionVariantAttributes_choices_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
}

export interface ProductVariantCreateData_product_productType_selectionVariantAttributes_choices_edges_node_file {
  __typename: "File";
  /**
   * The URL of the file.
   */
  url: string;
  /**
   * Content type of the file.
   */
  contentType: string | null;
}

export interface ProductVariantCreateData_product_productType_selectionVariantAttributes_choices_edges_node {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of a value (unique per attribute).
   */
  slug: string | null;
  /**
   * Represents file URL and content type (if attribute value is a file).
   */
  file: ProductVariantCreateData_product_productType_selectionVariantAttributes_choices_edges_node_file | null;
  /**
   * The ID of the attribute reference.
   */
  reference: string | null;
  /**
   * Represents the text (JSON) of the attribute value.
   */
  richText: any | null;
  /**
   * Represents the boolean value of the attribute value.
   */
  boolean: boolean | null;
  /**
   * Represents the date value of the attribute value.
   */
  date: any | null;
  /**
   * Represents the date time value of the attribute value.
   */
  dateTime: any | null;
}

export interface ProductVariantCreateData_product_productType_selectionVariantAttributes_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: ProductVariantCreateData_product_productType_selectionVariantAttributes_choices_edges_node;
}

export interface ProductVariantCreateData_product_productType_selectionVariantAttributes_choices {
  __typename: "AttributeValueCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: ProductVariantCreateData_product_productType_selectionVariantAttributes_choices_pageInfo;
  edges: ProductVariantCreateData_product_productType_selectionVariantAttributes_choices_edges[];
}

export interface ProductVariantCreateData_product_productType_selectionVariantAttributes {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * The input type to use for entering attribute values in the dashboard.
   */
  inputType: AttributeInputTypeEnum | null;
  /**
   * The entity type which can be used as a reference.
   */
  entityType: AttributeEntityTypeEnum | null;
  /**
   * Whether the attribute requires values to be passed or not.
   */
  valueRequired: boolean;
  /**
   * The unit of attribute values.
   */
  unit: MeasurementUnitsEnum | null;
  /**
   * List of attribute's values.
   */
  choices: ProductVariantCreateData_product_productType_selectionVariantAttributes_choices | null;
}

export interface ProductVariantCreateData_product_productType_nonSelectionVariantAttributes_choices_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
}

export interface ProductVariantCreateData_product_productType_nonSelectionVariantAttributes_choices_edges_node_file {
  __typename: "File";
  /**
   * The URL of the file.
   */
  url: string;
  /**
   * Content type of the file.
   */
  contentType: string | null;
}

export interface ProductVariantCreateData_product_productType_nonSelectionVariantAttributes_choices_edges_node {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of a value (unique per attribute).
   */
  slug: string | null;
  /**
   * Represents file URL and content type (if attribute value is a file).
   */
  file: ProductVariantCreateData_product_productType_nonSelectionVariantAttributes_choices_edges_node_file | null;
  /**
   * The ID of the attribute reference.
   */
  reference: string | null;
  /**
   * Represents the text (JSON) of the attribute value.
   */
  richText: any | null;
  /**
   * Represents the boolean value of the attribute value.
   */
  boolean: boolean | null;
  /**
   * Represents the date value of the attribute value.
   */
  date: any | null;
  /**
   * Represents the date time value of the attribute value.
   */
  dateTime: any | null;
}

export interface ProductVariantCreateData_product_productType_nonSelectionVariantAttributes_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: ProductVariantCreateData_product_productType_nonSelectionVariantAttributes_choices_edges_node;
}

export interface ProductVariantCreateData_product_productType_nonSelectionVariantAttributes_choices {
  __typename: "AttributeValueCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: ProductVariantCreateData_product_productType_nonSelectionVariantAttributes_choices_pageInfo;
  edges: ProductVariantCreateData_product_productType_nonSelectionVariantAttributes_choices_edges[];
}

export interface ProductVariantCreateData_product_productType_nonSelectionVariantAttributes {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * The input type to use for entering attribute values in the dashboard.
   */
  inputType: AttributeInputTypeEnum | null;
  /**
   * The entity type which can be used as a reference.
   */
  entityType: AttributeEntityTypeEnum | null;
  /**
   * Whether the attribute requires values to be passed or not.
   */
  valueRequired: boolean;
  /**
   * The unit of attribute values.
   */
  unit: MeasurementUnitsEnum | null;
  /**
   * List of attribute's values.
   */
  choices: ProductVariantCreateData_product_productType_nonSelectionVariantAttributes_choices | null;
}

export interface ProductVariantCreateData_product_productType {
  __typename: "ProductType";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Variant attributes of that product type.
   */
  selectionVariantAttributes: (ProductVariantCreateData_product_productType_selectionVariantAttributes | null)[] | null;
  /**
   * Variant attributes of that product type.
   */
  nonSelectionVariantAttributes: (ProductVariantCreateData_product_productType_nonSelectionVariantAttributes | null)[] | null;
}

export interface ProductVariantCreateData_product_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ProductVariantCreateData_product_variants_media {
  __typename: "ProductMedia";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The URL of the media.
   */
  url: string;
  type: ProductMediaType;
}

export interface ProductVariantCreateData_product_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  sku: string;
  /**
   * List of media for the product variant.
   */
  media: ProductVariantCreateData_product_variants_media[] | null;
}

export interface ProductVariantCreateData_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of media for the product.
   */
  media: ProductVariantCreateData_product_media[] | null;
  /**
   * List of availability in channels for the product.
   */
  channelListings: ProductVariantCreateData_product_channelListings[] | null;
  name: string;
  productType: ProductVariantCreateData_product_productType;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: ProductVariantCreateData_product_thumbnail | null;
  /**
   * List of variants for the product.
   */
  variants: (ProductVariantCreateData_product_variants | null)[] | null;
}

export interface ProductVariantCreateData {
  /**
   * Look up a product by ID.
   */
  product: ProductVariantCreateData_product | null;
}

export interface ProductVariantCreateDataVariables {
  id: string;
  sellerRequest?: boolean | null;
  firstValues?: number | null;
  afterValues?: string | null;
  lastValues?: number | null;
  beforeValues?: string | null;
}
