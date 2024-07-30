import {
  StripeConnection,
  StripeReturned
} from "@saleor/components/StripeAccountConfiguration/types";
import {
  UserListUrlDialog,
  UserListUrlFilters,
  UserListUrlQueryParams,
  UserListUrlSort,
  UserSections,
  UserUrlQueryParams
} from "@saleor/users/urls";
import { formatApppMountUriToURLJoin } from "@saleor/utils/urls";
import { stringify as stringifyQs } from "qs";
import urlJoin from "url-join";

import { BulkAction } from "../types";
import {
  ActiveTab,
  // BulkAction,
  Columns,
  Dialog,
  Filters,
  FiltersWithMultipleValues,
  Pagination,
  SingleAction,
  Sort,
  TabActionDialog
} from "../types";

// 1. URLs + paths
//  a. Section
export const businessSection = "/business/";
export const businessHomePath = businessSection;

//  b. List
export const businessListPath = urlJoin(businessSection);
export const businessesListUrl = (params?: BusinessesListUrlQueryParams) =>
  businessListPath + "?" + stringifyQs(params);

//  c. Agent list
export const businessAgentListPath = (id: string) =>
  urlJoin(businessPath(id), UserSections.agents);
export const businessAgentListUrl = (
  id: string,
  params?: UserListUrlQueryParams
) => businessAgentListPath(encodeURIComponent(id)) + "?" + stringifyQs(params);

//  d. Add
export const businessCreatePath = urlJoin(businessSection, "create");

//  e. Details
export const businessPath = (id: string) => urlJoin(businessSection + id);
export const businessUrl = (id: string, params?: BusinessUrlQueryParams) =>
  businessPath(encodeURIComponent(id)) + "?" + stringifyQs(params);

// f. Agent details
export const businessAgentPath = (businessId: string, agentId: string) =>
  urlJoin(businessAgentListPath(businessId) + agentId);

export const businessAgentUrl = (
  businessId: string,
  agentId: string,
  params?: UserUrlQueryParams
) =>
  businessAgentPath(
    encodeURIComponent(businessId),
    encodeURIComponent(agentId)
  ) +
  "?" +
  stringifyQs(params);

// Stipe configuration
export const businessStripeConfigurationPath = (id: string) =>
  urlJoin(businessPath(id), "stripe-cofiguration");

export const businessStripeConfigurationUrl = (
  id: string,
  params?: BusinessStripeConfigUrlQueryParams
) =>
  businessStripeConfigurationPath(encodeURIComponent(id)) +
  "?" +
  stringifyQs(params);

export const companyStripeRedirectUrl = (
  origin: string,
  appMountUri: string | null | undefined,
  id: string,
  params?: StripeReturned
) =>
  urlJoin(
    origin,
    formatApppMountUriToURLJoin(appMountUri),
    businessStripeConfigurationUrl(id, params)
  );

// 2. Types + enums

//  a. List
export enum BusinessesListUrlFiltersEnum {
  createdFrom = "createdFrom",
  createdTo = "createdTo",
  locality = "locality",
  postalCode = "postalCode",
  query = "query"
}
export enum BusinessesListUrlFiltersWithMultipleValues {
  status = "status",
  activeShop = "activeShop"
}
export type BusinessesListUrlFilters = Filters<BusinessesListUrlFiltersEnum> &
  FiltersWithMultipleValues<BusinessesListUrlFiltersWithMultipleValues>;
export type BusinessesListUrlDialog = TabActionDialog;
export enum BusinessesListUrlSortField {
  name = "name",
  status = "status",
  activeShop = "activeShop",
  email = "email",
  phone = "phone",
  locality = "locality",
  postalCode = "postalCode",
  sales = "sales"
}
export type BusinessesListUrlSort = Sort<BusinessesListUrlSortField>;
export enum BusinessesListUrlColumnsEnum {
  email = "email",
  phone = "phone",
  locality = "locality",
  postalCode = "postalCode",
  modified = "modified"
}
export type BusinessesListUrlColumns = Columns<BusinessesListUrlColumnsEnum>;
export type BusinessesListUrlQueryParams = ActiveTab &
  Dialog<BusinessesListUrlDialog> &
  Pagination &
  BusinessesListUrlFilters &
  BusinessesListUrlSort &
  BusinessesListUrlColumns;

//  b. Agent list
export type BusinessAgentListUrlDialog = UserListUrlDialog | "invite-agent";
export type BusinessAgentLisUrlQueryParams = ActiveTab &
  BulkAction &
  UserListUrlFilters &
  UserListUrlSort &
  Dialog<BusinessAgentListUrlDialog> &
  Pagination;

// c. Details
export type BusinessUrlDialog =
  | "adminVerification"
  | "cropImage"
  | "removeBanner";
export type BusinessUrlQueryParams = SingleAction & Dialog<BusinessUrlDialog>;

// - Stipe configuration
export type BusinessStripeConfigUrlQueryParams = StripeReturned &
  StripeConnection;

// - Address management
export const businessAddressesPath = (id: string) =>
  urlJoin(businessPath(id), "addresses");
export type BusinessAddressesUrlDialog = "add" | "edit" | "remove";
export type BusinessAddressesUrlQueryParams = Dialog<
  BusinessAddressesUrlDialog
> &
  SingleAction;
export const businessAddressesUrl = (
  id: string,
  params?: BusinessAddressesUrlQueryParams
) => businessAddressesPath(encodeURIComponent(id)) + "?" + stringifyQs(params);
