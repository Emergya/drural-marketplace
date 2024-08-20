/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PaymentChargeStatusEnum, OrderStatus, JobStatusEnum } from "./../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: UserOrderByToken
// ====================================================

export interface UserOrderByToken_orderByToken_booking_bookableResource {
  __typename: "BookableResource";
  name: string;
}

export interface UserOrderByToken_orderByToken_booking {
  __typename: "Booking";
  bookableResource: UserOrderByToken_orderByToken_booking_bookableResource | null;
  startDate: any | null;
  endDate: any | null;
  /**
   * UUID of the booking.
   */
  bookingReference: any | null;
}

export interface UserOrderByToken_orderByToken_billingAddress_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface UserOrderByToken_orderByToken_billingAddress {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: UserOrderByToken_orderByToken_billingAddress_country;
  countryArea: string;
  phone: string | null;
  /**
   * Address is user's default billing address.
   */
  isDefaultBillingAddress: boolean | null;
  /**
   * Address is user's default shipping address.
   */
  isDefaultShippingAddress: boolean | null;
}

export interface UserOrderByToken_orderByToken_shippingAddress_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface UserOrderByToken_orderByToken_shippingAddress {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: UserOrderByToken_orderByToken_shippingAddress_country;
  countryArea: string;
  phone: string | null;
  /**
   * Address is user's default billing address.
   */
  isDefaultBillingAddress: boolean | null;
  /**
   * Address is user's default shipping address.
   */
  isDefaultShippingAddress: boolean | null;
}

export interface UserOrderByToken_orderByToken_lines_variant_pricing_priceUndiscounted_gross {
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

export interface UserOrderByToken_orderByToken_lines_variant_pricing_priceUndiscounted_net {
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

export interface UserOrderByToken_orderByToken_lines_variant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UserOrderByToken_orderByToken_lines_variant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: UserOrderByToken_orderByToken_lines_variant_pricing_priceUndiscounted_net;
}

export interface UserOrderByToken_orderByToken_lines_variant_pricing_price_gross {
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

export interface UserOrderByToken_orderByToken_lines_variant_pricing_price_net {
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

export interface UserOrderByToken_orderByToken_lines_variant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UserOrderByToken_orderByToken_lines_variant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: UserOrderByToken_orderByToken_lines_variant_pricing_price_net;
}

export interface UserOrderByToken_orderByToken_lines_variant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: UserOrderByToken_orderByToken_lines_variant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: UserOrderByToken_orderByToken_lines_variant_pricing_price | null;
}

export interface UserOrderByToken_orderByToken_lines_variant_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
}

export interface UserOrderByToken_orderByToken_lines_variant_attributes_values {
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
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface UserOrderByToken_orderByToken_lines_variant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: UserOrderByToken_orderByToken_lines_variant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (UserOrderByToken_orderByToken_lines_variant_attributes_values | null)[];
}

export interface UserOrderByToken_orderByToken_lines_variant_product_paymentMethods {
  __typename: "PaymentMethod";
  /**
   * The ID of the object.
   */
  id: string;
  identifier: string;
}

export interface UserOrderByToken_orderByToken_lines_variant_product_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface UserOrderByToken_orderByToken_lines_variant_product_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface UserOrderByToken_orderByToken_lines_variant_product_productType {
  __typename: "ProductType";
  /**
   * The ID of the object.
   */
  id: string;
  isShippingRequired: boolean;
}

export interface UserOrderByToken_orderByToken_lines_variant_product_company_stripeCredentials {
  __typename: "StripeCredentialsType";
  isEnabled: boolean;
  accountId: string | null;
}

export interface UserOrderByToken_orderByToken_lines_variant_product_company {
  __typename: "CompanyType";
  /**
   * The ID of the object.
   */
  id: string;
  stripeCredentials: UserOrderByToken_orderByToken_lines_variant_product_company_stripeCredentials | null;
}

export interface UserOrderByToken_orderByToken_lines_variant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  /**
   * List of payment method allowed.
   */
  paymentMethods: (UserOrderByToken_orderByToken_lines_variant_product_paymentMethods | null)[] | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: UserOrderByToken_orderByToken_lines_variant_product_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: UserOrderByToken_orderByToken_lines_variant_product_thumbnail2x | null;
  productType: UserOrderByToken_orderByToken_lines_variant_product_productType;
  company: UserOrderByToken_orderByToken_lines_variant_product_company;
}

export interface UserOrderByToken_orderByToken_lines_variant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  sku: string;
  /**
   * Quantity of a product available for sale in one checkout.
   */
  quantityAvailable: number;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: UserOrderByToken_orderByToken_lines_variant_pricing | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: UserOrderByToken_orderByToken_lines_variant_attributes[];
  product: UserOrderByToken_orderByToken_lines_variant_product;
}

export interface UserOrderByToken_orderByToken_lines_unitPrice_gross {
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

export interface UserOrderByToken_orderByToken_lines_unitPrice_net {
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

export interface UserOrderByToken_orderByToken_lines_unitPrice {
  __typename: "TaxedMoney";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money including taxes.
   */
  gross: UserOrderByToken_orderByToken_lines_unitPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: UserOrderByToken_orderByToken_lines_unitPrice_net;
}

export interface UserOrderByToken_orderByToken_lines_totalPrice_gross {
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

export interface UserOrderByToken_orderByToken_lines_totalPrice_net {
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

export interface UserOrderByToken_orderByToken_lines_totalPrice {
  __typename: "TaxedMoney";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money including taxes.
   */
  gross: UserOrderByToken_orderByToken_lines_totalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: UserOrderByToken_orderByToken_lines_totalPrice_net;
}

export interface UserOrderByToken_orderByToken_lines {
  __typename: "OrderLine";
  productName: string;
  quantity: number;
  /**
   * A purchased product variant. Note: this field may be null if the variant has been removed from stock at all.
   */
  variant: UserOrderByToken_orderByToken_lines_variant | null;
  /**
   * Price of the single item in the order line.
   */
  unitPrice: UserOrderByToken_orderByToken_lines_unitPrice;
  /**
   * Price of the order line.
   */
  totalPrice: UserOrderByToken_orderByToken_lines_totalPrice;
}

export interface UserOrderByToken_orderByToken_subtotal_gross {
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

export interface UserOrderByToken_orderByToken_subtotal_net {
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

export interface UserOrderByToken_orderByToken_subtotal {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UserOrderByToken_orderByToken_subtotal_gross;
  /**
   * Amount of money without taxes.
   */
  net: UserOrderByToken_orderByToken_subtotal_net;
}

export interface UserOrderByToken_orderByToken_total_gross {
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

export interface UserOrderByToken_orderByToken_total_net {
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

export interface UserOrderByToken_orderByToken_total {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UserOrderByToken_orderByToken_total_gross;
  /**
   * Amount of money without taxes.
   */
  net: UserOrderByToken_orderByToken_total_net;
}

export interface UserOrderByToken_orderByToken_shippingPrice_gross {
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

export interface UserOrderByToken_orderByToken_shippingPrice_net {
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

export interface UserOrderByToken_orderByToken_shippingPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UserOrderByToken_orderByToken_shippingPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: UserOrderByToken_orderByToken_shippingPrice_net;
}

export interface UserOrderByToken_orderByToken_invoices {
  __typename: "Invoice";
  /**
   * The ID of the object.
   */
  id: string;
  number: string | null;
  /**
   * Created date time of job in ISO 8601 format.
   */
  createdAt: any;
  /**
   * URL to download an invoice.
   */
  url: string | null;
  /**
   * Job status.
   */
  status: JobStatusEnum;
}

export interface UserOrderByToken_orderByToken {
  __typename: "Order";
  /**
   * Email address of the customer.
   */
  userEmail: string | null;
  /**
   * Internal payment status.
   */
  paymentStatus: PaymentChargeStatusEnum;
  /**
   * User-friendly payment status.
   */
  paymentStatusDisplay: string;
  status: OrderStatus;
  /**
   * User-friendly order status.
   */
  statusDisplay: string | null;
  /**
   * The ID of the object.
   */
  id: string;
  token: string;
  /**
   * User-friendly number of an order.
   */
  number: string | null;
  /**
   * Booking of the order
   */
  booking: UserOrderByToken_orderByToken_booking | null;
  billingAddress: UserOrderByToken_orderByToken_billingAddress | null;
  shippingAddress: UserOrderByToken_orderByToken_shippingAddress | null;
  /**
   * List of order lines.
   */
  lines: (UserOrderByToken_orderByToken_lines | null)[];
  /**
   * The sum of line prices not including shipping.
   */
  subtotal: UserOrderByToken_orderByToken_subtotal;
  /**
   * Total amount of the order.
   */
  total: UserOrderByToken_orderByToken_total;
  /**
   * Total price of shipping.
   */
  shippingPrice: UserOrderByToken_orderByToken_shippingPrice;
  /**
   * List of order invoices.
   */
  invoices: (UserOrderByToken_orderByToken_invoices | null)[] | null;
}

export interface UserOrderByToken {
  /**
   * Look up an order by token.
   */
  orderByToken: UserOrderByToken_orderByToken | null;
}

export interface UserOrderByTokenVariables {
  token: any;
}
