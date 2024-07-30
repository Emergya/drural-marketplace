import gql from "graphql-tag";

import { TypedMutation } from "../../../core/mutations";
import {
  AccountDelete,
  AccountDeleteVariables,
} from "./gqlTypes/AccountDelete";

// Mutation - account request deletion
const accountDeleteMutation = gql`
  mutation AccountDelete($token: String!) {
    accountDelete(token: $token) {
      accountErrors {
        field
        message
        code
      }
    }
  }
`;

export const TypedAccountDeleteMutation = TypedMutation<
  AccountDelete,
  AccountDeleteVariables
>(accountDeleteMutation);
