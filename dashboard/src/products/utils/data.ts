import {
  getSelectedAttributeValues,
  mergeChoicesWithValues
} from "@saleor/attributes/utils/data";
import { ChannelData } from "@saleor/channels/utils";
import {
  AttributeInput,
  VariantAttributeScope
} from "@saleor/components/Attributes";
import { MetadataFormData } from "@saleor/components/Metadata/types";
import { SingleAutocompleteChoiceType } from "@saleor/components/SingleAutocompleteSelectField";
import { ProductVariant } from "@saleor/fragments/types/ProductVariant";
import { SelectedVariantAttributeFragment } from "@saleor/fragments/types/SelectedVariantAttributeFragment";
import { VariantAttributeFragment } from "@saleor/fragments/types/VariantAttributeFragment";
import { FormsetAtomicData } from "@saleor/hooks/useFormset";
import { maybe } from "@saleor/misc";
import {
  ProductDetails_product,
  ProductDetails_product_collections,
  ProductDetails_product_variants
} from "@saleor/products/types/ProductDetails";
import {
  ProductAddressCountry,
  PurchaseEmailInput,
  StockInput
} from "@saleor/types/globalTypes";
import { mapEdgesToItems, mapMetadataItemToInput } from "@saleor/utils/maps";

import { ProductStockInput } from "../components/ProductStocks";
import { ProductType_productType_productAttributes } from "../types/ProductType";
import { ProductVariantCreateData_product } from "../types/ProductVariantCreateData";
import { ChannelsWithVariantsData } from "../views/ProductUpdate/types";

export interface Collection {
  id: string;
  label: string;
}

interface Node {
  id: string;
  name: string;
}

export interface ProductType {
  hasVariants: boolean;
  id: string;
  name: string;
  productAttributes: ProductType_productType_productAttributes[];
}

export function getAttributeInputFromProduct(
  product: ProductDetails_product
): AttributeInput[] {
  return (
    product?.attributes?.map(attribute => ({
      data: {
        entityType: attribute.attribute.entityType,
        inputType: attribute.attribute.inputType,
        isRequired: attribute.attribute.valueRequired,
        selectedValues: attribute.values,
        values: mergeChoicesWithValues(attribute),
        unit: attribute.attribute.unit
      },
      id: attribute.attribute.id,
      label: attribute.attribute.name,
      value: getSelectedAttributeValues(attribute)
    })) ?? []
  );
}

export function getAttributeInputFromProductType(
  productType: ProductType
): AttributeInput[] {
  return productType.productAttributes.map(attribute => ({
    data: {
      entityType: attribute.entityType,
      inputType: attribute.inputType,
      isRequired: attribute.valueRequired,
      values: mapEdgesToItems(attribute.choices) || [],
      unit: attribute.unit
    },
    id: attribute.id,
    label: attribute.name,
    value: []
  }));
}

export function getAttributeInputFromAttributes(
  variantAttributes: VariantAttributeFragment[],
  variantAttributeScope: VariantAttributeScope
): AttributeInput[] {
  return variantAttributes?.map(attribute => ({
    data: {
      entityType: attribute.entityType,
      inputType: attribute.inputType,
      isRequired: attribute.valueRequired,
      values: mapEdgesToItems(attribute.choices) || [],
      unit: attribute.unit,
      variantAttributeScope
    },
    id: attribute.id,
    label: attribute.name,
    value: []
  }));
}

export function getAttributeInputFromSelectedAttributes(
  variantAttributes: SelectedVariantAttributeFragment[],
  variantAttributeScope: VariantAttributeScope
): AttributeInput[] {
  return variantAttributes?.map(attribute => ({
    data: {
      entityType: attribute.attribute.entityType,
      inputType: attribute.attribute.inputType,
      isRequired: attribute.attribute.valueRequired,
      selectedValues: attribute.values,
      values: mergeChoicesWithValues(attribute),
      unit: attribute.attribute.unit,
      variantAttributeScope
    },
    id: attribute.attribute.id,
    label: attribute.attribute.name,
    value: getSelectedAttributeValues(attribute)
  }));
}

export function getAttributeInputFromVariant(
  variant: ProductVariant
): AttributeInput[] {
  const selectionAttributeInput = getAttributeInputFromSelectedAttributes(
    variant?.selectionAttributes,
    VariantAttributeScope.VARIANT_SELECTION
  );
  const nonSelectionAttributeInput = getAttributeInputFromSelectedAttributes(
    variant?.nonSelectionAttributes,
    VariantAttributeScope.NOT_VARIANT_SELECTION
  );

  return (
    selectionAttributeInput?.concat(nonSelectionAttributeInput ?? []) ?? []
  );
}

export function getVariantAttributeInputFromProduct(
  product: ProductVariantCreateData_product
): AttributeInput[] {
  const selectionAttributeInput = getAttributeInputFromAttributes(
    product?.productType?.selectionVariantAttributes,
    VariantAttributeScope.VARIANT_SELECTION
  );

  const nonSelectionAttributeInput = getAttributeInputFromAttributes(
    product?.productType?.nonSelectionVariantAttributes,
    VariantAttributeScope.NOT_VARIANT_SELECTION
  );

  return (
    selectionAttributeInput?.concat(nonSelectionAttributeInput ?? []) ?? []
  );
}

export function getStockInputFromVariant(
  variant: ProductVariant
): ProductStockInput[] {
  return (
    variant?.stocks.map(stock => ({
      data: {
        quantityAllocated: stock.quantityAllocated
      },
      id: stock.warehouse.id,
      label: stock.warehouse.name,
      value: stock.quantity.toString()
    })) || []
  );
}

export function getStockInputFromProduct(
  product: ProductDetails_product
): ProductStockInput[] {
  return product?.variants[0]?.stocks.map(stock => ({
    data: {
      quantityAllocated: stock?.quantityAllocated
    },
    id: stock.warehouse.id,
    label: stock.warehouse.name,
    value: stock.quantity.toString()
  }));
}

export function getCollectionInput(
  productCollections: ProductDetails_product_collections[]
): Collection[] {
  return maybe(
    () =>
      productCollections.map(collection => ({
        id: collection.id,
        label: collection.name
      })),
    []
  );
}

export function getChoices(nodes: Node[]): SingleAutocompleteChoiceType[] {
  return maybe(
    () =>
      nodes.map(node => ({
        label: node.name,
        value: node.id
      })),
    []
  );
}

export interface ProductAddressFormData {
  street: string;
  streetSecondLine: string;
  postalCode: string;
  locality: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface ProductUpdatePageFormData extends MetadataFormData {
  address: ProductAddressFormData;
  // addressType: string;
  bookableResources: string[];
  category: string | null;
  categories: string[];
  changeTaxCode: boolean;
  channelsWithVariants: ChannelsWithVariantsData;
  channelListings: ChannelData[];
  channelsData: ChannelData[];
  chargeTaxes: boolean;
  collections: string[];
  duration: number;
  hasNoPrice: boolean;
  isAvailable: boolean;
  isBillable: boolean;
  isBookable: boolean;
  keywords: string[];
  name: string;
  paymentMethods: string[];
  slug: string;
  rating: number;
  seoDescription: string;
  seoTitle: string;
  sku: string;
  taxCode: string;
  trackInventory: boolean;
  url: string;
  weight: string;
}

export function getProductUpdatePageFormData(
  product: ProductDetails_product,
  variants: ProductDetails_product_variants[],
  currentChannels: ChannelData[],
  channelsData: ChannelData[],
  channelsWithVariants: ChannelsWithVariantsData
): ProductUpdatePageFormData {
  return {
    address: {
      street: maybe(() => product.address.street, ""),
      streetSecondLine: maybe(() => product.address.streetSecondLine, ""),
      postalCode: maybe(() => product.address.postalCode, ""),
      locality: maybe(() => product.address.locality, ""),
      region: maybe(() => product.address.region, ""),
      country: maybe(() => product.address.country, ProductAddressCountry.ES),
      latitude: maybe(() => product.address.latitude, null),
      longitude: maybe(() => product.address.longitude, null)
    },
    bookableResources: maybe(
      () =>
        mapEdgesToItems(product.bookableResources).map(
          bookableResource => bookableResource.id
        ),
      []
    ),
    channelsWithVariants,
    channelsData,
    category: maybe(() => product.category.id, ""),
    changeTaxCode: maybe(() => !!product?.taxType.taxCode),
    chargeTaxes: maybe(() => product.chargeTaxes, false),
    categories: maybe(
      () => mapEdgesToItems(product.categories).map(category => category.id),
      []
    ),
    collections: maybe(
      () => product.collections.map(collection => collection.id),
      []
    ),
    channelListings: currentChannels,
    duration: maybe(() => product.duration, null),
    hasNoPrice: maybe(() => product.hasNoPrice, false),
    isAvailable: !!product?.isAvailable,
    isBillable: maybe(() => product.isBillable, false),
    isBookable: maybe(() => product.isBookable, false),
    keywords: maybe(
      () =>
        mapEdgesToItems(product.keywords).map(keyword => keyword.nameKeyword),
      []
    ),
    metadata: product?.metadata?.map(mapMetadataItemToInput),
    name: maybe(() => product.name, ""),
    paymentMethods: maybe(
      () => product.paymentMethods.map(paymentMethod => paymentMethod.id),
      []
    ),
    privateMetadata: product?.privateMetadata?.map(mapMetadataItemToInput),
    rating: maybe(() => product.rating, null),
    seoDescription: maybe(() => product.seoDescription, ""),
    seoTitle: maybe(() => product.seoTitle, ""),
    sku: maybe(
      () =>
        product.productType.hasVariants
          ? undefined
          : variants && variants[0]
          ? variants[0].sku
          : undefined,
      ""
    ),
    slug: product?.slug || "",
    taxCode: maybe(() => product?.taxType.taxCode),
    trackInventory: maybe(() => !!product?.variants[0]?.trackInventory),
    url: maybe(() => product.url, ""),
    weight: maybe(() => product?.weight?.value.toString() || "")
  };
}

export function mapFormsetStockToStockInput(
  stock: FormsetAtomicData<null, string>
): StockInput {
  return {
    quantity: parseInt(stock.value, 10) || 0,
    warehouse: stock.id
  };
}

export const getCompany = (isStaff: boolean, company: string) => {
  if (!isStaff) {
    return { company };
  }
  return {};
};

export const getPurchaseEmailMutationVariables = (
  id: string,
  purchaseEmail: PurchaseEmailInput
) => ({
  variables: {
    id,
    purchaseEmail
  }
});
