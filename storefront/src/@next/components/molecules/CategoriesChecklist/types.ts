import { SearchProducts_products_edges_node_category } from "../../../../views/Search/gqlTypes/SearchProducts";

export interface IProps {
  categories: SearchProducts_products_edges_node_category[];
  categoriesFilter: string[];
  onCategoriesFilterChange: (categoryId: string, selected: boolean) => void;
}
