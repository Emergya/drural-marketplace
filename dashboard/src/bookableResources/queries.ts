import makeQuery from "@saleor/hooks/makeQuery";
import gql from "graphql-tag";

import {
  BookableResourceDetails,
  BookableResourceDetailsVariables
} from "./types/BookableResourceDetails";
import { ResourceList, ResourceListVariables } from "./types/ResourceList";

const bookableResourceDetailsQuery = gql`
  query BookableResourceDetails($id: ID!) {
    bookableResource(id: $id) {
      id
      name
      isActive
      quantity
      quantityInfinite
      calendar {
        id
        day
        timePeriods {
          id
          startTime
          endTime
        }
      }
    }
  }
`;
export const useBookableResourceDetailsQuery = makeQuery<
  BookableResourceDetails,
  BookableResourceDetailsVariables
>(bookableResourceDetailsQuery);

const resourceListQuery = gql`
  query ResourceList(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $filter: BookableResourceFilterInput
    $company: ID
    $sort: BookableResourceSortingInput
  ) {
    bookableResources(
      before: $before
      after: $after
      first: $first
      last: $last
      filter: $filter
      sortBy: $sort
      company: $company
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
      edges {
        node {
          id
          name
          quantity
          quantityInfinite
          isActive
          company {
            id
            name
          }
        }
      }
    }
  }
`;
export const useResourceListQuery = makeQuery<
  ResourceList,
  ResourceListVariables
>(resourceListQuery);
