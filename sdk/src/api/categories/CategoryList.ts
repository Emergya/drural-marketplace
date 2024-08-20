import BaseList, {
  GetPageInfo,
  GetTotalCount,
  MapQueryData,
} from "../../helpers/BaseList";
import {
  CategoryList as CategoryListQuery,
  CategoryListVariables,
} from "../../queries/gqlTypes/CategoryList";
import { BaseCategory } from "../../fragments/gqlTypes/BaseCategory";
import { categoryList } from "../../queries/category";

export class CategoryList extends BaseList<
  CategoryListQuery,
  BaseCategory,
  CategoryListVariables
> {
  getPageInfo: GetPageInfo<CategoryListQuery> = result =>
    result.data.categories?.pageInfo!;

  getTotalCount: GetTotalCount<CategoryListQuery> = result =>
    result.data.categories?.totalCount!;

  mapQueryData: MapQueryData<CategoryListQuery, BaseCategory> = data =>
    data.categories?.edges.map(({ node }) => node);

  query = (variables: CategoryListVariables) =>
    this.client!.query<CategoryListQuery, CategoryListVariables>({
      fetchPolicy: "network-only",
      query: categoryList,
      variables,
    });
}
