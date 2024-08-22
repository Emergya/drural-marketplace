import { BatchHttpLink } from "apollo-link-batch-http";
import { getLinkOptions } from "../utils";

// IMPORTANT: this is a terminanting link
export const getBatchHttpLink = (apiUrl: string) =>
  new BatchHttpLink(getLinkOptions(apiUrl));
