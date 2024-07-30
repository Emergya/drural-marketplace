import { UseSearchResult } from "@saleor/hooks/makeSearch";
import { findValueInEnum, joinDateTime, maybe } from "@saleor/misc";
import {
  ProductFilterKeys,
  ProductListFilterOpts,
  ServiceStatusEnum
} from "@saleor/products/components/ProductListPage";
import { InitialProductFilterCategories_categories_edges_node } from "@saleor/products/types/InitialProductFilterCategories";
import { InitialProductFilterCollections_collections_edges_node } from "@saleor/products/types/InitialProductFilterCollections";
import {
  SearchCategories,
  SearchCategoriesVariables
} from "@saleor/searches/types/SearchCategories";
import {
  SearchCollections,
  SearchCollectionsVariables
} from "@saleor/searches/types/SearchCollections";
import { ProductFilterInput } from "@saleor/types/globalTypes";
import { mapEdgesToItems, mapNodeToChoice } from "@saleor/utils/maps";

import { IFilterElement } from "../../../components/Filter";
import {
  createFilterTabUtils,
  createFilterUtils,
  dedupeFilter,
  getGteLteVariables,
  getMinMaxQueryParam,
  getMultipleValueQueryParam,
  getSingleEnumValueQueryParam
} from "../../../utils/filters";
import {
  ProductListUrlFilters,
  ProductListUrlFiltersEnum,
  ProductListUrlFiltersWithMultipleValues,
  ProductListUrlQueryParams
} from "../../urls";
export const PRODUCT_FILTERS_KEY = "productFilters";

export function getFilterOpts(
  params: ProductListUrlFilters,
  categories: {
    initial: InitialProductFilterCategories_categories_edges_node[];
    search: UseSearchResult<SearchCategories, SearchCategoriesVariables>;
  },
  collections: {
    initial: InitialProductFilterCollections_collections_edges_node[];
    search: UseSearchResult<SearchCollections, SearchCollectionsVariables>;
  }
): ProductListFilterOpts {
  return {
    status: {
      active: !!maybe(() => params.status),
      value: maybe(() => findValueInEnum(params.status, ServiceStatusEnum))
    },
    createdDate: {
      active: maybe(
        () =>
          [params.createdFrom, params.createdTo].some(
            field => field !== undefined
          ),
        false
      ),
      value: {
        max: maybe(() => params.createdTo, ""),
        min: maybe(() => params.createdFrom, "")
      }
    },
    modifiedDate: {
      active: maybe(
        () =>
          [params.modifiedFrom, params.modifiedTo].some(
            field => field !== undefined
          ),
        false
      ),
      value: {
        max: maybe(() => params.modifiedTo, ""),
        min: maybe(() => params.modifiedFrom, "")
      }
    },
    categories: {
      active: !!params.categories,
      choices: mapNodeToChoice(
        mapEdgesToItems(categories?.search?.result?.data?.search)
      ),
      displayValues: !!params.categories
        ? maybe(
            () =>
              categories.initial.map(category => ({
                label: category.name,
                value: category.id
              })),
            []
          )
        : [],
      hasMore: maybe(
        () => categories.search.result.data.search.pageInfo.hasNextPage,
        false
      ),
      initialSearch: "",
      loading: categories.search.result.loading,
      onFetchMore: categories.search.loadMore,
      onSearchChange: categories.search.search,
      value: dedupeFilter(params.categories || [])
    },
    collections: {
      active: !!params.collections,
      choices: mapNodeToChoice(
        mapEdgesToItems(collections?.search?.result?.data?.search)
      ),
      displayValues: !!params.collections
        ? maybe(
            () =>
              collections.initial.map(category => ({
                label: category.name,
                value: category.id
              })),
            []
          )
        : [],
      hasMore: maybe(
        () => collections.search.result.data.search.pageInfo.hasNextPage,
        false
      ),
      initialSearch: "",
      loading: collections.search.result.loading,
      onFetchMore: collections.search.loadMore,
      onSearchChange: collections.search.search,
      value: dedupeFilter(params.collections || [])
    },
    price: {
      active: maybe(
        () =>
          [params.priceFrom, params.priceTo].some(field => field !== undefined),
        false
      ),
      value: {
        max: maybe(() => params.priceTo, "0"),
        min: maybe(() => params.priceFrom, "0")
      }
    }
  };
}

const getServiceStatusValue = (status: string): boolean | undefined => {
  if (status === ServiceStatusEnum.ACTIVE) {
    return true;
  }
  if (status === ServiceStatusEnum.DEACTIVE) {
    return false;
  }
};

export function getFilterVariables(
  params: ProductListUrlFilters,
  isChannelSelected: boolean
): ProductFilterInput {
  return {
    isPublished: getServiceStatusValue(params.status),
    createdDate: getGteLteVariables({
      gte: joinDateTime(params.createdFrom),
      lte: joinDateTime(params.createdTo)
    }),
    modifiedDate: getGteLteVariables({
      gte: joinDateTime(params.modifiedFrom),
      lte: joinDateTime(params.modifiedTo)
    }),
    categories: params.categories !== undefined ? params.categories : null,
    collections: params.collections !== undefined ? params.collections : null,
    price: isChannelSelected
      ? getGteLteVariables({
          gte: parseFloat(params.priceFrom),
          lte: parseFloat(params.priceTo)
        })
      : null,
    search: params.query
  };
}

export function getFilterQueryParam(
  filter: IFilterElement<ProductFilterKeys>,
  params: ProductListUrlFilters
): ProductListUrlFilters {
  const { active, group, name, value } = filter;

  if (!!group) {
    const rest = params && params[group] ? params[group] : undefined;

    return {
      [group]: active
        ? {
            ...(rest === undefined ? {} : rest),
            [name]: value
          }
        : rest
    };
  }

  switch (name) {
    case ProductFilterKeys.status:
      return getSingleEnumValueQueryParam(
        filter,
        ProductListUrlFiltersEnum.status,
        ServiceStatusEnum
      );
    case ProductFilterKeys.createdDate:
      return getMinMaxQueryParam(
        filter,
        ProductListUrlFiltersEnum.createdFrom,
        ProductListUrlFiltersEnum.createdTo
      );
    case ProductFilterKeys.modifiedDate:
      return getMinMaxQueryParam(
        filter,
        ProductListUrlFiltersEnum.modifiedFrom,
        ProductListUrlFiltersEnum.modifiedTo
      );
    case ProductFilterKeys.categories:
      return getMultipleValueQueryParam(
        filter,
        ProductListUrlFiltersWithMultipleValues.categories
      );

    case ProductFilterKeys.collections:
      return getMultipleValueQueryParam(
        filter,
        ProductListUrlFiltersWithMultipleValues.collections
      );

    case ProductFilterKeys.price:
      return getMinMaxQueryParam(
        filter,
        ProductListUrlFiltersEnum.priceFrom,
        ProductListUrlFiltersEnum.priceTo
      );
  }
}

export const {
  deleteFilterTab,
  getFilterTabs,
  saveFilterTab
} = createFilterTabUtils<ProductListUrlFilters>(PRODUCT_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters } = createFilterUtils<
  ProductListUrlQueryParams,
  ProductListUrlFilters
>({
  ...ProductListUrlFiltersEnum,
  ...ProductListUrlFiltersWithMultipleValues
});
