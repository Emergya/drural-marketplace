/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable no-prototype-builtins */
import jwt_decode, { JwtPayload } from "jwt-decode";
import { Operation } from "apollo-link";
import {
  RefreshTokenVariables,
  RefreshToken_tokenRefresh,
} from "../../../mutations/gqlTypes/RefreshToken";
import { setAuthToken, getTokens, removeAtuhToken } from "../../../auth";
import { IParseBoby, ServerError, ServerParseError } from "./types";

// IMPORTANT: This is the of the object refurned from the refreshTokenQuery (see below).
// If not well set, fetch query will lead to and error: handleError will be run,
// and handleFetch function will be skiped.
export const accessTokenField = "tokenRefresh";

export const isTokenExpired = (token: string): boolean => {
  try {
    return jwt_decode<JwtPayload>(token).exp! <= Date.now() / 1000;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`[JWT decode error]: ${error}`);
    return false;
  }
};

export const isTokenValidOrUndefined = (): boolean => {
  const { authToken } = getTokens() || {};
  return !authToken || (!!authToken && !isTokenExpired(authToken));
};

const refreshTokenQuery = `
  mutation RefreshToken($csrfToken: String!) {
    ${accessTokenField}(csrfToken: $csrfToken) {
      token
      errors {
        code
        field
        message
      }
    }
  }
`;

export const fetchAccessToken = (apiUrl: string): Promise<Response> => {
  const { csrfToken } = getTokens() || {};

  return fetch(apiUrl, {
    body: JSON.stringify({
      query: refreshTokenQuery,
      variables: { csrfToken } as Omit<RefreshTokenVariables, "refreshToken">,
    }),
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    mode: "cors",
  });
};

const throwServerError = (
  response: Response,
  result: Record<string, any>,
  message: string | undefined
) => {
  const error = new Error(message) as ServerError;

  error.response = response;
  error.statusCode = response.status;
  error.result = result;

  throw error;
};

export const handleResponse = (operation: Operation, tokenField: string) => (
  response: Response
) =>
  response
    .text()
    .then(bodyText => {
      if (typeof bodyText !== "string" || !bodyText.length) {
        // return empty body immediately
        return bodyText || "";
      }

      try {
        return JSON.parse(bodyText);
      } catch (err) {
        const parseError = err as ServerParseError;
        parseError.response = response;
        parseError.statusCode = response.status;
        parseError.bodyText = bodyText;
        return Promise.reject(parseError);
      }
    })
    .then((parsedBody: IParseBoby) => {
      if (response.status >= 300) {
        // Network error
        throwServerError(
          response,
          parsedBody,
          `Response not successful: Received status code ${response.status}`
        );
      }

      if (
        (parsedBody.errors && parsedBody.errors.length) ||
        parsedBody.data.tokenRefresh.errors.length
      ) {
        // GraphQL error
        throwServerError(
          response,
          parsedBody,
          `GraphQL error while refreshing token.`
        );
      }
      if (
        !parsedBody.hasOwnProperty(tokenField) &&
        parsedBody.data &&
        !parsedBody.data.hasOwnProperty(tokenField) &&
        !parsedBody.hasOwnProperty("errors")
      ) {
        // token can be delivered via apollo query (body.data) or as usual
        // Data error
        throwServerError(
          response,
          parsedBody,
          `Server response was missing for query '${operation.operationName}'.`
        );
      }

      return parsedBody;
    });

export const handleFetch = (tokenResponse: string): void => {
  // Conversion needed: response is the tokenRefresh object, not a simple string.
  // This is fixed in apollo-link-token-refresh@0.4.0 by adding some genetic types.
  const typedTokenResponse = (tokenResponse as unknown) as Omit<
    RefreshToken_tokenRefresh,
    "user"
  >;
  const { token } = typedTokenResponse;

  if (token) {
    setAuthToken(token);
  }
};

export const handleError = (
  error: Error,
  tokenExpirationCallback: () => void
): void => {
  // eslint-disable-next-line no-console
  console.error(`[Refresh Token error]: ${error}`);

  removeAtuhToken();
  tokenExpirationCallback();
};
