import { DateRangeInput } from "gqlTypes/globalTypes";
import gql from "graphql-tag";

import { useTypedQuery } from "@graphql";

import {
  BookingProductDetailsQuery,
  BookingProductDetailsQueryVariables,
} from "./gqlTypes/BookingProductDetailsQuery";
import {
  ResourceAvailabilityByDate,
  ResourceAvailabilityByDateVariables,
} from "./gqlTypes/ResourceAvailabilityByDate";
import {
  ResourceCalendarAvailability,
  ResourceCalendarAvailabilityVariables,
} from "./gqlTypes/ResourceCalendarAvailability";

const bookingProductDetailsQuery = gql`
  query BookingProductDetailsQuery($slug: String) {
    product(slug: $slug) {
      id
      slug
      name
      defaultVariant {
        id
      }
      isBookable
      duration
      bookableResources(first: 100, filter: { isActive: true }) {
        edges {
          node {
            id
            name
            calendar {
              id
              day
            }
          }
        }
      }
      thumbnail {
        url
        alt
      }
      thumbnail2x: thumbnail(size: 510) {
        url
      }
    }
  }
`;
export const useBookingProductDetailsQuery = (
  variables: {
    slug: string;
  },
  skip?: boolean | undefined
) => {
  return useTypedQuery<
    BookingProductDetailsQuery,
    BookingProductDetailsQueryVariables
  >(bookingProductDetailsQuery, {
    fetchPolicy: "cache-and-network",
    variables,
    skip,
  });
};

const resourceCalendarAvailabilityQuery = gql`
  query ResourceCalendarAvailability(
    $bookableResource: ID!
    $productVariant: ID!
    $period: DateRangeInput!
  ) {
    resourceCalendarAvailability(
      id: $bookableResource
      productVariant: $productVariant
      period: $period
    ) {
      date
      available
    }
  }
`;
export const useResourceCalendarAvailabilityQuery = (
  variables: {
    bookableResource: string;
    productVariant: string;
    period: DateRangeInput;
  },
  skip?: boolean | undefined
) => {
  return useTypedQuery<
    ResourceCalendarAvailability,
    ResourceCalendarAvailabilityVariables
  >(resourceCalendarAvailabilityQuery, {
    fetchPolicy: "cache-and-network",
    variables,
    skip,
  });
};

const resourceAvailabilityByDateQuery = gql`
  query ResourceAvailabilityByDate(
    $bookableResource: ID!
    $productVariant: ID!
    $date: Date!
  ) {
    resourceAvailabilityByDate(
      id: $bookableResource
      productVariant: $productVariant
      date: $date
    ) {
      startTime
      endTime
    }
  }
`;
export const useResourceAvailabilityByDateQuery = (
  variables: {
    bookableResource: string;
    productVariant: string;
    date: string;
  },
  skip?: boolean | undefined
) => {
  return useTypedQuery<
    ResourceAvailabilityByDate,
    ResourceAvailabilityByDateVariables
  >(resourceAvailabilityByDateQuery, {
    fetchPolicy: "cache-and-network",
    variables,
    skip,
  });
};
