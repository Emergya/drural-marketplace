import gql from "graphql-tag";

import { useTypedQuery } from "@graphql";

import {
  FraudulentProductReportQuery,
  FraudulentProductReportQueryVariables,
} from "./gqlTypes/FraudulentProductReportQuery";

const fraudulentProductReportQuery = gql`
  query FraudulentProductReportQuery($slug: String) {
    product(slug: $slug) {
      id
      slug
      name
      thumbnail {
        url
        alt
      }
      thumbnail2x: thumbnail(size: 510) {
        url
      }
    }
  }
`;

export const useFraudulentProductReportQuery = (
  variables: {
    slug: string;
  },
  skip?: boolean | undefined
) => {
  return useTypedQuery<
    FraudulentProductReportQuery,
    FraudulentProductReportQueryVariables
  >(fraudulentProductReportQuery, {
    fetchPolicy: "cache-and-network",
    variables,
    skip,
  });
};
