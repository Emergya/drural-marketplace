import { GetServiceReviews_product } from "@pages/ReviewsPage/gqlTypes/GetServiceReviews";

export const PRODUCT_REVIEWS: Partial<GetServiceReviews_product> = {
  consumedByUser: true,
  rating: 2,
  reviews: {
    totalCount: 3,
    pageInfo: {
      __typename: "PageInfo",
      hasNextPage: false,
      endCursor: "123123123123",
    },
    __typename: "ProductRatingCountableConnection",
    edges: [
      {
        __typename: "ProductRatingCountableEdge",
        node: {
          __typename: "ProductRating",
          id: "123",
          createdByUser: true,
          user: "Pepito Garcia",
          createdAt: "2021-11-25T07:34:22Z",
          rating: 4,
          comment:
            "This service is good. This service is good. This service is good. This service is good. This service is good. This service is good. This service is good. This service is good. This service is good. This service is good. This service is good. ",
        },
      },
      {
        __typename: "ProductRatingCountableEdge",
        node: {
          __typename: "ProductRating",
          id: "123",
          createdByUser: true,
          user: "Pepito Garcia",
          createdAt: "2021-11-25T07:34:22Z",
          rating: 4,
          comment:
            "This service is good. This service is good. This service is good. This service is good. This service is good. This service is good. This service is good. This service is good. This service is good. This service is good. This service is good. ",
        },
      },
      {
        __typename: "ProductRatingCountableEdge",
        node: {
          __typename: "ProductRating",
          id: "123",
          createdByUser: true,
          user: "Pepito Garcia",
          createdAt: "2021-11-25T07:34:22Z",
          rating: 4,
          comment:
            "This service is good. This service is good. This service is good. This service is good. This service is good. This service is good. This service is good. This service is good. This service is good. This service is good. This service is good. ",
        },
      },
    ],
  },
};
