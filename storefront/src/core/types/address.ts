import { CreateCheckout_checkoutCreate_checkout_shippingAddress } from "@drural/sdk/lib/mutations/gqlTypes/CreateCheckout";

export type AddressInterface = Omit<
  CreateCheckout_checkoutCreate_checkout_shippingAddress,
  "__typename"
>;
