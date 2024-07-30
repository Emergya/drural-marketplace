/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BookingDetails
// ====================================================

export interface BookingDetails_booking_bookableResource {
  __typename: "BookableResource";
  name: string;
}

export interface BookingDetails_booking {
  __typename: "Booking";
  /**
   * UUID of the booking.
   */
  bookingReference: any | null;
  bookableResource: BookingDetails_booking_bookableResource | null;
  startDate: any | null;
}

export interface BookingDetails {
  /**
   * Look up a booking by ID or reference code.
   */
  booking: BookingDetails_booking | null;
}

export interface BookingDetailsVariables {
  id: string;
}
