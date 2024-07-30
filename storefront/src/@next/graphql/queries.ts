import { ApolloQueryResult, OperationVariables } from "apollo-client";
import { DocumentNode } from "graphql";
import gql from "graphql-tag";
import { QueryHookOptions, QueryResult, useQuery } from "react-apollo";

import {
  attributeFragment,
  featuredProductFragment,
  featuredProductsFragment,
  menuItemFragment,
} from "./fragments";
import { MenuQuery, MenuQueryVariables } from "./gqlTypes/MenuQuery";
import { ShopGAQuery } from "./gqlTypes/ShopGAQuery";

type LoadMore<TData> = (
  mergeFn: (prev: TData, next: TData) => TData,
  endCursor: string
) => Promise<ApolloQueryResult<TData>>;

export const useTypedQuery = <TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData, TVariables> & {
  loadMore: LoadMore<TData>;
} => {
  const queryResult = useQuery<TData, TVariables>(query, options);

  const loadMore: LoadMore<TData> = (mergeFn, endCursor) =>
    queryResult.fetchMore({
      query,
      updateQuery: (previousResults, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResults;
        }
        return mergeFn(previousResults, fetchMoreResult);
      },
      variables: { ...options?.variables, after: endCursor },
    });

  return { loadMore, ...queryResult };
};

/* TODO: update query when available in backend. At the moment it requests the featured products */
export const popularServicesQuery = gql`
  ${featuredProductFragment}
  query PopularServicesQuery($channel: String!) {
    products(
      first: 4
      channel: $channel
      sortBy: { direction: DESC, field: POPULAR }
    ) {
      edges {
        node {
          ...FeaturedProduct
        }
      }
    }
  }
`;

export const featuredProductsQuery = gql`
  ${featuredProductsFragment}
  query FeaturedProductsQuery($channel: String!) {
    ...FeaturedProducts
  }
`;

export const shopAttributesQuery = gql`
  ${attributeFragment}
  query ShopAttributesQuery(
    $channel: String!
    $collectionId: ID
    $categoryId: ID
  ) {
    attributes(
      channel: $channel
      filter: {
        inCollection: $collectionId
        inCategory: $categoryId
        filterableInStorefront: true
      }
      first: 100
    ) {
      edges {
        node {
          ...Attribute
        }
      }
    }
  }
`;

export const menuQuery = gql`
  ${menuItemFragment}
  query MenuQuery($channel: String!, $slug: String!) {
    menu(channel: $channel, slug: $slug) {
      id
      items {
        ...MenuItem
        children {
          ...MenuItem
        }
      }
    }
  }
`;
export const useMenuQuery = (variables: MenuQueryVariables) => {
  return useTypedQuery<MenuQuery, MenuQueryVariables>(menuQuery, {
    variables,
    fetchPolicy: "network-only",
  });
};

export const shopGAQuery = gql`
  query ShopGAQuery {
    shop {
      googleAnalytics {
        isActive
        measurementId
      }
    }
  }
`;
export const useShopGAQuery = () => {
  return useTypedQuery<ShopGAQuery>(shopGAQuery, {
    fetchPolicy: "network-only",
  });
};
