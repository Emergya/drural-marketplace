import gql from "graphql-tag";

import {
  checkoutAddressFragment,
  checkoutProductVariantFragment,
} from "./checkout";

export const orderPriceFragment = gql`
  fragment OrderPrice on TaxedMoney {
    gross {
      amount
      currency
    }
    net {
      amount
      currency
    }
  }
`;

export const orderDetailFragment = gql`
  ${orderPriceFragment}
  ${checkoutAddressFragment}
  ${checkoutProductVariantFragment}
  fragment OrderDetail on Order {
    userEmail
    paymentStatus
    paymentStatusDisplay
    status
    statusDisplay
    id
    token
    number
    booking {
      bookableResource {
        name
      }
      startDate
      endDate
      bookingReference
    }
    billingAddress {
      ...Address
    }
    shippingAddress {
      ...Address
    }
    lines {
      productName
      quantity
      variant {
        ...ProductVariant
      }
      unitPrice {
        currency
        ...OrderPrice
      }
      totalPrice {
        currency
        ...OrderPrice
      }
    }
    subtotal {
      ...OrderPrice
    }
    total {
      ...OrderPrice
    }
    shippingPrice {
      ...OrderPrice
    }
  }
`;
