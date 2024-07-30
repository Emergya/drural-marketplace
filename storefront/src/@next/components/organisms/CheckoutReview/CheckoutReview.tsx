import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { ErrorMessage, Loader } from "@components/atoms";
import { Moment } from "@components/atoms/Moment";
import { momentSetStaticTz } from "@components/atoms/Moment/utils";
import { AddressSummary } from "@components/molecules";
import { checkoutMessages, commonMessages } from "@temp/intl";
import { fullDisplayFormat, hourFormat } from "@utils/date";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Review order view showed in checkout.
 */
const CheckoutReview: React.FC<IProps> = ({
  loading,
  bookingDetails,
  shippingAddress,
  billingAddress,
  shippingMethodName,
  paymentMethodName,
  email,
  errors,
}) => {
  const { locale } = useIntl();

  return loading ? (
    <Loader />
  ) : (
    <S.Wrapper data-test="sectionTitle">
      <S.Title data-test="checkoutPageSubtitle">
        {bookingDetails ? (
          <FormattedMessage {...checkoutMessages.bookingDetails} />
        ) : (
          <FormattedMessage {...checkoutMessages.reviewOrder} />
        )}
      </S.Title>
      <S.DescriptionWrapper>
        <S.Text>
          <FormattedMessage defaultMessage="These are your checkout details, plase make sure to review them before confirm the checkout." />
        </S.Text>
      </S.DescriptionWrapper>
      {/* Booking details */}
      {bookingDetails && (
        <>
          <S.InfoWrapper>
            <S.Subtitle>
              <FormattedMessage defaultMessage="Booking reference number" />
            </S.Subtitle>
            <S.Text>{bookingDetails.bookingReference}</S.Text>
          </S.InfoWrapper>
          {bookingDetails.bookableResource && (
            <S.InfoWrapper>
              <S.Subtitle>
                <FormattedMessage {...commonMessages.resource} />
              </S.Subtitle>
              <S.Text>{bookingDetails.bookableResource.name}</S.Text>
            </S.InfoWrapper>
          )}
          <S.InfoWrapper>
            <S.Subtitle>
              <FormattedMessage {...commonMessages.date} />
            </S.Subtitle>
            <S.Text>
              <Moment
                date={momentSetStaticTz(bookingDetails.startDate).locale(
                  locale
                )}
                format={fullDisplayFormat}
              />
            </S.Text>
          </S.InfoWrapper>
          <S.InfoWrapper>
            <S.Subtitle>
              <FormattedMessage {...commonMessages.hour} />
            </S.Subtitle>
            <S.Text>
              <Moment
                date={momentSetStaticTz(bookingDetails.startDate).locale(
                  locale
                )}
                format={hourFormat}
              />
            </S.Text>
          </S.InfoWrapper>
        </>
      )}

      {/* Checkout details */}
      {shippingAddress && (
        <S.InfoWrapper>
          <S.Subtitle>
            <FormattedMessage {...checkoutMessages.shippingAddress} />
          </S.Subtitle>
          <S.Text>
            <AddressSummary address={shippingAddress} email={email} />
          </S.Text>
        </S.InfoWrapper>
      )}
      <S.InfoWrapper>
        <S.Subtitle>
          <FormattedMessage defaultMessage="Billing Address" />
        </S.Subtitle>
        <S.Text>
          <AddressSummary address={billingAddress} email={email} />
        </S.Text>
      </S.InfoWrapper>
      {shippingMethodName && (
        <S.InfoWrapper>
          <S.Subtitle>
            <FormattedMessage defaultMessage="Shipping Method" />
          </S.Subtitle>
          <S.Text>{shippingMethodName}</S.Text>
        </S.InfoWrapper>
      )}
      <S.InfoWrapper>
        <S.Subtitle>
          <FormattedMessage defaultMessage="Payment Method" />
        </S.Subtitle>
        <S.Text>{paymentMethodName}</S.Text>
      </S.InfoWrapper>

      <S.ErrorMessages>
        <ErrorMessage errors={errors} />
      </S.ErrorMessages>
    </S.Wrapper>
  );
};

export { CheckoutReview };
