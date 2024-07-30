import moment from "moment-timezone";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { generatePath } from "react-router";

import { Button, PageBottomSpacing } from "@components/atoms";
import {
  BackLink,
  BookableResourceSelectTile,
  SidebarTile,
} from "@components/molecules";
import { CalendarTile } from "@components/molecules/BookingTiles/CalendarTile";
import { SlotsTile } from "@components/molecules/BookingTiles/SlotsTile";
import { Container } from "@components/templates";
import { paths } from "@paths";
import { commonMessages } from "@temp/intl";

import { getBookableResourceOptions } from "../../components/molecules/BookingTiles/utils";
import { initialSlot } from "./fixures";
import { BookingProductDetailsQuery_product_bookableResources_edges_node } from "./gqlTypes/BookingProductDetailsQuery";
import * as S from "./styles";
import { IBookingPageProps } from "./types";

export const BookingPage: NextPage<IBookingPageProps> = ({
  bookableResource,
  bookableResources,
  calendarAvailability,
  calendarAvailabilityLoading,
  loading,
  product,
  selectedBookableResource,
  activeDay,
  activeSlot,
  slotsAvailability,
  onBookableResourceChange,
  onDayChange,
  onMonthChange,
  onModalChange,
  onSlotChange,
}) => {
  // 1. Variables
  const intl = useIntl();
  const { query, push } = useRouter();
  const productSlug = query.productSlug as string;

  // 2. Methods
  const pushToSelectBookableResourcePage = () => {
    onDayChange(moment());
    onSlotChange(initialSlot);
    push({
      pathname: paths.booking,
      query: {
        productSlug,
        bookableResourceId: selectedBookableResource.value,
      },
    });
  };

  const pushToCalendarPage = () => {
    push({
      pathname: paths.booking,
      query: {
        productSlug,
      },
    });
  };

  const pushToProductDetailsPage = () => {
    push(
      generatePath(paths.product, {
        slug: query.productSlug as string,
      })
    );
  };

  const onCancelButonClick = (
    bookableResource:
      | BookingProductDetailsQuery_product_bookableResources_edges_node
      | undefined
  ) => {
    if (bookableResource) {
      pushToCalendarPage();
    } else {
      pushToProductDetailsPage();
    }
  };

  const onNextButtonClick = (
    bookableResource:
      | BookingProductDetailsQuery_product_bookableResources_edges_node
      | undefined
  ) => {
    if (bookableResource) {
      onModalChange(true);
    } else {
      pushToSelectBookableResourcePage();
    }
  };

  // 3. Buttons disabled
  const isSlotActive =
    !!activeSlot.startTime.length || !!activeSlot.endTime.length;
  const disabled =
    loading ||
    (bookableResource
      ? !activeDay || !isSlotActive
      : !selectedBookableResource.value.length);

  // 4. Render
  return (
    <Container>
      <BackLink
        onClick={() =>
          push(
            generatePath(paths.product, {
              slug: query.productSlug as string,
            })
          )
        }
      >
        <FormattedMessage defaultMessage="Back to service page" />
      </BackLink>
      <S.Title>
        <FormattedMessage defaultMessage="Book this service" />
      </S.Title>
      <S.MainWrapper>
        <SidebarTile
          title={intl.formatMessage(commonMessages.bookingService)}
          itemName={product.name}
          image={{
            thumbnail: product.thumbnail,
            thumbnail2x: product.thumbnail2x,
          }}
          duration={product.duration}
        />
        <S.ContentWrapper>
          <S.TilesWrapper>
            {bookableResource ? (
              <>
                <CalendarTile
                  activeDay={activeDay}
                  bookableResource={bookableResource}
                  calendarAvailability={calendarAvailability}
                  loading={calendarAvailabilityLoading}
                  onDayChange={onDayChange}
                  onMonthChange={onMonthChange}
                  onSlotChange={onSlotChange}
                />
                {!!slotsAvailability.length && (
                  <SlotsTile
                    activeDay={activeDay}
                    activeSlot={activeSlot}
                    slots={slotsAvailability}
                    onSlotChange={onSlotChange}
                  />
                )}
              </>
            ) : (
              <BookableResourceSelectTile
                options={getBookableResourceOptions(bookableResources)}
                value={selectedBookableResource}
                onSelectChange={onBookableResourceChange}
              />
            )}
          </S.TilesWrapper>
          <S.ButtonsWrapper>
            <Button
              testingContext="cancelButton"
              color="ghost"
              onClick={() => onCancelButonClick(bookableResource)}
            >
              <FormattedMessage {...commonMessages.cancel} />
            </Button>
            <Button
              testingContext="submitButton"
              disabled={disabled}
              onClick={() => onNextButtonClick(bookableResource)}
            >
              <FormattedMessage {...commonMessages.bookService} />
            </Button>
          </S.ButtonsWrapper>
        </S.ContentWrapper>
      </S.MainWrapper>
      <PageBottomSpacing />
    </Container>
  );
};
