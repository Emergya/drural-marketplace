import gql from "graphql-tag";

export const setOnboardToTrue = gql`
  mutation AccountUpdate {
    accountUpdate(input: { isOnboard: true }) {
      errors {
        field
        message
      }
    }
  }
`;
