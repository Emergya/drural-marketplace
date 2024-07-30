import { UilShop } from "@iconscout/react-unicons";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";
import { generatePath } from "react-router";
import { NumberParam, StringParam, useQueryParam } from "use-query-params";

import { Button, Loader, PageBottomSpacing } from "@components/atoms";
import { BackLink, ServiceReviewsList, Thumbnail } from "@components/molecules";
import { RatingStatisticsTile } from "@components/molecules/RatingStatisticsTile";
import { Container } from "@components/templates";
import { paths } from "@paths";
import { NotFound } from "@temp/components";
import { convertSortByFromStringReviews } from "@utils/reviews";

import defaultImage from "../../../images/dRuralImages/default-image-square.svg";
import {
  GetServiceReviews_product,
  GetServiceReviews_product_reviews,
} from "./gqlTypes/GetServiceReviews";
import { useGetServiceReviews } from "./queries";
import RatingConfirmationModal from "./RatingConfirmationModal/RatingConfirmationModal";
import RatingDeleteModal from "./RatingDeleteModal/RatingDeleteModal";
import RatingModal from "./RatingModal/RatingModal";
import * as S from "./styles";

export const ReviewsPage: NextPage = () => {
  const {
    query: { slug },
    push,
  } = useRouter();

  const [sort, setSort] = useQueryParam("sortBy", StringParam);
  const [stars, setStars] = useQueryParam("stars", NumberParam);

  const reviewsPerPage = 6;

  const { data, loadMore, loading, error, refetch } = useGetServiceReviews({
    slug: slug as string,
    first: reviewsPerPage,
    filter: stars ? { rating: stars } : null,
    sortBy: sort ? convertSortByFromStringReviews(sort) : null,
  });
  const [
    serviceId,
    serviceName,
    serviceImage,
    rating,
    consumed,
    companyName,
    myReview,
    reviews,
    pageInfo,
    numberOfReviews,
    reviewPercentages,
  ] = React.useMemo(
    () => [
      data?.product?.id!,
      data?.product?.name!,
      data?.product?.thumbnail,
      data?.product?.rating,
      data?.product?.consumedByUser!,
      data?.product?.company.name,
      data?.product?.myReview,
      data?.product?.reviews?.edges.map(e => e.node) || [],
      data?.product?.reviews?.pageInfo,
      data?.product?.reviews?.totalCount || 0,
      data?.product?.reviewPercentages?.map(e => e?.total),
    ],
    [data]
  );

  const [showRatingModal, setShowRatingModal] = React.useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = React.useState(
    false
  );
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [reviewToDelete, setReviewToDelete] = React.useState("");

  const handleLoadMore = () =>
    loadMore(
      (prev, next) => ({
        product: {
          ...prev.product,
          reviews: {
            ...(prev.product?.reviews as GetServiceReviews_product_reviews),
            edges: [
              ...prev.product?.reviews?.edges!,
              ...next.product?.reviews?.edges!,
            ],
            pageInfo: next.product?.reviews?.pageInfo,
          },
        } as GetServiceReviews_product,
      }),
      pageInfo?.endCursor!
    );

  React.useEffect(() => {
    if (!sort) {
      setSort("-DATE");
    }
  }, []);

  if (loading && !error) {
    return <Loader />;
  }
  if (error || data?.product === null) {
    return <NotFound />;
  }
  return (
    <Container>
      <BackLink
        onClick={() =>
          push(
            generatePath(paths.product, {
              slug: slug as string,
            })
          )
        }
      >
        <FormattedMessage defaultMessage="Back to the service" />
      </BackLink>
      <S.Title>
        <FormattedMessage defaultMessage="Service reviews" />
      </S.Title>

      <S.Container>
        <S.ServiceTileWrapper>
          <S.ServiceTile>
            <S.Image>
              <Thumbnail
                source={{
                  thumbnail: serviceImage,
                }}
              />
            </S.Image>
            <S.ServiceTileText>
              <S.ServiceTileTitle>{serviceName}</S.ServiceTileTitle>
              <S.ServiceTileShopǸame>
                <UilShop size="22" />
                {companyName}
              </S.ServiceTileShopǸame>
            </S.ServiceTileText>
          </S.ServiceTile>
          <RatingStatisticsTile
            starPercentages={reviewPercentages}
            rating={rating}
            totalReviews={numberOfReviews}
            onStarClick={starNumber => setStars(starNumber)}
          />
        </S.ServiceTileWrapper>

        <S.Wrapper>
          <ServiceReviewsList
            myReview={myReview}
            reviews={reviews}
            onClick={() => setShowRatingModal(true)}
            onDelete={(reviewID: string) => {
              setReviewToDelete(reviewID);
              setShowDeleteModal(true);
            }}
            consumedService={consumed}
            activeSort={sort!}
            onSortChange={value => setSort(value)}
            activeStarFilter={stars}
            onStarFilterChange={value => setStars(value)}
          />
          {pageInfo?.hasNextPage && (
            <S.ButtonContainer>
              <Button
                testingContext="loadMoreProductsButton"
                color="ghost"
                onClick={handleLoadMore}
              >
                <FormattedMessage defaultMessage="Load More" />
              </Button>
            </S.ButtonContainer>
          )}
        </S.Wrapper>
      </S.Container>

      <PageBottomSpacing />

      {showRatingModal && (
        <RatingModal
          serviceToReview={{
            serviceId,
            serviceImage: serviceImage?.url || defaultImage,
            serviceName,
          }}
          hide={() => setShowRatingModal(false)}
          refetchProductRatings={() => refetch()}
          showSucessModal={() => setShowConfirmationModal(true)}
        />
      )}
      {showConfirmationModal && (
        <RatingConfirmationModal hide={() => setShowConfirmationModal(false)} />
      )}
      {showDeleteModal && (
        <RatingDeleteModal
          ratingID={reviewToDelete}
          refetch={() => refetch()}
          hide={() => setShowDeleteModal(false)}
        />
      )}
    </Container>
  );
};
