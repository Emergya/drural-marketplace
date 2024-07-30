import {
  customerDetailsFragment,
  customerFragment
} from "@saleor/fragments/customers";
import makeQuery from "@saleor/hooks/makeQuery";
import gql from "graphql-tag";

import { AgentDetails, AgentDetailsVariables } from "./types/AgentDetails";
import {
  BusinessAgentList,
  BusinessAgentListVariables
} from "./types/BusinessAgentList";
import {
  BusinessDetails,
  BusinessDetailsVariables
} from "./types/BusinessDetails";
import {
  BusinessesList,
  BusinessesListVariables
} from "./types/BusinessesList";
import {
  BusinessesTotalCount,
  BusinessesTotalCountVariables
} from "./types/BusinessesTotalCount";

const businessesList = gql`
  query BusinessesList(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $sort: CompanySortingInput
    $filter: CompanyFilterInput
  ) {
    companies(
      after: $after
      before: $before
      first: $first
      last: $last
      sortBy: $sort
      filter: $filter
    ) {
      edges {
        cursor
        node {
          id
          name
          publicName
          status
          isEnabled
          modified
          email
          phone
          address {
            id
            locality
            postalCode
          }
          imageUrl
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
export const useBusinessesListQuery = makeQuery<
  BusinessesList,
  BusinessesListVariables
>(businessesList);

const businessesTotalCount = gql`
  query BusinessesTotalCount(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $sort: CompanySortingInput
    $filter: CompanyFilterInput
  ) {
    companies(
      after: $after
      before: $before
      first: $first
      last: $last
      sortBy: $sort
      filter: $filter
    ) {
      totalCount
    }
  }
`;
export const useBusinessesTotalCountQuery = makeQuery<
  BusinessesTotalCount,
  BusinessesTotalCountVariables
>(businessesTotalCount);

const businessDetails = gql`
  query BusinessDetails($id: ID!) {
    company(id: $id) {
      id
      name
      publicName
      cif
      phone
      email
      status
      isEnabled
      imageUrl
      banner {
        alt
        url
      }
      description
      created
      modified
      languageCode
      address {
        id
        street
        streetSecondLine
        postalCode
        locality
        region
        country
        longitude
        latitude
      }
      chatwootCredentials {
        id
        isActive
      }
      stripeCredentials {
        accountId
        isEnabled
      }
    }
  }
`;
export const useBusinessDetailsQuery = makeQuery<
  BusinessDetails,
  BusinessDetailsVariables
>(businessDetails);

const businessAgentList = gql`
  ${customerFragment}
  query BusinessAgentList(
    $company: ID!
    $filter: AgentUserInput
    $sort: UserSortingInput
    $before: String
    $after: String
    $first: Int
    $last: Int
  ) {
    agentUsers(
      company: $company
      filter: $filter
      sortBy: $sort
      before: $before
      after: $after
      first: $first
      last: $last
    ) {
      edges {
        node {
          ...CustomerFragment
          orders {
            totalCount
          }
          isSeller
          dateJoined
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
export const useBusinessAgentListQuery = makeQuery<
  BusinessAgentList,
  BusinessAgentListVariables
>(businessAgentList);

const agentDetails = gql`
  ${customerDetailsFragment}
  query AgentDetails($id: ID!) {
    agentUserDetails(id: $id) {
      ...CustomerDetailsFragment
      orders(last: 5) {
        edges {
          node {
            id
            created
            number
            paymentStatus
            total {
              gross {
                currency
                amount
              }
            }
          }
        }
      }
      lastPlacedOrder: orders(last: 1) {
        edges {
          node {
            id
            created
          }
        }
      }
    }
  }
`;
export const useAgentDetailsQuery = makeQuery<
  AgentDetails,
  AgentDetailsVariables
>(agentDetails);
