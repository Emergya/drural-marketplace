import gql from "graphql-tag";

import { useTypedQuery } from "@graphql";

import { Wishlist, WishlistVariables } from "./gqlTypes/Wishlist";
import { WishLists, WishListsVariables } from "./gqlTypes/WishLists";

export const getUserWishListsQuery = (
  variables: { first: number },
  onCompleted?: (data: WishLists) => void
) => {
  return useTypedQuery<WishLists, WishListsVariables>(getUserWishLists, {
    variables,
    fetchPolicy: "cache-and-network",
    onCompleted,
  });
};

const getUserWishLists = gql`
  query WishLists($first: Int!) {
    me {
      id
      wishlists(
        first: $first
        sortBy: { direction: DESC, field: CREATION_DATE }
      ) {
        edges {
          node {
            id
            name
            image
            imageUrl
          }
        }
      }
    }
  }
`;

export const getWishListServicesQuery = (
  variables: {
    id: string;
  },
  skip?: boolean | undefined
) => {
  return useTypedQuery<Wishlist, WishlistVariables>(getWishListServices, {
    variables,
    fetchPolicy: "network-only",
    skip,
  });
};

const getWishListServices = gql`
  query Wishlist($id: ID!) {
    wishlist(id: $id) {
      id
      name
      image
      items(first: 50) {
        edges {
          node {
            variant {
              name
              id
              media {
                url
              }
              product {
                slug
              }
            }
          }
        }
      }
    }
  }
`;
