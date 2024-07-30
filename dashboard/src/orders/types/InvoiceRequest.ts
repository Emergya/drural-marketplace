/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InvoiceErrorCode, JobStatusEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: InvoiceRequest
// ====================================================

export interface InvoiceRequest_invoiceRequest_errors {
  __typename: "InvoiceError";
  /**
   * The error code.
   */
  code: InvoiceErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
}

export interface InvoiceRequest_invoiceRequest_invoice {
  __typename: "Invoice";
  /**
   * The ID of the object.
   */
  id: string;
  number: string | null;
  /**
   * Created date time of job in ISO 8601 format.
   */
  createdAt: any;
  /**
   * URL to download an invoice.
   */
  url: string | null;
  /**
   * Job status.
   */
  status: JobStatusEnum;
}

export interface InvoiceRequest_invoiceRequest_order_invoices {
  __typename: "Invoice";
  /**
   * The ID of the object.
   */
  id: string;
  number: string | null;
  /**
   * Created date time of job in ISO 8601 format.
   */
  createdAt: any;
  /**
   * URL to download an invoice.
   */
  url: string | null;
  /**
   * Job status.
   */
  status: JobStatusEnum;
}

export interface InvoiceRequest_invoiceRequest_order {
  __typename: "Order";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of order invoices.
   */
  invoices: (InvoiceRequest_invoiceRequest_order_invoices | null)[] | null;
}

export interface InvoiceRequest_invoiceRequest {
  __typename: "InvoiceRequest";
  errors: InvoiceRequest_invoiceRequest_errors[];
  invoice: InvoiceRequest_invoiceRequest_invoice | null;
  /**
   * Order related to an invoice.
   */
  order: InvoiceRequest_invoiceRequest_order | null;
}

export interface InvoiceRequest {
  /**
   * Request an invoice for the order using plugin.
   */
  invoiceRequest: InvoiceRequest_invoiceRequest | null;
}

export interface InvoiceRequestVariables {
  orderId: string;
}
