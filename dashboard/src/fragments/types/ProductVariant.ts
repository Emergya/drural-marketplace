/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AttributeInputTypeEnum, AttributeEntityTypeEnum, MeasurementUnitsEnum, ProductMediaType, WeightUnitsEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: ProductVariant
// ====================================================

export interface ProductVariant_metadata {
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

export interface ProductVariant_privateMetadata {
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

export interface ProductVariant_selectionAttributes_attribute_choices_pageInfo {
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

export interface ProductVariant_selectionAttributes_attribute_choices_edges_node_file {
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

export interface ProductVariant_selectionAttributes_attribute_choices_edges_node {
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
  file: ProductVariant_selectionAttributes_attribute_choices_edges_node_file | null;
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

export interface ProductVariant_selectionAttributes_attribute_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: ProductVariant_selectionAttributes_attribute_choices_edges_node;
}

export interface ProductVariant_selectionAttributes_attribute_choices {
  __typename: "AttributeValueCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: ProductVariant_selectionAttributes_attribute_choices_pageInfo;
  edges: ProductVariant_selectionAttributes_attribute_choices_edges[];
}

export interface ProductVariant_selectionAttributes_attribute {
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
  choices: ProductVariant_selectionAttributes_attribute_choices | null;
}

export interface ProductVariant_selectionAttributes_values_file {
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

export interface ProductVariant_selectionAttributes_values {
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
  file: ProductVariant_selectionAttributes_values_file | null;
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

export interface ProductVariant_selectionAttributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductVariant_selectionAttributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductVariant_selectionAttributes_values | null)[];
}

export interface ProductVariant_nonSelectionAttributes_attribute_choices_pageInfo {
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

export interface ProductVariant_nonSelectionAttributes_attribute_choices_edges_node_file {
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

export interface ProductVariant_nonSelectionAttributes_attribute_choices_edges_node {
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
  file: ProductVariant_nonSelectionAttributes_attribute_choices_edges_node_file | null;
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

export interface ProductVariant_nonSelectionAttributes_attribute_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: ProductVariant_nonSelectionAttributes_attribute_choices_edges_node;
}

export interface ProductVariant_nonSelectionAttributes_attribute_choices {
  __typename: "AttributeValueCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: ProductVariant_nonSelectionAttributes_attribute_choices_pageInfo;
  edges: ProductVariant_nonSelectionAttributes_attribute_choices_edges[];
}

export interface ProductVariant_nonSelectionAttributes_attribute {
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
  choices: ProductVariant_nonSelectionAttributes_attribute_choices | null;
}

export interface ProductVariant_nonSelectionAttributes_values_file {
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

export interface ProductVariant_nonSelectionAttributes_values {
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
  file: ProductVariant_nonSelectionAttributes_values_file | null;
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

export interface ProductVariant_nonSelectionAttributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductVariant_nonSelectionAttributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductVariant_nonSelectionAttributes_values | null)[];
}

export interface ProductVariant_media {
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

export interface ProductVariant_product_defaultVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface ProductVariant_product_media {
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

export interface ProductVariant_product_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ProductVariant_product_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface ProductVariant_product_channelListings_pricing_priceRange_start_net {
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

export interface ProductVariant_product_channelListings_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: ProductVariant_product_channelListings_pricing_priceRange_start_net;
}

export interface ProductVariant_product_channelListings_pricing_priceRange_stop_net {
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

export interface ProductVariant_product_channelListings_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: ProductVariant_product_channelListings_pricing_priceRange_stop_net;
}

export interface ProductVariant_product_channelListings_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductVariant_product_channelListings_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductVariant_product_channelListings_pricing_priceRange_stop | null;
}

export interface ProductVariant_product_channelListings_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The discounted price range of the product variants.
   */
  priceRange: ProductVariant_product_channelListings_pricing_priceRange | null;
}

export interface ProductVariant_product_channelListings {
  __typename: "ProductChannelListing";
  publicationDate: any | null;
  isPublished: boolean;
  channel: ProductVariant_product_channelListings_channel;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductVariant_product_channelListings_pricing | null;
}

export interface ProductVariant_product_variants_media {
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

export interface ProductVariant_product_variants {
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
  media: ProductVariant_product_variants_media[] | null;
}

export interface ProductVariant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  defaultVariant: ProductVariant_product_defaultVariant | null;
  /**
   * List of media for the product.
   */
  media: ProductVariant_product_media[] | null;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: ProductVariant_product_thumbnail | null;
  /**
   * List of availability in channels for the product.
   */
  channelListings: ProductVariant_product_channelListings[] | null;
  /**
   * List of variants for the product.
   */
  variants: (ProductVariant_product_variants | null)[] | null;
}

export interface ProductVariant_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface ProductVariant_channelListings_price {
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

export interface ProductVariant_channelListings_costPrice {
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

export interface ProductVariant_channelListings {
  __typename: "ProductVariantChannelListing";
  channel: ProductVariant_channelListings_channel;
  price: ProductVariant_channelListings_price | null;
  /**
   * Cost price of the variant.
   */
  costPrice: ProductVariant_channelListings_costPrice | null;
}

export interface ProductVariant_stocks_warehouse {
  __typename: "Warehouse";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface ProductVariant_stocks {
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
  warehouse: ProductVariant_stocks_warehouse;
}

export interface ProductVariant_weight {
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

export interface ProductVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ProductVariant_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (ProductVariant_privateMetadata | null)[];
  /**
   * List of attributes assigned to this variant.
   */
  selectionAttributes: ProductVariant_selectionAttributes[];
  /**
   * List of attributes assigned to this variant.
   */
  nonSelectionAttributes: ProductVariant_nonSelectionAttributes[];
  /**
   * List of media for the product variant.
   */
  media: ProductVariant_media[] | null;
  name: string;
  product: ProductVariant_product;
  /**
   * List of price information in channels for the product.
   */
  channelListings: ProductVariant_channelListings[] | null;
  sku: string;
  /**
   * Stocks for the product variant.
   */
  stocks: (ProductVariant_stocks | null)[] | null;
  trackInventory: boolean;
  weight: ProductVariant_weight | null;
}
