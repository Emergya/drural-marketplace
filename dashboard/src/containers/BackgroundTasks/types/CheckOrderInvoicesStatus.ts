/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { JobStatusEnum } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: CheckOrderInvoicesStatus
// ====================================================

export interface CheckOrderInvoicesStatus_order_invoices {
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

export interface CheckOrderInvoicesStatus_order {
  __typename: "Order";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of order invoices.
   */
  invoices: (CheckOrderInvoicesStatus_order_invoices | null)[] | null;
}

export interface CheckOrderInvoicesStatus {
  /**
   * Look up an order by ID.
   */
  order: CheckOrderInvoicesStatus_order | null;
}

export interface CheckOrderInvoicesStatusVariables {
  id: string;
}
