import React from "react";

import { ContentWrapper } from "@components/templates";

import { CategoriesTile } from "./CategoriesTile";
import { DeleteTile } from "./DeleteTile";
import { LocationTile } from "./LocationTile";

export const AccountConfigurationTiles: React.FC = () => (
  <ContentWrapper>
    <LocationTile />
    <CategoriesTile />
    <DeleteTile />
  </ContentWrapper>
);
