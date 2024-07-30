/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DateTimeRangeInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: ContractedServicesStat
// ====================================================

export interface ContractedServicesStat_productConsumptionStat {
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

export interface ContractedServicesStat {
  productConsumptionStat: (ContractedServicesStat_productConsumptionStat | null)[] | null;
}

export interface ContractedServicesStatVariables {
  period: DateTimeRangeInput;
}
