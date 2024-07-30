import React, { FC } from "react";
import { FormattedMessage } from "react-intl";

import { Button, Tile } from "@components/atoms";
import { Overlay } from "@components/organisms";
import { commonMessages } from "@temp/intl";

import { messages } from "./messages";
import * as S from "./styles";
import { IProps } from "./types";

export const CookieWarningTile: FC<IProps> = ({
  show,
  onSetPreferences,
  onSubmit,
}) => (
  <Overlay
    lightboxStyles={S.lightboxStyles}
    position="notification"
    show={show}
    hide={() => null}
  >
    <S.Container className="container">
      <Tile>
        <S.MainWrapper>
          <S.InfoWrapper>
            <S.TitleWrapper>
              <S.Title>
                <FormattedMessage {...commonMessages.yourPrivacy} />
              </S.Title>
            </S.TitleWrapper>
            <S.ParragraphWrapper>
              <S.Parragraph>
                <FormattedMessage {...messages.tileDescription} />
              </S.Parragraph>
            </S.ParragraphWrapper>
          </S.InfoWrapper>
          <S.ActionWrapper>
            <Button
              color="ghost"
              testingContext="cookie-warning-tile-btn"
              onClick={onSetPreferences}
            >
              <FormattedMessage {...messages.tileSetPreferences} />
            </Button>
            <Button testingContext="cookie-warning-tile-btn" onClick={onSubmit}>
              <FormattedMessage {...commonMessages.accept} />
            </Button>
          </S.ActionWrapper>
        </S.MainWrapper>
      </Tile>
    </S.Container>
  </Overlay>
);
