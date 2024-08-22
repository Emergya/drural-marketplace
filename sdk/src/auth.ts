import { GraphQLError } from "graphql";
import { LocalStorageItems } from "./helpers";

import { findValueInEnum } from "./utils";

export enum JWTError {
  invalid = "InvalidTokenError",
  invalidSignature = "InvalidSignatureError",
  expired = "ExpiredSignatureError",
}

export function isJwtError(error: GraphQLError): boolean {
  let jwtError: boolean;
  try {
    jwtError = !!findValueInEnum(error.extensions?.exception.code, JWTError);
  } catch (e) {
    jwtError = false;
  }

  return jwtError;
}

export function getTokens() {
  try {
    const authToken = localStorage.getItem(LocalStorageItems.TOKEN);
    const csrfToken = localStorage.getItem(LocalStorageItems.CSRF_TOKEN);
    return { authToken, csrfToken };
  } catch {
    return null;
  }
}

export function getAuthToken(): string | null {
  try {
    return localStorage.getItem(LocalStorageItems.TOKEN);
  } catch {
    return null;
  }
}

export function setAuthToken(auth: string) {
  localStorage.setItem(LocalStorageItems.TOKEN, auth);
  const authEvent = new Event("auth");
  dispatchEvent(authEvent);
}

export const removeAtuhToken = () => {
  localStorage.removeItem(LocalStorageItems.TOKEN);
  const authEvent = new Event("auth");
  dispatchEvent(authEvent);
};
