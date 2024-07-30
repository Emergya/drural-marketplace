import {
  ProductDetails,
  ProductDetails_categories,
  ProductDetails_categories_edges_node_products_edges_node,
} from "@drural/sdk/lib/fragments/gqlTypes/ProductDetails";
import { ICheckoutModelLine } from "@drural/sdk/lib/helpers";

export interface IProps {
  product: ProductDetails;
  add: (variantId: string, quantity: number) => any;
  items: ICheckoutModelLine[];
  isChatActive: boolean;
}

export type GetProductsFromCategories = (
  categories: ProductDetails_categories
) => ProductDetails_categories_edges_node_products_edges_node[];
