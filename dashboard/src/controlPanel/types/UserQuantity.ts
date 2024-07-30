/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DateTimeRangeInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: UserQuantity
// ====================================================

export interface UserQuantity_userQuantityStat {
  __typename: "UserStat";
  /**
   * Total users registered at that date
   */
  total: number | null;
  /**
   * Date when we mesure the concurrent users.
   */
  date: any | null;
}

export interface UserQuantity {
  /**
   * The accumulative number of users by date.
   */
  userQuantityStat: (UserQuantity_userQuantityStat | null)[] | null;
}

export interface UserQuantityVariables {
  period: DateTimeRangeInput;
}
