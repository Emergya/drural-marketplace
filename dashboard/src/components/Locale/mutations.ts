import gql from "graphql-tag";

export const updateAccoutLanguageMutation = gql`
  mutation UpdateAccoutLanguage($input: AccountInput!) {
    accountUpdate(input: $input) {
      user {
        id
        languageCode
      }
      errors {
        code
        field
        message
      }
    }
  }
`;
