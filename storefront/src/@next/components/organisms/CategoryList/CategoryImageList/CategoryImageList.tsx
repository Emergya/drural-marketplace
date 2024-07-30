import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";
import { generatePath } from "react-router";

import { Button, Loader } from "@components/atoms";
import { CategoryImageTile } from "@components/molecules";
import { paths } from "@paths";

import * as S from "../styles";
import { CategoryImageListProps, ImageCategory } from "../types";

export const CategoryImageList: React.FC<CategoryImageListProps> = ({
  categories,
  canLoadMore = false,
  loading = false,
  onLoadMore = () => null,
  testingContextId,
}) => {
  return (
    <>
      <S.List data-test="categoryList" data-test-id={testingContextId}>
        {categories.map(category => {
          const { name, slug } = category as ImageCategory;
          return (
            slug &&
            name && (
              <Link href={generatePath(paths.category, { slug })} key={slug}>
                <a>
                  <CategoryImageTile category={category as ImageCategory} />
                </a>
              </Link>
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
              testingContext="loadMoreImageCategoriesButton"
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
