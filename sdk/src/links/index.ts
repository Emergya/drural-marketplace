import { getAuthLink } from "./auth/authLink";
import { errorLink } from "./error/errorLink";
import { retryLink } from "./retry/retryLink";
import { SaleorLinksConfig } from "./types";
import { getUploadLink } from "./upload/uploadLink";

/**
 * Creates list of links for Apollo client.
 */
export const createSaleorLinks = ({
  apiUrl,
  tokenExpirationCallback,
}: SaleorLinksConfig) => [
  errorLink,
  getAuthLink(apiUrl, tokenExpirationCallback),
  retryLink,
  getUploadLink(apiUrl),
];
