import { ICountableEdge } from "./ICountableEdge";
import { IpageInfo } from "./IPageInfo";

export interface ICountableConnection<T> {
  __typename: string;
  pageInfo?: IpageInfo;
  edges: Array<ICountableEdge<T>>;
  totalCount?: number;
}
