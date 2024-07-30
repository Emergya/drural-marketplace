import { SearchProducts_products_edges_node } from "@temp/views/Search/gqlTypes/SearchProducts";

export interface IProps {
  query: string;
  suggestions: Partial<SearchProducts_products_edges_node>[];
  onItemClick: (searchQuery: string) => void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onClose: () => void;
}
