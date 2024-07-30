import { GetComanyReviews_company_reviews_edges_node } from "@pages/CompanyPage/gqlTypes/GetComanyReviews";

type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type IReview = WithOptional<
  GetComanyReviews_company_reviews_edges_node,
  "product"
>;
