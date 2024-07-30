import { SearchProducts_products_edges_node } from "@temp/views/Search/gqlTypes/SearchProducts";

export interface IProps {
  query: string;
  onQueryChange: React.ChangeEventHandler<HTMLInputElement>;
  suggestions: Partial<SearchProducts_products_edges_node>[];
  onSearchItemClick: (searchQuery: string) => void;
  distance: number | undefined;
  onDistanceChange: (distance: number) => void;
  price: number[];
  onPriceChange: (distance: number[]) => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}
