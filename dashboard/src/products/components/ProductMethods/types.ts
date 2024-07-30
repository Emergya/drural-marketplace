import { GetPaymentMethods_paymentMethods_edges_node } from "@saleor/products/types/GetPaymentMethods";

export enum PaymentMethodIdentifier {
  CARD = "payment_methods.card",
  PAY_AT_STORE = "payment_methods.pay_at_store",
  BANK_TRANSFER = "payment_methods.bank_transfer"
}

export interface ProductMethodsData {
  isBillable: boolean;
  paymentMethods: string[];
}

export interface ProductMethodsProps {
  data: ProductMethodsData;
  disabled: boolean;
  isStripeEnabled: boolean;
  methods?: GetPaymentMethods_paymentMethods_edges_node[];
  title?: string;
  onMethodChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
