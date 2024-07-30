import { CategoryDetails_category } from "@drural/sdk/lib/queries/gqlTypes/CategoryDetails";

export type ImageCategory = CategoryDetails_category;

export interface IconCategory {
  id: string;
  name: string;
  icon: React.FC<{ size?: number }>;
}

interface IProps {
  canLoadMore?: boolean;
  loading?: boolean;
  onLoadMore?: () => void;
  /**
   * Used as marker for writing e2e tests. Use unique ID to differentiate
   * multiple elements in the same view from each other
   */
  testingContextId?: string;
}

export interface CategoryIconListProps extends IProps {
  categories: IconCategory[];
  iconSize?: number;
  iconBackgroundSize?: number;
}

export interface CategoryImageListProps extends IProps {
  categories: ImageCategory[];
}
