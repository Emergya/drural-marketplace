import React from "react";

import { ContentWrapper } from "@components/templates";

import { AccountTile } from "./AccountTile";
import { PasswordTile } from "./PasswordTile";
import { IProps } from "./types";

export const AccountTabTiles: React.FC<IProps> = ({
  avatarURL,
  updateAvatar,
  deleteAvatar,
}) => (
  <ContentWrapper>
    <AccountTile
      avatarURL={avatarURL}
      updateAvatar={updateAvatar}
      deleteAvatar={deleteAvatar}
    />
    <PasswordTile />
  </ContentWrapper>
);
