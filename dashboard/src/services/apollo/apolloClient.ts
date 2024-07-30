import { defaultDataIdFromObject, InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { from } from "apollo-link";

import { authLink } from "./links/auth/authLink";
import { errorLink } from "./links/error/errorLink";
import { uploadLink } from "./links/upload/uploadLink";

export const apolloClient = (
  tokenRefreshLinkError: boolean,
  onTokenRefreshLinkError: () => void
) =>
  new ApolloClient({
    cache: new InMemoryCache({
      dataIdFromObject: (obj: any) => {
        // We need to set manually shop's ID, since it is singleton and
        // API does not return its ID
        if (obj.__typename === "Shop") {
          return "shop";
        }
        return defaultDataIdFromObject(obj);
      }
    }),
    link: from([
      errorLink,
      authLink(tokenRefreshLinkError, onTokenRefreshLinkError),
      uploadLink
    ])
  });
