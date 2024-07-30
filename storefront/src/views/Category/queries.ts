import {
  ProductList,
  ProductListVariables,
} from "@drural/sdk/lib/queries/gqlTypes/ProductList";
import { productList } from "@drural/sdk/lib/queries/products";
import { RequireOnlyOne } from "@drural/sdk/lib/tsHelpers";

import { useTypedQuery } from "@graphql";
import { channelSlug } from "@temp/constants";
import { PRODUCTS_PER_PAGE } from "@temp/core/config";
import {
  convertSortByFromString,
  convertToAttributeScalar,
} from "@temp/core/utils";
import { IFilters } from "@types";

const isCategoriesFilter = (
  categoryId: string | undefined,
  categoriesFilter: string[] | undefined
) => {
  if (categoriesFilter?.length > 0 && !categoryId) return true;
  return false;
};

export const useProductsQuery = (
  filters: IFilters,
  ids: RequireOnlyOne<{
    categoryId: string | undefined;
    collectionId: string | undefined;
  }>
) => {
  const { categoryId, collectionId } = ids;

  const variables: ProductListVariables = {
    filter: {
      price: {
        lte: filters.priceLte,
        gte: filters.priceGte,
      },
      collections: collectionId ? [collectionId] : [],
      categories: !isCategoriesFilter(categoryId, filters.categories)
        ? categoryId
          ? [categoryId]
          : []
        : filters.categories,
      attributes: filters.attributes
        ? convertToAttributeScalar(filters.attributes)
        : [],
      closeness: filters.closeness,
    },
    channel: channelSlug,
    first: PRODUCTS_PER_PAGE,
    sortBy: convertSortByFromString(filters.sortBy),
  };

  return useTypedQuery<ProductList, ProductListVariables>(productList, {
    variables,
    fetchPolicy: "cache-and-network",
    skip: !(categoryId || collectionId),
  });
};
