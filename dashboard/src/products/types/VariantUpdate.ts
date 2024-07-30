/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { StockInput, AttributeValueInput, ProductErrorCode, AttributeInputTypeEnum, AttributeEntityTypeEnum, MeasurementUnitsEnum, ProductMediaType, WeightUnitsEnum, StockErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: VariantUpdate
// ====================================================

export interface VariantUpdate_productVariantUpdate_errors {
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

export interface VariantUpdate_productVariantUpdate_productVariant_metadata {
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

export interface VariantUpdate_productVariantUpdate_productVariant_privateMetadata {
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

export interface VariantUpdate_productVariantUpdate_productVariant_selectionAttributes_attribute_choices_pageInfo {
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

export interface VariantUpdate_productVariantUpdate_productVariant_selectionAttributes_attribute_choices_edges_node_file {
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

export interface VariantUpdate_productVariantUpdate_productVariant_selectionAttributes_attribute_choices_edges_node {
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
  file: VariantUpdate_productVariantUpdate_productVariant_selectionAttributes_attribute_choices_edges_node_file | null;
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

export interface VariantUpdate_productVariantUpdate_productVariant_selectionAttributes_attribute_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: VariantUpdate_productVariantUpdate_productVariant_selectionAttributes_attribute_choices_edges_node;
}

export interface VariantUpdate_productVariantUpdate_productVariant_selectionAttributes_attribute_choices {
  __typename: "AttributeValueCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: VariantUpdate_productVariantUpdate_productVariant_selectionAttributes_attribute_choices_pageInfo;
  edges: VariantUpdate_productVariantUpdate_productVariant_selectionAttributes_attribute_choices_edges[];
}

export interface VariantUpdate_productVariantUpdate_productVariant_selectionAttributes_attribute {
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
  choices: VariantUpdate_productVariantUpdate_productVariant_selectionAttributes_attribute_choices | null;
}

export interface VariantUpdate_productVariantUpdate_productVariant_selectionAttributes_values_file {
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

export interface VariantUpdate_productVariantUpdate_productVariant_selectionAttributes_values {
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
  file: VariantUpdate_productVariantUpdate_productVariant_selectionAttributes_values_file | null;
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

export interface VariantUpdate_productVariantUpdate_productVariant_selectionAttributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: VariantUpdate_productVariantUpdate_productVariant_selectionAttributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (VariantUpdate_productVariantUpdate_productVariant_selectionAttributes_values | null)[];
}

export interface VariantUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_attribute_choices_pageInfo {
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

export interface VariantUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_attribute_choices_edges_node_file {
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

export interface VariantUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_attribute_choices_edges_node {
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
  file: VariantUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_attribute_choices_edges_node_file | null;
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

export interface VariantUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_attribute_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: VariantUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_attribute_choices_edges_node;
}

export interface VariantUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_attribute_choices {
  __typename: "AttributeValueCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: VariantUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_attribute_choices_pageInfo;
  edges: VariantUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_attribute_choices_edges[];
}

export interface VariantUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_attribute {
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
  choices: VariantUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_attribute_choices | null;
}

export interface VariantUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_values_file {
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

export interface VariantUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_values {
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
  file: VariantUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_values_file | null;
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

export interface VariantUpdate_productVariantUpdate_productVariant_nonSelectionAttributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: VariantUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (VariantUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_values | null)[];
}

export interface VariantUpdate_productVariantUpdate_productVariant_media {
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
  oembedData: any;
}

export interface VariantUpdate_productVariantUpdate_productVariant_product_defaultVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface VariantUpdate_productVariantUpdate_productVariant_product_media {
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

export interface VariantUpdate_productVariantUpdate_productVariant_product_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface VariantUpdate_productVariantUpdate_productVariant_product_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface VariantUpdate_productVariantUpdate_productVariant_product_channelListings_pricing_priceRange_start_net {
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

export interface VariantUpdate_productVariantUpdate_productVariant_product_channelListings_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: VariantUpdate_productVariantUpdate_productVariant_product_channelListings_pricing_priceRange_start_net;
}

export interface VariantUpdate_productVariantUpdate_productVariant_product_channelListings_pricing_priceRange_stop_net {
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

export interface VariantUpdate_productVariantUpdate_productVariant_product_channelListings_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: VariantUpdate_productVariantUpdate_productVariant_product_channelListings_pricing_priceRange_stop_net;
}

export interface VariantUpdate_productVariantUpdate_productVariant_product_channelListings_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: VariantUpdate_productVariantUpdate_productVariant_product_channelListings_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: VariantUpdate_productVariantUpdate_productVariant_product_channelListings_pricing_priceRange_stop | null;
}

export interface VariantUpdate_productVariantUpdate_productVariant_product_channelListings_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The discounted price range of the product variants.
   */
  priceRange: VariantUpdate_productVariantUpdate_productVariant_product_channelListings_pricing_priceRange | null;
}

export interface VariantUpdate_productVariantUpdate_productVariant_product_channelListings {
  __typename: "ProductChannelListing";
  publicationDate: any | null;
  isPublished: boolean;
  channel: VariantUpdate_productVariantUpdate_productVariant_product_channelListings_channel;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: VariantUpdate_productVariantUpdate_productVariant_product_channelListings_pricing | null;
}

export interface VariantUpdate_productVariantUpdate_productVariant_product_variants_media {
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
  oembedData: any;
}

export interface VariantUpdate_productVariantUpdate_productVariant_product_variants {
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
  media: VariantUpdate_productVariantUpdate_productVariant_product_variants_media[] | null;
}

export interface VariantUpdate_productVariantUpdate_productVariant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  defaultVariant: VariantUpdate_productVariantUpdate_productVariant_product_defaultVariant | null;
  /**
   * List of media for the product.
   */
  media: VariantUpdate_productVariantUpdate_productVariant_product_media[] | null;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: VariantUpdate_productVariantUpdate_productVariant_product_thumbnail | null;
  /**
   * List of availability in channels for the product.
   */
  channelListings: VariantUpdate_productVariantUpdate_productVariant_product_channelListings[] | null;
  /**
   * List of variants for the product.
   */
  variants: (VariantUpdate_productVariantUpdate_productVariant_product_variants | null)[] | null;
}

export interface VariantUpdate_productVariantUpdate_productVariant_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface VariantUpdate_productVariantUpdate_productVariant_channelListings_price {
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

export interface VariantUpdate_productVariantUpdate_productVariant_channelListings_costPrice {
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

export interface VariantUpdate_productVariantUpdate_productVariant_channelListings {
  __typename: "ProductVariantChannelListing";
  channel: VariantUpdate_productVariantUpdate_productVariant_channelListings_channel;
  price: VariantUpdate_productVariantUpdate_productVariant_channelListings_price | null;
  /**
   * Cost price of the variant.
   */
  costPrice: VariantUpdate_productVariantUpdate_productVariant_channelListings_costPrice | null;
}

export interface VariantUpdate_productVariantUpdate_productVariant_stocks_warehouse {
  __typename: "Warehouse";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface VariantUpdate_productVariantUpdate_productVariant_stocks {
  __typename: "Stock";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Quantity of a product in the warehouse's possession, including the allocated stock that is waiting for shipment.
   */
  quantity: number;
  /**
   * Quantity allocated for orders
   */
  quantityAllocated: number;
  warehouse: VariantUpdate_productVariantUpdate_productVariant_stocks_warehouse;
}

export interface VariantUpdate_productVariantUpdate_productVariant_weight {
  __typename: "Weight";
  /**
   * Weight unit.
   */
  unit: WeightUnitsEnum;
  /**
   * Weight value.
   */
  value: number;
}

export interface VariantUpdate_productVariantUpdate_productVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (VariantUpdate_productVariantUpdate_productVariant_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (VariantUpdate_productVariantUpdate_productVariant_privateMetadata | null)[];
  /**
   * List of attributes assigned to this variant.
   */
  selectionAttributes: VariantUpdate_productVariantUpdate_productVariant_selectionAttributes[];
  /**
   * List of attributes assigned to this variant.
   */
  nonSelectionAttributes: VariantUpdate_productVariantUpdate_productVariant_nonSelectionAttributes[];
  /**
   * List of media for the product variant.
   */
  media: VariantUpdate_productVariantUpdate_productVariant_media[] | null;
  name: string;
  product: VariantUpdate_productVariantUpdate_productVariant_product;
  /**
   * List of price information in channels for the product.
   */
  channelListings: VariantUpdate_productVariantUpdate_productVariant_channelListings[] | null;
  sku: string;
  /**
   * Stocks for the product variant.
   */
  stocks: (VariantUpdate_productVariantUpdate_productVariant_stocks | null)[] | null;
  trackInventory: boolean;
  weight: VariantUpdate_productVariantUpdate_productVariant_weight | null;
}

export interface VariantUpdate_productVariantUpdate {
  __typename: "ProductVariantUpdate";
  errors: VariantUpdate_productVariantUpdate_errors[];
  productVariant: VariantUpdate_productVariantUpdate_productVariant | null;
}

export interface VariantUpdate_productVariantStocksUpdate_errors {
  __typename: "BulkStockError";
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
   * Index of an input list item that caused the error.
   */
  index: number | null;
}

export interface VariantUpdate_productVariantStocksUpdate_productVariant_metadata {
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

export interface VariantUpdate_productVariantStocksUpdate_productVariant_privateMetadata {
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

export interface VariantUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_attribute_choices_pageInfo {
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

export interface VariantUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_attribute_choices_edges_node_file {
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

export interface VariantUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_attribute_choices_edges_node {
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
  file: VariantUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_attribute_choices_edges_node_file | null;
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

export interface VariantUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_attribute_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: VariantUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_attribute_choices_edges_node;
}

export interface VariantUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_attribute_choices {
  __typename: "AttributeValueCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: VariantUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_attribute_choices_pageInfo;
  edges: VariantUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_attribute_choices_edges[];
}

export interface VariantUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_attribute {
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
  choices: VariantUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_attribute_choices | null;
}

export interface VariantUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_values_file {
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

export interface VariantUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_values {
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
  file: VariantUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_values_file | null;
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

export interface VariantUpdate_productVariantStocksUpdate_productVariant_selectionAttributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: VariantUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (VariantUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_values | null)[];
}

export interface VariantUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_attribute_choices_pageInfo {
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

export interface VariantUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_attribute_choices_edges_node_file {
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

export interface VariantUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_attribute_choices_edges_node {
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
  file: VariantUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_attribute_choices_edges_node_file | null;
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

export interface VariantUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_attribute_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: VariantUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_attribute_choices_edges_node;
}

export interface VariantUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_attribute_choices {
  __typename: "AttributeValueCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: VariantUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_attribute_choices_pageInfo;
  edges: VariantUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_attribute_choices_edges[];
}

export interface VariantUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_attribute {
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
  choices: VariantUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_attribute_choices | null;
}

export interface VariantUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_values_file {
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

export interface VariantUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_values {
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
  file: VariantUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_values_file | null;
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

export interface VariantUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: VariantUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (VariantUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_values | null)[];
}

export interface VariantUpdate_productVariantStocksUpdate_productVariant_media {
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
  oembedData: any;
}

export interface VariantUpdate_productVariantStocksUpdate_productVariant_product_defaultVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface VariantUpdate_productVariantStocksUpdate_productVariant_product_media {
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

export interface VariantUpdate_productVariantStocksUpdate_productVariant_product_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface VariantUpdate_productVariantStocksUpdate_productVariant_product_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface VariantUpdate_productVariantStocksUpdate_productVariant_product_channelListings_pricing_priceRange_start_net {
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

export interface VariantUpdate_productVariantStocksUpdate_productVariant_product_channelListings_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: VariantUpdate_productVariantStocksUpdate_productVariant_product_channelListings_pricing_priceRange_start_net;
}

export interface VariantUpdate_productVariantStocksUpdate_productVariant_product_channelListings_pricing_priceRange_stop_net {
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

export interface VariantUpdate_productVariantStocksUpdate_productVariant_product_channelListings_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: VariantUpdate_productVariantStocksUpdate_productVariant_product_channelListings_pricing_priceRange_stop_net;
}

export interface VariantUpdate_productVariantStocksUpdate_productVariant_product_channelListings_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: VariantUpdate_productVariantStocksUpdate_productVariant_product_channelListings_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: VariantUpdate_productVariantStocksUpdate_productVariant_product_channelListings_pricing_priceRange_stop | null;
}

export interface VariantUpdate_productVariantStocksUpdate_productVariant_product_channelListings_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The discounted price range of the product variants.
   */
  priceRange: VariantUpdate_productVariantStocksUpdate_productVariant_product_channelListings_pricing_priceRange | null;
}

export interface VariantUpdate_productVariantStocksUpdate_productVariant_product_channelListings {
  __typename: "ProductChannelListing";
  publicationDate: any | null;
  isPublished: boolean;
  channel: VariantUpdate_productVariantStocksUpdate_productVariant_product_channelListings_channel;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: VariantUpdate_productVariantStocksUpdate_productVariant_product_channelListings_pricing | null;
}

export interface VariantUpdate_productVariantStocksUpdate_productVariant_product_variants_media {
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
  oembedData: any;
}

export interface VariantUpdate_productVariantStocksUpdate_productVariant_product_variants {
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
  media: VariantUpdate_productVariantStocksUpdate_productVariant_product_variants_media[] | null;
}

export interface VariantUpdate_productVariantStocksUpdate_productVariant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  defaultVariant: VariantUpdate_productVariantStocksUpdate_productVariant_product_defaultVariant | null;
  /**
   * List of media for the product.
   */
  media: VariantUpdate_productVariantStocksUpdate_productVariant_product_media[] | null;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: VariantUpdate_productVariantStocksUpdate_productVariant_product_thumbnail | null;
  /**
   * List of availability in channels for the product.
   */
  channelListings: VariantUpdate_productVariantStocksUpdate_productVariant_product_channelListings[] | null;
  /**
   * List of variants for the product.
   */
  variants: (VariantUpdate_productVariantStocksUpdate_productVariant_product_variants | null)[] | null;
}

export interface VariantUpdate_productVariantStocksUpdate_productVariant_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface VariantUpdate_productVariantStocksUpdate_productVariant_channelListings_price {
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

export interface VariantUpdate_productVariantStocksUpdate_productVariant_channelListings_costPrice {
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

export interface VariantUpdate_productVariantStocksUpdate_productVariant_channelListings {
  __typename: "ProductVariantChannelListing";
  channel: VariantUpdate_productVariantStocksUpdate_productVariant_channelListings_channel;
  price: VariantUpdate_productVariantStocksUpdate_productVariant_channelListings_price | null;
  /**
   * Cost price of the variant.
   */
  costPrice: VariantUpdate_productVariantStocksUpdate_productVariant_channelListings_costPrice | null;
}

export interface VariantUpdate_productVariantStocksUpdate_productVariant_stocks_warehouse {
  __typename: "Warehouse";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface VariantUpdate_productVariantStocksUpdate_productVariant_stocks {
  __typename: "Stock";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Quantity of a product in the warehouse's possession, including the allocated stock that is waiting for shipment.
   */
  quantity: number;
  /**
   * Quantity allocated for orders
   */
  quantityAllocated: number;
  warehouse: VariantUpdate_productVariantStocksUpdate_productVariant_stocks_warehouse;
}

export interface VariantUpdate_productVariantStocksUpdate_productVariant_weight {
  __typename: "Weight";
  /**
   * Weight unit.
   */
  unit: WeightUnitsEnum;
  /**
   * Weight value.
   */
  value: number;
}

export interface VariantUpdate_productVariantStocksUpdate_productVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (VariantUpdate_productVariantStocksUpdate_productVariant_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (VariantUpdate_productVariantStocksUpdate_productVariant_privateMetadata | null)[];
  /**
   * List of attributes assigned to this variant.
   */
  selectionAttributes: VariantUpdate_productVariantStocksUpdate_productVariant_selectionAttributes[];
  /**
   * List of attributes assigned to this variant.
   */
  nonSelectionAttributes: VariantUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes[];
  /**
   * List of media for the product variant.
   */
  media: VariantUpdate_productVariantStocksUpdate_productVariant_media[] | null;
  name: string;
  product: VariantUpdate_productVariantStocksUpdate_productVariant_product;
  /**
   * List of price information in channels for the product.
   */
  channelListings: VariantUpdate_productVariantStocksUpdate_productVariant_channelListings[] | null;
  sku: string;
  /**
   * Stocks for the product variant.
   */
  stocks: (VariantUpdate_productVariantStocksUpdate_productVariant_stocks | null)[] | null;
  trackInventory: boolean;
  weight: VariantUpdate_productVariantStocksUpdate_productVariant_weight | null;
}

export interface VariantUpdate_productVariantStocksUpdate {
  __typename: "ProductVariantStocksUpdate";
  errors: VariantUpdate_productVariantStocksUpdate_errors[];
  /**
   * Updated product variant.
   */
  productVariant: VariantUpdate_productVariantStocksUpdate_productVariant | null;
}

export interface VariantUpdate_productVariantStocksCreate_errors {
  __typename: "BulkStockError";
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
   * Index of an input list item that caused the error.
   */
  index: number | null;
}

export interface VariantUpdate_productVariantStocksCreate_productVariant_stocks_warehouse {
  __typename: "Warehouse";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface VariantUpdate_productVariantStocksCreate_productVariant_stocks {
  __typename: "Stock";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Quantity of a product in the warehouse's possession, including the allocated stock that is waiting for shipment.
   */
  quantity: number;
  /**
   * Quantity allocated for orders
   */
  quantityAllocated: number;
  warehouse: VariantUpdate_productVariantStocksCreate_productVariant_stocks_warehouse;
}

export interface VariantUpdate_productVariantStocksCreate_productVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Stocks for the product variant.
   */
  stocks: (VariantUpdate_productVariantStocksCreate_productVariant_stocks | null)[] | null;
}

export interface VariantUpdate_productVariantStocksCreate {
  __typename: "ProductVariantStocksCreate";
  errors: VariantUpdate_productVariantStocksCreate_errors[];
  /**
   * Updated product variant.
   */
  productVariant: VariantUpdate_productVariantStocksCreate_productVariant | null;
}

export interface VariantUpdate_productVariantStocksDelete_errors {
  __typename: "StockError";
  /**
   * The error code.
   */
  code: StockErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}

export interface VariantUpdate_productVariantStocksDelete_productVariant_stocks_warehouse {
  __typename: "Warehouse";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface VariantUpdate_productVariantStocksDelete_productVariant_stocks {
  __typename: "Stock";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Quantity of a product in the warehouse's possession, including the allocated stock that is waiting for shipment.
   */
  quantity: number;
  /**
   * Quantity allocated for orders
   */
  quantityAllocated: number;
  warehouse: VariantUpdate_productVariantStocksDelete_productVariant_stocks_warehouse;
}

export interface VariantUpdate_productVariantStocksDelete_productVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Stocks for the product variant.
   */
  stocks: (VariantUpdate_productVariantStocksDelete_productVariant_stocks | null)[] | null;
}

export interface VariantUpdate_productVariantStocksDelete {
  __typename: "ProductVariantStocksDelete";
  errors: VariantUpdate_productVariantStocksDelete_errors[];
  /**
   * Updated product variant.
   */
  productVariant: VariantUpdate_productVariantStocksDelete_productVariant | null;
}

export interface VariantUpdate {
  /**
   * Updates an existing variant for product.
   */
  productVariantUpdate: VariantUpdate_productVariantUpdate | null;
  /**
   * Update stocks for product variant.
   */
  productVariantStocksUpdate: VariantUpdate_productVariantStocksUpdate | null;
  /**
   * Creates stocks for product variant.
   */
  productVariantStocksCreate: VariantUpdate_productVariantStocksCreate | null;
  /**
   * Delete stocks from product variant.
   */
  productVariantStocksDelete: VariantUpdate_productVariantStocksDelete | null;
}

export interface VariantUpdateVariables {
  addStocks: StockInput[];
  removeStocks: string[];
  id: string;
  attributes?: AttributeValueInput[] | null;
  sku?: string | null;
  trackInventory: boolean;
  stocks: StockInput[];
  weight?: any | null;
  firstValues?: number | null;
  afterValues?: string | null;
  lastValues?: number | null;
  beforeValues?: string | null;
}
