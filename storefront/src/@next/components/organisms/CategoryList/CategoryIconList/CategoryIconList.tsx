import React from "react";
import { FormattedMessage } from "react-intl";

import { Button, Loader } from "@components/atoms";
import { CategoryIconTile } from "@components/molecules";

import * as S from "../styles";
import { CategoryIconListProps, IconCategory } from "../types";

export const CategoryIconList: React.FC<CategoryIconListProps> = ({
  categories,
  canLoadMore = false,
  iconSize,
  iconBackgroundSize,
  loading = false,
  onLoadMore = () => null,
  testingContextId,
}) => {
  return (
    <>
      <S.List data-test="categoryList" data-test-id={testingContextId}>
        {categories.map(category => {
          const { name } = category;

          return (
            name && (
              <CategoryIconTile
                key={category.id}
                category={category as IconCategory}
                iconSize={iconSize}
                iconBackgroundSize={iconBackgroundSize}
              />
            )
          );
        })}
      </S.List>
      <S.Loader>
        {loading ? (
          <Loader />
        ) : (
          canLoadMore && (
            <Button
              testingContext="loadMoreIconCategoriesButton"
              color="secondary"
              onClick={onLoadMore}
            >
              <FormattedMessage defaultMessage="More +" />
            </Button>
          )
        )}
      </S.Loader>
    </>
  );
};
