import gql from "graphql-tag";

export const productDeleteMyRating = gql`
  mutation ProductDeleteMyRating($id: ID!) {
    productRatingDelete(id: $id) {
      errors {
        field
        message
      }
      product {
        id
        name
        rating
      }
      review {
        id
      }
    }
  }
`;
