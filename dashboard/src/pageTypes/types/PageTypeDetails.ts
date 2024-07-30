/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AttributeTypeEnum, MeasurementUnitsEnum, AttributeInputTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: PageTypeDetails
// ====================================================

export interface PageTypeDetails_pageType_metadata {
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

export interface PageTypeDetails_pageType_privateMetadata {
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

export interface PageTypeDetails_pageType_attributes {
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

export interface PageTypeDetails_pageType {
  __typename: "PageType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (PageTypeDetails_pageType_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (PageTypeDetails_pageType_privateMetadata | null)[];
  /**
   * Page attributes of that page type.
   */
  attributes: (PageTypeDetails_pageType_attributes | null)[] | null;
  /**
   * Whether page type has pages assigned.
   */
  hasPages: boolean | null;
}

export interface PageTypeDetails {
  /**
   * Look up a page type by ID.
   */
  pageType: PageTypeDetails_pageType | null;
}

export interface PageTypeDetailsVariables {
  id: string;
}
