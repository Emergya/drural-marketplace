import { GetAllCategories_categories_edges_node } from "./gqlTypes/GetAllCategories";
import { GetUserCategories_me_categories_edges_node } from "./gqlTypes/GetUserCategories";

export interface FormStatus {
  success: boolean;
  error: boolean;
}

export interface CategoryOverlayProps {
  categories: GetAllCategories_categories_edges_node[];
  loadingCategories?: boolean;
  userCategories: GetUserCategories_me_categories_edges_node[];
  hide: () => void;
  setFormStatus: (status: FormStatus) => void;
  refetchUserCategories: () => void;
}

export type SetInitialPreferences = (
  categories: GetUserCategories_me_categories_edges_node[]
) => string[];

export interface ListCategoriesPreferences {
  id: string;
  name: string;
  icon: React.FC<{ color?: string; size?: number }>;
}

export type GetListCategoriesPreferences = (
  userCategories: GetUserCategories_me_categories_edges_node[]
) => ListCategoriesPreferences[];

export interface GridCategoriesPreferences {
  id: string;
  title: string;
  icon: React.FC<{ color?: string; size?: number }>;
  value: boolean;
}

export type GetGridCategoriesPreferences = (
  categories: GetAllCategories_categories_edges_node[],
  userCategories: string[]
) => GridCategoriesPreferences[];

export type ArraysMatch = (arr1: string[], aar2: string[]) => boolean;

export type GetFormStatusMassage = (
  tile: "Location" | "Categories",
  error?: boolean
) => {
  title: string;
  content: string;
};
