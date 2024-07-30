import React, { useState } from "react";

import { CookieWarningModal, CookieWarningTile } from "@components/molecules";

import { cookies } from "./fixures";
import { Cookies, IProps } from "./types";
import { cookiesAcceptAllAdapter } from "./utils";

export const CookieWarning: React.FC<IProps> = ({
  cookiePreferences,
  setCookiePreferences,
}) => {
  const [tileOpen, setTileOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const onTileSubmit = () => {
    setCookiePreferences(cookiesAcceptAllAdapter(cookies));
    setTileOpen(false);
  };

  const onTileSetPreferences = () => {
    setModalOpen(true);
    setTileOpen(false);
  };

  const onModalHide = () => {
    setModalOpen(false);
    setTileOpen(true);
  };

  const onModalSubmit = (preferences: Cookies) => {
    setCookiePreferences(preferences);
    setModalOpen(false);
  };

  return !cookiePreferences ? (
    <>
      <CookieWarningTile
        show={tileOpen}
        onSetPreferences={onTileSetPreferences}
        onSubmit={onTileSubmit}
      />
      <CookieWarningModal
        cookies={cookies}
        show={modalOpen}
        onHide={onModalHide}
        onSubmit={onModalSubmit}
      />
    </>
  ) : null;
};
