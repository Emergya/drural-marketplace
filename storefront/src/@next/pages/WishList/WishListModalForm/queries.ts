import gql from "graphql-tag";

export const createWishListMutation = gql`
  mutation WishListCreate($name: String!) {
    wishlistCreate(input: { name: $name }) {
      errors {
        field
        message
      }
      wishlist {
        id
        name
      }
    }
  }
`;

export const updateWishListMutation = gql`
  mutation WishListUpdate($id: ID!, $name: String!) {
    wishlistUpdate(id: $id, input: { name: $name }) {
      errors {
        field
        message
      }
      wishlist {
        id
        name
      }
    }
  }
`;
