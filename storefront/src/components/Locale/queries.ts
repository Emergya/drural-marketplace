import { GetUserLanguage } from "@components/molecules/AccountConfigurationTiles/gqlTypes/GetUserLanguage";
import { useTypedQuery } from "@graphql";
import gql from "graphql-tag";
import { ShopDefaultLanguage } from "./gqlTypes/ShopDefaultLanguage";

export const shopDefaultLanguage = gql`
  query ShopDefaultLanguage {
    shop {
      defaultLanguage
    }
  }
`;

export const useShopDefaultLanguageQuery = () => {
  return useTypedQuery<ShopDefaultLanguage>(shopDefaultLanguage, {
    fetchPolicy: "network-only",
  });
};

const getUserLanguageQuery = gql`
  query GetUserLanguage {
    me {
      id
      languageCode
    }
  }
`;

export const useUserLanguageQuery = () => {
  return useTypedQuery<GetUserLanguage>(getUserLanguageQuery, {
    fetchPolicy: "network-only",
  });
};
