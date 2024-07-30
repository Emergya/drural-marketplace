import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { CaptionBox, CaptionDot, Tile } from "@components/atoms";
import { Moment } from "@components/atoms/Moment";
import { commonMessages } from "@temp/intl";
import { hourFormat } from "@utils/date";

import * as S from "./styles";
import { ISlotsTileProps } from "./types";
import { getAvailableSlots, getIsSameSlot } from "./utils";

export const SlotsTile: React.FC<ISlotsTileProps> = ({
  activeDay,
  activeSlot,
  slots,
  onSlotChange,
}) => {
  const intl = useIntl();
  const defaultDay = "2000-01-01";
  const availableSlots = getAvailableSlots(slots, activeDay);

  return (
    <S.TileWrapper>
      <Tile>
        <S.Title marginBottom="1.5rem">
          <FormattedMessage defaultMessage="Select hour" />
        </S.Title>
        {availableSlots.length ? (
          <>
            <S.SlotsWrapper>
              {availableSlots.map(
                (slot, index) =>
                  slot && (
                    <CaptionBox
                      key={index}
                      hoverable
                      isSelected={getIsSameSlot(slot, activeSlot)}
                      onClick={() => onSlotChange(slot)}
                    >
                      <Moment
                        date={`${defaultDay} ${slot.startTime}`}
                        format={hourFormat}
                      />
                    </CaptionBox>
                  )
              )}
            </S.SlotsWrapper>
            <S.CaptionWrapper>
              <CaptionDot
                caption={intl.formatMessage(commonMessages.available)}
                status="success"
              />
            </S.CaptionWrapper>
          </>
        ) : (
          <FormattedMessage defaultMessage="This day has no available hours left." />
        )}
      </Tile>
    </S.TileWrapper>
  );
};
