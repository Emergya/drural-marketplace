import {
  collectionDetailsFragment,
  collectionFragment,
  collectionProductFragment
} from "@saleor/fragments/collections";
import makeQuery from "@saleor/hooks/makeQuery";
import gql from "graphql-tag";

import { TypedQuery } from "../queries";
import {
  CollectionDetails,
  CollectionDetailsVariables
} from "./types/CollectionDetails";
import {
  CollectionList,
  CollectionListVariables
} from "./types/CollectionList";

export const collectionList = gql`
  ${collectionFragment}
  query CollectionList(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $filter: CollectionFilterInput
    $sort: CollectionSortingInput
    $channel: String
  ) {
    collections(
      first: $first
      after: $after
      before: $before
      last: $last
      filter: $filter
      sortBy: $sort
      channel: $channel
    ) {
      edges {
        node {
          ...CollectionFragment
          products {
            totalCount
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`;
export const useCollectionListQuery = makeQuery<
  CollectionList,
  CollectionListVariables
>(collectionList);

export const collectionDetails = gql`
  ${collectionDetailsFragment}
  ${collectionProductFragment}
  query CollectionDetails(
    $id: ID!
    $company: ID
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    collection(id: $id) {
      ...CollectionDetailsFragment
      products(
        company: $company
        first: $first
        after: $after
        before: $before
        last: $last
      ) {
        edges {
          node {
            ...CollectionProductFragment
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        totalCount
      }
    }
  }
`;
export const TypedCollectionDetailsQuery = TypedQuery<
  CollectionDetails,
  CollectionDetailsVariables
>(collectionDetails);
