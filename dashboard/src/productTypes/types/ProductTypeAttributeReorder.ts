/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReorderInput, ProductAttributeType, AttributeTypeEnum, MeasurementUnitsEnum, AttributeInputTypeEnum, WeightUnitsEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ProductTypeAttributeReorder
// ====================================================

export interface ProductTypeAttributeReorder_productTypeReorderAttributes_errors {
  __typename: "ProductError";
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

export interface ProductTypeAttributeReorder_productTypeReorderAttributes_productType_taxType {
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

export interface ProductTypeAttributeReorder_productTypeReorderAttributes_productType_metadata {
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

export interface ProductTypeAttributeReorder_productTypeReorderAttributes_productType_privateMetadata {
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

export interface ProductTypeAttributeReorder_productTypeReorderAttributes_productType_productAttributes {
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

export interface ProductTypeAttributeReorder_productTypeReorderAttributes_productType_variantAttributes {
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

export interface ProductTypeAttributeReorder_productTypeReorderAttributes_productType_weight {
  __typename: "Weight";
  /**
   * Weight unit.
   */
  unit: WeightUnitsEnum;
  /**
   * Weight value.
   */
  value: number;
}

export interface ProductTypeAttributeReorder_productTypeReorderAttributes_productType {
  __typename: "ProductType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  hasVariants: boolean;
  isShippingRequired: boolean;
  /**
   * A type of tax. Assigned by enabled tax gateway
   */
  taxType: ProductTypeAttributeReorder_productTypeReorderAttributes_productType_taxType | null;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ProductTypeAttributeReorder_productTypeReorderAttributes_productType_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (ProductTypeAttributeReorder_productTypeReorderAttributes_productType_privateMetadata | null)[];
  /**
   * Product attributes of that product type.
   */
  productAttributes: (ProductTypeAttributeReorder_productTypeReorderAttributes_productType_productAttributes | null)[] | null;
  /**
   * Variant attributes of that product type.
   */
  variantAttributes: (ProductTypeAttributeReorder_productTypeReorderAttributes_productType_variantAttributes | null)[] | null;
  weight: ProductTypeAttributeReorder_productTypeReorderAttributes_productType_weight | null;
}

export interface ProductTypeAttributeReorder_productTypeReorderAttributes {
  __typename: "ProductTypeReorderAttributes";
  errors: ProductTypeAttributeReorder_productTypeReorderAttributes_errors[];
  /**
   * Product type from which attributes are reordered.
   */
  productType: ProductTypeAttributeReorder_productTypeReorderAttributes_productType | null;
}

export interface ProductTypeAttributeReorder {
  /**
   * Reorder the attributes of a product type.
   */
  productTypeReorderAttributes: ProductTypeAttributeReorder_productTypeReorderAttributes | null;
}

export interface ProductTypeAttributeReorderVariables {
  move: ReorderInput;
  productTypeId: string;
  type: ProductAttributeType;
}
