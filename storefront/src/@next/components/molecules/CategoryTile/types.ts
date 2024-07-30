import { CategoryDetails_category } from "@drural/sdk/lib/queries/gqlTypes/CategoryDetails";
import React from "react";

export type ImageCategory = CategoryDetails_category;

export interface IconCategory {
  id: string;
  name: string;
  icon: React.FC<{ size?: number }>;
}

export interface CategoryImageTileProps {
  category: ImageCategory;
}

export interface CategoryIconTileProps {
  category: IconCategory;
  iconSize?: number;
  iconBackgroundSize?: number;
}
