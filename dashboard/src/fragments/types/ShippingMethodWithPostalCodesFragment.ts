/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PostalCodeRuleInclusionTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: ShippingMethodWithPostalCodesFragment
// ====================================================

export interface ShippingMethodWithPostalCodesFragment_postalCodeRules {
  __typename: "ShippingMethodPostalCodeRule";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Inclusion type of the postal code rule.
   */
  inclusionType: PostalCodeRuleInclusionTypeEnum | null;
  /**
   * Start address range.
   */
  start: string | null;
  /**
   * End address range.
   */
  end: string | null;
}

export interface ShippingMethodWithPostalCodesFragment {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Postal code ranges rule of exclusion or inclusion of the shipping method.
   */
  postalCodeRules: (ShippingMethodWithPostalCodesFragment_postalCodeRules | null)[] | null;
}
