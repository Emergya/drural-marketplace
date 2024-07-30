import BaseList, {
  GetPageInfo,
  GetTotalCount,
  MapQueryData,
} from "../../helpers/BaseList";
import {
  ProductList as ProductListQuery,
  ProductListVariables,
  ProductList_products_edges_node,
} from "../../queries/gqlTypes/ProductList";
import { productList } from "../../queries/products";

export class ProductList extends BaseList<
  ProductListQuery,
  ProductList_products_edges_node,
  ProductListVariables
> {
  getPageInfo: GetPageInfo<ProductListQuery> = result =>
    result.data.products?.pageInfo!;

  getTotalCount: GetTotalCount<ProductListQuery> = result =>
    result.data.products?.totalCount!;

  mapQueryData: MapQueryData<
    ProductListQuery,
    ProductList_products_edges_node
  > = data => data.products?.edges.map(({ node }) => node);

  query = (variables: ProductListVariables) =>
    this.client!.query<ProductListQuery, ProductListVariables>({
      fetchPolicy: "network-only",
      query: productList,
      variables,
    });
}
