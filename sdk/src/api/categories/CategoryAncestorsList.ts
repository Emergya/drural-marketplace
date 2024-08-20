import BaseList, {
  GetPageInfo,
  GetTotalCount,
  MapQueryData,
} from "../../helpers/BaseList";
import {
  CategoryAncestorsList as CategoryAncestorsListQuery,
  CategoryAncestorsListVariables,
} from "../../queries/gqlTypes/CategoryAncestorsList";
import { BaseCategory } from "../../fragments/gqlTypes/BaseCategory";
import { categoryAncestorsList } from "../../queries/category";

export class CategoryAncestorsList extends BaseList<
  CategoryAncestorsListQuery,
  BaseCategory,
  CategoryAncestorsListVariables
> {
  getPageInfo: GetPageInfo<CategoryAncestorsListQuery> = result =>
    result.data.category?.ancestors?.pageInfo!;

  getTotalCount: GetTotalCount<CategoryAncestorsListQuery> = result =>
    result.data.category?.ancestors?.totalCount!;

  mapQueryData: MapQueryData<CategoryAncestorsListQuery, BaseCategory> = data =>
    data.category?.ancestors?.edges.map(({ node }) => node);

  query = (variables: CategoryAncestorsListVariables) =>
    this.client!.query<
      CategoryAncestorsListQuery,
      CategoryAncestorsListVariables
    >({
      fetchPolicy: "network-only",
      query: categoryAncestorsList,
      variables,
    });
}
