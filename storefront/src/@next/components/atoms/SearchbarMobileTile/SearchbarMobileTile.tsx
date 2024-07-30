import { UilSearch } from "@iconscout/react-unicons";
import React from "react";
import { FormattedMessage } from "react-intl";

import * as S from "./styles";
import { IProps } from "./types";

export const SearchbarMobileTile: React.FC<IProps> = ({ onClick }) => {
  return (
    <S.SearchBar onClick={onClick}>
      <span>
        <FormattedMessage defaultMessage="Search services" />
      </span>
      <S.IconWrapper color="primary">
        <UilSearch size="20" color="#fff" />
      </S.IconWrapper>
    </S.SearchBar>
  );
};
