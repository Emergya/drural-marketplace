import { ProductAddressCountry } from "@drural/sdk";
import { ProductDetails_address } from "@drural/sdk/lib/fragments/gqlTypes/ProductDetails";

export const PRODUCT_ADDRESS: ProductDetails_address = {
  __typename: "ProductAddressType",
  street: "Pascal",
  postalCode: "28034",
  locality: "Madrid",
  region: "Madrid",
  country: ProductAddressCountry.ES,
  latitude: 37.37301,
  longitude: -5.74951,
};
