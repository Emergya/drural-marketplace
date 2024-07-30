export interface ICountableEdge<T> {
  __typename: string;
  node: T;
  cursor?: string;
}
