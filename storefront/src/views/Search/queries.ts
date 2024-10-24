import gql from "graphql-tag";

import { attributeFragment, productPricingFragment } from "@graphql";

import { TypedQuery } from "../../core/queries";
import {
  SearchProducts,
  SearchProductsVariables,
} from "./gqlTypes/SearchProducts";

export const searchProductsQuery = gql`
  ${productPricingFragment}
  ${attributeFragment}
  query SearchProducts(
    $query: String!
    $channel: String!
    $attributes: [AttributeInput]
    $pageSize: Int
    $sortBy: ProductOrder
    $after: String
    $categories: [ID]
    $closeness: ClosenessRangeInput
    $priceGte: Float
    $priceLte: Float
  ) {
    products(
      channel: $channel
      filter: {
        search: $query
        attributes: $attributes
        categories: $categories
        closeness: $closeness
        price: { gte: $priceGte, lte: $priceLte }
      }
      first: $pageSize
      sortBy: $sortBy
      after: $after
    ) {
      totalCount
      edges {
        node {
          ...ProductPricingField
          id
          name
          slug
          hasNoPrice
          rating
          address {
            latitude
            longitude
          }
          reviews {
            totalCount
          }
          thumbnail {
            url
            alt
          }
          thumbnail2x: thumbnail(size: 510) {
            url
          }
          category {
            id
            name
          }
          categories(first: 50) {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
    attributes(filter: { filterableInStorefront: true }, first: 100) {
      edges {
        node {
          ...Attribute
        }
      }
    }
  }
`;

export const getAllCategories = gql`
  query GetAlldRuralCategories {
    categories(first: 100) {
      totalCount
      edges {
        node {
          id
          name
          slug
        }
      }
    }
  }
`;

export const TypedSearchProductsQuery = TypedQuery<
  SearchProducts,
  SearchProductsVariables
>(searchProductsQuery);
