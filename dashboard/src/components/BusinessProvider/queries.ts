import makeQuery from "@saleor/hooks/makeQuery";
import gql from "graphql-tag";

import {
  ActiveBusinessesList,
  ActiveBusinessesListVariables
} from "./types/ActiveBusinessesList";

const businessesList = gql`
  query ActiveBusinessesList(
    $after: String
    $before: String
    $channel: String
    $first: Int
    $last: Int
    $sortBy: CompanySortingInput
  ) {
    companies(
      after: $after
      before: $before
      first: $first
      last: $last
      sortBy: $sortBy
    ) {
      edges {
        cursor
        node {
          __typename
          id
          name
          publicName
          imageUrl
          products(channel: $channel) {
            totalCount
          }
          stripeCredentials {
            accountId
            isEnabled
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

export const useBusinessesListQuery = makeQuery<
  ActiveBusinessesList,
  ActiveBusinessesListVariables
>(businessesList);
