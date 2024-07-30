import { PermissionEnum } from "@saleor/types/globalTypes";

export interface IPermission {
  __typename: string;
  /**
   * Internal code for permission.
   */
  code: PermissionEnum;
  /**
   * Describe action(s) allowed to do by permission.
   */
  name: string;
}
