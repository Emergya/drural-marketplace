import { AccountErrorCode } from "@saleor/types/globalTypes";

export interface IAccountError {
  __typename: "AccountError" | "StaffError";
  /**
   * The error code.
   */
  code: AccountErrorCode;
  /**
   * The error message.
   */
  message?: string | null;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}
