import makeMutation from "@saleor/hooks/makeMutation";
import gql from "graphql-tag";

import {
  ShopChatwootCreate,
  ShopChatwootCreateVariables
} from "./types/ShopChatwootCreate";
import {
  ShopChatwootUpdate,
  ShopChatwootUpdateVariables
} from "./types/ShopChatwootUpdate";

const shopChatwootCreateQuery = gql`
  mutation ShopChatwootCreate($input: ShopChatwootCreateInput!) {
    shopChatwootCreate(input: $input) {
      errors {
        code
        message
        field
      }
    }
  }
`;
export const useShopChatwootCreateQuery = makeMutation<
  ShopChatwootCreate,
  ShopChatwootCreateVariables
>(shopChatwootCreateQuery);

const shopChatwootUpdateQuery = gql`
  mutation ShopChatwootUpdate($input: ShopChatwootInput!) {
    shopChatwootUpdate(input: $input) {
      errors {
        code
        message
        field
      }
    }
  }
`;
export const useShopChatwootUpdateQuery = makeMutation<
  ShopChatwootUpdate,
  ShopChatwootUpdateVariables
>(shopChatwootUpdateQuery);
