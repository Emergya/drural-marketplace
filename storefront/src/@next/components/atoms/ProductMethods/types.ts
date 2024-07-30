import { ProductDetails_paymentMethods } from "@drural/sdk/lib/fragments/gqlTypes/ProductDetails";

// 1. IProps
export interface IProps {
  title: string;
  methods: ProductDetails_paymentMethods[];
}

// 2. Util types
export type GetActiveMethods = (
  methods: ProductDetails_paymentMethods[]
) => ProductDetails_paymentMethods[];

export type GetMethodIcon = (identifier: string) => React.ReactNode;

export enum MethodIdentifierEnum {
  BANK_TRANSFER = "payment_methods.bank_transfer",
  CARD = "payment_methods.card",
  PAY_AT_STORE = "payment_methods.pay_at_store",
}
