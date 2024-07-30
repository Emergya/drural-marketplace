import { useCategoryList } from "@drural/sdk";
import { ProductOrderField } from "gqlTypes/globalTypes";
import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import { NumberParam, StringParam, useQueryParams } from "use-query-params";

import { ChatwootWidget, Loader } from "@components/atoms";
import { NotFound } from "@temp/components";
import { channelSlug } from "@temp/constants";
import {
  ITEMS_PER_DROPDOWN_LIST,
  PRODUCTS_PER_PAGE,
  REVIEWS_PER_PAGE,
} from "@temp/core/config";

import { GetCompanyProducts_company } from "./gqlTypes/GetCompanyProducts";
import { GetCompanyReviews_company } from "./gqlTypes/GetCompanyReviews";
import { Page } from "./Page";
import {
  useGetCompanyDetails,
  useGetCompanyProducts,
  useGetCompanyReviews,
} from "./queries";
import { ActiveTab } from "./types";
import {
  clearProductQueryParams,
  getProductsFilterVariables,
  getProductsSortByVariables,
  getReviewsFilterVariables,
  getReviewsSortByVariables,
  inicialQueryParams,
} from "./utils";

export const CompanyView: React.FC = () => {
  const {
    query: { id },
  } = useRouter();

  // 1. State
  const [queryParams, setQueryParams] = useQueryParams({
    activeTab: NumberParam,
    category: StringParam,
    rating: NumberParam,
    search: StringParam,
    productsSortBy: StringParam,
    reviewsSortBy: StringParam,
  });

  useEffect(() => {
    if (!queryParams.activeTab && queryParams.activeTab !== 0) {
      setQueryParams(inicialQueryParams);
    }
  }, []);

  // 2. Data
  const {
    data: categories,
    loading: loadingCategories,
    pageInfo: categoriesPageInfo,
    next: nextCategories,
  } = useCategoryList({
    first: ITEMS_PER_DROPDOWN_LIST,
  });

  const {
    data: companyDetailsData,
    loading: loadingCompanyDetails,
    error: companyDetailsError,
  } = useGetCompanyDetails({
    id: id as string,
    channel: channelSlug,
  });

  const productsFilter = getProductsFilterVariables(queryParams);
  const productsSortBy = getProductsSortByVariables(queryParams);
  const {
    data: companyProductsData,
    loading: loadingCompanyProducts,
    error: companyProductsError,
    loadMore: loadMoreCompanyProducts,
  } = useGetCompanyProducts({
    id: id as string,
    channel: channelSlug,
    first: PRODUCTS_PER_PAGE,
    filter: productsFilter,
    sortBy: productsSortBy,
  });

  const reviewsFilter = getReviewsFilterVariables(queryParams);
  const reviewsSortBy = getReviewsSortByVariables(queryParams);
  const {
    data: companyReviewsData,
    loading: loadingCompanyReviews,
    error: companyReviewsError,
    loadMore: loadMoreCompanyReviews,
  } = useGetCompanyReviews({
    id: id as string,
    first: REVIEWS_PER_PAGE,
    filter: reviewsFilter,
    sortBy: reviewsSortBy,
  });

  const error =
    companyDetailsError || companyProductsError || companyReviewsError;
  const companyDetails = companyDetailsData?.company;
  const { websiteToken, hmac: hmacTocken } =
    companyDetails?.chatwootCredentials || {};
  const isChatActive = !!(websiteToken && hmacTocken);
  const [companyProducts, companyProductsPageInfo] = useMemo(
    () => [
      companyProductsData?.company?.products?.edges.map(e => e.node) || [],
      companyProductsData?.company?.products?.pageInfo,
    ],
    [companyProductsData]
  );
  const [
    companyRating,
    companyReviews,
    companyReviewsPageInfo,
    companyReviewsTotalCount,
    companyReviewPercentages,
  ] = useMemo(
    () => [
      companyReviewsData?.company?.rating || 0,
      companyReviewsData?.company?.reviews?.edges.map(e => e.node) || [],
      companyReviewsData?.company?.reviews?.pageInfo,
      companyReviewsData?.company?.reviews?.totalCount || 0,
      companyReviewsData?.company?.reviewPercentages?.map(e => e?.total) || [],
    ],
    [companyReviewsData]
  );

  // 3. Events
  const handleLoadMoreCompanyProducts = () =>
    loadMoreCompanyProducts(
      (prev, next) => ({
        company: {
          ...prev.company,
          products: {
            ...prev.company?.products,
            edges: [
              ...prev.company?.products?.edges!,
              ...next.company?.products?.edges!,
            ],
            pageInfo: next.company?.products?.pageInfo,
          },
        } as GetCompanyProducts_company,
      }),
      companyProductsPageInfo?.endCursor!
    );

  const handleLoadMoreCompanyReviews = () =>
    loadMoreCompanyReviews(
      (prev, next) => ({
        company: {
          ...prev.company,
          reviews: {
            ...prev.company?.reviews,
            edges: [
              ...prev.company?.reviews?.edges!,
              ...next.company?.reviews?.edges!,
            ],
            pageInfo: next.company?.reviews?.pageInfo,
          },
        } as GetCompanyReviews_company,
      }),
      companyReviewsPageInfo?.endCursor!
    );

  const handleClearProductFilters = () => {
    setQueryParams(inicialQueryParams);
  };

  const handleFilterByCategory = (category: string) => {
    setQueryParams({
      ...queryParams,
      ...clearProductQueryParams,
      activeTab: ActiveTab.CATEGORIES,
      category,
    });
  };

  const handleFilterBySearch = (search: string) => {
    setQueryParams({
      ...queryParams,
      search,
    });
  };

  const handleNewInClick = () => {
    setQueryParams({
      ...queryParams,
      ...clearProductQueryParams,
      activeTab: ActiveTab.NEW_IN,
      productsSortBy: ProductOrderField.PUBLICATION_DATE,
    });
  };

  const handleBestSellingClick = () => {
    setQueryParams({
      ...queryParams,
      ...clearProductQueryParams,
      activeTab: ActiveTab.BEST_SELLING,
      productsSortBy: ProductOrderField.CONSUMPTION,
    });
  };

  const handleReviewsClick = () => {
    setQueryParams({
      ...queryParams,
      ...clearProductQueryParams,
      activeTab: ActiveTab.REVIEWS,
    });
  };

  const handleFilterByRating = (rating: number) => {
    setQueryParams({
      ...queryParams,
      ...clearProductQueryParams,
      rating,
    });
  };

  const handleReviewsSortByChange = (reviewsSortBy: string) => {
    setQueryParams({
      ...queryParams,
      ...clearProductQueryParams,
      reviewsSortBy,
    });
  };

  // 4. Render
  if (loadingCompanyDetails && !error) {
    return <Loader />;
  }

  if (error || !companyDetails) {
    return <NotFound />;
  }

  return (
    <>
      <Page
        activeTab={queryParams.activeTab}
        categories={categories || []}
        categoriesPageInfo={categoriesPageInfo}
        companyDetails={companyDetails}
        companyProducts={companyProducts}
        companyProductsPageInfo={companyProductsPageInfo}
        companyRating={companyRating}
        companyReviews={companyReviews}
        companyReviewsPageInfo={companyReviewsPageInfo}
        companyReviewsTotalCount={companyReviewsTotalCount}
        companyReviewPercentages={companyReviewPercentages}
        isChatActive={isChatActive}
        loadingCategories={loadingCategories}
        loadingCompanyProducts={loadingCompanyProducts}
        loadingCompanyReviews={loadingCompanyReviews}
        queryParams={queryParams}
        handleBestSellingClick={handleBestSellingClick}
        handleClearProductFilters={handleClearProductFilters}
        handleFilterByCategory={handleFilterByCategory}
        handleFilterByRating={handleFilterByRating}
        handleFilterBySearch={handleFilterBySearch}
        handleNewInClick={handleNewInClick}
        handleReviewsClick={handleReviewsClick}
        handleReviewsSortByChange={handleReviewsSortByChange}
        loadMoreCompanyProducts={handleLoadMoreCompanyProducts}
        loadMoreCompanyReviews={handleLoadMoreCompanyReviews}
        nextCategories={nextCategories}
      />
      {isChatActive && (
        <ChatwootWidget websiteToken={websiteToken} hmacTocken={hmacTocken} />
      )}
    </>
  );
};
