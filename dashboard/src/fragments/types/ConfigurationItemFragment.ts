/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ConfigurationTypeFieldEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: ConfigurationItemFragment
// ====================================================

export interface ConfigurationItemFragment {
  __typename: "ConfigurationItem";
  /**
   * Name of the field.
   */
  name: string;
  /**
   * Current value of the field.
   */
  value: string | null;
  /**
   * Type of the field.
   */
  type: ConfigurationTypeFieldEnum | null;
  /**
   * Help text for the field.
   */
  helpText: string | null;
  /**
   * Label for the field.
   */
  label: string | null;
}
