import { getTokenRefreshLink } from "./refreshTokenLink/refreshTokenLink";
import { tokenLink } from "./tokenLink";

export const getAuthLink = (
  apiUrl: string,
  tokenExpirationCallback: () => void
) => getTokenRefreshLink(apiUrl, tokenExpirationCallback).concat(tokenLink);
