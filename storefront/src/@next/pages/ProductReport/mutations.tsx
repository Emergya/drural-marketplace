import gql from "graphql-tag";

import { TypedMutation } from "@temp/core/mutations";

import {
  FraudulentProductReportCreate,
  FraudulentProductReportCreateVariables,
} from "./gqlTypes/FraudulentProductReportCreate";

const fraudulentProductReportCreateMutation = gql`
  mutation FraudulentProductReportCreate(
    $product: ID!
    $reason: String!
    $phone: String!
    $images: Upload
  ) {
    fraudulentProductReportCreate(
      input: {
        product: $product
        reason: $reason
        phone: $phone
        image: $images
      }
    ) {
      errors {
        field
        code
        message
      }
      fraudulentProductReport {
        id
        user {
          email
        }
        product {
          id
        }
        reason
        phone
        media {
          id
          alt
          oembedData
          url
        }
      }
    }
  }
`;

export const TypedFraudulentProductReportCreateMutation = TypedMutation<
  FraudulentProductReportCreate,
  FraudulentProductReportCreateVariables
>(fraudulentProductReportCreateMutation);
