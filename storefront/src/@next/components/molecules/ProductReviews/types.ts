import { GetServiceReviews_product } from "@pages/ReviewsPage/gqlTypes/GetServiceReviews";

export interface IProps {
  product: Partial<GetServiceReviews_product>;
  onClick: () => void;
  onDelete: (reviewID: string) => void;
}
