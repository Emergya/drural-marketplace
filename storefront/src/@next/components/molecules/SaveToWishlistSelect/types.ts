import { WishLists_me_wishlists_edges_node } from "@pages/WishList/gqlTypes/WishLists";

export interface IProps {
  wishlists: WishLists_me_wishlists_edges_node[];
  handleClickListItem: (listId: string, listName: string) => void;
  handleClickAddService: () => void;
}
