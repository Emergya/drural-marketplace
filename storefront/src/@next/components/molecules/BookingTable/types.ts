import { Moment } from "moment-timezone";

export interface IProps {
  bookableResourceName: string;
  startDate: Moment;
  endDate: Moment;
  bookingReference: string;
}
