/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DateTimeRangeInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: BusinessesNumberStats
// ====================================================

export interface BusinessesNumberStats_companyAdditionStat {
  __typename: "CompanyStat";
  /**
   * Date when we mesure the concurrent companies.
   */
  date: any | null;
  /**
   * Total companies registered at that date
   */
  total: number | null;
}

export interface BusinessesNumberStats {
  companyAdditionStat: (BusinessesNumberStats_companyAdditionStat | null)[] | null;
}

export interface BusinessesNumberStatsVariables {
  period: DateTimeRangeInput;
}
