import gql from "graphql-tag";

export const shopDefaultLanguageQuery = gql`
  query ShopDefaultLanguage {
    shop {
      defaultLanguage
    }
  }
`;
