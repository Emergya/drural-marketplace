/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductInput, ProductVariantInput, StockInput, ProductErrorCode, AttributeInputTypeEnum, AttributeEntityTypeEnum, MeasurementUnitsEnum, CompanyStatus, ProductAddressCountry, ProductMediaType, WeightUnitsEnum, StockErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: SimpleProductUpdate
// ====================================================

export interface SimpleProductUpdate_productUpdate_errors {
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

export interface SimpleProductUpdate_productUpdate_product_attributes_attribute_choices_pageInfo {
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

export interface SimpleProductUpdate_productUpdate_product_attributes_attribute_choices_edges_node_file {
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

export interface SimpleProductUpdate_productUpdate_product_attributes_attribute_choices_edges_node {
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
  file: SimpleProductUpdate_productUpdate_product_attributes_attribute_choices_edges_node_file | null;
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

export interface SimpleProductUpdate_productUpdate_product_attributes_attribute_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: SimpleProductUpdate_productUpdate_product_attributes_attribute_choices_edges_node;
}

export interface SimpleProductUpdate_productUpdate_product_attributes_attribute_choices {
  __typename: "AttributeValueCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: SimpleProductUpdate_productUpdate_product_attributes_attribute_choices_pageInfo;
  edges: SimpleProductUpdate_productUpdate_product_attributes_attribute_choices_edges[];
}

export interface SimpleProductUpdate_productUpdate_product_attributes_attribute {
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
  choices: SimpleProductUpdate_productUpdate_product_attributes_attribute_choices | null;
}

export interface SimpleProductUpdate_productUpdate_product_attributes_values_file {
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

export interface SimpleProductUpdate_productUpdate_product_attributes_values {
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
  file: SimpleProductUpdate_productUpdate_product_attributes_values_file | null;
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

export interface SimpleProductUpdate_productUpdate_product_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: SimpleProductUpdate_productUpdate_product_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (SimpleProductUpdate_productUpdate_product_attributes_values | null)[];
}

export interface SimpleProductUpdate_productUpdate_product_productType_variantAttributes_choices_pageInfo {
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

export interface SimpleProductUpdate_productUpdate_product_productType_variantAttributes_choices_edges_node_file {
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

export interface SimpleProductUpdate_productUpdate_product_productType_variantAttributes_choices_edges_node {
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
  file: SimpleProductUpdate_productUpdate_product_productType_variantAttributes_choices_edges_node_file | null;
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

export interface SimpleProductUpdate_productUpdate_product_productType_variantAttributes_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: SimpleProductUpdate_productUpdate_product_productType_variantAttributes_choices_edges_node;
}

export interface SimpleProductUpdate_productUpdate_product_productType_variantAttributes_choices {
  __typename: "AttributeValueCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: SimpleProductUpdate_productUpdate_product_productType_variantAttributes_choices_pageInfo;
  edges: SimpleProductUpdate_productUpdate_product_productType_variantAttributes_choices_edges[];
}

export interface SimpleProductUpdate_productUpdate_product_productType_variantAttributes {
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
  choices: SimpleProductUpdate_productUpdate_product_productType_variantAttributes_choices | null;
}

export interface SimpleProductUpdate_productUpdate_product_productType_taxType {
  __typename: "TaxType";
  /**
   * Description of the tax type.
   */
  description: string | null;
  /**
   * External tax code used to identify given tax group.
   */
  taxCode: string | null;
}

export interface SimpleProductUpdate_productUpdate_product_productType {
  __typename: "ProductType";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Variant attributes of that product type.
   */
  variantAttributes: (SimpleProductUpdate_productUpdate_product_productType_variantAttributes | null)[] | null;
  name: string;
  hasVariants: boolean;
  /**
   * A type of tax. Assigned by enabled tax gateway
   */
  taxType: SimpleProductUpdate_productUpdate_product_productType_taxType | null;
}

export interface SimpleProductUpdate_productUpdate_product_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface SimpleProductUpdate_productUpdate_product_channelListings_pricing_priceRange_start_net {
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

export interface SimpleProductUpdate_productUpdate_product_channelListings_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: SimpleProductUpdate_productUpdate_product_channelListings_pricing_priceRange_start_net;
}

export interface SimpleProductUpdate_productUpdate_product_channelListings_pricing_priceRange_stop_net {
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

export interface SimpleProductUpdate_productUpdate_product_channelListings_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: SimpleProductUpdate_productUpdate_product_channelListings_pricing_priceRange_stop_net;
}

export interface SimpleProductUpdate_productUpdate_product_channelListings_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: SimpleProductUpdate_productUpdate_product_channelListings_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: SimpleProductUpdate_productUpdate_product_channelListings_pricing_priceRange_stop | null;
}

export interface SimpleProductUpdate_productUpdate_product_channelListings_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The discounted price range of the product variants.
   */
  priceRange: SimpleProductUpdate_productUpdate_product_channelListings_pricing_priceRange | null;
}

export interface SimpleProductUpdate_productUpdate_product_channelListings {
  __typename: "ProductChannelListing";
  channel: SimpleProductUpdate_productUpdate_product_channelListings_channel;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: SimpleProductUpdate_productUpdate_product_channelListings_pricing | null;
  isPublished: boolean;
  publicationDate: any | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  availableForPurchase: any | null;
  visibleInListings: boolean;
}

export interface SimpleProductUpdate_productUpdate_product_metadata {
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

export interface SimpleProductUpdate_productUpdate_product_privateMetadata {
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

export interface SimpleProductUpdate_productUpdate_product_defaultVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface SimpleProductUpdate_productUpdate_product_company_publishedProducts {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface SimpleProductUpdate_productUpdate_product_company_stripeCredentials {
  __typename: "StripeCredentialsType";
  accountId: string | null;
  isEnabled: boolean;
}

export interface SimpleProductUpdate_productUpdate_product_company {
  __typename: "CompanyType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  status: CompanyStatus;
  isEnabled: boolean;
  publicName: string;
  imageUrl: string | null;
  /**
   * List of the shop's products.
   */
  publishedProducts: SimpleProductUpdate_productUpdate_product_company_publishedProducts | null;
  stripeCredentials: SimpleProductUpdate_productUpdate_product_company_stripeCredentials | null;
}

export interface SimpleProductUpdate_productUpdate_product_address {
  __typename: "ProductAddressType";
  street: string | null;
  streetSecondLine: string | null;
  postalCode: string | null;
  locality: string | null;
  region: string | null;
  country: ProductAddressCountry | null;
  /**
   * The ID of the object.
   */
  id: string;
  latitude: number | null;
  longitude: number | null;
}

export interface SimpleProductUpdate_productUpdate_product_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SimpleProductUpdate_productUpdate_product_categories_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SimpleProductUpdate_productUpdate_product_categories_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SimpleProductUpdate_productUpdate_product_categories_edges_node;
}

export interface SimpleProductUpdate_productUpdate_product_categories {
  __typename: "CategoryCountableConnection";
  edges: SimpleProductUpdate_productUpdate_product_categories_edges[];
}

export interface SimpleProductUpdate_productUpdate_product_collections {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SimpleProductUpdate_productUpdate_product_media {
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

export interface SimpleProductUpdate_productUpdate_product_paymentMethods {
  __typename: "PaymentMethod";
  /**
   * The ID of the object.
   */
  id: string;
  identifier: string;
  name: string;
  isActive: boolean;
}

export interface SimpleProductUpdate_productUpdate_product_bookableResources_edges_node {
  __typename: "BookableResource";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface SimpleProductUpdate_productUpdate_product_bookableResources_edges {
  __typename: "BookableResourceCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SimpleProductUpdate_productUpdate_product_bookableResources_edges_node;
}

export interface SimpleProductUpdate_productUpdate_product_bookableResources {
  __typename: "BookableResourceCountableConnection";
  edges: SimpleProductUpdate_productUpdate_product_bookableResources_edges[];
}

export interface SimpleProductUpdate_productUpdate_product_keywords_edges_node {
  __typename: "Keywords";
  /**
   * The ID of the object.
   */
  id: string;
  nameKeyword: string | null;
}

export interface SimpleProductUpdate_productUpdate_product_keywords_edges {
  __typename: "KeywordsEdge";
  /**
   * The item at the end of the edge
   */
  node: SimpleProductUpdate_productUpdate_product_keywords_edges_node | null;
}

export interface SimpleProductUpdate_productUpdate_product_keywords {
  __typename: "KeywordsConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (SimpleProductUpdate_productUpdate_product_keywords_edges | null)[];
}

export interface SimpleProductUpdate_productUpdate_product_purchaseEmail {
  __typename: "PurchaseEmail";
  /**
   * Subject of the custom email template.
   */
  subject: string;
  /**
   * Title of the custom email template.
   */
  title: string;
  /**
   * Body of the custom email template.
   */
  content: string;
}

export interface SimpleProductUpdate_productUpdate_product_variants_media {
  __typename: "ProductMedia";
  /**
   * The URL of the media.
   */
  url: string;
}

export interface SimpleProductUpdate_productUpdate_product_variants_stocks_warehouse {
  __typename: "Warehouse";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SimpleProductUpdate_productUpdate_product_variants_stocks {
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
  warehouse: SimpleProductUpdate_productUpdate_product_variants_stocks_warehouse;
}

export interface SimpleProductUpdate_productUpdate_product_variants_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface SimpleProductUpdate_productUpdate_product_variants_channelListings_price {
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

export interface SimpleProductUpdate_productUpdate_product_variants_channelListings_costPrice {
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

export interface SimpleProductUpdate_productUpdate_product_variants_channelListings {
  __typename: "ProductVariantChannelListing";
  channel: SimpleProductUpdate_productUpdate_product_variants_channelListings_channel;
  price: SimpleProductUpdate_productUpdate_product_variants_channelListings_price | null;
  /**
   * Cost price of the variant.
   */
  costPrice: SimpleProductUpdate_productUpdate_product_variants_channelListings_costPrice | null;
}

export interface SimpleProductUpdate_productUpdate_product_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Gross margin percentage value.
   */
  margin: number | null;
  /**
   * List of media for the product variant.
   */
  media: SimpleProductUpdate_productUpdate_product_variants_media[] | null;
  /**
   * Stocks for the product variant.
   */
  stocks: (SimpleProductUpdate_productUpdate_product_variants_stocks | null)[] | null;
  trackInventory: boolean;
  /**
   * List of price information in channels for the product.
   */
  channelListings: SimpleProductUpdate_productUpdate_product_variants_channelListings[] | null;
}

export interface SimpleProductUpdate_productUpdate_product_weight {
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

export interface SimpleProductUpdate_productUpdate_product_taxType {
  __typename: "TaxType";
  /**
   * Description of the tax type.
   */
  description: string | null;
  /**
   * External tax code used to identify given tax group.
   */
  taxCode: string | null;
}

export interface SimpleProductUpdate_productUpdate_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of attributes assigned to this product.
   */
  attributes: SimpleProductUpdate_productUpdate_product_attributes[];
  productType: SimpleProductUpdate_productUpdate_product_productType;
  /**
   * List of availability in channels for the product.
   */
  channelListings: SimpleProductUpdate_productUpdate_product_channelListings[] | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (SimpleProductUpdate_productUpdate_product_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (SimpleProductUpdate_productUpdate_product_privateMetadata | null)[];
  name: string;
  slug: string;
  description: any | null;
  details: any | null;
  hasNoPrice: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  rating: number;
  url: string | null;
  defaultVariant: SimpleProductUpdate_productUpdate_product_defaultVariant | null;
  company: SimpleProductUpdate_productUpdate_product_company;
  address: SimpleProductUpdate_productUpdate_product_address | null;
  category: SimpleProductUpdate_productUpdate_product_category | null;
  categories: SimpleProductUpdate_productUpdate_product_categories;
  /**
   * List of collections for the product.
   */
  collections: (SimpleProductUpdate_productUpdate_product_collections | null)[] | null;
  chargeTaxes: boolean;
  /**
   * List of media for the product.
   */
  media: SimpleProductUpdate_productUpdate_product_media[] | null;
  /**
   * Whether the product is in stock and visible or not.
   */
  isAvailable: boolean | null;
  isBillable: boolean;
  isBookable: boolean;
  /**
   * List of payment method allowed.
   */
  paymentMethods: (SimpleProductUpdate_productUpdate_product_paymentMethods | null)[] | null;
  duration: number | null;
  /**
   * List of the bookable resouces.
   */
  bookableResources: SimpleProductUpdate_productUpdate_product_bookableResources | null;
  keywords: SimpleProductUpdate_productUpdate_product_keywords;
  purchaseEmail: SimpleProductUpdate_productUpdate_product_purchaseEmail | null;
  /**
   * List of variants for the product.
   */
  variants: (SimpleProductUpdate_productUpdate_product_variants | null)[] | null;
  weight: SimpleProductUpdate_productUpdate_product_weight | null;
  /**
   * A type of tax. Assigned by enabled tax gateway
   */
  taxType: SimpleProductUpdate_productUpdate_product_taxType | null;
}

export interface SimpleProductUpdate_productUpdate {
  __typename: "ProductUpdate";
  errors: SimpleProductUpdate_productUpdate_errors[];
  product: SimpleProductUpdate_productUpdate_product | null;
}

export interface SimpleProductUpdate_productVariantUpdate_errors {
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

export interface SimpleProductUpdate_productVariantUpdate_productVariant_metadata {
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

export interface SimpleProductUpdate_productVariantUpdate_productVariant_privateMetadata {
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

export interface SimpleProductUpdate_productVariantUpdate_productVariant_selectionAttributes_attribute_choices_pageInfo {
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

export interface SimpleProductUpdate_productVariantUpdate_productVariant_selectionAttributes_attribute_choices_edges_node_file {
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

export interface SimpleProductUpdate_productVariantUpdate_productVariant_selectionAttributes_attribute_choices_edges_node {
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
  file: SimpleProductUpdate_productVariantUpdate_productVariant_selectionAttributes_attribute_choices_edges_node_file | null;
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

export interface SimpleProductUpdate_productVariantUpdate_productVariant_selectionAttributes_attribute_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: SimpleProductUpdate_productVariantUpdate_productVariant_selectionAttributes_attribute_choices_edges_node;
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_selectionAttributes_attribute_choices {
  __typename: "AttributeValueCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: SimpleProductUpdate_productVariantUpdate_productVariant_selectionAttributes_attribute_choices_pageInfo;
  edges: SimpleProductUpdate_productVariantUpdate_productVariant_selectionAttributes_attribute_choices_edges[];
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_selectionAttributes_attribute {
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
  choices: SimpleProductUpdate_productVariantUpdate_productVariant_selectionAttributes_attribute_choices | null;
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_selectionAttributes_values_file {
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

export interface SimpleProductUpdate_productVariantUpdate_productVariant_selectionAttributes_values {
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
  file: SimpleProductUpdate_productVariantUpdate_productVariant_selectionAttributes_values_file | null;
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

export interface SimpleProductUpdate_productVariantUpdate_productVariant_selectionAttributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: SimpleProductUpdate_productVariantUpdate_productVariant_selectionAttributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (SimpleProductUpdate_productVariantUpdate_productVariant_selectionAttributes_values | null)[];
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_attribute_choices_pageInfo {
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

export interface SimpleProductUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_attribute_choices_edges_node_file {
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

export interface SimpleProductUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_attribute_choices_edges_node {
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
  file: SimpleProductUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_attribute_choices_edges_node_file | null;
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

export interface SimpleProductUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_attribute_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: SimpleProductUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_attribute_choices_edges_node;
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_attribute_choices {
  __typename: "AttributeValueCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: SimpleProductUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_attribute_choices_pageInfo;
  edges: SimpleProductUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_attribute_choices_edges[];
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_attribute {
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
  choices: SimpleProductUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_attribute_choices | null;
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_values_file {
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

export interface SimpleProductUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_values {
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
  file: SimpleProductUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_values_file | null;
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

export interface SimpleProductUpdate_productVariantUpdate_productVariant_nonSelectionAttributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: SimpleProductUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (SimpleProductUpdate_productVariantUpdate_productVariant_nonSelectionAttributes_values | null)[];
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_media {
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

export interface SimpleProductUpdate_productVariantUpdate_productVariant_product_defaultVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_product_media {
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

export interface SimpleProductUpdate_productVariantUpdate_productVariant_product_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_product_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_product_channelListings_pricing_priceRange_start_net {
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

export interface SimpleProductUpdate_productVariantUpdate_productVariant_product_channelListings_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: SimpleProductUpdate_productVariantUpdate_productVariant_product_channelListings_pricing_priceRange_start_net;
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_product_channelListings_pricing_priceRange_stop_net {
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

export interface SimpleProductUpdate_productVariantUpdate_productVariant_product_channelListings_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: SimpleProductUpdate_productVariantUpdate_productVariant_product_channelListings_pricing_priceRange_stop_net;
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_product_channelListings_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: SimpleProductUpdate_productVariantUpdate_productVariant_product_channelListings_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: SimpleProductUpdate_productVariantUpdate_productVariant_product_channelListings_pricing_priceRange_stop | null;
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_product_channelListings_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The discounted price range of the product variants.
   */
  priceRange: SimpleProductUpdate_productVariantUpdate_productVariant_product_channelListings_pricing_priceRange | null;
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_product_channelListings {
  __typename: "ProductChannelListing";
  publicationDate: any | null;
  isPublished: boolean;
  channel: SimpleProductUpdate_productVariantUpdate_productVariant_product_channelListings_channel;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: SimpleProductUpdate_productVariantUpdate_productVariant_product_channelListings_pricing | null;
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_product_variants_media {
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

export interface SimpleProductUpdate_productVariantUpdate_productVariant_product_variants {
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
  media: SimpleProductUpdate_productVariantUpdate_productVariant_product_variants_media[] | null;
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  defaultVariant: SimpleProductUpdate_productVariantUpdate_productVariant_product_defaultVariant | null;
  /**
   * List of media for the product.
   */
  media: SimpleProductUpdate_productVariantUpdate_productVariant_product_media[] | null;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: SimpleProductUpdate_productVariantUpdate_productVariant_product_thumbnail | null;
  /**
   * List of availability in channels for the product.
   */
  channelListings: SimpleProductUpdate_productVariantUpdate_productVariant_product_channelListings[] | null;
  /**
   * List of variants for the product.
   */
  variants: (SimpleProductUpdate_productVariantUpdate_productVariant_product_variants | null)[] | null;
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_channelListings_price {
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

export interface SimpleProductUpdate_productVariantUpdate_productVariant_channelListings_costPrice {
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

export interface SimpleProductUpdate_productVariantUpdate_productVariant_channelListings {
  __typename: "ProductVariantChannelListing";
  channel: SimpleProductUpdate_productVariantUpdate_productVariant_channelListings_channel;
  price: SimpleProductUpdate_productVariantUpdate_productVariant_channelListings_price | null;
  /**
   * Cost price of the variant.
   */
  costPrice: SimpleProductUpdate_productVariantUpdate_productVariant_channelListings_costPrice | null;
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_stocks_warehouse {
  __typename: "Warehouse";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_stocks {
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
  warehouse: SimpleProductUpdate_productVariantUpdate_productVariant_stocks_warehouse;
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_weight {
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

export interface SimpleProductUpdate_productVariantUpdate_productVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (SimpleProductUpdate_productVariantUpdate_productVariant_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (SimpleProductUpdate_productVariantUpdate_productVariant_privateMetadata | null)[];
  /**
   * List of attributes assigned to this variant.
   */
  selectionAttributes: SimpleProductUpdate_productVariantUpdate_productVariant_selectionAttributes[];
  /**
   * List of attributes assigned to this variant.
   */
  nonSelectionAttributes: SimpleProductUpdate_productVariantUpdate_productVariant_nonSelectionAttributes[];
  /**
   * List of media for the product variant.
   */
  media: SimpleProductUpdate_productVariantUpdate_productVariant_media[] | null;
  name: string;
  product: SimpleProductUpdate_productVariantUpdate_productVariant_product;
  /**
   * List of price information in channels for the product.
   */
  channelListings: SimpleProductUpdate_productVariantUpdate_productVariant_channelListings[] | null;
  sku: string;
  /**
   * Stocks for the product variant.
   */
  stocks: (SimpleProductUpdate_productVariantUpdate_productVariant_stocks | null)[] | null;
  trackInventory: boolean;
  weight: SimpleProductUpdate_productVariantUpdate_productVariant_weight | null;
}

export interface SimpleProductUpdate_productVariantUpdate {
  __typename: "ProductVariantUpdate";
  errors: SimpleProductUpdate_productVariantUpdate_errors[];
  productVariant: SimpleProductUpdate_productVariantUpdate_productVariant | null;
}

export interface SimpleProductUpdate_productVariantStocksCreate_errors {
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

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_metadata {
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

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_privateMetadata {
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

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_selectionAttributes_attribute_choices_pageInfo {
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

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_selectionAttributes_attribute_choices_edges_node_file {
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

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_selectionAttributes_attribute_choices_edges_node {
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
  file: SimpleProductUpdate_productVariantStocksCreate_productVariant_selectionAttributes_attribute_choices_edges_node_file | null;
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

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_selectionAttributes_attribute_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: SimpleProductUpdate_productVariantStocksCreate_productVariant_selectionAttributes_attribute_choices_edges_node;
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_selectionAttributes_attribute_choices {
  __typename: "AttributeValueCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: SimpleProductUpdate_productVariantStocksCreate_productVariant_selectionAttributes_attribute_choices_pageInfo;
  edges: SimpleProductUpdate_productVariantStocksCreate_productVariant_selectionAttributes_attribute_choices_edges[];
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_selectionAttributes_attribute {
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
  choices: SimpleProductUpdate_productVariantStocksCreate_productVariant_selectionAttributes_attribute_choices | null;
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_selectionAttributes_values_file {
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

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_selectionAttributes_values {
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
  file: SimpleProductUpdate_productVariantStocksCreate_productVariant_selectionAttributes_values_file | null;
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

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_selectionAttributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: SimpleProductUpdate_productVariantStocksCreate_productVariant_selectionAttributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (SimpleProductUpdate_productVariantStocksCreate_productVariant_selectionAttributes_values | null)[];
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_nonSelectionAttributes_attribute_choices_pageInfo {
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

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_nonSelectionAttributes_attribute_choices_edges_node_file {
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

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_nonSelectionAttributes_attribute_choices_edges_node {
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
  file: SimpleProductUpdate_productVariantStocksCreate_productVariant_nonSelectionAttributes_attribute_choices_edges_node_file | null;
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

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_nonSelectionAttributes_attribute_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: SimpleProductUpdate_productVariantStocksCreate_productVariant_nonSelectionAttributes_attribute_choices_edges_node;
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_nonSelectionAttributes_attribute_choices {
  __typename: "AttributeValueCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: SimpleProductUpdate_productVariantStocksCreate_productVariant_nonSelectionAttributes_attribute_choices_pageInfo;
  edges: SimpleProductUpdate_productVariantStocksCreate_productVariant_nonSelectionAttributes_attribute_choices_edges[];
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_nonSelectionAttributes_attribute {
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
  choices: SimpleProductUpdate_productVariantStocksCreate_productVariant_nonSelectionAttributes_attribute_choices | null;
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_nonSelectionAttributes_values_file {
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

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_nonSelectionAttributes_values {
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
  file: SimpleProductUpdate_productVariantStocksCreate_productVariant_nonSelectionAttributes_values_file | null;
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

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_nonSelectionAttributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: SimpleProductUpdate_productVariantStocksCreate_productVariant_nonSelectionAttributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (SimpleProductUpdate_productVariantStocksCreate_productVariant_nonSelectionAttributes_values | null)[];
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_media {
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

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_product_defaultVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_product_media {
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

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_product_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_product_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_product_channelListings_pricing_priceRange_start_net {
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

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_product_channelListings_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: SimpleProductUpdate_productVariantStocksCreate_productVariant_product_channelListings_pricing_priceRange_start_net;
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_product_channelListings_pricing_priceRange_stop_net {
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

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_product_channelListings_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: SimpleProductUpdate_productVariantStocksCreate_productVariant_product_channelListings_pricing_priceRange_stop_net;
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_product_channelListings_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: SimpleProductUpdate_productVariantStocksCreate_productVariant_product_channelListings_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: SimpleProductUpdate_productVariantStocksCreate_productVariant_product_channelListings_pricing_priceRange_stop | null;
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_product_channelListings_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The discounted price range of the product variants.
   */
  priceRange: SimpleProductUpdate_productVariantStocksCreate_productVariant_product_channelListings_pricing_priceRange | null;
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_product_channelListings {
  __typename: "ProductChannelListing";
  publicationDate: any | null;
  isPublished: boolean;
  channel: SimpleProductUpdate_productVariantStocksCreate_productVariant_product_channelListings_channel;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: SimpleProductUpdate_productVariantStocksCreate_productVariant_product_channelListings_pricing | null;
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_product_variants_media {
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

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_product_variants {
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
  media: SimpleProductUpdate_productVariantStocksCreate_productVariant_product_variants_media[] | null;
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  defaultVariant: SimpleProductUpdate_productVariantStocksCreate_productVariant_product_defaultVariant | null;
  /**
   * List of media for the product.
   */
  media: SimpleProductUpdate_productVariantStocksCreate_productVariant_product_media[] | null;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: SimpleProductUpdate_productVariantStocksCreate_productVariant_product_thumbnail | null;
  /**
   * List of availability in channels for the product.
   */
  channelListings: SimpleProductUpdate_productVariantStocksCreate_productVariant_product_channelListings[] | null;
  /**
   * List of variants for the product.
   */
  variants: (SimpleProductUpdate_productVariantStocksCreate_productVariant_product_variants | null)[] | null;
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_channelListings_price {
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

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_channelListings_costPrice {
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

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_channelListings {
  __typename: "ProductVariantChannelListing";
  channel: SimpleProductUpdate_productVariantStocksCreate_productVariant_channelListings_channel;
  price: SimpleProductUpdate_productVariantStocksCreate_productVariant_channelListings_price | null;
  /**
   * Cost price of the variant.
   */
  costPrice: SimpleProductUpdate_productVariantStocksCreate_productVariant_channelListings_costPrice | null;
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_stocks_warehouse {
  __typename: "Warehouse";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_stocks {
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
  warehouse: SimpleProductUpdate_productVariantStocksCreate_productVariant_stocks_warehouse;
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_weight {
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

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (SimpleProductUpdate_productVariantStocksCreate_productVariant_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (SimpleProductUpdate_productVariantStocksCreate_productVariant_privateMetadata | null)[];
  /**
   * List of attributes assigned to this variant.
   */
  selectionAttributes: SimpleProductUpdate_productVariantStocksCreate_productVariant_selectionAttributes[];
  /**
   * List of attributes assigned to this variant.
   */
  nonSelectionAttributes: SimpleProductUpdate_productVariantStocksCreate_productVariant_nonSelectionAttributes[];
  /**
   * List of media for the product variant.
   */
  media: SimpleProductUpdate_productVariantStocksCreate_productVariant_media[] | null;
  name: string;
  product: SimpleProductUpdate_productVariantStocksCreate_productVariant_product;
  /**
   * List of price information in channels for the product.
   */
  channelListings: SimpleProductUpdate_productVariantStocksCreate_productVariant_channelListings[] | null;
  sku: string;
  /**
   * Stocks for the product variant.
   */
  stocks: (SimpleProductUpdate_productVariantStocksCreate_productVariant_stocks | null)[] | null;
  trackInventory: boolean;
  weight: SimpleProductUpdate_productVariantStocksCreate_productVariant_weight | null;
}

export interface SimpleProductUpdate_productVariantStocksCreate {
  __typename: "ProductVariantStocksCreate";
  errors: SimpleProductUpdate_productVariantStocksCreate_errors[];
  /**
   * Updated product variant.
   */
  productVariant: SimpleProductUpdate_productVariantStocksCreate_productVariant | null;
}

export interface SimpleProductUpdate_productVariantStocksDelete_errors {
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

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_metadata {
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

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_privateMetadata {
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

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_selectionAttributes_attribute_choices_pageInfo {
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

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_selectionAttributes_attribute_choices_edges_node_file {
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

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_selectionAttributes_attribute_choices_edges_node {
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
  file: SimpleProductUpdate_productVariantStocksDelete_productVariant_selectionAttributes_attribute_choices_edges_node_file | null;
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

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_selectionAttributes_attribute_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: SimpleProductUpdate_productVariantStocksDelete_productVariant_selectionAttributes_attribute_choices_edges_node;
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_selectionAttributes_attribute_choices {
  __typename: "AttributeValueCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: SimpleProductUpdate_productVariantStocksDelete_productVariant_selectionAttributes_attribute_choices_pageInfo;
  edges: SimpleProductUpdate_productVariantStocksDelete_productVariant_selectionAttributes_attribute_choices_edges[];
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_selectionAttributes_attribute {
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
  choices: SimpleProductUpdate_productVariantStocksDelete_productVariant_selectionAttributes_attribute_choices | null;
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_selectionAttributes_values_file {
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

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_selectionAttributes_values {
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
  file: SimpleProductUpdate_productVariantStocksDelete_productVariant_selectionAttributes_values_file | null;
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

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_selectionAttributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: SimpleProductUpdate_productVariantStocksDelete_productVariant_selectionAttributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (SimpleProductUpdate_productVariantStocksDelete_productVariant_selectionAttributes_values | null)[];
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_nonSelectionAttributes_attribute_choices_pageInfo {
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

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_nonSelectionAttributes_attribute_choices_edges_node_file {
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

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_nonSelectionAttributes_attribute_choices_edges_node {
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
  file: SimpleProductUpdate_productVariantStocksDelete_productVariant_nonSelectionAttributes_attribute_choices_edges_node_file | null;
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

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_nonSelectionAttributes_attribute_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: SimpleProductUpdate_productVariantStocksDelete_productVariant_nonSelectionAttributes_attribute_choices_edges_node;
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_nonSelectionAttributes_attribute_choices {
  __typename: "AttributeValueCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: SimpleProductUpdate_productVariantStocksDelete_productVariant_nonSelectionAttributes_attribute_choices_pageInfo;
  edges: SimpleProductUpdate_productVariantStocksDelete_productVariant_nonSelectionAttributes_attribute_choices_edges[];
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_nonSelectionAttributes_attribute {
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
  choices: SimpleProductUpdate_productVariantStocksDelete_productVariant_nonSelectionAttributes_attribute_choices | null;
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_nonSelectionAttributes_values_file {
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

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_nonSelectionAttributes_values {
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
  file: SimpleProductUpdate_productVariantStocksDelete_productVariant_nonSelectionAttributes_values_file | null;
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

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_nonSelectionAttributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: SimpleProductUpdate_productVariantStocksDelete_productVariant_nonSelectionAttributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (SimpleProductUpdate_productVariantStocksDelete_productVariant_nonSelectionAttributes_values | null)[];
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_media {
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

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_product_defaultVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_product_media {
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

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_product_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_product_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_product_channelListings_pricing_priceRange_start_net {
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

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_product_channelListings_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: SimpleProductUpdate_productVariantStocksDelete_productVariant_product_channelListings_pricing_priceRange_start_net;
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_product_channelListings_pricing_priceRange_stop_net {
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

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_product_channelListings_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: SimpleProductUpdate_productVariantStocksDelete_productVariant_product_channelListings_pricing_priceRange_stop_net;
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_product_channelListings_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: SimpleProductUpdate_productVariantStocksDelete_productVariant_product_channelListings_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: SimpleProductUpdate_productVariantStocksDelete_productVariant_product_channelListings_pricing_priceRange_stop | null;
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_product_channelListings_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The discounted price range of the product variants.
   */
  priceRange: SimpleProductUpdate_productVariantStocksDelete_productVariant_product_channelListings_pricing_priceRange | null;
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_product_channelListings {
  __typename: "ProductChannelListing";
  publicationDate: any | null;
  isPublished: boolean;
  channel: SimpleProductUpdate_productVariantStocksDelete_productVariant_product_channelListings_channel;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: SimpleProductUpdate_productVariantStocksDelete_productVariant_product_channelListings_pricing | null;
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_product_variants_media {
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

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_product_variants {
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
  media: SimpleProductUpdate_productVariantStocksDelete_productVariant_product_variants_media[] | null;
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  defaultVariant: SimpleProductUpdate_productVariantStocksDelete_productVariant_product_defaultVariant | null;
  /**
   * List of media for the product.
   */
  media: SimpleProductUpdate_productVariantStocksDelete_productVariant_product_media[] | null;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: SimpleProductUpdate_productVariantStocksDelete_productVariant_product_thumbnail | null;
  /**
   * List of availability in channels for the product.
   */
  channelListings: SimpleProductUpdate_productVariantStocksDelete_productVariant_product_channelListings[] | null;
  /**
   * List of variants for the product.
   */
  variants: (SimpleProductUpdate_productVariantStocksDelete_productVariant_product_variants | null)[] | null;
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_channelListings_price {
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

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_channelListings_costPrice {
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

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_channelListings {
  __typename: "ProductVariantChannelListing";
  channel: SimpleProductUpdate_productVariantStocksDelete_productVariant_channelListings_channel;
  price: SimpleProductUpdate_productVariantStocksDelete_productVariant_channelListings_price | null;
  /**
   * Cost price of the variant.
   */
  costPrice: SimpleProductUpdate_productVariantStocksDelete_productVariant_channelListings_costPrice | null;
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_stocks_warehouse {
  __typename: "Warehouse";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_stocks {
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
  warehouse: SimpleProductUpdate_productVariantStocksDelete_productVariant_stocks_warehouse;
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_weight {
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

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (SimpleProductUpdate_productVariantStocksDelete_productVariant_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (SimpleProductUpdate_productVariantStocksDelete_productVariant_privateMetadata | null)[];
  /**
   * List of attributes assigned to this variant.
   */
  selectionAttributes: SimpleProductUpdate_productVariantStocksDelete_productVariant_selectionAttributes[];
  /**
   * List of attributes assigned to this variant.
   */
  nonSelectionAttributes: SimpleProductUpdate_productVariantStocksDelete_productVariant_nonSelectionAttributes[];
  /**
   * List of media for the product variant.
   */
  media: SimpleProductUpdate_productVariantStocksDelete_productVariant_media[] | null;
  name: string;
  product: SimpleProductUpdate_productVariantStocksDelete_productVariant_product;
  /**
   * List of price information in channels for the product.
   */
  channelListings: SimpleProductUpdate_productVariantStocksDelete_productVariant_channelListings[] | null;
  sku: string;
  /**
   * Stocks for the product variant.
   */
  stocks: (SimpleProductUpdate_productVariantStocksDelete_productVariant_stocks | null)[] | null;
  trackInventory: boolean;
  weight: SimpleProductUpdate_productVariantStocksDelete_productVariant_weight | null;
}

export interface SimpleProductUpdate_productVariantStocksDelete {
  __typename: "ProductVariantStocksDelete";
  errors: SimpleProductUpdate_productVariantStocksDelete_errors[];
  /**
   * Updated product variant.
   */
  productVariant: SimpleProductUpdate_productVariantStocksDelete_productVariant | null;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_errors {
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

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_metadata {
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

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_privateMetadata {
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

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_attribute_choices_pageInfo {
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

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_attribute_choices_edges_node_file {
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

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_attribute_choices_edges_node {
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
  file: SimpleProductUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_attribute_choices_edges_node_file | null;
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

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_attribute_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: SimpleProductUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_attribute_choices_edges_node;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_attribute_choices {
  __typename: "AttributeValueCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: SimpleProductUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_attribute_choices_pageInfo;
  edges: SimpleProductUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_attribute_choices_edges[];
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_attribute {
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
  choices: SimpleProductUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_attribute_choices | null;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_values_file {
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

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_values {
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
  file: SimpleProductUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_values_file | null;
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

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_selectionAttributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: SimpleProductUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (SimpleProductUpdate_productVariantStocksUpdate_productVariant_selectionAttributes_values | null)[];
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_attribute_choices_pageInfo {
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

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_attribute_choices_edges_node_file {
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

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_attribute_choices_edges_node {
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
  file: SimpleProductUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_attribute_choices_edges_node_file | null;
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

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_attribute_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: SimpleProductUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_attribute_choices_edges_node;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_attribute_choices {
  __typename: "AttributeValueCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: SimpleProductUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_attribute_choices_pageInfo;
  edges: SimpleProductUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_attribute_choices_edges[];
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_attribute {
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
  choices: SimpleProductUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_attribute_choices | null;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_values_file {
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

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_values {
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
  file: SimpleProductUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_values_file | null;
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

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: SimpleProductUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (SimpleProductUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes_values | null)[];
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_media {
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

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_defaultVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_media {
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

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_channelListings_pricing_priceRange_start_net {
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

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_channelListings_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_channelListings_pricing_priceRange_start_net;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_channelListings_pricing_priceRange_stop_net {
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

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_channelListings_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_channelListings_pricing_priceRange_stop_net;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_channelListings_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_channelListings_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_channelListings_pricing_priceRange_stop | null;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_channelListings_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The discounted price range of the product variants.
   */
  priceRange: SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_channelListings_pricing_priceRange | null;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_channelListings {
  __typename: "ProductChannelListing";
  publicationDate: any | null;
  isPublished: boolean;
  channel: SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_channelListings_channel;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_channelListings_pricing | null;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_variants_media {
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

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_variants {
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
  media: SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_variants_media[] | null;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  defaultVariant: SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_defaultVariant | null;
  /**
   * List of media for the product.
   */
  media: SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_media[] | null;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_thumbnail | null;
  /**
   * List of availability in channels for the product.
   */
  channelListings: SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_channelListings[] | null;
  /**
   * List of variants for the product.
   */
  variants: (SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_variants | null)[] | null;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_channelListings_price {
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

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_channelListings_costPrice {
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

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_channelListings {
  __typename: "ProductVariantChannelListing";
  channel: SimpleProductUpdate_productVariantStocksUpdate_productVariant_channelListings_channel;
  price: SimpleProductUpdate_productVariantStocksUpdate_productVariant_channelListings_price | null;
  /**
   * Cost price of the variant.
   */
  costPrice: SimpleProductUpdate_productVariantStocksUpdate_productVariant_channelListings_costPrice | null;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_stocks_warehouse {
  __typename: "Warehouse";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_stocks {
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
  warehouse: SimpleProductUpdate_productVariantStocksUpdate_productVariant_stocks_warehouse;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_weight {
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

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (SimpleProductUpdate_productVariantStocksUpdate_productVariant_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (SimpleProductUpdate_productVariantStocksUpdate_productVariant_privateMetadata | null)[];
  /**
   * List of attributes assigned to this variant.
   */
  selectionAttributes: SimpleProductUpdate_productVariantStocksUpdate_productVariant_selectionAttributes[];
  /**
   * List of attributes assigned to this variant.
   */
  nonSelectionAttributes: SimpleProductUpdate_productVariantStocksUpdate_productVariant_nonSelectionAttributes[];
  /**
   * List of media for the product variant.
   */
  media: SimpleProductUpdate_productVariantStocksUpdate_productVariant_media[] | null;
  name: string;
  product: SimpleProductUpdate_productVariantStocksUpdate_productVariant_product;
  /**
   * List of price information in channels for the product.
   */
  channelListings: SimpleProductUpdate_productVariantStocksUpdate_productVariant_channelListings[] | null;
  sku: string;
  /**
   * Stocks for the product variant.
   */
  stocks: (SimpleProductUpdate_productVariantStocksUpdate_productVariant_stocks | null)[] | null;
  trackInventory: boolean;
  weight: SimpleProductUpdate_productVariantStocksUpdate_productVariant_weight | null;
}

export interface SimpleProductUpdate_productVariantStocksUpdate {
  __typename: "ProductVariantStocksUpdate";
  errors: SimpleProductUpdate_productVariantStocksUpdate_errors[];
  /**
   * Updated product variant.
   */
  productVariant: SimpleProductUpdate_productVariantStocksUpdate_productVariant | null;
}

export interface SimpleProductUpdate {
  /**
   * Updates an existing product.
   */
  productUpdate: SimpleProductUpdate_productUpdate | null;
  /**
   * Updates an existing variant for product.
   */
  productVariantUpdate: SimpleProductUpdate_productVariantUpdate | null;
  /**
   * Creates stocks for product variant.
   */
  productVariantStocksCreate: SimpleProductUpdate_productVariantStocksCreate | null;
  /**
   * Delete stocks from product variant.
   */
  productVariantStocksDelete: SimpleProductUpdate_productVariantStocksDelete | null;
  /**
   * Update stocks for product variant.
   */
  productVariantStocksUpdate: SimpleProductUpdate_productVariantStocksUpdate | null;
}

export interface SimpleProductUpdateVariables {
  id: string;
  input: ProductInput;
  productVariantId: string;
  productVariantInput: ProductVariantInput;
  addStocks: StockInput[];
  deleteStocks: string[];
  updateStocks: StockInput[];
  firstValues?: number | null;
  afterValues?: string | null;
  lastValues?: number | null;
  beforeValues?: string | null;
  channel?: string | null;
}
