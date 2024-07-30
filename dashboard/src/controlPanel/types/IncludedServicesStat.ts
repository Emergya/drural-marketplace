/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DateTimeRangeInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: IncludedServicesStat
// ====================================================

export interface IncludedServicesStat_productAdditionStat {
  __typename: "ProductStat";
  /**
   * Products added in a single day
   */
  total: number | null;
  /**
   * Date when products have been added.
   */
  date: any | null;
}

export interface IncludedServicesStat {
  productAdditionStat: (IncludedServicesStat_productAdditionStat | null)[] | null;
}

export interface IncludedServicesStatVariables {
  period: DateTimeRangeInput;
}
