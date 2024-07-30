import { getTokens } from "@saleor/auth";
import { setContext } from "apollo-link-context";

import { authorizationHeaderKey } from "./utils";

export const tokenLink = setContext((_, context) => {
  const authToken = getTokens().auth;

  return {
    ...context,
    headers: {
      ...context.headers,
      [authorizationHeaderKey]: authToken || null
    }
  };
});
