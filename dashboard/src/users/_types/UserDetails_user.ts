import { IAddress } from "@saleor/utils/_types/IAddress";
import { ICountableConnection } from "@saleor/utils/_types/ICountableConnection";
import { IMetadata } from "@saleor/utils/_types/IMetadata";

import { ILastPlacedOrder } from "./ILastPlacedOrder";
import { IOrder } from "./IOrder";

export interface UserDetails_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  /**
   * List of public metadata items. Can be accessed without permissions.
   */
  metadata: Array<IMetadata | null>;
  /**
   * List of private metadata items.Requires proper staff permissions to access.
   */
  privateMetadata: Array<IMetadata | null>;
  dateJoined: any;
  lastLogin: any | null;
  /**
   * List of all user's addresses.
   */
  addresses: Array<IAddress | null> | null;
  defaultShippingAddress: IAddress | null;
  defaultBillingAddress: IAddress | null;
  /**
   * A note about the customer.
   */
  note: string | null;
  isActive: boolean;
  /**
   * List of user's orders.
   */
  orders: ICountableConnection<IOrder> | null;
  /**
   * List of user's orders.
   */
  lastPlacedOrder: ICountableConnection<ILastPlacedOrder> | null;
}
