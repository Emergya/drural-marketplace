import { ProductVariant } from "@drural/sdk/lib/fragments/gqlTypes/ProductVariant";
import { OrderByToken_orderByToken_lines_unitPrice } from "@drural/sdk/lib/queries/gqlTypes/OrderByToken";

export interface EditableProductRowProps {
  processing?: boolean;
}

export interface TableProps extends EditableProductRowProps {
  lines: ILine[];
  subtotal: React.ReactNode;
  deliveryCost?: React.ReactNode;
  totalCost?: React.ReactNode;
  discount?: React.ReactNode;
  discountName?: string;
}

export type ILine = Omit<
  ProductVariant,
  "__typename" | "sku" | "quantityAvailable"
> & {
  quantity: number;
  totalPrice: OrderByToken_orderByToken_lines_unitPrice;
  quantityAvailable?: number;
};

export interface ReadProductRowProps {
  mediumScreen: boolean;
  line: ILine;
}
