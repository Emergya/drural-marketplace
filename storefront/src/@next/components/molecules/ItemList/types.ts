import React from "react";

export interface IProps<T> {
  canLoadMore?: boolean;
  children: (props: T, index: number) => React.ReactNode;
  columns?: number;
  items: T[];
  loading?: boolean;
  title?: string;
  onLoadMore?: () => void;
}
