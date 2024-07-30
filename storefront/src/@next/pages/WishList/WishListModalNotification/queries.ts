import gql from "graphql-tag";

export const deleteWishListMutation = gql`
  mutation WishListDelete($id: ID!) {
    wishlistDelete(id: $id) {
      errors {
        field
        message
      }
    }
  }
`;

export const deleteServiceWishListMutation = gql`
  mutation WishListDeleteService($wishlistId: ID!, $variantId: ID!) {
    wishlistRemoveVariant(variantId: $variantId, wishlistId: $wishlistId) {
      errors {
        field
        message
      }
    }
  }
`;

export const addServiceWishListMutation = gql`
  mutation WishListAddService($wishlistId: ID!, $variantId: ID!) {
    wishlistAddVariant(variantId: $variantId, wishlistId: $wishlistId) {
      errors {
        field
        message
      }
    }
  }
`;
