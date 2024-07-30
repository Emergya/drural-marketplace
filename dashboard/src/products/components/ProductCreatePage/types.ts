import { ResourceList_bookableResources_edges_node } from "@saleor/bookableResources/types/ResourceList";
import { ChannelData } from "@saleor/channels/utils";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import { ProductChannelListingErrorFragment } from "@saleor/fragments/types/ProductChannelListingErrorFragment";
import { ProductErrorWithAttributesFragment } from "@saleor/fragments/types/ProductErrorWithAttributesFragment";
import {} from "@saleor/products";
import { GetPaymentMethods_paymentMethods_edges_node } from "@saleor/products/types/GetPaymentMethods";
import { SearchCategories_search_edges_node } from "@saleor/searches/types/SearchCategories";
import { SearchCollections_search_edges_node } from "@saleor/searches/types/SearchCollections";

import { FetchMoreProps } from "../../../types";
import { ProductCreateFormData } from "./form";

export interface IProductCreatePageProps {
  activeBusiness: string;
  bookableResources: ResourceList_bookableResources_edges_node[];
  errors: ProductErrorWithAttributesFragment[];
  channelsErrors: ProductChannelListingErrorFragment[];
  currentChannels: ChannelData[];
  collections: SearchCollections_search_edges_node[];
  categories: SearchCategories_search_edges_node[];
  loading: boolean;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  paymentMethods: GetPaymentMethods_paymentMethods_edges_node[];
  fetchMoreCategories: FetchMoreProps;
  fetchMoreCollections: FetchMoreProps;
  initial?: Partial<ProductCreateFormData>;
  isStripeEnabled: boolean;
  hasStripeWarning: boolean;
  header: string;
  saveButtonBarState: ConfirmButtonTransitionState;
  totalCount: number;
  fetchCategories: (data: string) => void;
  fetchCollections: (data: string) => void;
  onChannelsChange: (data: ChannelData[]) => void;
  onConfigureStripe: () => void;
  onWarningClose: () => void;
  onBack?();
  onNextPage();
  onPreviousPage();
  onSubmit?(data: ProductCreateFormData);
}
