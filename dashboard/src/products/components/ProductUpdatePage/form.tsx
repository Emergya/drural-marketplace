import { OutputData } from "@editorjs/editorjs";
import { getAttributesDisplayData } from "@saleor/attributes/utils/data";
import {
  createAttributeChangeHandler,
  createAttributeFileChangeHandler,
  createAttributeMultiChangeHandler,
  createAttributeReferenceChangeHandler,
  createAttributeValueReorderHandler,
  createFetchMoreReferencesHandler,
  createFetchReferencesHandler
} from "@saleor/attributes/utils/handlers";
import { ChannelData, ChannelPriceArgs } from "@saleor/channels/utils";
import { AttributeInput } from "@saleor/components/Attributes";
import { MetadataFormData } from "@saleor/components/Metadata";
import { MultiAutocompleteChoiceType } from "@saleor/components/MultiAutocompleteSelectField";
import { RichTextEditorChange } from "@saleor/components/RichTextEditor";
import { SingleAutocompleteChoiceType } from "@saleor/components/SingleAutocompleteSelectField";
import useForm, {
  ChangeEvent,
  FormChange,
  SubmitPromise
} from "@saleor/hooks/useForm";
import useFormset, {
  FormsetAtomicData,
  FormsetChange,
  FormsetData
} from "@saleor/hooks/useFormset";
import { ProductDetails_product } from "@saleor/products/types/ProductDetails";
import {
  getAttributeInputFromProduct,
  getProductUpdatePageFormData,
  getStockInputFromProduct,
  ProductAddressFormData
} from "@saleor/products/utils/data";
import {
  createChannelsChangeHandler,
  createChannelsPriceChangeHandler
} from "@saleor/products/utils/handlers";
// import {
//   validateCostPrice,
//   validatePrice
// } from "@saleor/products/utils/validation";
import { ChannelsWithVariantsData } from "@saleor/products/views/ProductUpdate/types";
import { SearchPages_search_edges_node } from "@saleor/searches/types/SearchPages";
import { SearchProducts_search_edges_node } from "@saleor/searches/types/SearchProducts";
import { SearchWarehouses_search_edges_node } from "@saleor/searches/types/SearchWarehouses";
import { FetchMoreProps, ReorderEvent } from "@saleor/types";
import { arrayDiff, arraySimpleToggle } from "@saleor/utils/arrays";
import handleFormSubmit from "@saleor/utils/handlers/handleFormSubmit";
import createMultiAutocompleteSelectHandler from "@saleor/utils/handlers/multiAutocompleteSelectChangeHandler";
import createSingleAutocompleteSelectHandler from "@saleor/utils/handlers/singleAutocompleteSelectChangeHandler";
import getMetadata from "@saleor/utils/metadata/getMetadata";
import useMetadataChangeTrigger from "@saleor/utils/metadata/useMetadataChangeTrigger";
import useDruralRichText from "@saleor/utils/richText/useDruralRitchText";
// import useRichText from "@saleor/utils/richText/useRichText";
// import { diff } from "fast-array-diff";
import React from "react";

import { ProductStockFormsetData, ProductStockInput } from "../ProductStocks";

export interface ProductUpdateFormData extends MetadataFormData {
  address: ProductAddressFormData;
  // addressType: string;
  bookableResources: string[];
  category: string | null;
  changeTaxCode: boolean;
  channelsData: ChannelData[];
  channelsWithVariants: ChannelsWithVariantsData;
  channelListings: ChannelData[];
  chargeTaxes: boolean;
  categories: string[];
  collections: string[];
  duration: number;
  hasNoPrice: boolean;
  isAvailable: boolean;
  isBillable: boolean;
  isBookable: boolean;
  keywords: string[];
  name: string;
  paymentMethods: string[];
  rating: number;
  slug: string;
  seoDescription: string;
  seoTitle: string;
  sku: string;
  taxCode: string;
  trackInventory: boolean;
  url: string;
  weight: string;
}
export interface FileAttributeInputData {
  attributeId: string;
  file: File;
}
export type FileAttributeInput = FormsetAtomicData<
  FileAttributeInputData,
  string[]
>;

export interface FileAttributesSubmitData {
  fileAttributes: FileAttributeInput[];
}
export interface ProductUpdateData extends ProductUpdateFormData {
  attributes: AttributeInput[];
  description: OutputData;
  details: OutputData;
  stocks: ProductStockInput[];
}
export interface ProductUpdateSubmitData extends ProductUpdateFormData {
  attributes: AttributeInput[];
  attributesWithNewFileValue: FormsetData<null, File>;
  categories: string[];
  collections: string[];
  description: OutputData;
  details: OutputData;
  addStocks: ProductStockInput[];
  updateStocks: ProductStockInput[];
  removeStocks: string[];
}

export interface ProductUpdateHandlers
  extends Record<
      | "changeMetadata"
      | "selectCategory"
      | "selectCollection"
      | "selectTaxRate",
      FormChange
    >,
    Record<
      "changeStock" | "selectAttribute" | "selectAttributeMultiple",
      FormsetChange<string>
    >,
    Record<"changeChannelPrice", (id: string, data: ChannelPriceArgs) => void>,
    Record<
      "changeChannels",
      (
        id: string,
        data: Omit<ChannelData, "name" | "price" | "currency" | "id">
      ) => void
    >,
    Record<"selectAttributeReference", FormsetChange<string[]>>,
    Record<"selectAttributeFile", FormsetChange<File>>,
    Record<"reorderAttributeValue", FormsetChange<ReorderEvent>>,
    Record<"addStock" | "deleteStock", (id: string) => void>,
    Record<"changeSlug", (name: string) => void>,
    Record<"changeAddressFields", (event: ChangeEvent) => void>,
    Record<"changeMethod", (event: ChangeEvent) => void>,
    Record<"changeBookableResource", (event: ChangeEvent) => void>,
    Record<"changeDuration", (hours: number, minutes: number) => void> {
  changeDescription: RichTextEditorChange;
  changeDetails: RichTextEditorChange;
  fetchReferences: (value: string) => void;
  fetchMoreReferences: FetchMoreProps;
}
export interface UseProductUpdateFormResult {
  change: FormChange;

  data: ProductUpdateData;
  disabled: boolean;
  handlers: ProductUpdateHandlers;
  hasChanged: boolean;
  submit: () => Promise<boolean>;
}

export interface UseProductUpdateFormOpts
  extends Record<
    "categories" | "collections" | "taxTypes",
    SingleAutocompleteChoiceType[]
  > {
  // setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCategories: React.Dispatch<
    React.SetStateAction<MultiAutocompleteChoiceType[]>
  >;
  setSelectedCollections: React.Dispatch<
    React.SetStateAction<MultiAutocompleteChoiceType[]>
  >;
  setSelectedTaxType: React.Dispatch<React.SetStateAction<string>>;
  selectedCategories: MultiAutocompleteChoiceType[];
  selectedCollections: MultiAutocompleteChoiceType[];
  warehouses: SearchWarehouses_search_edges_node[];
  channelsData: ChannelData[];
  hasVariants: boolean;
  currentChannels: ChannelData[];
  setChannels: (data: ChannelData[]) => void;
  setChannelsData: (data: ChannelData[]) => void;
  referencePages: SearchPages_search_edges_node[];
  referenceProducts: SearchProducts_search_edges_node[];
  fetchReferencePages?: (data: string) => void;
  fetchMoreReferencePages?: FetchMoreProps;
  fetchReferenceProducts?: (data: string) => void;
  fetchMoreReferenceProducts?: FetchMoreProps;
  assignReferencesAttributeId?: string;
  channelsWithVariants: ChannelsWithVariantsData;
  isSimpleProduct: boolean;
  activeBusiness?: string;
}

export interface ProductUpdateFormProps extends UseProductUpdateFormOpts {
  children: (props: UseProductUpdateFormResult) => React.ReactNode;
  product: ProductDetails_product;
  onSubmit: (data: ProductUpdateSubmitData) => SubmitPromise;
}

const getStocksData = (
  product: ProductDetails_product,
  stocks: FormsetData<ProductStockFormsetData, string>
) => {
  if (product?.productType?.hasVariants) {
    return { addStocks: [], removeStocks: [], updateStocks: [] };
  }

  const dataStocks = stocks.map(stock => stock.id);
  const variantStocks =
    product?.variants[0]?.stocks.map(stock => stock.warehouse.id) || [];
  const stockDiff = arrayDiff(variantStocks, dataStocks);

  return {
    addStocks: stocks.filter(stock =>
      stockDiff.added.some(addedStock => addedStock === stock.id)
    ),
    removeStocks: stockDiff.removed,
    updateStocks: stocks.filter(
      stock => !stockDiff.added.some(addedStock => addedStock === stock.id)
    )
  };
};

function useProductUpdateForm(
  product: ProductDetails_product,
  onSubmit: (data: ProductUpdateSubmitData) => SubmitPromise,
  opts: UseProductUpdateFormOpts
): UseProductUpdateFormResult {
  const [changed, setChanged] = React.useState(false);
  const triggerChange = () => setChanged(true);

  const form = useForm(
    getProductUpdatePageFormData(
      product,
      product?.variants,
      opts.currentChannels,
      opts.channelsData,
      opts.channelsWithVariants
    )
  );

  const attributes = useFormset(getAttributeInputFromProduct(product));
  const attributesWithNewFileValue = useFormset<null, File>([]);
  const stocks = useFormset(getStockInputFromProduct(product));
  const [description, changeDescription] = useDruralRichText({
    initial: product?.description,
    triggerChange
  });
  // Ads Service details data & change funtion
  const [details, changeDetails] = useDruralRichText({
    initial: product?.details,
    triggerChange
  });

  const {
    isMetadataModified,
    isPrivateMetadataModified,
    makeChangeHandler: makeMetadataChangeHandler
  } = useMetadataChangeTrigger();

  const handleChange: FormChange = (event, cb) => {
    form.change(event, cb);
    triggerChange();
  };
  const hadleSlugChange = (name: string) => {
    const getSlug = (name: string) =>
      name
        .trim()
        .replace(/\s+/g, "-")
        .toLowerCase();

    const event: ChangeEvent = {
      target: {
        name: "slug",
        value: getSlug(name)
      }
    };

    form.change(event);
  };
  const handleAddressFieldsChange = (event: ChangeEvent) => {
    const { name, value } = event.target;

    handleChange({
      target: {
        name: "address",
        value: {
          ...form.data.address,
          [name]: value
        }
      }
    });
  };
  const handleMethodChange = (event: ChangeEvent) => {
    const { name: id } = event.target;

    const paymentMethods = arraySimpleToggle(form.data.paymentMethods, id);

    handleChange({
      target: {
        name: "paymentMethods",
        value: paymentMethods
      }
    });
  };
  const handleBookableResourceChange = (event: ChangeEvent) => {
    const { name: id } = event.target;

    const bookableResources = arraySimpleToggle(
      form.data.bookableResources,
      id
    );

    handleChange({
      target: {
        name: "bookableResources",
        value: bookableResources
      }
    });
  };
  const handleDurationChange = (hours: number, minutes: number) => {
    const value =
      (hours || minutes) === (null || undefined) ? null : hours * 60 + minutes;

    handleChange({
      target: {
        name: "duration",
        value
      }
    });
  };
  const handleCollectionSelect = createMultiAutocompleteSelectHandler(
    event => form.toggleValue(event, triggerChange),
    opts.setSelectedCollections,
    opts.selectedCollections,
    opts.collections
  );
  const handleCategoriesSelect = createMultiAutocompleteSelectHandler(
    event => form.toggleValue(event, triggerChange),
    opts.setSelectedCategories,
    opts.selectedCategories,
    opts.categories
  );
  // const handleCategorySelect = createSingleAutocompleteSelectHandler(
  //   handleChange,
  //   opts.setSelectedCategory,
  //   opts.categories
  // );
  const handleAttributeChange = createAttributeChangeHandler(
    attributes.change,
    triggerChange
  );
  const handleAttributeMultiChange = createAttributeMultiChangeHandler(
    attributes.change,
    attributes.data,
    triggerChange
  );
  const handleAttributeReferenceChange = createAttributeReferenceChangeHandler(
    attributes.change,
    triggerChange
  );
  const handleFetchReferences = createFetchReferencesHandler(
    attributes.data,
    opts.assignReferencesAttributeId,
    opts.fetchReferencePages,
    opts.fetchReferenceProducts
  );
  const handleFetchMoreReferences = createFetchMoreReferencesHandler(
    attributes.data,
    opts.assignReferencesAttributeId,
    opts.fetchMoreReferencePages,
    opts.fetchMoreReferenceProducts
  );
  const handleAttributeFileChange = createAttributeFileChangeHandler(
    attributes.change,
    attributesWithNewFileValue.data,
    attributesWithNewFileValue.add,
    attributesWithNewFileValue.change,
    triggerChange
  );
  const handleAttributeValueReorder = createAttributeValueReorderHandler(
    attributes.change,
    attributes.data,
    triggerChange
  );
  const handleStockChange: FormsetChange<string> = (id, value) => {
    triggerChange();
    stocks.change(id, value);
  };
  const handleStockAdd = (id: string) => {
    triggerChange();
    stocks.add({
      data: {
        quantityAllocated: 0
      },
      id,
      label: opts.warehouses.find(warehouse => warehouse.id === id).name,
      value: "0"
    });
  };
  const handleStockDelete = (id: string) => {
    triggerChange();
    stocks.remove(id);
  };
  const handleTaxTypeSelect = createSingleAutocompleteSelectHandler(
    handleChange,
    opts.setSelectedTaxType,
    opts.taxTypes
  );
  const changeMetadata = makeMetadataChangeHandler(handleChange);

  const handleChannelsChange = createChannelsChangeHandler(
    opts.isSimpleProduct ? opts.currentChannels : opts.channelsData,
    opts.isSimpleProduct ? opts.setChannels : opts.setChannelsData,
    triggerChange
  );

  const handleChannelPriceChange = createChannelsPriceChangeHandler(
    opts.isSimpleProduct ? opts.currentChannels : opts.channelsData,
    opts.isSimpleProduct ? opts.setChannels : opts.setChannelsData,
    triggerChange
  );

  const data: ProductUpdateData = {
    ...form.data,
    channelListings: opts.currentChannels,
    channelsData: opts.channelsData,
    attributes: getAttributesDisplayData(
      attributes.data,
      attributesWithNewFileValue.data,
      opts.referencePages,
      opts.referenceProducts
    ),
    description,
    details,
    stocks: stocks.data
  };

  // Need to make it function to always have description.current & details.current up to date
  const getSubmitData = (): ProductUpdateSubmitData => ({
    ...data,
    ...getStocksData(product, stocks.data),
    ...getMetadata(data, isMetadataModified, isPrivateMetadataModified),
    attributes: attributes.data,
    attributesWithNewFileValue: attributesWithNewFileValue.data,
    description,
    details
  });

  const handleSubmit = async (data: ProductUpdateSubmitData) => {
    const errors = await onSubmit(data);

    if (!errors?.length) {
      attributesWithNewFileValue.set([]);
    }

    return errors;
  };

  const submit = async () =>
    handleFormSubmit(getSubmitData(), handleSubmit, setChanged);

  // Addres validation: comented untill gets final address
  // const isValidAddress = () =>
  //   !Object.values(data.address).some(value => !value);

  const disabled =
    !data.name ||
    data.description?.blocks.length === 0 ||
    (opts.isSimpleProduct &&
      data.channelListings.some(
        listing => !listing.price || parseFloat(listing.price) < 0
      )) ||
    (data.isBillable &&
      (!data.paymentMethods.length ||
        data.channelListings.some(
          listing => parseFloat(listing.price) < 0.5
        ))) ||
    (data.isBookable && (!data.duration || !data.bookableResources.length)) ||
    data.categories.length === 0;
  // || !isValidAddress();

  return {
    change: handleChange,
    data,
    disabled,
    handlers: {
      addStock: handleStockAdd,
      changeBookableResource: handleBookableResourceChange,
      changeChannelPrice: handleChannelPriceChange,
      changeChannels: handleChannelsChange,
      changeDuration: handleDurationChange,
      changeAddressFields: handleAddressFieldsChange,
      changeDescription,
      changeDetails,
      changeMetadata,
      changeMethod: handleMethodChange,
      changeStock: handleStockChange,
      deleteStock: handleStockDelete,
      changeSlug: hadleSlugChange,
      fetchMoreReferences: handleFetchMoreReferences,
      fetchReferences: handleFetchReferences,
      reorderAttributeValue: handleAttributeValueReorder,
      selectAttribute: handleAttributeChange,
      selectAttributeFile: handleAttributeFileChange,
      selectAttributeMultiple: handleAttributeMultiChange,
      selectAttributeReference: handleAttributeReferenceChange,
      selectCategory: handleCategoriesSelect,
      selectCollection: handleCollectionSelect,
      selectTaxRate: handleTaxTypeSelect
    },
    hasChanged: changed,
    submit
  };
}

const ProductUpdateForm: React.FC<ProductUpdateFormProps> = ({
  children,
  product,
  onSubmit,
  ...rest
}) => {
  const props = useProductUpdateForm(product, onSubmit, rest);

  return <form onSubmit={props.submit}>{children(props)}</form>;
};

ProductUpdateForm.displayName = "ProductUpdateForm";
export default ProductUpdateForm;
