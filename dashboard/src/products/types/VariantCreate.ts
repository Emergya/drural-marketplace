/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductVariantCreateInput, ProductErrorCode, AttributeInputTypeEnum, AttributeEntityTypeEnum, MeasurementUnitsEnum, ProductMediaType, WeightUnitsEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: VariantCreate
// ====================================================

export interface VariantCreate_productVariantCreate_errors {
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

export interface VariantCreate_productVariantCreate_productVariant_metadata {
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

export interface VariantCreate_productVariantCreate_productVariant_privateMetadata {
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

export interface VariantCreate_productVariantCreate_productVariant_selectionAttributes_attribute_choices_pageInfo {
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

export interface VariantCreate_productVariantCreate_productVariant_selectionAttributes_attribute_choices_edges_node_file {
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

export interface VariantCreate_productVariantCreate_productVariant_selectionAttributes_attribute_choices_edges_node {
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
  file: VariantCreate_productVariantCreate_productVariant_selectionAttributes_attribute_choices_edges_node_file | null;
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

export interface VariantCreate_productVariantCreate_productVariant_selectionAttributes_attribute_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: VariantCreate_productVariantCreate_productVariant_selectionAttributes_attribute_choices_edges_node;
}

export interface VariantCreate_productVariantCreate_productVariant_selectionAttributes_attribute_choices {
  __typename: "AttributeValueCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: VariantCreate_productVariantCreate_productVariant_selectionAttributes_attribute_choices_pageInfo;
  edges: VariantCreate_productVariantCreate_productVariant_selectionAttributes_attribute_choices_edges[];
}

export interface VariantCreate_productVariantCreate_productVariant_selectionAttributes_attribute {
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
  choices: VariantCreate_productVariantCreate_productVariant_selectionAttributes_attribute_choices | null;
}

export interface VariantCreate_productVariantCreate_productVariant_selectionAttributes_values_file {
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

export interface VariantCreate_productVariantCreate_productVariant_selectionAttributes_values {
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
  file: VariantCreate_productVariantCreate_productVariant_selectionAttributes_values_file | null;
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

export interface VariantCreate_productVariantCreate_productVariant_selectionAttributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: VariantCreate_productVariantCreate_productVariant_selectionAttributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (VariantCreate_productVariantCreate_productVariant_selectionAttributes_values | null)[];
}

export interface VariantCreate_productVariantCreate_productVariant_nonSelectionAttributes_attribute_choices_pageInfo {
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

export interface VariantCreate_productVariantCreate_productVariant_nonSelectionAttributes_attribute_choices_edges_node_file {
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

export interface VariantCreate_productVariantCreate_productVariant_nonSelectionAttributes_attribute_choices_edges_node {
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
  file: VariantCreate_productVariantCreate_productVariant_nonSelectionAttributes_attribute_choices_edges_node_file | null;
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

export interface VariantCreate_productVariantCreate_productVariant_nonSelectionAttributes_attribute_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: VariantCreate_productVariantCreate_productVariant_nonSelectionAttributes_attribute_choices_edges_node;
}

export interface VariantCreate_productVariantCreate_productVariant_nonSelectionAttributes_attribute_choices {
  __typename: "AttributeValueCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: VariantCreate_productVariantCreate_productVariant_nonSelectionAttributes_attribute_choices_pageInfo;
  edges: VariantCreate_productVariantCreate_productVariant_nonSelectionAttributes_attribute_choices_edges[];
}

export interface VariantCreate_productVariantCreate_productVariant_nonSelectionAttributes_attribute {
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
  choices: VariantCreate_productVariantCreate_productVariant_nonSelectionAttributes_attribute_choices | null;
}

export interface VariantCreate_productVariantCreate_productVariant_nonSelectionAttributes_values_file {
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

export interface VariantCreate_productVariantCreate_productVariant_nonSelectionAttributes_values {
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
  file: VariantCreate_productVariantCreate_productVariant_nonSelectionAttributes_values_file | null;
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

export interface VariantCreate_productVariantCreate_productVariant_nonSelectionAttributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: VariantCreate_productVariantCreate_productVariant_nonSelectionAttributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (VariantCreate_productVariantCreate_productVariant_nonSelectionAttributes_values | null)[];
}

export interface VariantCreate_productVariantCreate_productVariant_media {
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

export interface VariantCreate_productVariantCreate_productVariant_product_defaultVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface VariantCreate_productVariantCreate_productVariant_product_media {
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

export interface VariantCreate_productVariantCreate_productVariant_product_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface VariantCreate_productVariantCreate_productVariant_product_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface VariantCreate_productVariantCreate_productVariant_product_channelListings_pricing_priceRange_start_net {
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

export interface VariantCreate_productVariantCreate_productVariant_product_channelListings_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: VariantCreate_productVariantCreate_productVariant_product_channelListings_pricing_priceRange_start_net;
}

export interface VariantCreate_productVariantCreate_productVariant_product_channelListings_pricing_priceRange_stop_net {
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

export interface VariantCreate_productVariantCreate_productVariant_product_channelListings_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: VariantCreate_productVariantCreate_productVariant_product_channelListings_pricing_priceRange_stop_net;
}

export interface VariantCreate_productVariantCreate_productVariant_product_channelListings_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: VariantCreate_productVariantCreate_productVariant_product_channelListings_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: VariantCreate_productVariantCreate_productVariant_product_channelListings_pricing_priceRange_stop | null;
}

export interface VariantCreate_productVariantCreate_productVariant_product_channelListings_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The discounted price range of the product variants.
   */
  priceRange: VariantCreate_productVariantCreate_productVariant_product_channelListings_pricing_priceRange | null;
}

export interface VariantCreate_productVariantCreate_productVariant_product_channelListings {
  __typename: "ProductChannelListing";
  publicationDate: any | null;
  isPublished: boolean;
  channel: VariantCreate_productVariantCreate_productVariant_product_channelListings_channel;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: VariantCreate_productVariantCreate_productVariant_product_channelListings_pricing | null;
}

export interface VariantCreate_productVariantCreate_productVariant_product_variants_media {
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

export interface VariantCreate_productVariantCreate_productVariant_product_variants {
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
  media: VariantCreate_productVariantCreate_productVariant_product_variants_media[] | null;
}

export interface VariantCreate_productVariantCreate_productVariant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  defaultVariant: VariantCreate_productVariantCreate_productVariant_product_defaultVariant | null;
  /**
   * List of media for the product.
   */
  media: VariantCreate_productVariantCreate_productVariant_product_media[] | null;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: VariantCreate_productVariantCreate_productVariant_product_thumbnail | null;
  /**
   * List of availability in channels for the product.
   */
  channelListings: VariantCreate_productVariantCreate_productVariant_product_channelListings[] | null;
  /**
   * List of variants for the product.
   */
  variants: (VariantCreate_productVariantCreate_productVariant_product_variants | null)[] | null;
}

export interface VariantCreate_productVariantCreate_productVariant_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface VariantCreate_productVariantCreate_productVariant_channelListings_price {
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

export interface VariantCreate_productVariantCreate_productVariant_channelListings_costPrice {
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

export interface VariantCreate_productVariantCreate_productVariant_channelListings {
  __typename: "ProductVariantChannelListing";
  channel: VariantCreate_productVariantCreate_productVariant_channelListings_channel;
  price: VariantCreate_productVariantCreate_productVariant_channelListings_price | null;
  /**
   * Cost price of the variant.
   */
  costPrice: VariantCreate_productVariantCreate_productVariant_channelListings_costPrice | null;
}

export interface VariantCreate_productVariantCreate_productVariant_stocks_warehouse {
  __typename: "Warehouse";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface VariantCreate_productVariantCreate_productVariant_stocks {
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
  warehouse: VariantCreate_productVariantCreate_productVariant_stocks_warehouse;
}

export interface VariantCreate_productVariantCreate_productVariant_weight {
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

export interface VariantCreate_productVariantCreate_productVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (VariantCreate_productVariantCreate_productVariant_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (VariantCreate_productVariantCreate_productVariant_privateMetadata | null)[];
  /**
   * List of attributes assigned to this variant.
   */
  selectionAttributes: VariantCreate_productVariantCreate_productVariant_selectionAttributes[];
  /**
   * List of attributes assigned to this variant.
   */
  nonSelectionAttributes: VariantCreate_productVariantCreate_productVariant_nonSelectionAttributes[];
  /**
   * List of media for the product variant.
   */
  media: VariantCreate_productVariantCreate_productVariant_media[] | null;
  name: string;
  product: VariantCreate_productVariantCreate_productVariant_product;
  /**
   * List of price information in channels for the product.
   */
  channelListings: VariantCreate_productVariantCreate_productVariant_channelListings[] | null;
  sku: string;
  /**
   * Stocks for the product variant.
   */
  stocks: (VariantCreate_productVariantCreate_productVariant_stocks | null)[] | null;
  trackInventory: boolean;
  weight: VariantCreate_productVariantCreate_productVariant_weight | null;
}

export interface VariantCreate_productVariantCreate {
  __typename: "ProductVariantCreate";
  errors: VariantCreate_productVariantCreate_errors[];
  productVariant: VariantCreate_productVariantCreate_productVariant | null;
}

export interface VariantCreate {
  /**
   * Creates a new variant for a product.
   */
  productVariantCreate: VariantCreate_productVariantCreate | null;
}

export interface VariantCreateVariables {
  input: ProductVariantCreateInput;
  firstValues?: number | null;
  afterValues?: string | null;
  lastValues?: number | null;
  beforeValues?: string | null;
}
