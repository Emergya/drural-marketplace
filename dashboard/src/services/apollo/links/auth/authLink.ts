import { tokenRefreshLink } from "./refreshTokenLink/refreshTokenLink";
import { tokenLink } from "./tokenLink";

export const authLink = (
  tokenRefreshLinkError: boolean,
  onTokenRefreshLinkError: () => void
) =>
  tokenRefreshLink(tokenRefreshLinkError, onTokenRefreshLinkError).concat(
    tokenLink
  );
