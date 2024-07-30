import React from "react";
import { FormattedMessage } from "react-intl";

import { Button, Loader } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const ItemList = <T extends unknown>({
  canLoadMore = false,
  children,
  columns,
  items,
  loading = false,
  title,
  onLoadMore = () => null,
}: IProps<T>) => {
  return (
    <S.Wrapper>
      {title && <S.Title>{title}</S.Title>}
      <S.ListWrapper columns={columns}>
        {items.map((item, index) => children(item, index))}
      </S.ListWrapper>
      {(loading || canLoadMore) && (
        <S.LoaderWrapper>
          {loading ? (
            <Loader />
          ) : (
            canLoadMore && (
              <Button
                testingContext="loadMoreProductsButton"
                color="secondary"
                onClick={onLoadMore}
              >
                <FormattedMessage defaultMessage="More +" />
              </Button>
            )
          )}
        </S.LoaderWrapper>
      )}
    </S.Wrapper>
  );
};
