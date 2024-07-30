/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BookableResourceDayEnum } from "./../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: BookingProductDetailsQuery
// ====================================================

export interface BookingProductDetailsQuery_product_defaultVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface BookingProductDetailsQuery_product_bookableResources_edges_node_calendar {
  __typename: "BookableResourceDailyCalendar";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Day of the week.
   */
  day: BookableResourceDayEnum | null;
}

export interface BookingProductDetailsQuery_product_bookableResources_edges_node {
  __typename: "BookableResource";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The weekly calendar of the resource.
   */
  calendar: (BookingProductDetailsQuery_product_bookableResources_edges_node_calendar | null)[] | null;
}

export interface BookingProductDetailsQuery_product_bookableResources_edges {
  __typename: "BookableResourceCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: BookingProductDetailsQuery_product_bookableResources_edges_node;
}

export interface BookingProductDetailsQuery_product_bookableResources {
  __typename: "BookableResourceCountableConnection";
  edges: BookingProductDetailsQuery_product_bookableResources_edges[];
}

export interface BookingProductDetailsQuery_product_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface BookingProductDetailsQuery_product_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface BookingProductDetailsQuery_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  slug: string;
  name: string;
  defaultVariant: BookingProductDetailsQuery_product_defaultVariant | null;
  isBookable: boolean;
  duration: number | null;
  /**
   * List of the bookable resouces.
   */
  bookableResources: BookingProductDetailsQuery_product_bookableResources | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: BookingProductDetailsQuery_product_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: BookingProductDetailsQuery_product_thumbnail2x | null;
}

export interface BookingProductDetailsQuery {
  /**
   * Look up a product by ID.
   */
  product: BookingProductDetailsQuery_product | null;
}

export interface BookingProductDetailsQueryVariables {
  slug?: string | null;
}
