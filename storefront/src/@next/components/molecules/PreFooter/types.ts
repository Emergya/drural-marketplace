import { FooterCategoriesQuery_categories_edges_node } from "@components/organisms/Footer/gqlTypes/FooterCategoriesQuery";

export interface IProps {
  categories: FooterCategoriesQuery_categories_edges_node[];
  loading?: boolean;
}
