import { ChannelData } from "@saleor/channels/utils";
import { AttributeErrorFragment } from "@saleor/fragments/types/AttributeErrorFragment";
import { UploadErrorFragment } from "@saleor/fragments/types/UploadErrorFragment";
import {
  AddressTypeEnum,
  ProductCreateFormData
} from "@saleor/products/components/ProductCreatePage/form";
import {
  ProductChannelListingUpdate,
  ProductChannelListingUpdateVariables
} from "@saleor/products/types/ProductChannelListingUpdate";
import {
  ProductCreate,
  ProductCreateVariables
} from "@saleor/products/types/ProductCreate";
import {
  ProductDelete,
  ProductDeleteVariables
} from "@saleor/products/types/ProductDelete";
import {
  ProductVariantChannelListingUpdate,
  ProductVariantChannelListingUpdateVariables
} from "@saleor/products/types/ProductVariantChannelListingUpdate";
import {
  VariantCreate,
  VariantCreateVariables
} from "@saleor/products/types/VariantCreate";
import { getAvailabilityVariables } from "@saleor/products/utils/handlers";
import { getParsedDataForJsonStringField } from "@saleor/utils/richText/misc";
import { MutationFetchResult } from "react-apollo";

const getChannelsVariables = (productId: string, channels: ChannelData[]) => ({
  variables: {
    id: productId,
    input: {
      updateChannels: getAvailabilityVariables(channels)
    }
  }
});

const getSimpleProductVariables = (
  formData: ProductCreateFormData,
  productId: string
) => ({
  input: {
    attributes: formData.attributes,
    product: productId,
    sku: formData.sku,
    trackInventory: formData.trackInventory
  }
});

const getAddress = (formData: ProductCreateFormData) => {
  if (formData.addressType === AddressTypeEnum.DEFAULT_ADDRESS) {
    return;
  }
  return { address: formData.address };
};

export function createHandler(
  productCreate: (
    variables: ProductCreateVariables
  ) => Promise<MutationFetchResult<ProductCreate>>,
  productVariantCreate: (
    variables: VariantCreateVariables
  ) => Promise<MutationFetchResult<VariantCreate>>,
  updateChannels: (options: {
    variables: ProductChannelListingUpdateVariables;
  }) => Promise<MutationFetchResult<ProductChannelListingUpdate>>,
  updateVariantChannels: (options: {
    variables: ProductVariantChannelListingUpdateVariables;
  }) => Promise<MutationFetchResult<ProductVariantChannelListingUpdate>>,
  productDelete: (options: {
    variables: ProductDeleteVariables;
  }) => Promise<MutationFetchResult<ProductDelete>>
) {
  return async (formData: ProductCreateFormData) => {
    const isBillable = formData.isBillable;
    const isBookable = formData.isBookable;
    let errors: Array<AttributeErrorFragment | UploadErrorFragment> = [];
    errors = [...errors];

    const productVariables: ProductCreateVariables = {
      input: {
        ...getAddress(formData),
        company: formData.company,
        name: formData.name,
        description: getParsedDataForJsonStringField(formData.description),
        details: getParsedDataForJsonStringField(formData.details),
        category: formData.category,
        categories: formData.categories,
        collections: formData.collections,
        chargeTaxes: formData.chargeTaxes,
        isBillable,
        paymentMethods: isBillable ? formData.paymentMethods : [],
        isBookable,
        duration: formData.duration,
        bookableResources: isBookable ? formData.bookableResources : [],
        skipStock: true,
        hasNoPrice: formData.hasNoPrice,
        url: formData.url
      }
    };

    const result = await productCreate(productVariables);
    let hasErrors = errors.length > 0;

    const hasVariants = false;
    const productId = result.data.productCreate.product?.id;

    if (!productId) {
      return null;
    }

    if (!hasVariants) {
      const result = await Promise.all([
        updateChannels(
          getChannelsVariables(productId, formData.channelListings)
        ),
        productVariantCreate(getSimpleProductVariables(formData, productId))
      ]);
      const channelErrors = result[0].data?.productChannelListingUpdate?.errors;
      const variantErrors = result[1].data?.productVariantCreate?.errors;

      if ([...(channelErrors || []), ...(variantErrors || [])].length > 0) {
        hasErrors = true;
      }

      const variantId = result[1].data.productVariantCreate.productVariant?.id;
      if (variantErrors.length === 0 && variantId) {
        updateVariantChannels({
          variables: {
            id: variantId,
            input: formData.channelListings.map(listing => ({
              channelId: listing.id,
              price: listing.price
              // costPrice: listing.costPrice
            }))
          }
        });
      }
    } else {
      const result = await updateChannels(
        getChannelsVariables(productId, formData.channelListings)
      );

      if (result.data?.productChannelListingUpdate?.errors.length > 0) {
        hasErrors = true;
      }
    }

    /*
     INFO: This is a stop-gap solution, where we delete products that didn't meet all required data in the create form
     A more robust solution would require merging create and update form into one to persist form state across redirects
    */
    if (productId && hasErrors) {
      await productDelete({ variables: { id: productId } });

      return null;
    }
    return productId || null;
  };
}
