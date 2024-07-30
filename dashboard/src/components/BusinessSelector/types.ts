import { UseNavigatorResult } from "@saleor/hooks/useNavigator";

export interface IProps {
  onActiveItem: (index: number) => void;
  activeItemName: string;
  activeItemImage: string;
  activeItemIndex: number;
  itemList: string[];
  lastItemName?: string;
  lastItemUrl?: string;
  onLastItemClick?: UseNavigatorResult;
  listTitle?: string;
}
