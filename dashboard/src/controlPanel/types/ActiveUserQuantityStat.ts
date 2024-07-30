/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DateTimeRangeInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: ActiveUserQuantityStat
// ====================================================

export interface ActiveUserQuantityStat_activeUserQuantityStat {
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

export interface ActiveUserQuantityStat {
  /**
   * The number of users who log in by date.
   */
  activeUserQuantityStat: (ActiveUserQuantityStat_activeUserQuantityStat | null)[] | null;
}

export interface ActiveUserQuantityStatVariables {
  period: DateTimeRangeInput;
}
