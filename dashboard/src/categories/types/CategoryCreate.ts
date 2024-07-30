/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategoryInput, ProductErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CategoryCreate
// ====================================================

export interface CategoryCreate_categoryCreate_category_metadata {
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

export interface CategoryCreate_categoryCreate_category_privateMetadata {
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

export interface CategoryCreate_categoryCreate_category_parent {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface CategoryCreate_categoryCreate_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (CategoryCreate_categoryCreate_category_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (CategoryCreate_categoryCreate_category_privateMetadata | null)[];
  name: string;
  slug: string;
  description: any | null;
  seoDescription: string | null;
  seoTitle: string | null;
  iconId: string | null;
  parent: CategoryCreate_categoryCreate_category_parent | null;
}

export interface CategoryCreate_categoryCreate_errors {
  __typename: "ProductError";
  /**
   * The error code.
   */
  code: ProductErrorCode;
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

export interface CategoryCreate_categoryCreate {
  __typename: "CategoryCreate";
  category: CategoryCreate_categoryCreate_category | null;
  errors: CategoryCreate_categoryCreate_errors[];
}

export interface CategoryCreate {
  /**
   * Creates a new category.
   */
  categoryCreate: CategoryCreate_categoryCreate | null;
}

export interface CategoryCreateVariables {
  parent?: string | null;
  input: CategoryInput;
}
