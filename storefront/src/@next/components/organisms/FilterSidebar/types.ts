import { Attribute } from "@graphql/gqlTypes/Attribute";
import { SearchProducts_products_edges_node_category } from "@temp/views/Search/gqlTypes/SearchProducts";
import { IFilters } from "@types";
import { ViewPort } from "@utils/mapbox";

export interface IProps {
  attributes: Attribute[];
  filters: IFilters;
  hide: () => void;
  onAttributeFiltersChange: (attributeSlug: string, values: string) => void;
  show: boolean;
  target?: HTMLElement | null;
  // new ones
  categories?: SearchProducts_products_edges_node_category[];
  categoriesFilter?: string[];
  onCategoriesFilterChange?: (categoryId: string, selected: boolean) => void;
  distance?: number;
  onDistanceFilterChange?: (distance: number) => void;
  applydRuralFilters?: (isLocationEnabled: boolean) => void;
  resetdRuralFilters?: () => void;
  priceLte?: number;
  priceGte?: number;
  onPriceFilterChange?: (price: number[]) => void;
  // MapBox
  handleViewportChange?: (newViewport: ViewPort) => void;
  handleGeocoderViewportChange?: (newViewport: ViewPort) => void;
  searchLocation?: string;
  viewport?: ViewPort;
}
