import { BaseCategory } from "@drural/sdk/lib/fragments/gqlTypes/BaseCategory";
import {
  OrderDirection,
  ProductFilterInput,
  ProductOrder,
  ProductOrderField,
  ProductRatingFilterInput,
  ProductRatingSortingField,
  ProductRatingSortingInput,
} from "gqlTypes/globalTypes";
import { IntlShape } from "react-intl";

import { commonMessages } from "@temp/intl";
import { convertSortByFromStringReviews } from "@utils/reviews";

import { ActiveTab, IQueryParams } from "./types";

export const inicialQueryParams: IQueryParams = {
  activeTab: 0,
  search: undefined,
  category: undefined,
  rating: undefined,
  productsSortBy: undefined,
  reviewsSortBy: `-${ProductRatingSortingField.DATE}`,
};

export const clearProductQueryParams: Partial<IQueryParams> = {
  category: undefined,
  productsSortBy: undefined,
};

export const getProductsFilterVariables = (
  queryParams: IQueryParams
): ProductFilterInput => ({
  category: queryParams.category || null,
  search: queryParams.search || null,
});

export const getProductsSortByVariables = (
  queryParams: IQueryParams
): ProductOrder | undefined => {
  if (queryParams.productsSortBy) {
    return {
      field: queryParams.productsSortBy as ProductOrderField,
      direction: OrderDirection.DESC,
    };
  }
};

export const getReviewsFilterVariables = (
  queryParams: IQueryParams
): ProductRatingFilterInput => ({
  rating: queryParams.rating || null,
});

export const getReviewsSortByVariables = (
  queryParams: IQueryParams
): ProductRatingSortingInput | null | undefined => {
  if (queryParams.reviewsSortBy) {
    return convertSortByFromStringReviews(queryParams.reviewsSortBy);
  }
};

export const getContentTitle = (
  intl: IntlShape,
  activeTab: ActiveTab | undefined,
  categories: BaseCategory[],
  activeCategory: string | undefined
): string | undefined => {
  switch (activeTab) {
    case ActiveTab.ALL_SERVICES:
      return intl.formatMessage(commonMessages.allServices);
    case ActiveTab.BEST_SELLING:
      return intl.formatMessage(commonMessages.bestSelling);
    case ActiveTab.CATEGORIES:
      return (
        categories.find(category => category.id === activeCategory)?.name ||
        intl.formatMessage(commonMessages.categories)
      );
    case ActiveTab.NEW_IN:
      return intl.formatMessage(commonMessages.newIn);
    case ActiveTab.REVIEWS:
      return intl.formatMessage(commonMessages.reviews);
    default:
  }
};

export const getIsReviewTab = (activeTab: ActiveTab | undefined): boolean =>
  activeTab === ActiveTab.REVIEWS;
