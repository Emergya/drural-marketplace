import { GetServerSideProps } from "next";

import { SearchPage, SearchPageProps } from "@temp/views/Search";
import { getFeaturedProducts } from "@utils/ssr";

export default SearchPage;

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async () => {
  const featuredProducts = await getFeaturedProducts();

  return {
    props: { data: featuredProducts },
  };
};
