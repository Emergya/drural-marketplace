import gql from "graphql-tag";

import { useTypedQuery } from "@graphql";

import { TypedMutation } from "../../../../core/mutations";
import {
  AccountRequestDeletion,
  AccountRequestDeletionVariables,
} from "./gqlTypes/AccountRequestDeletion";
import {
  GetAllCategories,
  GetAllCategoriesVariables,
} from "./gqlTypes/GetAllCategories";
import {
  GetUserCategories,
  GetUserCategoriesVariables,
} from "./gqlTypes/GetUserCategories";
import { GetUserLocation } from "./gqlTypes/GetUserLocation";
import {
  SetAccountCategoriesPreferences,
  SetAccountCategoriesPreferencesVariables,
} from "./gqlTypes/SetAccountCategoriesPreferences";
import {
  SetAccountLocationPreferences,
  SetAccountLocationPreferencesVariables,
} from "./gqlTypes/SetAccountLocationPreferences";

// Query - get user location
const getUserLocationQuery = gql`
  query GetUserLocation {
    me {
      id
      isLocationAllowed
      distance
    }
  }
`;

export const useUserLocationQuery = () => {
  return useTypedQuery<GetUserLocation>(getUserLocationQuery, {
    fetchPolicy: "cache-and-network",
  });
};

// Query - get user categories
const getUserCategoriesQuery = gql`
  query GetUserCategories($first: Int!, $after: String) {
    me {
      id
      categories(first: $first, after: $after) {
        edges {
          node {
            id
            name
            slug
            iconId
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

export const useUserCategoriesQuery = (variables: { first: number }) => {
  return useTypedQuery<GetUserCategories, GetUserCategoriesVariables>(
    getUserCategoriesQuery,
    {
      variables,
      fetchPolicy: "cache-and-network",
    }
  );
};

// Query - get all categories
const getAllCategoriesQuery = gql`
  query GetAllCategories($first: Int!) {
    categories(first: $first, sortBy: { field: NAME, direction: ASC }) {
      edges {
        node {
          id
          name
          iconId
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      totalCount
    }
  }
`;

export const useAllCategoriesQuery = (variables: { first: number }) => {
  return useTypedQuery<GetAllCategories, GetAllCategoriesVariables>(
    getAllCategoriesQuery,
    {
      variables,
      fetchPolicy: "cache-and-network",
    }
  );
};

// Mutation - set location preferences
const setAccountLocationPreferencesMutation = gql`
  mutation SetAccountLocationPreferences(
    $input: AccountLocationPreferencesInput!
  ) {
    setAccountLocationPreferences(input: $input) {
      errors {
        field
        message
      }
      user {
        isLocationAllowed
        distance
      }
    }
  }
`;

export const TypedSetAccountLocationPreferencesMutation = TypedMutation<
  SetAccountLocationPreferences,
  SetAccountLocationPreferencesVariables
>(setAccountLocationPreferencesMutation);

// Mutation - set categories preferences
const setAccountCategoriesPreferencesMutation = gql`
  mutation SetAccountCategoriesPreferences($categories: [ID!]!) {
    setAccountCategoriesPreferences(categories: $categories) {
      errors {
        field
        message
      }
      user {
        categories(first: 12) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
`;

export const TypedSetAccountCategoriesPreferencesMutation = TypedMutation<
  SetAccountCategoriesPreferences,
  SetAccountCategoriesPreferencesVariables
>(setAccountCategoriesPreferencesMutation);

// Mutation - account request deletion
const accountRequestDeletionMutation = gql`
  mutation AccountRequestDeletion($redirectUrl: String!) {
    accountRequestDeletion(
      redirectUrl: $redirectUrl
      channel: "default-channel"
    ) {
      accountErrors {
        field
        message
        code
      }
    }
  }
`;

export const TypedAccountRequestDeletionMutation = TypedMutation<
  AccountRequestDeletion,
  AccountRequestDeletionVariables
>(accountRequestDeletionMutation);
