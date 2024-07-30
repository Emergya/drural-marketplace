import { SortOptions } from "@utils/collections";

export interface IProps {
  onChange: (order: { value?: string; label: string }) => void;
  sortOptions: SortOptions;
  hide: () => void;
  show: boolean;
}
