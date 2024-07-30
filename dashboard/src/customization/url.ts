import { PageListUrlQueryParams } from "@saleor/pages/urls";
import { stringifyQs } from "@saleor/utils/urls";

export const customizationSection = "/customization/";

export const customizationListUrl = (params?: PageListUrlQueryParams) =>
  customizationSection + "?" + stringifyQs(params);
