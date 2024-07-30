import { stringifyQs } from "@saleor/utils/urls";
import urlJoin from "url-join";

import {
  ActiveTab,
  BulkAction,
  Dialog,
  Filters,
  FiltersWithMultipleValues,
  Pagination,
  SingleAction,
  Sort,
  TabActionDialog
} from "../types";

// 0. Section
const orderSectionUrl = "/orders";

// 1. Oder List
type CreateOrderDialog = "create-order";

export const orderListPath = orderSectionUrl;
export enum OrderListUrlFiltersEnum {
  createdFrom = "createdFrom",
  createdTo = "createdTo",
  customer = "customer",
  payment = "payment",
  query = "query"
}
export enum OrderListUrlFiltersWithMultipleValues {
  status = "status",
  channel = "channel"
}

export type OrderListUrlFilters = Filters<OrderListUrlFiltersEnum> &
  FiltersWithMultipleValues<OrderListUrlFiltersWithMultipleValues>;
export type OrderListUrlDialog = "cancel" | CreateOrderDialog | TabActionDialog;
export enum OrderListUrlSortField {
  number = "number",
  customer = "customer",
  date = "date",

  paymentStatus = "paymentStatus",
  status = "status",

  totalSeller = "totalSeller",
  capturedAmount = "capturedAmount",
  refunded = "refunded",
  druralFee = "druralFee",
  stripeFee = "stripeFee",
  totalFee = "totalFee",

  total = "total"
}
export type OrderListUrlSort = Sort<OrderListUrlSortField>;
export type OrderListUrlQueryParams = BulkAction &
  Dialog<OrderListUrlDialog> &
  OrderListUrlFilters &
  OrderListUrlSort &
  Pagination &
  ActiveTab;
export const orderListUrl = (params?: OrderListUrlQueryParams): string => {
  const orderList = orderListPath;
  if (params === undefined) {
    return orderList;
  } else {
    return urlJoin(orderList, "?" + stringifyQs(params));
  }
};

// 2. Booking List
export const bookingListPath = urlJoin(orderSectionUrl, "bookings");

export enum BookingListUrlFiltersEnum {
  bookingFrom = "bookingFrom",
  bookingTo = "bookingTo",
  customer = "customer",
  bookableResource = "bookableResource",
  query = "query"
}
export type BookingListUrlFilters = Filters<BookingListUrlFiltersEnum>;
export type BookingListUrlDialog = TabActionDialog;
export enum BookingListUrlSortField {
  number = "number",
  customer = "customer",
  bookableResource = "bookableResource",
  bookingDate = "bookingDate",
  total = "total"
}
export type BookingListUrlSort = Sort<BookingListUrlSortField>;
export type BookingListUrlQueryParams = BulkAction &
  Dialog<BookingListUrlDialog> &
  BookingListUrlFilters &
  BookingListUrlSort &
  Pagination &
  ActiveTab;

export const bookingListUrl = (params?: BookingListUrlQueryParams): string => {
  const bookingList = bookingListPath;
  if (params === undefined) {
    return bookingList;
  } else {
    return urlJoin(bookingList, "?" + stringifyQs(params));
  }
};

// 3. Oder Drafts
export const orderDraftListPath = urlJoin(orderSectionUrl, "drafts");
export enum OrderDraftListUrlFiltersEnum {
  createdFrom = "createdFrom",
  createdTo = "createdTo",
  customer = "customer",
  query = "query"
}
export type OrderDraftListUrlFilters = Filters<OrderDraftListUrlFiltersEnum>;
export type OrderDraftListUrlDialog =
  | "remove"
  | CreateOrderDialog
  | TabActionDialog;
export enum OrderDraftListUrlSortField {
  number = "number",
  customer = "customer",
  date = "date",
  total = "total"
}
export type OrderDraftListUrlSort = Sort<OrderDraftListUrlSortField>;
export type OrderDraftListUrlQueryParams = ActiveTab &
  BulkAction &
  Dialog<OrderDraftListUrlDialog> &
  OrderDraftListUrlFilters &
  OrderDraftListUrlSort &
  Pagination;
export const orderDraftListUrl = (
  params?: OrderDraftListUrlQueryParams
): string => {
  const orderDraftList = orderDraftListPath;
  if (params === undefined) {
    return orderDraftList;
  } else {
    return urlJoin(orderDraftList, "?" + stringifyQs(params));
  }
};

// 4. Order Details
export const orderPath = (id: string) => urlJoin(orderSectionUrl, id);

export type OrderUrlDialog =
  | "add-order-line"
  | "cancel"
  | "cancel-fulfillment"
  | "capture"
  | "customer-change"
  | "edit-customer-addresses"
  | "edit-billing-address"
  | "edit-fulfillment"
  | "edit-shipping"
  | "edit-shipping-address"
  | "finalize"
  | "mark-paid"
  | "void"
  | "invoice-send";

export type OrderUrlQueryParams = Dialog<OrderUrlDialog> & SingleAction;

export const orderUrl = (id: string, params?: OrderUrlQueryParams) =>
  orderPath(encodeURIComponent(id)) + "?" + stringifyQs(params);

export const orderFulfillPath = (id: string) =>
  urlJoin(orderPath(id), "fulfill");

export const orderReturnPath = (id: string) => urlJoin(orderPath(id), "return");

export const orderFulfillUrl = (id: string) =>
  orderFulfillPath(encodeURIComponent(id));

export const orderSettingsPath = urlJoin(orderSectionUrl, "settings");

export const orderRefundPath = (id: string) => urlJoin(orderPath(id), "refund");

export const orderRefundUrl = (id: string) =>
  orderRefundPath(encodeURIComponent(id));

export const orderReturnUrl = (id: string) =>
  orderReturnPath(encodeURIComponent(id));
