import { API_URI } from "@saleor/config";
import { HttpLink } from "apollo-client-preset";

export const linkOptions: HttpLink.Options = {
  credentials: "include",
  uri: API_URI
};
