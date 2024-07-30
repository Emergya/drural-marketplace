import { SearchProducts_products_edges_node } from "@temp/views/Search/gqlTypes/SearchProducts";

import { DataErrorAuthTypes } from "../../../../../node_modules/@drural/sdk/lib/api/Auth/types";
import { PromiseRunResponse } from "../../../../../node_modules/@drural/sdk/lib/api/types";
import { User } from "../../../../../node_modules/@drural/sdk/lib/fragments/gqlTypes/User";
// import { OverlayContextInterface } from "../../../../components/Overlay/context";

export interface IProps {
  loading: boolean;
  user: User | null | undefined;
  handleSignOut?: () => PromiseRunResponse<DataErrorAuthTypes>;
  /* overlayContext: OverlayContextInterface; */
  location: string;
  // search
  query: string;
  onQueryChange: React.ChangeEventHandler<HTMLInputElement>;
  suggestions: Partial<SearchProducts_products_edges_node>[];
  onSearchItemClick: (searchQuery: string) => void;
  distance: number | undefined;
  onDistanceChange: (distance: number) => void;
  price: number[];
  onPriceChange: (distance: number[]) => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onMobileItemClick: (searchQuery: string) => void;
  resetSearch: () => void;
}

export interface IPropsWrapper {
  loading: boolean;
}

export interface Search {
  query: string | undefined;
  distance: number | undefined;
  price: number[];
}
