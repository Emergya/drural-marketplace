/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AttributeValueTranslationInput, LanguageCodeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateAttributeValueTranslations
// ====================================================

export interface UpdateAttributeValueTranslations_attributeValueTranslate_errors {
  __typename: "TranslationError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface UpdateAttributeValueTranslations_attributeValueTranslate_attributeValue_translation {
  __typename: "AttributeValueTranslation";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  richText: any | null;
}

export interface UpdateAttributeValueTranslations_attributeValueTranslate_attributeValue {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Represents the text (JSON) of the attribute value.
   */
  richText: any | null;
  /**
   * Returns translated attribute value fields for the given language code.
   */
  translation: UpdateAttributeValueTranslations_attributeValueTranslate_attributeValue_translation | null;
}

export interface UpdateAttributeValueTranslations_attributeValueTranslate {
  __typename: "AttributeValueTranslate";
  errors: UpdateAttributeValueTranslations_attributeValueTranslate_errors[];
  attributeValue: UpdateAttributeValueTranslations_attributeValueTranslate_attributeValue | null;
}

export interface UpdateAttributeValueTranslations {
  /**
   * Creates/updates translations for an attribute value.
   */
  attributeValueTranslate: UpdateAttributeValueTranslations_attributeValueTranslate | null;
}

export interface UpdateAttributeValueTranslationsVariables {
  id: string;
  input: AttributeValueTranslationInput;
  language: LanguageCodeEnum;
}
