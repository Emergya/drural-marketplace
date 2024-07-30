/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AttributeInputTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: AttributeTranslationFragment
// ====================================================

export interface AttributeTranslationFragment_translation {
  __typename: "AttributeTranslation";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface AttributeTranslationFragment_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * The input type to use for entering attribute values in the dashboard.
   */
  inputType: AttributeInputTypeEnum | null;
}

export interface AttributeTranslationFragment {
  __typename: "AttributeTranslatableContent";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * Returns translated attribute fields for the given language code.
   */
  translation: AttributeTranslationFragment_translation | null;
  /**
   * Custom attribute of a product.
   */
  attribute: AttributeTranslationFragment_attribute | null;
}
