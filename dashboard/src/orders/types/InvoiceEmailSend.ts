/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InvoiceErrorCode, JobStatusEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: InvoiceEmailSend
// ====================================================

export interface InvoiceEmailSend_invoiceSendNotification_errors {
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

export interface InvoiceEmailSend_invoiceSendNotification_invoice {
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

export interface InvoiceEmailSend_invoiceSendNotification {
  __typename: "InvoiceSendNotification";
  errors: InvoiceEmailSend_invoiceSendNotification_errors[];
  invoice: InvoiceEmailSend_invoiceSendNotification_invoice | null;
}

export interface InvoiceEmailSend {
  /**
   * Send an invoice notification to the customer.
   */
  invoiceSendNotification: InvoiceEmailSend_invoiceSendNotification | null;
}

export interface InvoiceEmailSendVariables {
  id: string;
}
