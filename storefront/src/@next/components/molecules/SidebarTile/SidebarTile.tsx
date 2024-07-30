import React from "react";
import { FormattedMessage } from "react-intl";

import { Tile } from "@components/atoms";
import { Thumbnail } from "@components/molecules";

import * as S from "./styles";
import { IProps } from "./types";

export const SidebarTile: React.FC<IProps> = ({
  boxShadow,
  children,
  duration,
  image,
  itemName,
  padding = "1.5rem 1.5rem 1rem",
  mobilePadding,
  title,
}) => {
  return (
    <S.TileWrapper>
      <Tile
        boxShadow={boxShadow}
        padding={padding}
        mobilePadding={mobilePadding}
        height="auto"
      >
        <S.InnerWrapper>
          {image && (
            <S.ImageWrapper>
              <Thumbnail source={image || {}} />
            </S.ImageWrapper>
          )}
          <S.ContentWrapper>
            {title && <S.Title>{title}</S.Title>}
            <S.Text>{itemName}</S.Text>
            {duration && (
              <S.GrayText>
                <FormattedMessage
                  defaultMessage="{duration} minutes"
                  values={{ duration }}
                />
              </S.GrayText>
            )}
            {children}
          </S.ContentWrapper>
        </S.InnerWrapper>
      </Tile>
    </S.TileWrapper>
  );
};
