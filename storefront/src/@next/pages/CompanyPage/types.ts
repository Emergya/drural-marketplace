import { BaseCategory } from "@drural/sdk/lib/fragments/gqlTypes/BaseCategory";
import { PageInfo } from "@drural/sdk/lib/fragments/gqlTypes/PageInfo";
import { ApolloQueryResult } from "apollo-client";
import { DecodedValueMap, QueryParamConfig } from "use-query-params";

import {
  GetComanyReviews,
  GetComanyReviews_company_reviews_edges_node,
} from "./gqlTypes/GetComanyReviews";
import { GetCompanyDetails_company } from "./gqlTypes/GetCompanyDetails";
import {
  GetCompanyProducts,
  GetCompanyProducts_company_products_edges_node,
} from "./gqlTypes/GetCompanyProducts";

export enum ActiveTab {
  ALL_SERVICES,
  CATEGORIES,
  NEW_IN,
  BEST_SELLING,
  REVIEWS,
}

export type IQueryParams = DecodedValueMap<{
  activeTab: QueryParamConfig<number | null | undefined, number | undefined>;
  category: QueryParamConfig<string | null | undefined, string | undefined>;
  rating: QueryParamConfig<number | null | undefined, number | undefined>;
  search: QueryParamConfig<string | null | undefined, string | undefined>;
  productsSortBy: QueryParamConfig<
    string | null | undefined,
    string | undefined
  >;
  reviewsSortBy: QueryParamConfig<
    string | null | undefined,
    string | undefined
  >;
}>;

export interface IPageProps {
  activeTab: ActiveTab | undefined;
  categories: BaseCategory[];
  categoriesPageInfo: PageInfo | undefined;
  companyDetails: GetCompanyDetails_company;
  companyProducts: GetCompanyProducts_company_products_edges_node[];
  companyProductsPageInfo: PageInfo | undefined;
  companyRating: number;
  companyReviews: GetComanyReviews_company_reviews_edges_node[];
  companyReviewsPageInfo: PageInfo | undefined;
  companyReviewsTotalCount: number;
  companyReviewPercentages: (number | null | undefined)[];
  isChatActive: boolean;
  loadingCategories: boolean;
  loadingCompanyProducts: boolean;
  loadingCompanyReviews: boolean;
  queryParams: IQueryParams;

  handleBestSellingClick: () => void;
  handleClearProductFilters: () => void;
  handleFilterByCategory: (category: string) => void;
  handleFilterByRating: (rating: number) => void;
  handleFilterBySearch: (search: string) => void;
  handleNewInClick: () => void;
  handleReviewsClick: () => void;
  handleReviewsSortByChange: (sortBy: string) => void;
  loadMoreCompanyProducts: () => Promise<ApolloQueryResult<GetCompanyProducts>>;
  loadMoreCompanyReviews: () => Promise<ApolloQueryResult<GetComanyReviews>>;
  nextCategories: () => Promise<void>;
}
