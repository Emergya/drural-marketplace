import { UilAngleDown } from "@iconscout/react-unicons";
import React from "react";
import { FormattedMessage } from "react-intl";

import { Checkbox } from "@components/atoms";
import { dRuralTheme } from "@styles";

import * as S from "./styles";
import { IProps } from "./types";

const checkIfSelected = (
  categoryCheckId: string,
  categoriesFilter: string[]
) => {
  if (categoriesFilter.find(id => id === categoryCheckId)) {
    return true;
  }
  return false;
};

export const CategoriesChecklist: React.FC<IProps> = ({
  categories,
  categoriesFilter,
  onCategoriesFilterChange,
}) => {
  const [showCategories, setShowCategories] = React.useState(false);

  return (
    <>
      <S.Wrapper
        rotate={showCategories ? 1 : 0}
        onClick={() => {
          setShowCategories(!showCategories);
        }}
      >
        <S.SelectTitle>
          <FormattedMessage defaultMessage="Category" />
        </S.SelectTitle>
        <UilAngleDown size={24} color={dRuralTheme.colors.druralGray_400} />
      </S.Wrapper>

      {showCategories && (
        <S.CategoriesContainer>
          {categories.map((category, index) => (
            <Checkbox
              key={index}
              name={category.name}
              checked={checkIfSelected(category.id, categoriesFilter)}
              onChange={() => {
                onCategoriesFilterChange(
                  category.id,
                  !checkIfSelected(category.id, categoriesFilter)
                );
              }}
            >
              {category.name}
            </Checkbox>
          ))}
        </S.CategoriesContainer>
      )}
      <S.Separator />
    </>
  );
};
