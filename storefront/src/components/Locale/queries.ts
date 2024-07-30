import gql from "graphql-tag";

export const shopDefaultLanguage = gql`
  query ShopDefaultLanguage {
    shop {
      defaultLanguage
    }
  }
`;
