import { DateRangeInput } from "@saleor/types/globalTypes";

export interface UserFilterInput {
  dateJoined?: DateRangeInput | null;
  search?: string | null;
}
