import gql from "graphql-tag";

import { useTypedQuery } from "@graphql";

import { FooterCategoriesQuery } from "./gqlTypes/FooterCategoriesQuery";

// Query - get user categories
const footerCategoriesQuery = gql`
  query FooterCategoriesQuery {
    categories(first: 12, sortBy: { direction: DESC, field: PRODUCT_COUNT }) {
      edges {
        node {
          id
          name
          slug
          children(first: 12) {
            edges {
              node {
                id
                name
                slug
              }
            }
          }
        }
      }
    }
  }
`;

export const useFooterCategoriesQuery = () => {
  return useTypedQuery<FooterCategoriesQuery>(footerCategoriesQuery, {
    fetchPolicy: "cache-and-network",
  });
};
