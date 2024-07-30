import { UilMultiply } from "@iconscout/react-unicons";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { Button, Separator } from "@components/atoms";
import { Moment } from "@components/atoms/Moment";
import { momentSetStaticTz } from "@components/atoms/Moment/utils";
import { Overlay } from "@components/organisms";
import { commonMessages } from "@temp/intl";
import {
  dateFormat,
  fullDisplayFormat,
  fullFormat,
  hourFormat,
} from "@utils/date";

import { SidebarTile } from "../SidebarTile";
import * as S from "./styles";
import { IBookingConfirmationOverlayProps } from "./types";

export const BookingConfirmationOverlay: React.FC<IBookingConfirmationOverlayProps> = ({
  bookableResource,
  product,
  activeDay,
  activeSlot,
  bookResource,
  hide,
}) => {
  // 1. Variables
  const { locale } = useIntl();
  const bookableResourceId = bookableResource.id;
  const productVariantId = product.defaultVariant?.id;
  const formattedActiveDay = activeDay.format(dateFormat);
  const bookingStardDate = momentSetStaticTz(
    `${formattedActiveDay} ${activeSlot.startTime}`
  );
  const bookingEndDate = momentSetStaticTz(
    `${formattedActiveDay} ${activeSlot.endTime}`
  );
  const bookingPeriod = {
    gte: bookingStardDate.format(fullFormat),
    lte: bookingEndDate.format(fullFormat),
  };

  // 2. Render
  return (
    <Overlay position="notification" duration={0} show hide={hide}>
      <S.OverlayInnerWrapper>
        <S.CloseIconWrapper onClick={hide}>
          <UilMultiply size="24" />
        </S.CloseIconWrapper>
        <S.OverlayHeaderWrapper>
          <S.OverlayTitle>
            <FormattedMessage defaultMessage="Confirm booking" />
          </S.OverlayTitle>
          <SidebarTile
            itemName={product.name}
            image={{
              thumbnail: product.thumbnail,
              thumbnail2x: product.thumbnail2x,
            }}
            duration={product.duration}
            boxShadow="none"
            padding="0"
            mobilePadding="0"
          />
        </S.OverlayHeaderWrapper>

        <Separator marginTop="16" mobileMarginTop="16" />

        <S.OverlayContentWrapper>
          <S.OverlayContentTitle>
            <FormattedMessage {...commonMessages.bookingDetails} />
          </S.OverlayContentTitle>
          <S.OverlayInfoWrapper>
            <S.OverlayInfoTitle>
              <FormattedMessage defaultMessage="Selected resource" />
            </S.OverlayInfoTitle>
            <S.OverlayInfoText>{bookableResource.name}</S.OverlayInfoText>
          </S.OverlayInfoWrapper>
          <S.OverlayInfoWrapper>
            <S.OverlayInfoTitle>
              <FormattedMessage {...commonMessages.date} />
            </S.OverlayInfoTitle>
            <S.OverlayInfoText>
              <Moment
                date={bookingStardDate.locale(locale)}
                format={fullDisplayFormat}
              />
            </S.OverlayInfoText>
          </S.OverlayInfoWrapper>
          <S.OverlayInfoWrapper>
            <S.OverlayInfoTitle>
              <FormattedMessage {...commonMessages.hour} />
            </S.OverlayInfoTitle>
            <S.OverlayInfoText>
              <Moment
                date={bookingStardDate.locale(locale)}
                format={hourFormat}
              />
            </S.OverlayInfoText>
          </S.OverlayInfoWrapper>
        </S.OverlayContentWrapper>

        <S.OverlayButtonsWrapper>
          <Button
            testingContext="cancelButton"
            type="button"
            color="ghost"
            onClick={hide}
          >
            <FormattedMessage defaultMessage="Modify" />
          </Button>
          <Button
            testingContext="submit"
            type="submit"
            onClick={() => {
              if (productVariantId) {
                bookResource({
                  variables: {
                    input: {
                      bookableResource: bookableResourceId,
                      variant: productVariantId,
                      period: bookingPeriod,
                    },
                  },
                });
              }
            }}
          >
            <FormattedMessage defaultMessage="Confirm booking" />
          </Button>
        </S.OverlayButtonsWrapper>
      </S.OverlayInnerWrapper>
    </Overlay>
  );
};
