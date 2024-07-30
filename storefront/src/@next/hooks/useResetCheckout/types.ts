import {
  DataErrorCheckoutTypes,
  FunctionErrorCheckoutTypes,
  ICheckout,
} from "@drural/sdk/lib/api/Checkout/types";
import { PromiseRunResponse } from "@drural/sdk/lib/api/types";

export type useResetCheckoutType = (
  checkout: ICheckout | undefined,
  checkoutLoaded: boolean,
  removeCheckout: (
    keepLines: boolean
  ) => PromiseRunResponse<DataErrorCheckoutTypes, FunctionErrorCheckoutTypes>
) => boolean;
