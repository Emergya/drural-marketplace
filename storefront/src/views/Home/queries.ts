import gql from "graphql-tag";

import { featuredProductFragment } from "@graphql/fragments";

export const homePageProductsQuery = gql`
  query HomePageProducts {
    shop {
      description
      name
    }
    categories(first: 6, sortBy: { direction: DESC, field: PRODUCT_COUNT }) {
      edges {
        node {
          id
          name
          slug
          iconId
        }
      }
    }
    collections(first: 6, sortBy: { direction: DESC, field: PRODUCT_COUNT }) {
      edges {
        node {
          id
          name
          slug
          backgroundImage {
            url
            alt
          }
        }
      }
    }
  }
`;

export const nearbyServices = gql`
  ${featuredProductFragment}
  query NearbyServices(
    $first: Int!
    $after: String
    $closeness: ClosenessRangeInput!
  ) {
    products(
      after: $after
      first: $first
      channel: "default-channel"
      filter: { closeness: $closeness }
      sortBy: { direction: ASC, field: CLOSENESS }
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ...FeaturedProduct
        }
      }
    }
  }
`;

export const userDistance = gql`
  query UserDistance {
    me {
      id
      distance
    }
  }
`;

export const searchSuggestionsQuery = gql`
  query SearchSuggestionsQuery(
    $query: String!
    $channel: String!
    $pageSize: Int
  ) {
    products(channel: $channel, filter: { search: $query }, first: $pageSize) {
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
