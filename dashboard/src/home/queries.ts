import makeQuery from "@saleor/hooks/makeQuery";
import gql from "graphql-tag";

import { Home, HomeVariables } from "./types/Home";

const home = gql`
  query Home(
    $channel: String!
    $collections: [ID]
    $company: ID
    $datePeriod: DateRangeInput!
    $PERMISSION_MANAGE_PRODUCTS: Boolean!
    $PERMISSION_MANAGE_ORDERS: Boolean!
  ) {
    salesToday: ordersTotal(
      period: TODAY
      channel: $channel
      company: $company
    ) @include(if: $PERMISSION_MANAGE_ORDERS) {
      gross {
        amount
        currency
      }
    }
    ordersToday: orders(
      filter: { created: $datePeriod }
      channel: $channel
      company: $company
    ) @include(if: $PERMISSION_MANAGE_ORDERS) {
      totalCount
    }
    ordersToFulfill: orders(
      filter: { status: READY_TO_FULFILL }
      channel: $channel
      company: $company
    ) @include(if: $PERMISSION_MANAGE_ORDERS) {
      totalCount
    }
    ordersToCapture: orders(
      filter: { status: READY_TO_CAPTURE }
      channel: $channel
      company: $company
    ) @include(if: $PERMISSION_MANAGE_ORDERS) {
      totalCount
    }
    productsOutOfStock: products(
      filter: { stockAvailability: OUT_OF_STOCK }
      channel: $channel
      company: $company
    ) {
      totalCount
    }
    productsInactive: products(
      filter: { isPublished: false }
      channel: $channel
      company: $company
    ) {
      totalCount
    }
    productTopToday: reportProductSales(
      period: TODAY
      first: 5
      channel: $channel
      company: $company
    ) @include(if: $PERMISSION_MANAGE_PRODUCTS) {
      edges {
        node {
          id
          revenue(period: TODAY) {
            gross {
              amount
              currency
            }
          }
          attributes {
            values {
              id
              name
            }
          }
          product {
            id
            name
            thumbnail {
              url
            }
          }
          quantityOrdered
        }
      }
    }
    featuredProducts: products(
      first: 5
      channel: $channel
      company: $company
      filter: { collections: $collections }
    ) @include(if: $PERMISSION_MANAGE_PRODUCTS) {
      edges {
        node {
          id
          name
          thumbnail {
            url
          }
          defaultVariant {
            id
            quantityOrdered
            revenue(period: TODAY) {
              gross {
                amount
                currency
              }
            }
          }
        }
      }
    }
    activities: homepageEvents(last: 10)
      @include(if: $PERMISSION_MANAGE_ORDERS) {
      edges {
        node {
          amount
          composedId
          date
          email
          emailType
          id
          message
          orderNumber
          oversoldItems
          quantity
          type
          user {
            id
            email
          }
        }
      }
    }
  }
`;

export const useHomePage = makeQuery<Home, HomeVariables>(home);
