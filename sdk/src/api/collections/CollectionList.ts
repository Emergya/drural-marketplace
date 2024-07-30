import BaseList, {
  GetPageInfo,
  GetTotalCount,
  MapQueryData,
} from "../../helpers/BaseList";
import {
  CollectionList as CollectionListQuery,
  CollectionListVariables,
} from "../../queries/gqlTypes/CollectionList";
import { BaseCollection } from "../../fragments/gqlTypes/BaseCollection";
import { collections } from "../../queries/collections";

export class CollectionList extends BaseList<
  CollectionListQuery,
  BaseCollection,
  CollectionListVariables
> {
  getPageInfo: GetPageInfo<CollectionListQuery> = result =>
    result.data.collections?.pageInfo!;

  getTotalCount: GetTotalCount<CollectionListQuery> = result =>
    result.data.collections?.totalCount!;

  mapQueryData: MapQueryData<CollectionListQuery, BaseCollection> = data =>
    data.collections?.edges.map(({ node }) => node);

  query = (variables: CollectionListVariables) =>
    this.client!.query<CollectionListQuery, CollectionListVariables>({
      fetchPolicy: "network-only",
      query: collections,
      variables,
    });
}
