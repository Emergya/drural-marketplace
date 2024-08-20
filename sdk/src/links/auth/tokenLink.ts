import { setContext } from "apollo-link-context";
import { getAuthToken } from "../../auth";
import { authorizationHeaderKey } from "./utils";

export const tokenLink = setContext((_, context) => {
  const authToken = getAuthToken();

  if (authToken) {
    return {
      ...context,
      headers: {
        ...context.headers,
        [authorizationHeaderKey]: authToken ? `JWT ${authToken}` : null,
      },
    };
  }
  return context;
});
