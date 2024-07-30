import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { Loader } from "@components/atoms";
import { Moment } from "@components/atoms/Moment";
import { momentSetStaticTz } from "@components/atoms/Moment/utils";
import { useBookingDetailsQuery } from "@pages/CheckoutPage/queries";
// import { TaxedMoney } from "@components/containers";
import { commonMessages } from "@temp/intl";
import { fullDisplayFormat, hourFormat } from "@utils/date";

import { CachedImage } from "../CachedImage";
import * as S from "./styles";
import { IProps } from "./types";

/**
 * Row with product to display in cart summary.
 */
const CartSummaryRow: React.FC<IProps> = ({
  index,
  bookingId,
  name,
  price,
  quantity,
  thumbnail,
}: IProps) => {
  const { locale } = useIntl();

  const {
    data: bookingDetailsData,
    loading: bookingDetailsLoading,
  } = useBookingDetailsQuery(
    {
      id: bookingId,
    },
    !bookingId
  );
  const bookingDetails = bookingDetailsData?.booking;

  return (
    <S.Wrapper data-test="cartSummary">
      <S.ServiceWrapper>
        <S.ImageWrapper>
          <CachedImage data-test="image" {...thumbnail} />
        </S.ImageWrapper>
        <S.ContentWrapper>
          <S.Title>
            <FormattedMessage {...commonMessages.service} />
          </S.Title>
          <S.Text data-test="name">{name}</S.Text>
          {/* <S.Quantity>
          <FormattedMessage {...commonMessages.quantity} />
          {": "}
          <span data-test="quantity">{quantity}</span>
        </S.Quantity>
        <S.Price data-test="price">
          <TaxedMoney taxedMoney={price} />
        </S.Price> */}
        </S.ContentWrapper>
      </S.ServiceWrapper>

      {!!bookingDetails &&
        (bookingDetailsLoading ? (
          <Loader />
        ) : (
          <S.BookingWrapper>
            <S.InfoWrapper>
              <S.Title>
                <FormattedMessage {...commonMessages.resource} />
              </S.Title>
              <S.Text>{bookingDetails.bookableResource?.name}</S.Text>
            </S.InfoWrapper>
            <S.InfoWrapper>
              <S.Title>
                <FormattedMessage {...commonMessages.date} />
              </S.Title>
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
              <S.Title>
                <FormattedMessage {...commonMessages.hour} />
              </S.Title>
              <S.Text>
                <Moment
                  date={momentSetStaticTz(bookingDetails.startDate).locale(
                    locale
                  )}
                  format={hourFormat}
                />
              </S.Text>
            </S.InfoWrapper>
          </S.BookingWrapper>
        ))}
    </S.Wrapper>
  );
};

export { CartSummaryRow };
