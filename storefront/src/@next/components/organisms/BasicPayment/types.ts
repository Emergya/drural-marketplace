import { IFormError } from "@types";

export interface IProps {
  /**
   * Form reference on which payment might be submitted.
   */
  formRef?: React.RefObject<HTMLFormElement>;
  /**
   * Form id on which payment might be submitted.
   */
  formId?: string;
  /**
   * Errors returned by the payment gateway.
   */
  errors?: IFormError[];
  /**
   * Payment method identifier.
   */
  paymentMethodIdentifier: string;
  /**
   * Method called after the form is submitted. Passed token attribute will be used to create payment.
   */
  processPayment: () => void;
}
