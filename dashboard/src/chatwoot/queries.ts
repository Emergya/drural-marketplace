import makeQuery from "@saleor/hooks/makeQuery";
import gql from "graphql-tag";

import { ShopChatwoot } from "./types/ShopChatwoot";

export const shopChatwoot = gql`
  query ShopChatwoot {
    shop {
      chatwootCredentials {
        isActive
        websiteToken
        hmac
      }
    }
  }
`;
export const useShopChatwoot = makeQuery<ShopChatwoot, {}>(shopChatwoot);
