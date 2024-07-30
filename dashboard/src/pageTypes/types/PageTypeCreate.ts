/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PageTypeCreateInput, PageErrorCode, AttributeTypeEnum, MeasurementUnitsEnum, AttributeInputTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: PageTypeCreate
// ====================================================

export interface PageTypeCreate_pageTypeCreate_errors {
  __typename: "PageError";
  /**
   * The error code.
   */
  code: PageErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}

export interface PageTypeCreate_pageTypeCreate_pageType_metadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface PageTypeCreate_pageTypeCreate_pageType_privateMetadata {
  __typename: "MetadataItem";
  /**
   * Key of a metadata item.
   */
  key: string;
  /**
   * Value of a metadata item.
   */
  value: string;
}

export interface PageTypeCreate_pageTypeCreate_pageType_attributes {
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
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * The attribute type.
   */
  type: AttributeTypeEnum | null;
  /**
   * Whether the attribute should be visible or not in storefront.
   */
  visibleInStorefront: boolean;
  /**
   * Whether the attribute can be filtered in dashboard.
   */
  filterableInDashboard: boolean;
  /**
   * Whether the attribute can be filtered in storefront.
   */
  filterableInStorefront: boolean;
  /**
   * The unit of attribute values.
   */
  unit: MeasurementUnitsEnum | null;
  /**
   * The input type to use for entering attribute values in the dashboard.
   */
  inputType: AttributeInputTypeEnum | null;
}

export interface PageTypeCreate_pageTypeCreate_pageType {
  __typename: "PageType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (PageTypeCreate_pageTypeCreate_pageType_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (PageTypeCreate_pageTypeCreate_pageType_privateMetadata | null)[];
  /**
   * Page attributes of that page type.
   */
  attributes: (PageTypeCreate_pageTypeCreate_pageType_attributes | null)[] | null;
}

export interface PageTypeCreate_pageTypeCreate {
  __typename: "PageTypeCreate";
  errors: PageTypeCreate_pageTypeCreate_errors[];
  pageType: PageTypeCreate_pageTypeCreate_pageType | null;
}

export interface PageTypeCreate {
  /**
   * Create a new page type.
   */
  pageTypeCreate: PageTypeCreate_pageTypeCreate | null;
}

export interface PageTypeCreateVariables {
  input: PageTypeCreateInput;
}
