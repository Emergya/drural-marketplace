import gql from "graphql-tag";

export const orderCancelMutation = gql`
  mutation OrderCancel($id: ID!) {
    orderCancel(id: $id) {
      errors {
        code
        field
        message
      }
    }
  }
`;
