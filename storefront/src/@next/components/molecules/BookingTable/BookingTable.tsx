import React from "react";
import { useIntl } from "react-intl";

import { Tile } from "@components/atoms";
import { Moment } from "@components/atoms/Moment";
import { commonMessages } from "@temp/intl";
import { dateFormat, hourFormat } from "@utils/date";

import * as S from "./styles";
import { IProps } from "./types";

export const BookingTable: React.FC<IProps> = ({
  bookableResourceName,
  bookingReference,
  endDate,
  startDate,
}) => {
  const intl = useIntl();

  return (
    <Tile padding="24px">
      <S.Title>{intl.formatMessage(commonMessages.bookingDetails)}</S.Title>
      <S.Table>
        <S.THead>
          <tr>
            <S.NameTh>{intl.formatMessage(commonMessages.resource)}</S.NameTh>
            <S.DateTh>{intl.formatMessage(commonMessages.date)}</S.DateTh>
            <S.DateTh>{intl.formatMessage(commonMessages.hour)}</S.DateTh>
            <S.Th>{intl.formatMessage(commonMessages.bookingReference)}</S.Th>
          </tr>
        </S.THead>
        <S.TBody>
          <tr>
            <S.NameTd>{bookableResourceName}</S.NameTd>
            <S.DateTd>
              <Moment date={startDate} format={dateFormat} />
            </S.DateTd>
            <S.DateTd>
              <Moment date={startDate} format={hourFormat} />
              {" / "}
              <Moment date={endDate} format={hourFormat} />
            </S.DateTd>
            <S.Td>{bookingReference}</S.Td>
          </tr>
        </S.TBody>
      </S.Table>
    </Tile>
  );
};
