/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PaymentChargeStatusEnum, OrderStatus } from "./../../gqlTypes/globalTypes";

// ====================================================
// GraphQL fragment: OrderDetail
// ====================================================

export interface OrderDetail_booking_bookableResource {
  __typename: "BookableResource";
  name: string;
}

export interface OrderDetail_booking {
  __typename: "Booking";
  bookableResource: OrderDetail_booking_bookableResource | null;
  startDate: any | null;
  endDate: any | null;
  /**
   * UUID of the booking.
   */
  bookingReference: any | null;
}

export interface OrderDetail_billingAddress_country {
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

export interface OrderDetail_billingAddress {
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
  country: OrderDetail_billingAddress_country;
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

export interface OrderDetail_shippingAddress_country {
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

export interface OrderDetail_shippingAddress {
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
  country: OrderDetail_shippingAddress_country;
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

export interface OrderDetail_lines_variant_pricing_priceUndiscounted_gross {
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

export interface OrderDetail_lines_variant_pricing_priceUndiscounted_net {
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

export interface OrderDetail_lines_variant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: OrderDetail_lines_variant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: OrderDetail_lines_variant_pricing_priceUndiscounted_net;
}

export interface OrderDetail_lines_variant_pricing_price_gross {
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

export interface OrderDetail_lines_variant_pricing_price_net {
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

export interface OrderDetail_lines_variant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: OrderDetail_lines_variant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: OrderDetail_lines_variant_pricing_price_net;
}

export interface OrderDetail_lines_variant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: OrderDetail_lines_variant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: OrderDetail_lines_variant_pricing_price | null;
}

export interface OrderDetail_lines_variant_attributes_attribute {
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

export interface OrderDetail_lines_variant_attributes_values {
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

export interface OrderDetail_lines_variant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: OrderDetail_lines_variant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (OrderDetail_lines_variant_attributes_values | null)[];
}

export interface OrderDetail_lines_variant_product_paymentMethods {
  __typename: "PaymentMethod";
  /**
   * The ID of the object.
   */
  id: string;
  identifier: string;
}

export interface OrderDetail_lines_variant_product_thumbnail {
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

export interface OrderDetail_lines_variant_product_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface OrderDetail_lines_variant_product_productType {
  __typename: "ProductType";
  /**
   * The ID of the object.
   */
  id: string;
  isShippingRequired: boolean;
}

export interface OrderDetail_lines_variant_product_company_stripeCredentials {
  __typename: "StripeCredentialsType";
  isEnabled: boolean;
  accountId: string | null;
}

export interface OrderDetail_lines_variant_product_company {
  __typename: "CompanyType";
  /**
   * The ID of the object.
   */
  id: string;
  stripeCredentials: OrderDetail_lines_variant_product_company_stripeCredentials | null;
}

export interface OrderDetail_lines_variant_product {
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
  paymentMethods: (OrderDetail_lines_variant_product_paymentMethods | null)[] | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: OrderDetail_lines_variant_product_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: OrderDetail_lines_variant_product_thumbnail2x | null;
  productType: OrderDetail_lines_variant_product_productType;
  company: OrderDetail_lines_variant_product_company;
}

export interface OrderDetail_lines_variant {
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
  pricing: OrderDetail_lines_variant_pricing | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: OrderDetail_lines_variant_attributes[];
  product: OrderDetail_lines_variant_product;
}

export interface OrderDetail_lines_unitPrice_gross {
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

export interface OrderDetail_lines_unitPrice_net {
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

export interface OrderDetail_lines_unitPrice {
  __typename: "TaxedMoney";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money including taxes.
   */
  gross: OrderDetail_lines_unitPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: OrderDetail_lines_unitPrice_net;
}

export interface OrderDetail_lines_totalPrice_gross {
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

export interface OrderDetail_lines_totalPrice_net {
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

export interface OrderDetail_lines_totalPrice {
  __typename: "TaxedMoney";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money including taxes.
   */
  gross: OrderDetail_lines_totalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: OrderDetail_lines_totalPrice_net;
}

export interface OrderDetail_lines {
  __typename: "OrderLine";
  productName: string;
  quantity: number;
  /**
   * A purchased product variant. Note: this field may be null if the variant has been removed from stock at all.
   */
  variant: OrderDetail_lines_variant | null;
  /**
   * Price of the single item in the order line.
   */
  unitPrice: OrderDetail_lines_unitPrice;
  /**
   * Price of the order line.
   */
  totalPrice: OrderDetail_lines_totalPrice;
}

export interface OrderDetail_subtotal_gross {
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

export interface OrderDetail_subtotal_net {
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

export interface OrderDetail_subtotal {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: OrderDetail_subtotal_gross;
  /**
   * Amount of money without taxes.
   */
  net: OrderDetail_subtotal_net;
}

export interface OrderDetail_total_gross {
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

export interface OrderDetail_total_net {
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

export interface OrderDetail_total {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: OrderDetail_total_gross;
  /**
   * Amount of money without taxes.
   */
  net: OrderDetail_total_net;
}

export interface OrderDetail_shippingPrice_gross {
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

export interface OrderDetail_shippingPrice_net {
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

export interface OrderDetail_shippingPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: OrderDetail_shippingPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: OrderDetail_shippingPrice_net;
}

export interface OrderDetail {
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
  booking: OrderDetail_booking | null;
  billingAddress: OrderDetail_billingAddress | null;
  shippingAddress: OrderDetail_shippingAddress | null;
  /**
   * List of order lines.
   */
  lines: (OrderDetail_lines | null)[];
  /**
   * The sum of line prices not including shipping.
   */
  subtotal: OrderDetail_subtotal;
  /**
   * Total amount of the order.
   */
  total: OrderDetail_total;
  /**
   * Total price of shipping.
   */
  shippingPrice: OrderDetail_shippingPrice;
}
