import {
  ProductRatingFilterInput,
  ProductRatingSortingInput,
} from "gqlTypes/globalTypes";
import gql from "graphql-tag";

import { useTypedQuery } from "@graphql/queries";

import {
  GetServiceReviews,
  GetServiceReviewsVariables,
} from "./gqlTypes/GetServiceReviews";

// TODO: change thumbnailFake with real thumbnail when backend ready
const getServiceReviews = gql`
  query GetServiceReviews(
    $slug: String!
    $first: Int!
    $after: String
    $filter: ProductRatingFilterInput
    $sortBy: ProductRatingSortingInput
  ) {
    product(slug: $slug, channel: "default-channel") {
      id
      name
      description
      rating
      consumedByUser
      slug
      thumbnail {
        url
        alt
      }
      company {
        name
      }
      reviewPercentages {
        stars
        total
      }
      myReview {
        id
        createdByUser
        comment
        rating
        createdAt
        user
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
          }
        }
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

export const useGetServiceReviews = (variables: {
  slug: string;
  first: number;
  sortBy?: ProductRatingSortingInput | null;
  filter?: ProductRatingFilterInput | null;
}) => {
  return useTypedQuery<GetServiceReviews, GetServiceReviewsVariables>(
    getServiceReviews,
    {
      variables,
      fetchPolicy: "cache-and-network",
    }
  );
};
