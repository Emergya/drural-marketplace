/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AttributeCreateInput, AttributeErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AttributeCreate
// ====================================================

export interface AttributeCreate_attributeCreate_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface AttributeCreate_attributeCreate_errors {
  __typename: "AttributeError";
  /**
   * The error code.
   */
  code: AttributeErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}

export interface AttributeCreate_attributeCreate {
  __typename: "AttributeCreate";
  attribute: AttributeCreate_attributeCreate_attribute | null;
  errors: AttributeCreate_attributeCreate_errors[];
}

export interface AttributeCreate {
  /**
   * Creates an attribute.
   */
  attributeCreate: AttributeCreate_attributeCreate | null;
}

export interface AttributeCreateVariables {
  input: AttributeCreateInput;
}
