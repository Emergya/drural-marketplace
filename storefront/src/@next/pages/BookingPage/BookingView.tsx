import { useAuth, useCart } from "@drural/sdk";
import moment, { Moment } from "moment-timezone";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useAlert } from "react-alert";
import { useMutation } from "react-apollo";
import { useIntl } from "react-intl";
import { generatePath } from "react-router";

import { Loader, Redirect } from "@components/atoms";
import { BookingConfirmationOverlay } from "@components/molecules/BookingTiles/BookingConfirmationOverlay";
import { IOption, ISlot } from "@components/molecules/BookingTiles/types";
import { paths } from "@paths";
import { NotFound } from "@temp/components";
import { commonMessages } from "@temp/intl";
import { dateFormat } from "@utils/date";
import { mapEdgesToItems } from "@utils/misc";

import { BookingPage } from "./BookingPage";
import { initialSlot, initiOption } from "./fixures";
import { BookResource, BookResourceVariables } from "./gqlTypes/BookResource";
import { bookResourceMutation } from "./mutations";
import {
  useBookingProductDetailsQuery,
  useResourceAvailabilityByDateQuery,
  useResourceCalendarAvailabilityQuery,
} from "./queries";

export const BookingView: NextPage = () => {
  // 1. Variables
  const alert = useAlert();
  const intl = useIntl();
  const { user } = useAuth();
  const { updateItem } = useCart();
  const { push, query } = useRouter();
  const productSlug = query.productSlug as string;
  const bookableResourceId = query.bookableResourceId as string;

  // 2. States
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [
    selectedBookableResource,
    setSelectedBookableResource,
  ] = React.useState<IOption>(initiOption);
  const [activeMonth, setActiveMonth] = React.useState<Moment>(moment());
  const [activeDay, setActiveDay] = React.useState<Moment>(moment());
  const [activeSlot, setActiveSlot] = React.useState<ISlot>(initialSlot);

  // 3. Data
  const {
    data: productData,
    loading: productLoading,
  } = useBookingProductDetailsQuery(
    {
      slug: productSlug,
    },
    !productSlug
  );
  const product = productData?.product;
  const productVariantId = product?.defaultVariant?.id;
  const bookableResources =
    product?.bookableResources && mapEdgesToItems(product?.bookableResources);
  const bookableResource = bookableResources?.find(
    bookableResource => bookableResource.id === bookableResourceId
  );

  const {
    data: calendarAvailabilityData,
    loading: calendarAvailabilityDataLoading,
  } = useResourceCalendarAvailabilityQuery(
    {
      bookableResource: bookableResource?.id as string,
      productVariant: productVariantId as string,
      period: {
        gte: moment(activeMonth).startOf("month").format(dateFormat),
        lte: moment(activeMonth).endOf("month").format(dateFormat),
      },
    },
    !bookableResource || !productVariantId || !activeMonth
  );

  const {
    data: slotsAbailabilityData,
    loading: slotsAbailabilityLoading,
  } = useResourceAvailabilityByDateQuery(
    {
      bookableResource: bookableResource?.id as string,
      productVariant: productVariantId as string,
      date: moment(activeDay).format(dateFormat),
    },
    !bookableResource || !productVariantId || !activeDay
  );

  const [bookResource, { loading: bookResourceMutationLoading }] = useMutation<
    BookResource,
    BookResourceVariables
  >(bookResourceMutation, {
    onCompleted(data) {
      handleBookResourceComplete(data);
    },
    onError(error) {
      handleMutationError(error.message);
    },
  });

  // 3. Events
  const handleBookResourceComplete = (data: BookResource) => {
    const dataErrors = data.bookResource?.errors || [];

    if (dataErrors.length > 0) {
      alert.show(
        {
          content: intl.formatMessage(commonMessages.mutationError),
          title: "Error",
        },
        { type: "error", timeout: 5000 }
      );
    }
    if (productVariantId && data.bookResource && data.bookResource.booking) {
      updateItem(productVariantId, 1, data.bookResource.booking.id);

      const { order } = data.bookResource.booking;
      if (order?.id) {
        push({
          pathname: paths.orderFinalized,
          query: {
            orderNumber: order.number,
            token: order.token,
            orderStatus: order.status,
          },
        });
      } else {
        push(paths.checkout);
      }
    }
  };

  const handleMutationError = (graphQLErrorMessage: string) => {
    if (graphQLErrorMessage) {
      alert.show(
        {
          content: intl.formatMessage(
            {
              defaultMessage: "{error} ",
            },
            {
              error: graphQLErrorMessage,
            }
          ),
          title: "Error",
        },
        { type: "error", timeout: 5000 }
      );
    } else {
      alert.show(
        {
          content: intl.formatMessage(commonMessages.mutationError),
          title: "Error",
        },
        { type: "error", timeout: 5000 }
      );
    }
  };

  // 4. Loading
  const loading =
    productLoading ||
    calendarAvailabilityDataLoading ||
    slotsAbailabilityLoading ||
    bookResourceMutationLoading;

  // 5. URL protection
  if (productLoading) {
    return <Loader />;
  }

  if (!user || !product) {
    return <NotFound />;
  }

  if (!product.isBookable) {
    return (
      <Redirect
        url={generatePath(paths.product, {
          slug: query.productSlug as string,
        })}
      />
    );
  }

  // 6. Render
  return (
    <>
      <BookingPage
        activeDay={activeDay}
        activeSlot={activeSlot}
        bookableResource={bookableResource}
        calendarAvailability={
          calendarAvailabilityData?.resourceCalendarAvailability || []
        }
        calendarAvailabilityLoading={calendarAvailabilityDataLoading}
        bookableResources={bookableResources || []}
        loading={loading}
        product={product}
        selectedBookableResource={selectedBookableResource}
        slotsAvailability={
          slotsAbailabilityData?.resourceAvailabilityByDate || []
        }
        onBookableResourceChange={bookableReosurce =>
          setSelectedBookableResource(bookableReosurce)
        }
        onDayChange={day => setActiveDay(day)}
        onModalChange={value => setIsModalOpen(value)}
        onMonthChange={month => setActiveMonth(month)}
        onSlotChange={slot => setActiveSlot(slot)}
      />
      {isModalOpen && bookableResource && (
        <BookingConfirmationOverlay
          bookableResource={bookableResource}
          product={product}
          activeDay={activeDay}
          activeSlot={activeSlot}
          bookResource={variables => bookResource(variables)}
          hide={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
