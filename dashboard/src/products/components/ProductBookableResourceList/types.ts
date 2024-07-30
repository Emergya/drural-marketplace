import { ResourceList_bookableResources_edges_node } from "@saleor/bookableResources/types/ResourceList";
import { ListProps } from "@saleor/types";

export interface ProductBookableResourceListProps extends ListProps {
  bookableResources?: ResourceList_bookableResources_edges_node[];
  data: {
    bookableResources: string[]; // Array of IDs
  };
  onBookableResourceChange?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}
