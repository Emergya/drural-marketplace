import { ProductErrorFragment } from "@saleor/fragments/types/ProductErrorFragment";

export interface ProductUrlProps {
  url: string;
  disabled?: boolean;
  errors: ProductErrorFragment[];
  onChange(event: any);
}
