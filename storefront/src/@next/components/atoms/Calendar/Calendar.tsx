import { UilArrowLeft, UilArrowRight } from "@iconscout/react-unicons";
import React from "react";
import ReactCalendar from "react-calendar";
import { useIntl } from "react-intl";

import { primary_600 } from "@styles/constants-drural";

import { CaptionDot } from "..";
import * as S from "./styles";
import { IProps } from "./types";

import "react-calendar/dist/Calendar.css";

export const Calendar: React.FC<IProps> = props => {
  const {
    dayCaptions,
    loading,
    next2Label,
    prev2Label,
    ...calendarProps
  } = props;

  const { locale } = useIntl();

  return (
    <S.Wrapper loading={loading}>
      <ReactCalendar
        {...calendarProps}
        nextLabel={<UilArrowRight color={primary_600} />}
        next2Label={next2Label || null}
        prevLabel={<UilArrowLeft color={primary_600} />}
        prev2Label={prev2Label || null}
        locale={locale}
      />
      {dayCaptions && (
        <S.DayCaptionsWrapper>
          {dayCaptions.map((day, index) => (
            <CaptionDot key={index} caption={day.caption} status={day.status} />
          ))}
        </S.DayCaptionsWrapper>
      )}
    </S.Wrapper>
  );
};
