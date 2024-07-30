import { OutputData } from "@editorjs/editorjs";
import { ChannelData, ChannelPriceArgs } from "@saleor/channels/utils";
import { AttributeInput } from "@saleor/components/Attributes";
import { MetadataFormData } from "@saleor/components/Metadata";
import { MultiAutocompleteChoiceType } from "@saleor/components/MultiAutocompleteSelectField";
import { RichTextEditorChange } from "@saleor/components/RichTextEditor";
import { SingleAutocompleteChoiceType } from "@saleor/components/SingleAutocompleteSelectField";
import useForm, { ChangeEvent, FormChange } from "@saleor/hooks/useForm";
import { ProductAddressFormData } from "@saleor/products/utils/data";
import { createChannelsPriceChangeHandler } from "@saleor/products/utils/handlers";
import { arraySimpleToggle } from "@saleor/utils/arrays";
import createMultiAutocompleteSelectHandler from "@saleor/utils/handlers/multiAutocompleteSelectChangeHandler";
import useDruralRichText from "@saleor/utils/richText/useDruralRitchText";
import faker from "faker";
import React from "react";

export enum AddressTypeEnum {
  DEFAULT_ADDRESS = "default-address",
  CUSTOM_ADDRESS = "custom-address"
}

export interface ProductCreateFormData extends MetadataFormData {
  address: ProductAddressFormData;
  addressType: AddressTypeEnum;
  attributes: AttributeInput[];
  bookableResources: string[];
  categories: string[];
  category: string;
  company: string;
  channelListings: ChannelData[];
  chargeTaxes: boolean;
  collections: string[];
  description: OutputData;
  details: OutputData;
  duration: number;
  hasNoPrice: boolean;
  isBillable: boolean;
  isBookable: boolean;
  name: string;
  paymentMethods: string[];
  sku: string;
  slug: string;
  trackInventory: boolean;
  url: string;
}

export interface ProductCreateHandlers
  extends Record<"selectCategory" | "selectCollection", FormChange>,
    Record<"changeAddressFields", (event: ChangeEvent) => void>,
    Record<"changeBookableResource", (event: ChangeEvent) => void>,
    Record<"changeChannelPrice", (id: string, data: ChannelPriceArgs) => void>,
    Record<"changeDuration", (hours: number, minutes: number) => void>,
    Record<"changeHasNoPrice", (event: ChangeEvent) => void>,
    Record<"changeMethod", (event: ChangeEvent) => void> {
  changeDescription: RichTextEditorChange;
  changeDetails: RichTextEditorChange;
}
export interface UseProductCreateFormResult {
  change: FormChange;
  data: ProductCreateFormData;
  disabled: boolean;
  handlers: ProductCreateHandlers;
  hasChanged: boolean;
  submit: () => Promise<boolean>;
}

export interface UseProductCreateFormOpts
  extends Record<"categories" | "collections", SingleAutocompleteChoiceType[]> {
  setSelectedCategories: React.Dispatch<
    React.SetStateAction<MultiAutocompleteChoiceType[]>
  >;
  setSelectedCollections: React.Dispatch<
    React.SetStateAction<MultiAutocompleteChoiceType[]>
  >;
  setChannels: (channels: ChannelData[]) => void;
  selectedCategories: MultiAutocompleteChoiceType[];
  selectedCollections: MultiAutocompleteChoiceType[];
  currentChannels: ChannelData[];
  activeBusiness: string;
}

export interface ProductCreateFormProps extends UseProductCreateFormOpts {
  children: (props: UseProductCreateFormResult) => React.ReactNode;
  initial?: Partial<ProductCreateFormData>;
  onSubmit: (data: ProductCreateFormData) => Promise<boolean>;
}

function useProductCreateForm(
  initial: Partial<ProductCreateFormData>,
  onSubmit: (data: ProductCreateFormData) => Promise<boolean>,
  opts: UseProductCreateFormOpts
): UseProductCreateFormResult {
  const defaultAddressData = {
    street: "",
    streetSecondLine: "",
    postalCode: "",
    locality: "",
    region: "",
    country: "",
    latitude: null,
    longitude: null
  };

  const defaultInitialFormData: ProductCreateFormData = {
    // 1. Product create variables
    address: defaultAddressData,
    addressType: AddressTypeEnum.DEFAULT_ADDRESS,
    bookableResources: [],
    category: "",
    categories: [],
    chargeTaxes: false,
    collections: [],
    company: opts.activeBusiness,
    description: null,
    details: null,
    duration: null,
    isBillable: false,
    isBookable: false,
    paymentMethods: [],
    name: "",
    slug: "",
    url: "",
    // 2. Product channel listing update variables
    channelListings: opts.currentChannels,
    hasNoPrice: false,
    // 3. Product variant create variables
    attributes: [],
    sku: "",
    trackInventory: false,
    // 4. Metadata variables
    metadata: [],
    privateMetadata: []
  };

  const [changed, setChanged] = React.useState(false);
  const triggerChange = () => setChanged(true);

  const form = useForm({
    ...initial,
    ...defaultInitialFormData
  });
  const [description, changeDescription] = useDruralRichText({
    initial: null,
    triggerChange
  });
  const [details, changeDetails] = useDruralRichText({
    initial: null,
    triggerChange
  });
  const handleChange: FormChange = (event, cb) => {
    form.change(event, cb);
    triggerChange();
  };
  const handleCollectionSelect = createMultiAutocompleteSelectHandler(
    form.toggleValue,
    opts.setSelectedCollections,
    opts.selectedCollections,
    opts.collections
  );
  const handleCategoriesSelect = createMultiAutocompleteSelectHandler(
    form.toggleValue,
    opts.setSelectedCategories,
    opts.selectedCategories,
    opts.categories
  );
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

  const handleHasNoPriceChange = (event: ChangeEvent) => {
    const { value: hasNoPrice } = event.target;
    // 1. Cahnge hasNoPrice value
    handleChange(event);

    if (hasNoPrice) {
      // 2. Change channel prices
      opts.currentChannels.forEach(channel =>
        handleChannelPriceChange(channel.id, { price: "0" })
      );
      // 3. Change isBillable value
      handleChange({
        target: {
          name: "isBillable",
          value: false
        }
      });
      // 4. Change payment methods
      handleChange({
        target: {
          name: "paymentMethods",
          value: []
        }
      });
    }
  };

  // Channel linsting info.
  const handleChannelPriceChange = createChannelsPriceChangeHandler(
    opts.currentChannels,
    opts.setChannels,
    triggerChange
  );
  const setChannelListingsDefaultData = channelListings =>
    channelListings.map(channel => ({
      ...channel,
      isAvailableForPurchase: true,
      isPublished: true,
      visibleInListings: true
    }));

  const getData = (): ProductCreateFormData => ({
    ...form.data,
    category: form.data.categories[0],
    channelListings: setChannelListingsDefaultData(opts.currentChannels),
    description,
    details,
    sku: faker.datatype.uuid()
  });

  const data = getData();

  const submit = () => onSubmit(data);

  // Form disabled
  const disabled =
    !data.name ||
    data.description?.blocks.length === 0 ||
    // When start managing variants this part will only be required in simple products.
    data.channelListings.some(
      listing => !listing.price || parseFloat(listing.price) < 0
    ) ||
    (data.isBillable &&
      (!data.paymentMethods.length ||
        data.channelListings.some(
          listing => parseFloat(listing.price) < 0.5
        ))) ||
    (data.isBookable && (!data.duration || !data.bookableResources.length)) ||
    data.categories.length === 0;

  return {
    change: handleChange,
    data,
    disabled,
    handlers: {
      changeAddressFields: handleAddressFieldsChange,
      changeBookableResource: handleBookableResourceChange,
      changeChannelPrice: handleChannelPriceChange,
      changeDescription,
      changeDetails,
      changeDuration: handleDurationChange,
      changeHasNoPrice: handleHasNoPriceChange,
      changeMethod: handleMethodChange,
      selectCategory: handleCategoriesSelect,
      selectCollection: handleCollectionSelect
    },
    hasChanged: changed,
    submit
  };
}

const ProductCreateForm: React.FC<ProductCreateFormProps> = ({
  children,
  initial,
  onSubmit,
  ...rest
}) => {
  const props = useProductCreateForm(initial || {}, onSubmit, rest);

  return <form onSubmit={props.submit}>{children(props)}</form>;
};

ProductCreateForm.displayName = "ProductCreateForm";
export default ProductCreateForm;
