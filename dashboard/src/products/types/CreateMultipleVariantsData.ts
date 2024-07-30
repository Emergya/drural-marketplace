/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AttributeInputTypeEnum, AttributeEntityTypeEnum, MeasurementUnitsEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: CreateMultipleVariantsData
// ====================================================

export interface CreateMultipleVariantsData_product_attributes_attribute_choices_pageInfo {
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

export interface CreateMultipleVariantsData_product_attributes_attribute_choices_edges_node_file {
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

export interface CreateMultipleVariantsData_product_attributes_attribute_choices_edges_node {
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
  file: CreateMultipleVariantsData_product_attributes_attribute_choices_edges_node_file | null;
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

export interface CreateMultipleVariantsData_product_attributes_attribute_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: CreateMultipleVariantsData_product_attributes_attribute_choices_edges_node;
}

export interface CreateMultipleVariantsData_product_attributes_attribute_choices {
  __typename: "AttributeValueCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: CreateMultipleVariantsData_product_attributes_attribute_choices_pageInfo;
  edges: CreateMultipleVariantsData_product_attributes_attribute_choices_edges[];
}

export interface CreateMultipleVariantsData_product_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
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
  choices: CreateMultipleVariantsData_product_attributes_attribute_choices | null;
}

export interface CreateMultipleVariantsData_product_attributes_values_file {
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

export interface CreateMultipleVariantsData_product_attributes_values {
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
  file: CreateMultipleVariantsData_product_attributes_values_file | null;
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

export interface CreateMultipleVariantsData_product_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: CreateMultipleVariantsData_product_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (CreateMultipleVariantsData_product_attributes_values | null)[];
}

export interface CreateMultipleVariantsData_product_productType_variantAttributes_choices_pageInfo {
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

export interface CreateMultipleVariantsData_product_productType_variantAttributes_choices_edges_node_file {
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

export interface CreateMultipleVariantsData_product_productType_variantAttributes_choices_edges_node {
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
  file: CreateMultipleVariantsData_product_productType_variantAttributes_choices_edges_node_file | null;
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

export interface CreateMultipleVariantsData_product_productType_variantAttributes_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: CreateMultipleVariantsData_product_productType_variantAttributes_choices_edges_node;
}

export interface CreateMultipleVariantsData_product_productType_variantAttributes_choices {
  __typename: "AttributeValueCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: CreateMultipleVariantsData_product_productType_variantAttributes_choices_pageInfo;
  edges: CreateMultipleVariantsData_product_productType_variantAttributes_choices_edges[];
}

export interface CreateMultipleVariantsData_product_productType_variantAttributes {
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
   * The input type to use for entering attribute values in the dashboard.
   */
  inputType: AttributeInputTypeEnum | null;
  /**
   * The unit of attribute values.
   */
  unit: MeasurementUnitsEnum | null;
  /**
   * List of attribute's values.
   */
  choices: CreateMultipleVariantsData_product_productType_variantAttributes_choices | null;
}

export interface CreateMultipleVariantsData_product_productType {
  __typename: "ProductType";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Variant attributes of that product type.
   */
  variantAttributes: (CreateMultipleVariantsData_product_productType_variantAttributes | null)[] | null;
}

export interface CreateMultipleVariantsData_product_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface CreateMultipleVariantsData_product_channelListings_pricing_priceRange_start_net {
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

export interface CreateMultipleVariantsData_product_channelListings_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: CreateMultipleVariantsData_product_channelListings_pricing_priceRange_start_net;
}

export interface CreateMultipleVariantsData_product_channelListings_pricing_priceRange_stop_net {
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

export interface CreateMultipleVariantsData_product_channelListings_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: CreateMultipleVariantsData_product_channelListings_pricing_priceRange_stop_net;
}

export interface CreateMultipleVariantsData_product_channelListings_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: CreateMultipleVariantsData_product_channelListings_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: CreateMultipleVariantsData_product_channelListings_pricing_priceRange_stop | null;
}

export interface CreateMultipleVariantsData_product_channelListings_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The discounted price range of the product variants.
   */
  priceRange: CreateMultipleVariantsData_product_channelListings_pricing_priceRange | null;
}

export interface CreateMultipleVariantsData_product_channelListings {
  __typename: "ProductChannelListing";
  channel: CreateMultipleVariantsData_product_channelListings_channel;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: CreateMultipleVariantsData_product_channelListings_pricing | null;
}

export interface CreateMultipleVariantsData_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of attributes assigned to this product.
   */
  attributes: CreateMultipleVariantsData_product_attributes[];
  productType: CreateMultipleVariantsData_product_productType;
  /**
   * List of availability in channels for the product.
   */
  channelListings: CreateMultipleVariantsData_product_channelListings[] | null;
}

export interface CreateMultipleVariantsData_warehouses_edges_node {
  __typename: "Warehouse";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface CreateMultipleVariantsData_warehouses_edges {
  __typename: "WarehouseCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CreateMultipleVariantsData_warehouses_edges_node;
}

export interface CreateMultipleVariantsData_warehouses {
  __typename: "WarehouseCountableConnection";
  edges: CreateMultipleVariantsData_warehouses_edges[];
}

export interface CreateMultipleVariantsData {
  /**
   * Look up a product by ID.
   */
  product: CreateMultipleVariantsData_product | null;
  /**
   * List of warehouses.
   */
  warehouses: CreateMultipleVariantsData_warehouses | null;
}

export interface CreateMultipleVariantsDataVariables {
  id: string;
  firstValues?: number | null;
  afterValues?: string | null;
  lastValues?: number | null;
  beforeValues?: string | null;
}
