import {
  ResourceListUrlFilters,
  ResourceListUrlFiltersEnum,
  ResourceListUrlQueryParams
} from "@saleor/bookableResources/urls";
import { createFilterTabUtils, createFilterUtils } from "@saleor/utils/filters";

export const RESOURCE_FILTERS_KEY = "resourceFilters";
export const {
  deleteFilterTab,
  getFilterTabs,
  saveFilterTab
} = createFilterTabUtils<ResourceListUrlFilters>(RESOURCE_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters } = createFilterUtils<
  ResourceListUrlQueryParams,
  ResourceListUrlFilters
>({
  ...ResourceListUrlFiltersEnum
});

export function getFilterVariables(params: ResourceListUrlFilters) {
  return {
    search: params.query
  };
}
