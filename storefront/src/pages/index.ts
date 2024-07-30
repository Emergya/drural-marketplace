import { GetServerSideProps } from "next";

import { channelSlug } from "@temp/constants";
import {
  getFeaturedProducts,
  getPopularServices,
  getSaleorApi,
} from "@utils/ssr";

import { homePageProductsQuery, HomeView, HomeViewProps } from "../views/Home";
import { HomePageProducts } from "../views/Home/gqlTypes/HomePageProducts";

export default HomeView;

export const getServerSideProps: GetServerSideProps<HomeViewProps> = async () => {
  const { apolloClient } = await getSaleorApi();
  const [data, featuredProducts, popularServices] = await Promise.all([
    apolloClient
      .query<HomePageProducts>({
        query: homePageProductsQuery,
        variables: { channel: channelSlug },
        fetchPolicy: "no-cache",
      })
      .then(({ data }) => data),
    getFeaturedProducts(),
    getPopularServices(),
  ]);

  return {
    props: {
      data: { ...data, featuredProducts, popularServices },
    } as HomeViewProps,
  };
};
