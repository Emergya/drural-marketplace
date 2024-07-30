import { HttpLink } from "apollo-link-http";

import { linkOptions } from "../utils";

// IMPORTANT: this is a terminanting link
export const httpLink = new HttpLink(linkOptions);
