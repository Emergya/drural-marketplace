import {
  BusinessActiveShopEnum,
  BusinessesFilterKeys,
  BusinessListFilterOpts
} from "@saleor/business/components/BusinessesListPage";
import {
  BusinessesListUrlFilters,
  BusinessesListUrlFiltersEnum,
  BusinessesListUrlFiltersWithMultipleValues,
  BusinessesListUrlQueryParams
} from "@saleor/business/urls";
import { IFilterElement } from "@saleor/components/Filter";
import { findValueInEnum, joinDateTime, maybe } from "@saleor/misc";
import {
  CompanyFilterInput,
  CompanyStatusEnum,
  FilterAddressFieldEnum,
  FilterAddressInput
} from "@saleor/types/globalTypes";
import {
  createFilterTabUtils,
  createFilterUtils,
  dedupeFilter,
  getGteLteVariables,
  getMinMaxQueryParam,
  getMultipleEnumValueQueryParam,
  getSingleValueQueryParam
} from "@saleor/utils/filters";

export const BUSSINESSES_FILTERS_KEY = "bussinessesFilters";

export function getFilterOpts(
  params: BusinessesListUrlFilters
): BusinessListFilterOpts {
  return {
    created: {
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
    status: {
      active: !!maybe(() => params.status),
      value: maybe(
        () =>
          dedupeFilter(
            params.status.map(status =>
              findValueInEnum(status, CompanyStatusEnum)
            )
          ),
        []
      )
    },
    activeShop: {
      active: !!maybe(() => params.activeShop),
      value: maybe(
        () =>
          dedupeFilter(
            params.activeShop.map(active =>
              findValueInEnum(active, BusinessActiveShopEnum)
            )
          ),
        []
      )
    },
    locality: {
      active: !!params?.locality,
      value: params?.locality
    },
    postalCode: {
      active: !!params?.postalCode,
      value: params?.postalCode
    }
  };
}

const getIsActiveShopFilterData = (
  activeShop: string[] = []
): boolean | undefined => {
  if (activeShop.includes(BusinessActiveShopEnum.ACTIVE)) {
    return true;
  }
  if (activeShop.includes(BusinessActiveShopEnum.DEACTIVE)) {
    return false;
  }
};

const getAddressFilterData = (
  params: BusinessesListUrlFilters
): FilterAddressInput[] => {
  const { locality, postalCode } = params;
  const addressFilterData: FilterAddressInput[] = [];

  if (locality) {
    addressFilterData.push({
      field: FilterAddressFieldEnum.LOCALITY,
      value: locality
    });
  }
  if (postalCode) {
    addressFilterData.push({
      field: FilterAddressFieldEnum.POSTAL_CODE,
      value: postalCode
    });
  }

  return addressFilterData;
};

export function getFilterVariables(
  params: BusinessesListUrlFilters
): CompanyFilterInput {
  return {
    search: params.query,
    createdDate: getGteLteVariables({
      gte: joinDateTime(params.createdFrom),
      lte: joinDateTime(params.createdTo)
    }),
    status:
      params.status &&
      params.status.map(status => findValueInEnum(status, CompanyStatusEnum)),
    isEnabled: getIsActiveShopFilterData(params.activeShop),
    address: getAddressFilterData(params)
  };
}

export function getFilterQueryParam(
  filter: IFilterElement<BusinessesFilterKeys>
): BusinessesListUrlFilters {
  const { name } = filter;

  switch (name) {
    case BusinessesFilterKeys.created:
      return getMinMaxQueryParam(
        filter,
        BusinessesListUrlFiltersEnum.createdFrom,
        BusinessesListUrlFiltersEnum.createdTo
      );

    case BusinessesFilterKeys.status:
      return getMultipleEnumValueQueryParam(
        filter,
        BusinessesListUrlFiltersWithMultipleValues.status,
        CompanyStatusEnum
      );

    case BusinessesFilterKeys.activeShop:
      return getMultipleEnumValueQueryParam(
        filter,
        BusinessesListUrlFiltersWithMultipleValues.activeShop,
        BusinessActiveShopEnum
      );

    case BusinessesFilterKeys.locality:
      return getSingleValueQueryParam(
        filter,
        BusinessesListUrlFiltersEnum.locality
      );

    case BusinessesFilterKeys.postalCode:
      return getSingleValueQueryParam(
        filter,
        BusinessesListUrlFiltersEnum.postalCode
      );
  }
}

export const {
  deleteFilterTab,
  getFilterTabs,
  saveFilterTab
} = createFilterTabUtils<BusinessesListUrlFilters>(BUSSINESSES_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters } = createFilterUtils<
  BusinessesListUrlQueryParams,
  BusinessesListUrlFilters
>({
  ...BusinessesListUrlFiltersEnum,
  ...BusinessesListUrlFiltersWithMultipleValues
});
