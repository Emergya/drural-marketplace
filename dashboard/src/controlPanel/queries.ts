import makeQuery from "@saleor/hooks/makeQuery";
import gql from "graphql-tag";

import {
  ActiveUserQuantityStat,
  ActiveUserQuantityStatVariables
} from "./types/ActiveUserQuantityStat";
import {
  BusinessesNumberStats,
  BusinessesNumberStatsVariables
} from "./types/BusinessesNumberStats";
import {
  ContractedServicesStat,
  ContractedServicesStatVariables
} from "./types/ContractedServicesStat";
import {
  FeaturedTotalCount,
  FeaturedTotalCountVariables
} from "./types/FeaturedTotalCount";
import { GetProducts, GetProductsVariables } from "./types/GetProducts";
import {
  IncludedServicesStat,
  IncludedServicesStatVariables
} from "./types/IncludedServicesStat";
import {
  LastConsumedProducts,
  LastConsumedProductsVariables
} from "./types/LastConsumedProducts";
import {
  MostSalesBusinesses,
  MostSalesBusinessesVariables
} from "./types/MostSalesBusinesses";
import {
  RecentlyCreatedServices,
  RecentlyCreatedServicesVariables
} from "./types/RecentlyCreatedServices";
import {
  RegisteredUserQuantityStat,
  RegisteredUserQuantityStatVariables
} from "./types/RegisteredUserQuantityStat";
import { UserQuantity, UserQuantityVariables } from "./types/UserQuantity";

// *** Getting Users stats ***
const userQuantity = gql`
  query UserQuantity($period: DateTimeRangeInput!) {
    userQuantityStat(period: $period) {
      total
      date
    }
  }
`;
export const useUserQuantityQuery = makeQuery<
  UserQuantity,
  UserQuantityVariables
>(userQuantity);

const registeredUserQuantity = gql`
  query RegisteredUserQuantityStat($period: DateTimeRangeInput!) {
    userQuantityStat(period: $period) {
      total
      date
    }
  }
`;
export const useRegisterUserQuantityQuery = makeQuery<
  RegisteredUserQuantityStat,
  RegisteredUserQuantityStatVariables
>(registeredUserQuantity);

const activeUserQuantity = gql`
  query ActiveUserQuantityStat($period: DateTimeRangeInput!) {
    activeUserQuantityStat(period: $period) {
      total
      date
    }
  }
`;
export const useActiveUserQuantityQuery = makeQuery<
  ActiveUserQuantityStat,
  ActiveUserQuantityStatVariables
>(activeUserQuantity);

// *** Getting Services stats ***
const includedServicesStat = gql`
  query IncludedServicesStat($period: DateTimeRangeInput!) {
    productAdditionStat(period: $period) {
      total
      date
    }
  }
`;
export const useIncludedServicesStatQuery = makeQuery<
  IncludedServicesStat,
  IncludedServicesStatVariables
>(includedServicesStat);

const contractedServicesStat = gql`
  query ContractedServicesStat($period: DateTimeRangeInput!) {
    productConsumptionStat(period: $period) {
      total
      date
    }
  }
`;
export const useContractedServiesStatQuery = makeQuery<
  ContractedServicesStat,
  ContractedServicesStatVariables
>(contractedServicesStat);

// Get services data for total cards
const getProducts = gql`
  query GetProducts(
    $first: Int
    $sortBy: ProductOrder
    $filter: ProductFilterInput
  ) {
    products(first: $first, sortBy: $sortBy, filter: $filter) {
      totalCount
      edges {
        node {
          id
          name
          rating
          thumbnail {
            url
          }
          category {
            name
          }
        }
      }
    }
  }
`;
export const useGetProductsStatsQuery = makeQuery<
  GetProducts,
  GetProductsVariables
>(getProducts);

const featuredProducts = gql`
  query FeaturedTotalCount(
    $first: Int
    $sort: CollectionSortingInput
    $filter: CollectionFilterInput
  ) {
    collections(first: $first, sortBy: $sort, filter: $filter) {
      edges {
        node {
          products {
            totalCount
          }
        }
      }
    }
  }
`;
export const useFeaturedProductsTotalCountQuery = makeQuery<
  FeaturedTotalCount,
  FeaturedTotalCountVariables
>(featuredProducts);

const recentlyCreatedServices = gql`
  query RecentlyCreatedServices($first: Int, $filter: ProductFilterInput) {
    products(first: $first, filter: $filter) {
      totalCount
    }
  }
`;
export const useRecentlyCreatedServices = makeQuery<
  RecentlyCreatedServices,
  RecentlyCreatedServicesVariables
>(recentlyCreatedServices);

const lastConsumedProducts = gql`
  query LastConsumedProducts($first: Int, $sort: ProductOrder) {
    products(first: $first, sortBy: $sort) {
      edges {
        node {
          id
          name
          category {
            name
          }
          thumbnail {
            url
          }
        }
      }
    }
  }
`;
export const useLastConsumedProductsQuery = makeQuery<
  LastConsumedProducts,
  LastConsumedProductsVariables
>(lastConsumedProducts);

// *** Getting businesses stats ***
const businessesNumberStats = gql`
  query BusinessesNumberStats($period: DateTimeRangeInput!) {
    companyAdditionStat(period: $period) {
      date
      total
    }
  }
`;
export const useBusinessesNumberStatsQuery = makeQuery<
  BusinessesNumberStats,
  BusinessesNumberStatsVariables
>(businessesNumberStats);

const mostSalesBusinesses = gql`
  query MostSalesBusinesses(
    $first: Int
    $sortBy: CompanySortingInput
    $filter: CompanyFilterInput
  ) {
    companies(first: $first, sortBy: $sortBy, filter: $filter) {
      edges {
        node {
          id
          publicName
          imageUrl
        }
      }
    }
  }
`;
export const useMostSalesBusinessesQuery = makeQuery<
  MostSalesBusinesses,
  MostSalesBusinessesVariables
>(mostSalesBusinesses);
