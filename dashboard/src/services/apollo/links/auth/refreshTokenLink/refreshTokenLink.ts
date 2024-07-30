import { TokenRefreshLink } from "apollo-link-token-refresh";

import {
  accessTokenField,
  fetchAccessToken,
  handleError,
  handleFetch,
  handleResponse,
  isTokenValidOrUndefined
} from "./utils";

export const tokenRefreshLink = (
  tokenRefreshLinkError: boolean,
  onTokenRefreshLinkError: () => void
) =>
  new TokenRefreshLink({
    accessTokenField,
    fetchAccessToken,
    handleError: error => handleError(error, onTokenRefreshLinkError),
    handleFetch,
    handleResponse,
    isTokenValidOrUndefined: () =>
      tokenRefreshLinkError || isTokenValidOrUndefined()
  });
