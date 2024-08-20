import { HttpLink } from "apollo-link-http";

export const getLinkOptions = (apiUrl: string): HttpLink.Options => ({
  credentials: "include",
  uri: apiUrl,
});
