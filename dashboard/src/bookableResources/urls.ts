import {
  ActiveTab,
  BulkAction,
  Dialog,
  Filters,
  Pagination,
  SingleAction,
  Sort,
  TabActionDialog
} from "@saleor/types";
import { stringifyQs } from "@saleor/utils/urls";
import urlJoin from "url-join";

const bookableResourceSection = "/bookable-resources/";

// 1. List section
export const resourceListPath = bookableResourceSection;

export const resourceListUrl = (params?: ResourceListUrlQueryParams): string =>
  bookableResourceSection + "?" + stringifyQs(params);

export type ResourceListUrlDialog = "delete" | TabActionDialog;

export enum ResourceListUrlSortField {
  name = "name",
  quantity = "quantity",
  isActive = "isActive",
  shop = "shop"
}
export enum ResourceListUrlFiltersEnum {
  query = "query"
}

export type ResourceListUrlFilters = Filters<ResourceListUrlFiltersEnum>;

export type ResourceListUrlSort = Sort<ResourceListUrlSortField>;

export interface ResourceListUrlQueryParams
  extends BulkAction,
    Dialog<ResourceListUrlDialog>,
    ResourceListUrlFilters,
    ResourceListUrlSort,
    Pagination,
    ActiveTab {}

// 2. Create / update sections
export const bookableResourcePath = (id: string) =>
  urlJoin(bookableResourceSection + id);
export const bookableResourceAddPath = urlJoin(bookableResourceSection, "add");

export const bookableResourceUrl = (
  id: string,
  params?: BookableResourceUrlQueryParams
) => bookableResourcePath(encodeURIComponent(id)) + "?" + stringifyQs(params);

export type BookableResourceUrlDialog = "remove";
export type BookableResourceCreateUrlQueryParams = SingleAction;
export type BookableResourceUrlQueryParams = BulkAction &
  Dialog<BookableResourceUrlDialog> &
  SingleAction;
