import { ApolloLink } from "apollo-link";

import { httpBatchLink } from "../http/batchHttpLink";
import { uploadLink } from "../upload/uploadLink";

export const getTerminatingLink = () => {
  // TODO: develop this function to know if there is a file sent in the mutation
  // and return true or false in accordance.

  // Visit this link for implementation > https://lorefnon.me/2021/03/18/Using-apollo-file-link-and-batch-link-simultaneously/
  const testFunc = () => false;

  return ApolloLink.split(testFunc, httpBatchLink, uploadLink);
};
