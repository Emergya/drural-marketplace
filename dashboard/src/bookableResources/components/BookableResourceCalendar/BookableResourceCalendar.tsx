import { UilCopy } from "@iconscout/react-unicons";
import { Button, Card, CardContent } from "@material-ui/core";
import { WeekDay } from "@saleor/bookableResources/forms/types";
import CardTitle from "@saleor/components/CardTitle";
import ControlledCheckbox from "@saleor/components/ControlledCheckbox";
import Hr from "@saleor/components/Hr";
import StyledLink from "@saleor/components/StyledLink";
import { RangeTimePicker } from "@saleor/components/TimePicker";
import { commonMessages } from "@saleor/intl";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";

import { useStyles } from "./styles";
import {
  getAllDaysSelected,
  getDisabledHours,
  getNextFulfillSlot,
  getPrevFulfillSlot,
  getSlotMomentValue,
  getWeekDayName
} from "./utils";

interface BookableResourceCalendarProps {
  data: {
    allDay: boolean;
    calendar: WeekDay[];
  };
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDayChange: (index: number) => void;
  onSlotAdd: (index: number) => void;
  onSlotChange: (
    dayIndex: number,
    slotIndex: number,
    value: [string, string]
  ) => void;
  onSlotCopy: (dayIndex: number) => void;
  onSlotDelete: (dayIndex: number, slotIndex: number) => void;
  toggleAllDays: (selected: boolean) => void;
}

export const BookableResourceCalendar: React.FC<BookableResourceCalendarProps> = ({
  data,
  disabled,
  onChange,
  onDayChange,
  onSlotAdd,
  onSlotChange,
  onSlotCopy,
  onSlotDelete,
  toggleAllDays
}) => {
  const intl = useIntl();
  const classes = useStyles();

  const { calendar } = data || {};
  const defaultDay = "2000-01-01";
  const format = "HH:mm";

  return (
    <Card>
      {/* Header */}
      <CardTitle
        title={intl.formatMessage(commonMessages.availabilityCalendar)}
      />
      {/* General info */}
      <CardContent>
        <p className={classes.description}>
          <FormattedMessage defaultMessage="Select the days and hours when this resource is operative and can be booked." />
        </p>
        <div className={classes.generalInputsWrapper}>
          <ControlledCheckbox
            className={classes.generalInput}
            name="allDays"
            checked={getAllDaysSelected(data.calendar)}
            onChange={event => {
              toggleAllDays(event.target.value);
            }}
            disabled={disabled}
            label={intl.formatMessage(commonMessages.selectAllDays)}
          />
          <ControlledCheckbox
            className={classes.generalInput}
            checked={data.allDay}
            name="allDay"
            onChange={onChange}
            disabled={disabled}
            label={intl.formatMessage(commonMessages.allDay)}
          />
        </div>
        {/* Calendar */}
        <Hr className={classes.separator} />
        {calendar.map(({ day, isActive, slots }, dayIndex) => {
          const slotDisabled = disabled || data.allDay || !isActive;

          return (
            <div key={day} className={classes.dayWrapper}>
              <ControlledCheckbox
                className={classes.day}
                checked={isActive}
                name={day}
                onChange={() => onDayChange(dayIndex)}
                disabled={disabled}
                label={getWeekDayName(day, intl)}
              />
              <div className={classes.slotsWrapper}>
                {slots.map((slot, slotIndex) => {
                  const prevSlot = getPrevFulfillSlot(
                    slotIndex,
                    slots,
                    defaultDay
                  );
                  const nextSlot = getNextFulfillSlot(
                    slotIndex,
                    slots,
                    defaultDay
                  );

                  return (
                    <div key={slotIndex} className={classes.slotWrapper}>
                      <div className={classes.rangePickerWrapper}>
                        <RangeTimePicker
                          disabled={slotDisabled}
                          format={format}
                          inputReadOnly
                          minuteStep={15}
                          placeholder={[
                            intl.formatMessage(commonMessages.from),
                            intl.formatMessage(commonMessages.to)
                          ]}
                          value={getSlotMomentValue(slot, defaultDay)}
                          disabledHours={() =>
                            getDisabledHours(prevSlot, nextSlot)
                          }
                          onChange={(_, timeString) => {
                            onSlotChange(dayIndex, slotIndex, timeString);
                          }}
                        />
                      </div>
                      {slotIndex === slots.length - 1 ? (
                        <div className={classes.extraInfoWrapper}>
                          <StyledLink
                            disabled={slotDisabled}
                            onClick={() => onSlotAdd(dayIndex)}
                          >
                            <FormattedMessage defaultMessage="Add schedule" />
                          </StyledLink>
                          <Button
                            className={classes.copyToAllDaysButton}
                            disabled={slotDisabled}
                            color="secondary"
                            variant="text"
                            startIcon={<UilCopy />}
                            onClick={() => onSlotCopy(dayIndex)}
                            data-test-id="all-to-all-days-button"
                          >
                            {intl.formatMessage(commonMessages.copyToAllDays)}
                          </Button>
                        </div>
                      ) : (
                        <div className={classes.extraInfoWrapper}>
                          <StyledLink
                            disabled={slotDisabled}
                            onClick={() => onSlotDelete(dayIndex, slotIndex)}
                          >
                            <FormattedMessage defaultMessage="Delete schedule" />
                          </StyledLink>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
export default BookableResourceCalendar;
