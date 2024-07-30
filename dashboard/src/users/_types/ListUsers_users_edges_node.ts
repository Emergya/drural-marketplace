import { ListUsers_users_edges_node_orders } from "./ListUsers_users_edges_node_orders";

export interface ListUsers_users_edges_node {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  /**
   * List of user's orders.
   */
  orders: ListUsers_users_edges_node_orders | null;
  /**
   * Determines if an user is seller
   */
  isSeller: boolean | null;
  dateJoined: Date;
}
