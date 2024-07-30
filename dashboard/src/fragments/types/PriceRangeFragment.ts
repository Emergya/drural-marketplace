/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PriceRangeFragment
// ====================================================

export interface PriceRangeFragment_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface PriceRangeFragment_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: PriceRangeFragment_start_net;
}

export interface PriceRangeFragment_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface PriceRangeFragment_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money without taxes.
   */
  net: PriceRangeFragment_stop_net;
}

export interface PriceRangeFragment {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: PriceRangeFragment_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: PriceRangeFragment_stop | null;
}
