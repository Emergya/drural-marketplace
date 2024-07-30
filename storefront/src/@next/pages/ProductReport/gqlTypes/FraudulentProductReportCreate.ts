/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReportErrorCode } from "./../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: FraudulentProductReportCreate
// ====================================================

export interface FraudulentProductReportCreate_fraudulentProductReportCreate_errors {
  __typename: "ReportError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error code.
   */
  code: ReportErrorCode;
  /**
   * The error message.
   */
  message: string | null;
}

export interface FraudulentProductReportCreate_fraudulentProductReportCreate_fraudulentProductReport_user {
  __typename: "User";
  email: string;
}

export interface FraudulentProductReportCreate_fraudulentProductReportCreate_fraudulentProductReport_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface FraudulentProductReportCreate_fraudulentProductReportCreate_fraudulentProductReport_media {
  __typename: "FraudulentProductReportMedia";
  /**
   * The ID of the object.
   */
  id: string;
  alt: string;
  oembedData: any;
  /**
   * The URL of the media.
   */
  url: string;
}

export interface FraudulentProductReportCreate_fraudulentProductReportCreate_fraudulentProductReport {
  __typename: "FraudulentProductReport";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * User who make the report.
   */
  user: FraudulentProductReportCreate_fraudulentProductReportCreate_fraudulentProductReport_user;
  /**
   * Product that will be reported.
   */
  product: FraudulentProductReportCreate_fraudulentProductReportCreate_fraudulentProductReport_product | null;
  /**
   * Reason of the report.
   */
  reason: string;
  /**
   * Phone number of the user who reports the product.
   */
  phone: string;
  /**
   * List of media for the report.
   */
  media: FraudulentProductReportCreate_fraudulentProductReportCreate_fraudulentProductReport_media[] | null;
}

export interface FraudulentProductReportCreate_fraudulentProductReportCreate {
  __typename: "FraudulentProductReportCreate";
  errors: FraudulentProductReportCreate_fraudulentProductReportCreate_errors[];
  fraudulentProductReport: FraudulentProductReportCreate_fraudulentProductReportCreate_fraudulentProductReport | null;
}

export interface FraudulentProductReportCreate {
  /**
   * Report a fraudulent product.
   */
  fraudulentProductReportCreate: FraudulentProductReportCreate_fraudulentProductReportCreate | null;
}

export interface FraudulentProductReportCreateVariables {
  product: string;
  reason: string;
  phone: string;
  images?: any | null;
}
