import { stringifyQs } from "@saleor/utils/urls";
import urlJoin from "url-join";

import { Dialog, SingleAction } from "../types";
import { userPath, UserSections } from "../users/urls";

// 1. Section
const { customers: customerSection } = UserSections;

// 2. List
export const customerListPath = customerSection;

// 4. Add
export const customerAddPath = urlJoin(customerSection, "add");
export const customerAddUrl = customerAddPath;

// 5. Address
export const customerAddressesPath = (id: string) =>
  urlJoin(userPath(customerSection, id), "addresses");
export type CustomerAddressesUrlDialog = "add" | "edit" | "remove";
export type CustomerAddressesUrlQueryParams = Dialog<
  CustomerAddressesUrlDialog
> &
  SingleAction;
export const customerAddressesUrl = (
  id: string,
  params?: CustomerAddressesUrlQueryParams
) => customerAddressesPath(encodeURIComponent(id)) + "?" + stringifyQs(params);
