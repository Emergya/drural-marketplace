import gql from "graphql-tag";

export const setLocationPreferencesMutation = gql`
  mutation setAccountLocationPreferences(
    $input: AccountLocationPreferencesInput!
  ) {
    setAccountLocationPreferences(input: $input) {
      user {
        isLocationAllowed
        distance
      }
      errors {
        field
        message
      }
    }
  }
`;

export const setCategoriesPreferencesMutation = gql`
  mutation setAccountCategoriesPreferences($categories: [ID!]!) {
    setAccountCategoriesPreferences(categories: $categories) {
      errors {
        field
        message
      }
    }
  }
`;

export const getSaleorCategoriesQuery = gql`
  query GetSaleorCategories {
    categories(first: 100) {
      edges {
        cursor
        node {
          id
          name
          iconId
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
