import { ApolloLink } from "apollo-link";
import { getBatchHttpLink } from "../http/batchHttpLink";
import { getUploadLink } from "../upload/uploadLink";

export const getTerminatingLink = (apiUrl: string) => {
  const testFunc = () => {
    // TODO: develop this function to know if there is a file sent in the mutation
    // and return true or false in accordance.

    // Visit this link for implementation > https://lorefnon.me/2021/03/18/Using-apollo-file-link-and-batch-link-simultaneously/

    return false;
  };

  return ApolloLink.split(
    testFunc,
    getBatchHttpLink(apiUrl),
    getUploadLink(apiUrl)
  );
};
