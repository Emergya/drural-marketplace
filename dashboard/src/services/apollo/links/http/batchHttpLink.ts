import { BatchHttpLink } from "apollo-link-batch-http";

import { linkOptions } from "../utils";

// IMPORTANT: this is a terminanting link
export const httpBatchLink = new BatchHttpLink({
  ...linkOptions,
  batchInterval: 100
});
