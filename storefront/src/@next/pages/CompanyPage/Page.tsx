import { UilComments } from "@iconscout/react-unicons";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Media from "react-responsive";

import { Banner, Button, Tile, VerticalSeparator } from "@components/atoms";
import { toggleChatwootVisibility } from "@components/atoms/ChatwootWidget/utils";
import { CompanyTile, ServiceReviewsList } from "@components/molecules";
import { RatingStatisticsTile } from "@components/molecules/RatingStatisticsTile";
import { CompanyMenu, ProductList } from "@components/organisms";
import { Container } from "@components/templates";
import { mediumScreen } from "@styles/constants-drural";
import { commonMessages } from "@temp/intl";

import * as S from "./styles";
import { ActiveTab, IPageProps } from "./types";
import { getContentTitle, getIsReviewTab } from "./utils";

export const Page: React.FC<IPageProps> = ({
  activeTab,
  categories,
  categoriesPageInfo,
  companyDetails,
  companyProducts,
  companyProductsPageInfo,
  companyRating,
  companyReviews,
  companyReviewsPageInfo,
  companyReviewsTotalCount,
  companyReviewPercentages,
  isChatActive,
  loadingCategories,
  loadingCompanyProducts,
  loadingCompanyReviews,
  queryParams,
  handleBestSellingClick,
  handleClearProductFilters,
  handleFilterByCategory,
  handleFilterByRating,
  handleFilterBySearch,
  handleNewInClick,
  handleReviewsClick,
  handleReviewsSortByChange,
  loadMoreCompanyProducts,
  loadMoreCompanyReviews,
  nextCategories,
}) => {
  const intl = useIntl();
  const isReviewTab = getIsReviewTab(activeTab);

  return (
    <>
      <S.SpaceRow />

      {companyDetails.banner?.url && (
        <Banner imageUrl={companyDetails.banner.url} />
      )}

      <S.TabsRow>
        <Container>
          <CompanyMenu
            activeTab={activeTab}
            categories={categories}
            categoriesPageInfo={categoriesPageInfo}
            loadingCategories={loadingCategories}
            queryParams={queryParams}
            searcherDisabled={queryParams.activeTab === ActiveTab.REVIEWS}
            handleBestSellingClick={handleBestSellingClick}
            handleClearProductFilters={handleClearProductFilters}
            handleFilterByCategory={handleFilterByCategory}
            handleFilterBySearch={handleFilterBySearch}
            handleNewInClick={handleNewInClick}
            handleReviewsClick={handleReviewsClick}
            nextCategories={nextCategories}
          />
        </Container>
      </S.TabsRow>

      <S.DetailsRow>
        <Container>
          <S.DetailsColumn>
            <CompanyTile
              address={companyDetails.address?.street || ""}
              image={{ url: companyDetails?.imageUrl }}
              publishedProducts={
                companyDetails.publishedProducts?.totalCount || 0
              }
              rating={companyDetails.rating}
              title={companyDetails.publicName}
            />
          </S.DetailsColumn>
          <Media minWidth={mediumScreen + 1}>
            <VerticalSeparator />
          </Media>
          <Media maxWidth={mediumScreen}>
            <S.HorizontalSeparator />
          </Media>
          <S.DetailsColumn>
            <S.Description isChatActive={isChatActive}>
              {companyDetails.description}
            </S.Description>
            {isChatActive && (
              <S.StyledButton
                color="ghost"
                testingContext="sellerContactButton"
                onClick={toggleChatwootVisibility}
              >
                <UilComments />
                <S.ButtonText>
                  <FormattedMessage defaultMessage="Chat with the seller" />
                </S.ButtonText>
              </S.StyledButton>
            )}
          </S.DetailsColumn>
        </Container>
      </S.DetailsRow>

      <S.ContentRow>
        <Container>
          <S.ContentTitle>
            {getContentTitle(intl, activeTab, categories, queryParams.category)}
          </S.ContentTitle>
          {isReviewTab ? (
            <S.ReviewsWrapper>
              <Tile>
                <RatingStatisticsTile
                  rating={companyRating}
                  starPercentages={companyReviewPercentages}
                  totalReviews={companyReviewsTotalCount}
                  onStarClick={rating => handleFilterByRating(rating)}
                />
              </Tile>
              <Tile>
                <ServiceReviewsList
                  activeSort={queryParams.reviewsSortBy || ""}
                  activeStarFilter={queryParams.rating}
                  loading={loadingCompanyReviews}
                  reviews={companyReviews}
                  type="company"
                  onSortChange={sortBy => handleReviewsSortByChange(sortBy)}
                  onStarFilterChange={rating => handleFilterByRating(rating)}
                />
                {!!companyReviewsPageInfo?.hasNextPage && (
                  <S.ButtonWrapper>
                    <Button
                      testingContext="loadMoreProductsButton"
                      color="ghost"
                      onClick={loadMoreCompanyReviews}
                    >
                      <FormattedMessage {...commonMessages.loadMore} />
                    </Button>
                  </S.ButtonWrapper>
                )}
              </Tile>
            </S.ReviewsWrapper>
          ) : companyProducts.length ? (
            <S.ProductsWrapper>
              <ProductList
                products={companyProducts}
                canLoadMore={!!companyProductsPageInfo?.hasNextPage}
                loading={loadingCompanyProducts}
                onLoadMore={loadMoreCompanyProducts}
              />
            </S.ProductsWrapper>
          ) : (
            <S.LightTitle>
              <FormattedMessage defaultMessage="No services found" />
            </S.LightTitle>
          )}
        </Container>
      </S.ContentRow>
    </>
  );
};
