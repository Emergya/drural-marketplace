/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ShippingZoneFragment
// ====================================================

export interface ShippingZoneFragment_metadata {
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

export interface ShippingZoneFragment_privateMetadata {
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

export interface ShippingZoneFragment_countries {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface ShippingZoneFragment {
  __typename: "ShippingZone";
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: (ShippingZoneFragment_metadata | null)[];
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: (ShippingZoneFragment_privateMetadata | null)[];
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of countries available for the method.
   */
  countries: (ShippingZoneFragment_countries | null)[] | null;
  name: string;
  /**
   * Description of a shipping zone.
   */
  description: string | null;
}
