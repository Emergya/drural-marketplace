import { OutputData } from "@editorjs/editorjs";
import { ResourceList_bookableResources_edges_node } from "@saleor/bookableResources/types/ResourceList";
import { ChannelData } from "@saleor/channels/utils";
import { AttributeInput } from "@saleor/components/Attributes";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import { RefreshLimits_shop_limits } from "@saleor/components/Shop/types/RefreshLimits";
import { ProductChannelListingErrorFragment } from "@saleor/fragments/types/ProductChannelListingErrorFragment";
import { ProductErrorWithAttributesFragment } from "@saleor/fragments/types/ProductErrorWithAttributesFragment";
import { TaxTypeFragment } from "@saleor/fragments/types/TaxTypeFragment";
import { WarehouseFragment } from "@saleor/fragments/types/WarehouseFragment";
import { SubmitPromise } from "@saleor/hooks/useForm";
import { FormsetData } from "@saleor/hooks/useFormset";
import { GetPaymentMethods_paymentMethods_edges_node } from "@saleor/products/types/GetPaymentMethods";
import { ProductUrlDialog, ProductUrlQueryParams } from "@saleor/products/urls";
// import ProductVariantPrice from "@saleor/products/components/ProductVariantPrice";
import { ChannelsWithVariantsData } from "@saleor/products/views/ProductUpdate/types";
import { SearchAttributeValues_attribute_choices_edges_node } from "@saleor/searches/types/SearchAttributeValues";
import { SearchCategories_search_edges_node } from "@saleor/searches/types/SearchCategories";
import { SearchCollections_search_edges_node } from "@saleor/searches/types/SearchCollections";
import { SearchPages_search_edges_node } from "@saleor/searches/types/SearchPages";
import { SearchProducts_search_edges_node } from "@saleor/searches/types/SearchProducts";
import {
  ChannelProps,
  FetchMoreProps,
  ListActions,
  ReorderAction
} from "@saleor/types";

import {
  ProductDetails_product,
  ProductDetails_product_media,
  ProductDetails_product_variants
} from "../../types/ProductDetails";
import { ProductUpdatePageFormData } from "../../utils/data";
import { ProductStockInput } from "../ProductStocks";

export interface ProductUpdatePageProps extends ListActions, ChannelProps {
  bookableResources: ResourceList_bookableResources_edges_node[];
  paymentMethods: GetPaymentMethods_paymentMethods_edges_node[];
  params: ProductUrlQueryParams;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  totalCount: number;
  channelsWithVariantsData: ChannelsWithVariantsData;
  setChannelsData: (data: ChannelData[]) => void;
  onChannelsChange: (data: ChannelData[]) => void;
  channelsData: ChannelData[];
  currentChannels: ChannelData[];
  allChannelsCount: number;
  channelsErrors: ProductChannelListingErrorFragment[];
  defaultWeightUnit: string;
  errors: ProductErrorWithAttributesFragment[];
  placeholderImage: string;
  collections: SearchCollections_search_edges_node[];
  categories: SearchCategories_search_edges_node[];
  attributeValues: SearchAttributeValues_attribute_choices_edges_node[];
  disabled: boolean;
  fetchMoreCategories: FetchMoreProps;
  fetchMoreCollections: FetchMoreProps;
  isMediaUrlModalVisible?: boolean;
  limits: RefreshLimits_shop_limits;
  variants: ProductDetails_product_variants[];
  media: ProductDetails_product_media[];
  hasChannelChanged: boolean;
  product: ProductDetails_product;
  header: string;
  saveButtonBarState: ConfirmButtonTransitionState;
  warehouses: WarehouseFragment[];
  taxTypes: TaxTypeFragment[];
  referencePages?: SearchPages_search_edges_node[];
  referenceProducts?: SearchProducts_search_edges_node[];
  assignReferencesAttributeId?: string;
  fetchMoreReferencePages?: FetchMoreProps;
  fetchMoreReferenceProducts?: FetchMoreProps;
  fetchMoreAttributeValues?: FetchMoreProps;
  isSimpleProduct: boolean;
  isStripeEnabled: boolean;
  hasStripeWarning: boolean;
  fetchCategories: (query: string) => void;
  fetchCollections: (query: string) => void;
  fetchReferencePages?: (data: string) => void;
  fetchReferenceProducts?: (data: string) => void;
  fetchAttributeValues: (query: string, attributeId: string) => void;
  onAssignReferencesClick: (attribute: AttributeInput) => void;
  onCloseDialog: () => void;
  onVariantsAdd: () => void;
  onVariantShow: (id: string) => () => void;
  onVariantReorder: ReorderAction;
  onImageDelete: (id: string) => () => void;
  onSubmit: (data: ProductUpdatePageSubmitData) => SubmitPromise;
  openChannelsModal: () => void;
  onAttributeSelectBlur: () => void;
  openModal: (
    action: ProductUrlDialog,
    newParams?: ProductUrlQueryParams
  ) => void;
  closeModal: () => void;
  onConfigureStripe: () => void;
  onWarningClose: () => void;
  onBack?();
  onDelete();
  onImageEdit?(id: string);
  onImageReorder?(event: { oldIndex: number; newIndex: number });
  onImageUpload(file: File);
  onMediaUrlUpload(mediaUrl: string);
  onSeoClick?();
  onVariantAdd?();
  onSetDefaultVariant(variant: ProductDetails_product_variants);
  onWarehouseConfigure();
  onNextPage();
  onPreviousPage();
}

export interface ProductUpdatePageSubmitData extends ProductUpdatePageFormData {
  addStocks: ProductStockInput[];
  attributes: AttributeInput[];
  attributesWithNewFileValue: FormsetData<null, File>;
  collections: string[];
  description: OutputData;
  details: OutputData;
  removeStocks: string[];
  updateStocks: ProductStockInput[];
}
