import { UilFilter, UilListUiAlt } from "@iconscout/react-unicons";
import React from "react";
import { FormattedMessage } from "react-intl";

import { Chip } from "@components/atoms";
import { commonMessages } from "@temp/intl";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductListHeader: React.FC<IProps> = ({
  numberOfProducts = 0,
  openFiltersMenu,
  clearFilters,
  activeSortOption,
  activeFilters = 0,
  activeFiltersAttributes = [],
  sortOptions,
  onChange,
  onCloseFilterAttribute,
  openOrderFilters,
}: IProps) => {
  return (
    <S.Wrapper>
      <S.Bar>
        <S.LeftSide>
          <S.FiltersButton onClick={openFiltersMenu} data-test="filtersButton">
            <UilFilter size="24" color="#000" />
            <S.Filters>
              <FormattedMessage {...commonMessages.filterHeader} />{" "}
              {activeFilters > 0 && <span>({activeFilters})</span>}
            </S.Filters>
          </S.FiltersButton>
          {activeFilters > 0 && (
            <S.Clear onClick={clearFilters} data-test="clearFiltersButton">
              <FormattedMessage {...commonMessages.clearFilterHeader} />
            </S.Clear>
          )}
        </S.LeftSide>

        <S.RightSide>
          <S.Element>
            <S.Sort>
              <S.FiltersButton
                onClick={openOrderFilters}
                data-test="filtersButton"
              >
                <UilListUiAlt size="24" color="#000" />
                <S.OrderWrapper>
                  <S.Filters>
                    <FormattedMessage {...commonMessages.orderfilterHeader} />
                  </S.Filters>
                  <span>
                    {
                      sortOptions.find(
                        option => option.value === activeSortOption
                      )?.label
                    }
                  </span>
                </S.OrderWrapper>
              </S.FiltersButton>
            </S.Sort>
          </S.Element>
        </S.RightSide>
      </S.Bar>
      <S.FiltersChipsWrapper>
        {activeFiltersAttributes.map(
          ({ attributeSlug, valueName, valueSlug }) => (
            <Chip
              key={valueSlug}
              onClose={() => onCloseFilterAttribute(attributeSlug, valueSlug)}
            >
              {valueName}
            </Chip>
          )
        )}
      </S.FiltersChipsWrapper>
    </S.Wrapper>
  );
};
