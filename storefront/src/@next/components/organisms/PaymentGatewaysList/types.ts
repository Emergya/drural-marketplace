import { Checkout_lines_variant_product_paymentMethods } from "@drural/sdk/lib/fragments/gqlTypes/Checkout";
import { CompleteCheckout_checkoutComplete_order } from "@drural/sdk/lib/mutations/gqlTypes/CompleteCheckout";

import {
  ICardData,
  IFormError,
  IPaymentGateway,
  IPaymentSubmitResult,
} from "@types";

export interface IProps {
  /**
   * Available payment gateways.
   */
  paymentGateways: IPaymentGateway[];
  /**
   * Payment methods available in the service
   */
  paymentMethods: (Checkout_lines_variant_product_paymentMethods | null)[];
  /**
   * Selected product's company stripe account id
   */
  stripeAccountId: string;
  /**
   * Selected payment gateway.
   */
  selectedPaymentGateway?: string;
  /**
   * Selected payment gateway token.
   */
  selectedPaymentGatewayToken?: string;
  /**
   * Selected payment method.
   */
  selectedPaymentMethod?: string;
  /**
   * Called when selected payment method is changed.
   */
  selectPaymentMethod?: (identifier: string) => void;
  /**
   * Called when selected payment gateway is changed.
   */
  selectPaymentGateway: (paymentGateway: string) => void;
  /**
   * Form reference on which payment might be submitted.
   */
  formRef?: React.RefObject<HTMLFormElement>;
  /**
   * Form id on which payment might be submitted.
   */
  formId?: string;
  /**
   * Payment gateway errors.
   */
  errors?: IFormError[];
  /**
   * Method called after the form is submitted. Passed gateway id and token attribute will be used to create payment.
   */
  processPayment: (
    gateway: string,
    token?: string,
    cardData?: ICardData
  ) => void;
  submitPayment: (data?: object) => Promise<IPaymentSubmitResult>;
  submitPaymentSuccess: (
    order?: CompleteCheckout_checkoutComplete_order | null
  ) => void;
  /**
   * Method called when gateway error occured.
   */
  onError: (errors: IFormError[]) => void;
}

export enum PaymentMethodsEnum {
  BANK_TRANSFER = "payment_methods.bank_transfer",
  CARD = "payment_methods.card",
  PAY_AT_STORE = "payment_methods.pay_at_store",
}
