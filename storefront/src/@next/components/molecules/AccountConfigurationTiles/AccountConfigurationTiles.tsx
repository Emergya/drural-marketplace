import React from "react";

import { ContentWrapper } from "@components/templates";

import { CategoriesTile } from "./CategoriesTile";
import { DeleteTile } from "./DeleteTile";
import { LanguageTile } from "./LanguageTile";
import { LocationTile } from "./LocationTile";

export const AccountConfigurationTiles: React.FC = () => (
  <ContentWrapper>
    <LanguageTile />
    <LocationTile />
    <CategoriesTile />
    <DeleteTile />
  </ContentWrapper>
);
