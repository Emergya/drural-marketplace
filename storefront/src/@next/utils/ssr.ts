import { ConnectResult, SaleorManager } from "@drural/sdk";
import BaseList, { BaseListVariables } from "@drural/sdk/lib/helpers/BaseList";
import {
  GetShop,
  GetShop_shop,
} from "@drural/sdk/lib/queries/gqlTypes/GetShop";
import { getShop } from "@drural/sdk/lib/queries/shop";

import {
  featuredProductsQuery,
  popularServicesQuery,
  shopAttributesQuery,
} from "@graphql";
import { Attribute } from "@graphql/gqlTypes/Attribute";
import {
  FeaturedProductsQuery,
  FeaturedProductsQuery_collection,
  FeaturedProductsQuery_collection_products_edges_node,
  FeaturedProductsQueryVariables,
} from "@graphql/gqlTypes/FeaturedProductsQuery";
import {
  PopularServicesQuery,
  PopularServicesQuery_products_edges_node,
  PopularServicesQueryVariables,
} from "@graphql/gqlTypes/PopularServicesQuery";
import {
  ShopAttributesQuery,
  ShopAttributesQueryVariables,
} from "@graphql/gqlTypes/ShopAttributesQuery";
import { apiUrl, channelSlug } from "@temp/constants";
import { RequireOnlyOne } from "@utils/tsUtils";

let CONNECTION: ConnectResult | null = null;

export const getSaleorApi = async () => {
  if (!CONNECTION) {
    const manager = new SaleorManager(
      { apiUrl, channel: channelSlug },
      { options: { ssrMode: true } }
    );
    CONNECTION = await manager.connect();
  }

  return CONNECTION;
};

/**
 * Fetches all data from collection based API which extends BaseList abstraction.
 */
export const exhaustList = async <
  TQuery,
  TObject,
  TVariables extends BaseListVariables
>(
  listApi: Promise<BaseList<TQuery, TObject, TVariables>>,
  tries = 60
): Promise<BaseList<TQuery, TObject, TVariables>> =>
  new Promise((resolve, reject) => {
    (async function fetch(listApi, triesLeft) {
      const result = await listApi;
      const { pageInfo, next } = result;

      if (pageInfo?.hasNextPage === false) {
        return resolve(result);
      }

      if (!triesLeft) {
        return reject(new Error("Max tries exeeded"));
      }

      await next();

      fetch(listApi, --triesLeft);
    })(listApi, tries);
  });

export type FeaturedProducts = {
  products: FeaturedProductsQuery_collection_products_edges_node[];
} & Partial<Pick<FeaturedProductsQuery_collection, "name" | "backgroundImage">>;

export const getFeaturedProducts = async (): Promise<FeaturedProducts> => {
  const { apolloClient } = await getSaleorApi();
  const { data } = await apolloClient.query<
    FeaturedProductsQuery,
    FeaturedProductsQueryVariables
  >({
    query: featuredProductsQuery,
    variables: { channel: channelSlug },
    fetchPolicy: "no-cache",
  });

  return {
    ...data.collection,
    products: data.collection?.products?.edges.map(e => e.node) || [],
  };
};

/* TODO: update async function when query available in backend. At the moment it requests collection of featured products */

export type PopularServices = {
  products: PopularServicesQuery_products_edges_node[];
};

export const getPopularServices = async (): Promise<PopularServices> => {
  const { apolloClient } = await getSaleorApi();
  const { data } = await apolloClient.query<
    PopularServicesQuery,
    PopularServicesQueryVariables
  >({
    query: popularServicesQuery,
    variables: { channel: channelSlug },
    fetchPolicy: "no-cache",
  });

  return {
    ...data.products,
    products: data.products?.edges.map(e => e.node) || [],
  };
};

export const getShopAttributes = async ({
  categoryId = null,
  collectionId = null,
}: RequireOnlyOne<{
  categoryId: string | null;
  collectionId: string | null;
}>): Promise<Attribute[]> => {
  const { apolloClient } = await getSaleorApi();
  const { data } = await apolloClient.query<
    ShopAttributesQuery,
    ShopAttributesQueryVariables
  >({
    query: shopAttributesQuery,
    variables: {
      categoryId,
      collectionId,
      channel: channelSlug,
    },
  });
  return data?.attributes?.edges.map(e => e.node) || [];
};

export type ShopConfig = { shopConfig: GetShop_shop };

export const getShopConfig = async (): Promise<{
  shopConfig: GetShop_shop;
}> => {
  const { apolloClient } = await getSaleorApi();
  const shopConfig = await apolloClient
    .query<GetShop>({
      query: getShop,
    })
    .then(({ data }) => data?.shop);

  return { shopConfig };
};
