import moment from "moment-timezone";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { Calendar, Loader, Tile } from "@components/atoms";
import { IDayLabel } from "@components/atoms/Calendar/types";
import { commonMessages } from "@temp/intl";
import { formatLocaleDate } from "@utils/date";

import {
  getBookableResourceWeekAvailability,
  getDayAvailability,
  onCalendarChange,
  onCalendarMonthChange,
} from "../../atoms/Calendar/utils";
import * as S from "./styles";
import { ICalendarTileProps } from "./types";

export const CalendarTile: React.FC<ICalendarTileProps> = ({
  bookableResource,
  calendarAvailability,
  loading,
  activeDay,
  onDayChange,
  onMonthChange,
  onSlotChange,
}) => {
  const intl = useIntl();
  const todayDate = moment().toDate();

  const dayCaptions: IDayLabel[] = [
    {
      caption: intl.formatMessage(commonMessages.availableDay),
      status: "success",
    },
    {
      caption: intl.formatMessage(commonMessages.fullyBooked),
      status: "error",
    },
  ];

  const bookableResourceWeekAbailability = getBookableResourceWeekAvailability(
    bookableResource
  );

  return (
    <S.TileWrapper>
      <Tile padding="2rem">
        <S.TileInnerWrapper>
          <S.Title>
            <FormattedMessage defaultMessage="Select date" />
          </S.Title>
          {loading && (
            <S.LoaderWrapper>
              <Loader />
            </S.LoaderWrapper>
          )}
          <S.CalendarWrapper>
            <Calendar
              dayCaptions={dayCaptions}
              defaultView="month"
              formatShortWeekday={(locale, date) =>
                formatLocaleDate(locale, date, "dd")
              }
              loading={loading}
              minDate={todayDate}
              minDetail="month"
              tileClassName={({ activeStartDate, date }) =>
                getDayAvailability(
                  loading,
                  date,
                  activeStartDate,
                  bookableResourceWeekAbailability,
                  calendarAvailability
                )
              }
              tileDisabled={() => loading}
              value={activeDay.toDate()}
              onActiveStartDateChange={({ activeStartDate }) => {
                onCalendarMonthChange(activeStartDate, onMonthChange);
              }}
              onChange={(date: Date) =>
                onCalendarChange(
                  loading,
                  date,
                  activeDay,
                  calendarAvailability,
                  onDayChange,
                  onSlotChange
                )
              }
            />
          </S.CalendarWrapper>
        </S.TileInnerWrapper>
      </Tile>
    </S.TileWrapper>
  );
};
