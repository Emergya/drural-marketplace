import { SearchProducts_products_edges_node } from "@temp/views/Search/gqlTypes/SearchProducts";

export interface IProps {
  suggestions: Partial<SearchProducts_products_edges_node>[];
  onClick: (searchQuery: string) => void;
}
