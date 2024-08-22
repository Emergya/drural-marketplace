import { HttpLink } from "apollo-link-http";

import { getLinkOptions } from "../utils";

// IMPORTANT: this is a terminanting link
export const getHttpLink = (apiUrl: string) =>
  new HttpLink(getLinkOptions(apiUrl));
