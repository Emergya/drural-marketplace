import { GetServiceReviews_product } from "@pages/ReviewsPage/gqlTypes/GetServiceReviews";

export interface IProps {
  isStaff: boolean;
  hasPermission: boolean;
  product: Partial<GetServiceReviews_product>;
  onClick: () => void;
  onDelete: (reviewID: string) => void;
}
