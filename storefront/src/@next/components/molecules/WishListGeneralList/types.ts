import { ListSelected } from "@pages/WishList";
import { WishLists_me_wishlists_edges_node } from "@pages/WishList/gqlTypes/WishLists";

export interface IProps {
  wishlists: WishLists_me_wishlists_edges_node[];
  handleClick: (listId: string, listName: string, listImage: string) => void;
  active: string;
  showDeleteListModal: React.Dispatch<React.SetStateAction<boolean>>;
  setListToDelete: React.Dispatch<React.SetStateAction<ListSelected>>;
}
