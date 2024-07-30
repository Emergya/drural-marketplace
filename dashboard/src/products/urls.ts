import { ChannelsAction } from "@saleor/channels/urls";
import urlJoin from "url-join";

import {
  ActiveTab,
  BulkAction,
  Dialog,
  Filters,
  FiltersWithMultipleValues,
  Pagination,
  SingleAction,
  Sort,
  TabActionDialog
} from "../types";
import { stringifyQs } from "../utils/urls";

const productSection = "/products/";

export const productAddPath = urlJoin(productSection, "add");
export const productAddUrl = (params?: ProductCreateUrlQueryParams) =>
  productAddPath + "?" + stringifyQs(params);

export const productListPath = productSection;
export const productReportListPath = urlJoin(productSection, "reports");
export type ProductListUrlDialog =
  | "feature"
  | "delete"
  | "export"
  | TabActionDialog;
export type ProductListReportUrlDialog = "info" | TabActionDialog;
export enum ProductReportDialogEnum {
  INFO = "info"
}
export enum ProductListUrlFiltersEnum {
  createdFrom = "createdFrom",
  createdTo = "createdTo",
  modifiedFrom = "modifiedFrom",
  modifiedTo = "modifiedTo",
  priceFrom = "priceFrom",
  priceTo = "priceTo",
  query = "query",
  channel = "channel",
  status = "status",
  stockStatus = "stockStatus"
}
export enum ProductListUrlFiltersWithMultipleValues {
  categories = "categories",
  collections = "collections",
  productTypes = "productTypes"
}
export type ProductListUrlFilters = Filters<ProductListUrlFiltersEnum> &
  FiltersWithMultipleValues<ProductListUrlFiltersWithMultipleValues>;
export enum ProductListUrlSortField {
  name = "name",
  category = "category",
  productType = "productType",
  status = "status",
  shop = "shop",
  createdDate = "createdDate",
  rank = "rank"
}
export enum ProductListReportUrlSortField {
  product = "product",
  user = "user",
  phone = "phone",
  reportDate = "reportDate"
}
export type ProductListUrlSort = Sort<ProductListUrlSortField>;
export type ProductListReportUrlSort = Sort<ProductListReportUrlSortField>;
export interface ProductListUrlQueryParams
  extends BulkAction,
    Dialog<ProductListUrlDialog>,
    ProductListUrlFilters,
    ProductListUrlSort,
    Pagination,
    ActiveTab {}
export interface ProductReportListUrlQueryParams
  extends BulkAction,
    Dialog<ProductListReportUrlDialog>,
    // ProductListUrlFilters,
    ProductListReportUrlSort,
    Pagination,
    ActiveTab {}
export const productListUrl = (params?: ProductListUrlQueryParams): string =>
  productListPath + "?" + stringifyQs(params);
export const productReportListUrl = (
  params?: ProductReportListUrlQueryParams
): string => productReportListPath + "?" + stringifyQs(params);

export const productPath = (id: string) => urlJoin(productSection + id);
export type ProductUrlDialog =
  | "add-variants"
  | "remove"
  | "remove-variants"
  | "assign-attribute-value"
  | "status-change"
  | ChannelsAction;
export type ProductUrlQueryParams = BulkAction &
  Dialog<ProductUrlDialog> &
  Pagination &
  SingleAction;
export type ProductCreateUrlDialog = "assign-attribute-value" | ChannelsAction;
export type ProductCreateUrlQueryParams = Dialog<ProductCreateUrlDialog> &
  Pagination &
  SingleAction;
export const productUrl = (id: string, params?: ProductUrlQueryParams) =>
  productPath(encodeURIComponent(id)) + "?" + stringifyQs(params);

export const productVariantEditPath = (productId: string, variantId: string) =>
  urlJoin(productSection, productId, "variant", variantId);
export type ProductVariantEditUrlDialog = "remove" | "assign-attribute-value";
export type ProductVariantEditUrlQueryParams = Dialog<
  ProductVariantEditUrlDialog
> &
  SingleAction;
export const productVariantEditUrl = (
  productId: string,
  variantId: string,
  params?: ProductVariantEditUrlQueryParams
) =>
  productVariantEditPath(
    encodeURIComponent(productId),
    encodeURIComponent(variantId)
  ) +
  "?" +
  stringifyQs(params);

export const productVariantCreatorPath = (productId: string) =>
  urlJoin(productSection, productId, "variant-creator");
export const productVariantCreatorUrl = (productId: string) =>
  productVariantCreatorPath(encodeURIComponent(productId));

export type ProductVariantAddUrlDialog = "assign-attribute-value";
export type ProductVariantAddUrlQueryParams = Dialog<
  ProductVariantAddUrlDialog
> &
  SingleAction;
export const productVariantAddPath = (productId: string) =>
  urlJoin(productSection, productId, "variant/add");
export const productVariantAddUrl = (
  productId: string,
  params?: ProductVariantAddUrlQueryParams
): string =>
  productVariantAddPath(encodeURIComponent(productId)) +
  "?" +
  stringifyQs(params);

export const productImagePath = (productId: string, imageId: string) =>
  urlJoin(productSection, productId, "image", imageId);
export type ProductImageUrlDialog = "remove";
export type ProductImageUrlQueryParams = Dialog<"remove">;
export const productImageUrl = (
  productId: string,
  imageId: string,
  params?: ProductImageUrlQueryParams
) =>
  productImagePath(encodeURIComponent(productId), encodeURIComponent(imageId)) +
  "?" +
  stringifyQs(params);

export const productPurchaseEmailAddPath = (productId: string) =>
  urlJoin(productSection, productId, "purchase-email");
export const productPurchaseEmailEditPath = (productId: string) =>
  urlJoin(productSection, productId, "purchase-email-details");

export const productPurchaseEmailEditUrl = (
  productId: string,
  params?: ProductPurchaseEmailUrlQueryParams
) =>
  productPurchaseEmailEditPath(encodeURIComponent(productId)) +
  "?" +
  stringifyQs(params);

export type ProductPurchaseEmailUrlDialog = "remove" | "preview";
export type ProductPurchaseEmailUrlQueryParams = Dialog<
  ProductPurchaseEmailUrlDialog
> &
  SingleAction;
