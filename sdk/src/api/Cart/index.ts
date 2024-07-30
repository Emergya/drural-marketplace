import { LocalStorageManager } from "../../data";
import { ErrorListener } from "../../helpers";
import { ICheckoutModel } from "../../helpers/LocalStorageHandler";
import { JobsManager } from "../../jobs";
import { ErrorCartTypes } from "../../jobs/Cart";
import { SaleorState, SaleorStateLoaded } from "../../state";
import { ISaleorStateSummeryPrices, StateItems } from "../../state/types";
import { ApolloClientManager } from "../../data/ApolloClientManager";
import { sortCheckoutLines } from "./utils";

import { Config } from "../../types";
import {
  IDiscount,
  IItems,
  IShippingPrice,
  ISubtotalPrice,
  ITotalPrice,
} from "./types";

export class SaleorCartAPI extends ErrorListener {
  loaded: boolean;

  items: IItems;

  totalPrice: ITotalPrice;

  subtotalPrice: ISubtotalPrice;

  shippingPrice: IShippingPrice;

  discount?: IDiscount;

  private apolloClientManager: ApolloClientManager;

  private jobsManager: JobsManager;

  private localStorageManager: LocalStorageManager;

  private saleorState: SaleorState;

  // temporary solution, might change in future
  private config: Config;

  constructor(
    localStorageManager: LocalStorageManager,
    apolloClientManager: ApolloClientManager,
    saleorState: SaleorState,
    jobsManager: JobsManager,
    config: Config
  ) {
    super();
    this.saleorState = saleorState;
    this.localStorageManager = localStorageManager;
    this.apolloClientManager = apolloClientManager;
    this.jobsManager = jobsManager;
    this.config = config;

    this.loaded = false;

    this.jobsManager.attachErrorListener("cart", this.fireError);

    this.saleorState.subscribeToChange(
      StateItems.CHECKOUT,
      (checkout: ICheckoutModel) => {
        this.items = checkout?.lines
          ?.filter(line => line.quantity > 0)
          .sort(sortCheckoutLines);
      }
    );
    this.saleorState.subscribeToChange(
      StateItems.SUMMARY_PRICES,
      (summaryPrices: ISaleorStateSummeryPrices) => {
        const { totalPrice, subtotalPrice, shippingPrice, discount } =
          summaryPrices || {};
        this.totalPrice = totalPrice;
        this.subtotalPrice = subtotalPrice;
        this.shippingPrice = shippingPrice;
        this.discount = discount;
      }
    );
    this.saleorState.subscribeToChange(
      StateItems.LOADED,
      (loaded: SaleorStateLoaded) => {
        this.loaded = loaded.checkout && loaded.summaryPrices;
      }
    );
  }

  addItem = async (variantId: string, quantity: number) => {
    // 1. save in local storage
    this.localStorageManager.addItemToCart(variantId, quantity);

    // 2. save online if possible (if checkout id available)
    if (this.saleorState.checkout?.lines) {
      const {
        data,
        error,
      } = await this.apolloClientManager.getRefreshedCheckoutLines(
        this.saleorState.checkout.lines,
        this.config.channel
      );

      if (error) {
        this.fireError(error, ErrorCartTypes.SET_CART_ITEM);
      } else {
        this.localStorageManager.getHandler().setCheckout({
          ...this.saleorState.checkout,
          lines: data,
        });
      }
    }

    if (this.saleorState.checkout?.id) {
      this.jobsManager.addToQueue("cart", "setCartItem");
      return {
        pending: true,
      };
    }
    return {
      pending: false,
    };
  };

  removeItem = async (variantId: string) => {
    // 1. save in local storage
    this.localStorageManager.removeItemFromCart(variantId);
    // 2. save online if possible (if checkout id available)
    if (this.saleorState.checkout?.lines) {
      const {
        data,
        error,
      } = await this.apolloClientManager.getRefreshedCheckoutLines(
        this.saleorState.checkout.lines,
        this.config.channel
      );

      if (error) {
        this.fireError(error, ErrorCartTypes.SET_CART_ITEM);
      } else {
        this.localStorageManager.getHandler().setCheckout({
          ...this.saleorState.checkout,
          lines: data,
        });
      }
    }
    if (this.saleorState.checkout?.id) {
      this.jobsManager.addToQueue("cart", "setCartItem");
      return {
        pending: true,
      };
    }
    return {
      pending: false,
    };
  };

  subtractItem = async (variantId: string) => {
    // 1. save in local storage
    this.localStorageManager.subtractItemFromCart(variantId);

    // 2. save online if possible (if checkout id available)
    if (this.saleorState.checkout?.lines) {
      const {
        data,
        error,
      } = await this.apolloClientManager.getRefreshedCheckoutLines(
        this.saleorState.checkout.lines,
        this.config.channel
      );

      if (error) {
        this.fireError(error, ErrorCartTypes.SET_CART_ITEM);
      } else {
        this.localStorageManager.getHandler().setCheckout({
          ...this.saleorState.checkout,
          lines: data,
        });
      }
    }
    if (this.saleorState.checkout?.id) {
      this.jobsManager.addToQueue("cart", "setCartItem");
      return {
        pending: true,
      };
    }
    return {
      pending: false,
    };
  };

  updateItem = async (
    variantId: string,
    quantity: number,
    bookingId?: string
  ) => {
    // 1. save in local storage
    this.localStorageManager.updateItemInCart(variantId, quantity, bookingId);

    // 2. save online if possible (if checkout id available)
    if (this.saleorState.checkout?.lines) {
      const {
        data,
        error,
      } = await this.apolloClientManager.getRefreshedCheckoutLines(
        this.saleorState.checkout.lines,
        this.config.channel
      );

      if (error) {
        this.fireError(error, ErrorCartTypes.SET_CART_ITEM);
      } else {
        this.localStorageManager.getHandler().setCheckout({
          ...this.saleorState.checkout,
          lines: data,
        });
      }
    }

    if (this.saleorState.checkout?.id) {
      this.jobsManager.addToQueue("cart", "setCartItem");
      return {
        pending: true,
      };
    }
    return {
      pending: false,
    };
  };
}
