import { OrderByToken_orderByToken } from "@drural/sdk/lib/queries/gqlTypes/OrderByToken";
import { UserOrderByToken_orderByToken } from "@drural/sdk/lib/queries/gqlTypes/UserOrderByToken";

export type IProps = { query: { token: string } };

export interface IPageProps {
  order: OrderByToken_orderByToken | UserOrderByToken_orderByToken;
  downloadInvoice: () => void;
  orderCancel: () => void;
}
