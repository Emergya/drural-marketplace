import { fragmentUser } from "@saleor/fragments/auth";
import gql from "graphql-tag";

export const availableExternalAuthentications = gql`
  query AvailableExternalAuthentications {
    shop {
      availableExternalAuthentications {
        id
        name
      }
    }
  }
`;

export const userQuery = gql`
  ${fragmentUser}
  query User($id: ID!) {
    user(id: $id) {
      ...User
    }
  }
`;
