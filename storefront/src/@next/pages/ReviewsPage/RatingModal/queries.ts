import gql from "graphql-tag";

export const productAddRating = gql`
  mutation ProductAddRating($id: ID!, $rating: Float!, $review: String) {
    productRatingCreate(
      input: { product: $id, rating: $rating, comment: $review }
    ) {
      errors {
        field
        message
      }
      product {
        id
        name
        rating
      }
    }
  }
`;
