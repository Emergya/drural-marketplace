import { TokenRefreshLink } from "apollo-link-token-refresh";

import {
  accessTokenField,
  fetchAccessToken,
  isTokenValidOrUndefined,
  handleError,
  handleFetch,
  handleResponse,
} from "./utils";

export const getTokenRefreshLink = (
  apiUrl: string,
  tokenExpirationCallback: () => void
) =>
  new TokenRefreshLink({
    accessTokenField,
    fetchAccessToken: () => fetchAccessToken(apiUrl),
    handleError: error => handleError(error, tokenExpirationCallback),
    handleFetch,
    handleResponse,
    isTokenValidOrUndefined,
  });
