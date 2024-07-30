import { ProductDetails_company } from "@drural/sdk/lib/fragments/gqlTypes/ProductDetails";

export interface IProps {
  company: ProductDetails_company;
  onClick?: () => void;
}
