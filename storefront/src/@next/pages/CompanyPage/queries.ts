import { ProductFilterInput } from "@drural/sdk";
import {
  ProductOrder,
  ProductRatingFilterInput,
  ProductRatingSortingInput,
} from "gqlTypes/globalTypes";
import gql from "graphql-tag";

import { basicProductFragment, productPricingFragment } from "@graphql";
import { useTypedQuery } from "@graphql/queries";

import {
  GetComanyReviews,
  GetComanyReviewsVariables,
} from "./gqlTypes/GetComanyReviews";
import {
  GetCompanyDetails,
  GetCompanyDetailsVariables,
} from "./gqlTypes/GetCompanyDetails";
import {
  GetCompanyProducts,
  GetCompanyProductsVariables,
} from "./gqlTypes/GetCompanyProducts";

const getCompanyDetails = gql`
  query GetCompanyDetails($id: ID!, $channel: String) {
    company(id: $id) {
      id
      publicName
      description
      rating
      imageUrl
      banner {
        alt
        url
      }
      address {
        street
        streetSecondLine
      }
      publishedProducts: products(
        channel: $channel
        filter: { isPublished: true }
      ) {
        totalCount
      }
      chatwootCredentials {
        hmac
        websiteToken
      }
    }
  }
`;

export const useGetCompanyDetails = (variables: {
  id: string;
  channel: string;
}) => {
  return useTypedQuery<GetCompanyDetails, GetCompanyDetailsVariables>(
    getCompanyDetails,
    {
      variables,
      fetchPolicy: "network-only",
    }
  );
};

const getCompanyProducts = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  query GetCompanyProducts(
    $id: ID!
    $channel: String
    $first: Int!
    $after: String
    $filter: ProductFilterInput
    $sortBy: ProductOrder
  ) {
    company(id: $id) {
      id
      products(
        channel: $channel
        first: $first
        after: $after
        filter: $filter
        sortBy: $sortBy
      ) {
        edges {
          node {
            ...BasicProductFields
            ...ProductPricingField
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
        totalCount
      }
    }
  }
`;

export const useGetCompanyProducts = (variables: {
  id: string;
  channel: string;
  first: number;
  sortBy?: ProductOrder | null;
  filter?: ProductFilterInput | null;
}) => {
  return useTypedQuery<GetCompanyProducts, GetCompanyProductsVariables>(
    getCompanyProducts,
    {
      variables,
      fetchPolicy: "cache-and-network",
    }
  );
};

const getCompanyReviews = gql`
  query GetCompanyReviews(
    $id: ID!
    $first: Int!
    $after: String
    $filter: ProductRatingFilterInput
    $sortBy: ProductRatingSortingInput
  ) {
    company(id: $id) {
      id
      rating
      reviewPercentages {
        stars
        total
      }
      reviews(first: $first, after: $after, filter: $filter, sortBy: $sortBy) {
        edges {
          node {
            id
            createdByUser
            comment
            rating
            createdAt
            user
            product {
              id
              name
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
        totalCount
      }
    }
  }
`;

export const useGetCompanyReviews = (variables: {
  id: string;
  first: number;
  sortBy?: ProductRatingSortingInput | null;
  filter?: ProductRatingFilterInput | null;
}) => {
  return useTypedQuery<GetComanyReviews, GetComanyReviewsVariables>(
    getCompanyReviews,
    {
      variables,
      fetchPolicy: "cache-and-network",
    }
  );
};
