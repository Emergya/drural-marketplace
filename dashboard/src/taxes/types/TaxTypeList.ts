/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TaxTypeList
// ====================================================

export interface TaxTypeList_taxTypes {
  __typename: "TaxType";
  /**
   * Description of the tax type.
   */
  description: string | null;
  /**
   * External tax code used to identify given tax group.
   */
  taxCode: string | null;
}

export interface TaxTypeList {
  /**
   * List of all tax rates available from tax gateway.
   */
  taxTypes: (TaxTypeList_taxTypes | null)[] | null;
}
