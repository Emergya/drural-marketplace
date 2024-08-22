import { ApolloClientManager } from "../data/ApolloClientManager";
import { LocalStorageHandler } from "../helpers/LocalStorageHandler";
import { CartQueuedJobs } from "./Cart";

export interface IQueuedJobs {
  cart: CartQueuedJobs;
}

export class QueuedJobs implements IQueuedJobs {
  cart: CartQueuedJobs;

  constructor(
    localStorageHandler: LocalStorageHandler,
    apolloClientManager: ApolloClientManager
  ) {
    this.cart = new CartQueuedJobs(localStorageHandler, apolloClientManager);
  }
}
