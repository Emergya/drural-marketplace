import gql from "graphql-tag";

import { useTypedQuery } from "@graphql";

import {
  BookingDetails,
  BookingDetailsVariables,
} from "./gqlTypes/BookingDetails";

const bookingDetailsQuery = gql`
  query BookingDetails($id: ID!) {
    booking(id: $id) {
      bookingReference
      bookableResource {
        name
      }
      startDate
    }
  }
`;

export const useBookingDetailsQuery = (
  variables: { id: string },
  skip: boolean
) => {
  return useTypedQuery<BookingDetails, BookingDetailsVariables>(
    bookingDetailsQuery,
    {
      fetchPolicy: "cache-and-network",
      variables,
      skip,
    }
  );
};
