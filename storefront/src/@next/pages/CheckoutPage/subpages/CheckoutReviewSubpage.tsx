import { OrderStatus, useCheckout } from "@drural/sdk";
import React, {
  forwardRef,
  RefForwardingComponent,
  useImperativeHandle,
  useState,
} from "react";
import { useIntl } from "react-intl";

import { CheckoutReview } from "@components/organisms";
import { IProduct } from "@components/organisms/CartSummary/types";
import { statuses as dummyStatuses } from "@components/organisms/DummyPaymentGateway";
import { PaymentMethodsEnum } from "@components/organisms/PaymentGatewaysList/types";
import { paymentGatewayNames } from "@temp/constants";
import { IFormError } from "@types";

import { useBookingDetailsQuery } from "../queries";
import {
  CheckoutStep,
  SubpageBaseProps,
  SubpageCompleteHandler,
} from "../utils";

export interface ISubmitCheckoutData {
  id: string;
  orderNumber: string;
  token: string;
  orderStatus: OrderStatus;
}

interface CheckoutReviewSubpageProps extends SubpageBaseProps {
  selectedPaymentGatewayToken?: string;
  paymentGatewayFormRef: React.RefObject<HTMLFormElement>;
  products: IProduct[];
}

const CheckoutReviewSubpageWithRef: RefForwardingComponent<
  SubpageCompleteHandler,
  CheckoutReviewSubpageProps
> = (
  {
    selectedPaymentGatewayToken,
    paymentGatewayFormRef,
    products,
    changeSubmitProgress,
    onSubmitSuccess,
  },
  ref
) => {
  const intl = useIntl();
  const { checkout, payment, completeCheckout } = useCheckout();
  const bookingId = products[0]?.bookingId;

  const {
    data: bookingDetailsData,
    loading: bookingDetailsLoading,
  } = useBookingDetailsQuery(
    {
      id: bookingId,
    },
    !bookingId
  );

  const [errors, setErrors] = useState<IFormError[]>([]);

  const checkoutShippingAddress = checkout?.shippingAddress
    ? {
        ...checkout?.shippingAddress,
        phone: checkout?.shippingAddress?.phone || undefined,
      }
    : undefined;

  const checkoutBillingAddress = checkout?.billingAddress
    ? {
        ...checkout?.billingAddress,
        phone: checkout?.billingAddress?.phone || undefined,
      }
    : undefined;

  const getPaymentMethodDescription = () => {
    if (payment?.gateway === paymentGatewayNames.dummy) {
      return `Dummy: ${
        dummyStatuses.find(
          status => status.token === selectedPaymentGatewayToken
        )?.label
      }`;
    }
    if (payment?.gateway === paymentGatewayNames.adyen) {
      return `Adyen payments`;
    }
    if (payment?.creditCard) {
      return `Ending in ${payment?.creditCard.lastDigits}`;
    }
    if (payment?.gateway === PaymentMethodsEnum.BANK_TRANSFER) {
      return intl.formatMessage({ defaultMessage: "Bank transfer" });
    }
    if (payment?.gateway === PaymentMethodsEnum.PAY_AT_STORE) {
      return intl.formatMessage({ defaultMessage: "Pay at store" });
    }
    return ``;
  };

  useImperativeHandle(ref, () => async () => {
    changeSubmitProgress(true);
    let data;
    let dataError;
    if (payment?.gateway === paymentGatewayNames.adyen) {
      paymentGatewayFormRef.current?.dispatchEvent(
        new Event("submitComplete", { cancelable: true })
      );
    } else if (payment?.gateway === paymentGatewayNames.stripe) {
      paymentGatewayFormRef.current?.dispatchEvent(
        new Event("submitComplete", { cancelable: true })
      );
    } else {
      const response = await completeCheckout();
      data = response.data;
      dataError = response.dataError;
      const errors = dataError?.error;
      if (errors) {
        changeSubmitProgress(false);
        setErrors(errors);
      } else {
        setErrors([]);
        onSubmitSuccess(CheckoutStep.Review, {
          id: data?.order?.id,
          orderStatus: data?.order?.status,
          orderNumber: data?.order?.number,
          token: data?.order?.token,
        });
      }
    }
  });

  return (
    <CheckoutReview
      loading={bookingDetailsLoading}
      bookingDetails={bookingDetailsData?.booking}
      shippingAddress={checkoutShippingAddress}
      billingAddress={checkoutBillingAddress}
      shippingMethodName={checkout?.shippingMethod?.name}
      paymentMethodName={getPaymentMethodDescription()}
      email={checkout?.email}
      errors={errors}
    />
  );
};

const CheckoutReviewSubpage = forwardRef(CheckoutReviewSubpageWithRef);

export { CheckoutReviewSubpage };
