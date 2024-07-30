import React from "react";

import { ListSelected, ServiceSelected } from "@pages/WishList";
import { Wishlist_wishlist_items_edges_node_variant } from "@pages/WishList/gqlTypes/Wishlist";

export interface IProps {
  listName: ListSelected;
  services: Wishlist_wishlist_items_edges_node_variant[] | undefined;
  editList: React.Dispatch<React.SetStateAction<boolean>>;
  showDeleteServiceModal: React.Dispatch<React.SetStateAction<boolean>>;
  setServiceToDelete: React.Dispatch<React.SetStateAction<ServiceSelected>>;
}
