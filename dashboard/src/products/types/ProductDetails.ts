/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AttributeInputTypeEnum, AttributeEntityTypeEnum, MeasurementUnitsEnum, CompanyStatus, ProductAddressCountry, ProductMediaType, WeightUnitsEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: ProductDetails
// ====================================================

export interface ProductDetails_product_attributes_attribute_choices_pageInfo {
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

export interface ProductDetails_product_attributes_attribute_choices_edges_node_file {
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

export interface ProductDetails_product_attributes_attribute_choices_edges_node {
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
  file: ProductDetails_product_attributes_attribute_choices_edges_node_file | null;
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

export interface ProductDetails_product_attributes_attribute_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: ProductDetails_product_attributes_attribute_choices_edges_node;
}

export interface ProductDetails_product_attributes_attribute_choices {
  __typename: "AttributeValueCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: ProductDetails_product_attributes_attribute_choices_pageInfo;
  edges: ProductDetails_product_attributes_attribute_choices_edges[];
}

export interface ProductDetails_product_attributes_attribute {
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
  choices: ProductDetails_product_attributes_attribute_choices | null;
}

export interface ProductDetails_product_attributes_values_file {
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

export interface ProductDetails_product_attributes_values {
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
  file: ProductDetails_product_attributes_values_file | null;
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

export interface ProductDetails_product_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductDetails_product_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductDetails_product_attributes_values | null)[];
}

export interface ProductDetails_product_productType_variantAttributes_choices_pageInfo {
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

export interface ProductDetails_product_productType_variantAttributes_choices_edges_node_file {
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

export interface ProductDetails_product_productType_variantAttributes_choices_edges_node {
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
  file: ProductDetails_product_productType_variantAttributes_choices_edges_node_file | null;
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

export interface ProductDetails_product_productType_variantAttributes_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: ProductDetails_product_productType_variantAttributes_choices_edges_node;
}

export interface ProductDetails_product_productType_variantAttributes_choices {
  __typename: "AttributeValueCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: ProductDetails_product_productType_variantAttributes_choices_pageInfo;
  edges: ProductDetails_product_productType_variantAttributes_choices_edges[];
}

export interface ProductDetails_product_productType_variantAttributes {
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
  choices: ProductDetails_product_productType_variantAttributes_choices | null;
}

export interface ProductDetails_product_productType_taxType {
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

export interface ProductDetails_product_productType {
  __typename: "ProductType";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Variant attributes of that product type.
   */
  variantAttributes: (ProductDetails_product_productType_variantAttributes | null)[] | null;
  name: string;
  hasVariants: boolean;
  /**
   * A type of tax. Assigned by enabled tax gateway
   */
  taxType: ProductDetails_product_productType_taxType | null;
}

export interface ProductDetails_product_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface ProductDetails_product_channelListings_pricing_priceRange_start_net {
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

export interface ProductDetails_product_channelListings_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: ProductDetails_product_channelListings_pricing_priceRange_start_net;
}

export interface ProductDetails_product_channelListings_pricing_priceRange_stop_net {
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

export interface ProductDetails_product_channelListings_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: ProductDetails_product_channelListings_pricing_priceRange_stop_net;
}

export interface ProductDetails_product_channelListings_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductDetails_product_channelListings_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductDetails_product_channelListings_pricing_priceRange_stop | null;
}

export interface ProductDetails_product_channelListings_pricing {
  __typename: "ProductPricingInfo";
  /**
   * The discounted price range of the product variants.
   */
  priceRange: ProductDetails_product_channelListings_pricing_priceRange | null;
}

export interface ProductDetails_product_channelListings {
  __typename: "ProductChannelListing";
  channel: ProductDetails_product_channelListings_channel;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: ProductDetails_product_channelListings_pricing | null;
  isPublished: boolean;
  publicationDate: any | null;
  /**
   * Whether the product is available for purchase.
   */
  isAvailableForPurchase: boolean | null;
  availableForPurchase: any | null;
  visibleInListings: boolean;
}

export interface ProductDetails_product_metadata {
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

export interface ProductDetails_product_privateMetadata {
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

export interface ProductDetails_product_defaultVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface ProductDetails_product_company_publishedProducts {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface ProductDetails_product_company_stripeCredentials {
  __typename: "StripeCredentialsType";
  accountId: string | null;
  isEnabled: boolean;
}

export interface ProductDetails_product_company {
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
  publishedProducts: ProductDetails_product_company_publishedProducts | null;
  stripeCredentials: ProductDetails_product_company_stripeCredentials | null;
}

export interface ProductDetails_product_address {
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

export interface ProductDetails_product_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface ProductDetails_product_categories_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface ProductDetails_product_categories_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductDetails_product_categories_edges_node;
}

export interface ProductDetails_product_categories {
  __typename: "CategoryCountableConnection";
  edges: ProductDetails_product_categories_edges[];
}

export interface ProductDetails_product_collections {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface ProductDetails_product_media {
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

export interface ProductDetails_product_paymentMethods {
  __typename: "PaymentMethod";
  /**
   * The ID of the object.
   */
  id: string;
  identifier: string;
  name: string;
  isActive: boolean;
}

export interface ProductDetails_product_bookableResources_edges_node {
  __typename: "BookableResource";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface ProductDetails_product_bookableResources_edges {
  __typename: "BookableResourceCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductDetails_product_bookableResources_edges_node;
}

export interface ProductDetails_product_bookableResources {
  __typename: "BookableResourceCountableConnection";
  edges: ProductDetails_product_bookableResources_edges[];
}

export interface ProductDetails_product_keywords_edges_node {
  __typename: "Keywords";
  /**
   * The ID of the object.
   */
  id: string;
  nameKeyword: string | null;
}

export interface ProductDetails_product_keywords_edges {
  __typename: "KeywordsEdge";
  /**
   * The item at the end of the edge
   */
  node: ProductDetails_product_keywords_edges_node | null;
}

export interface ProductDetails_product_keywords {
  __typename: "KeywordsConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (ProductDetails_product_keywords_edges | null)[];
}

export interface ProductDetails_product_purchaseEmail {
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

export interface ProductDetails_product_variants_media {
  __typename: "ProductMedia";
  /**
   * The URL of the media.
   */
  url: string;
}

export interface ProductDetails_product_variants_stocks_warehouse {
  __typename: "Warehouse";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface ProductDetails_product_variants_stocks {
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
  warehouse: ProductDetails_product_variants_stocks_warehouse;
}

export interface ProductDetails_product_variants_channelListings_channel {
  __typename: "Channel";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  currencyCode: string;
}

export interface ProductDetails_product_variants_channelListings_price {
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

export interface ProductDetails_product_variants_channelListings_costPrice {
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

export interface ProductDetails_product_variants_channelListings {
  __typename: "ProductVariantChannelListing";
  channel: ProductDetails_product_variants_channelListings_channel;
  price: ProductDetails_product_variants_channelListings_price | null;
  /**
   * Cost price of the variant.
   */
  costPrice: ProductDetails_product_variants_channelListings_costPrice | null;
}

export interface ProductDetails_product_variants {
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
  media: ProductDetails_product_variants_media[] | null;
  /**
   * Stocks for the product variant.
   */
  stocks: (ProductDetails_product_variants_stocks | null)[] | null;
  trackInventory: boolean;
  /**
   * List of price information in channels for the product.
   */
  channelListings: ProductDetails_product_variants_channelListings[] | null;
}

export interface ProductDetails_product_weight {
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

export interface ProductDetails_product_taxType {
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

export interface ProductDetails_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of attributes assigned to this product.
   */
  attributes: ProductDetails_product_attributes[];
  productType: ProductDetails_product_productType;
  /**
   * List of availability in channels for the product.
   */
  channelListings: ProductDetails_product_channelListings[] | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ProductDetails_product_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (ProductDetails_product_privateMetadata | null)[];
  name: string;
  slug: string;
  description: any | null;
  details: any | null;
  hasNoPrice: boolean | null;
  seoTitle: string | null;
  seoDescription: string | null;
  rating: number;
  url: string | null;
  defaultVariant: ProductDetails_product_defaultVariant | null;
  company: ProductDetails_product_company;
  address: ProductDetails_product_address | null;
  category: ProductDetails_product_category | null;
  categories: ProductDetails_product_categories;
  /**
   * List of collections for the product.
   */
  collections: (ProductDetails_product_collections | null)[] | null;
  chargeTaxes: boolean;
  /**
   * List of media for the product.
   */
  media: ProductDetails_product_media[] | null;
  /**
   * Whether the product is in stock and visible or not.
   */
  isAvailable: boolean | null;
  isBillable: boolean;
  isBookable: boolean;
  /**
   * List of payment method allowed.
   */
  paymentMethods: (ProductDetails_product_paymentMethods | null)[] | null;
  duration: number | null;
  /**
   * List of the bookable resouces.
   */
  bookableResources: ProductDetails_product_bookableResources | null;
  keywords: ProductDetails_product_keywords;
  purchaseEmail: ProductDetails_product_purchaseEmail | null;
  /**
   * List of variants for the product.
   */
  variants: (ProductDetails_product_variants | null)[] | null;
  weight: ProductDetails_product_weight | null;
  /**
   * A type of tax. Assigned by enabled tax gateway
   */
  taxType: ProductDetails_product_taxType | null;
}

export interface ProductDetails_taxTypes {
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

export interface ProductDetails {
  /**
   * Look up a product by ID.
   */
  product: ProductDetails_product | null;
  /**
   * List of all tax rates available from tax gateway.
   */
  taxTypes: (ProductDetails_taxTypes | null)[] | null;
}

export interface ProductDetailsVariables {
  id: string;
  channel?: string | null;
  sellerRequest?: boolean | null;
  firstValues?: number | null;
  afterValues?: string | null;
  lastValues?: number | null;
  beforeValues?: string | null;
}
