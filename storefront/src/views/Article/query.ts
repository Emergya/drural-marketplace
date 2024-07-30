import gql from "graphql-tag";

import { useTypedQuery } from "@graphql";

import { Page, PageVariables } from "./gqlTypes/Page";

export const pagesQuery = gql`
  query Pages {
    pages(first: 50) {
      edges {
        node {
          id
          slug
        }
      }
    }
  }
`;

export const pageQuery = gql`
  query Page($slug: String!) {
    page(slug: $slug) {
      content
      id
      seoDescription
      seoTitle
      slug
      title
    }
  }
`;
export const usePageQuery = (variables: PageVariables, skip: boolean) => {
  return useTypedQuery<Page, PageVariables>(pageQuery, {
    variables,
    skip,
    fetchPolicy: "network-only",
  });
};
