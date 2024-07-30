import { UilTimes } from "@iconscout/react-unicons";
import React from "react";

import { IconButtonDrural } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const CardHeader: React.FC<IProps> = ({
  children,
  prefix,
  closeIcon,
  divider = false,
  onHide,
  textStyle = "title",
  titleSize = "md",
}: IProps) => {
  const defaultCloseIcon = !!onHide && !closeIcon;

  return (
    <S.Wrapper divider={divider}>
      <S.Header>
        {prefix}
        {textStyle === "title" ? (
          <S.Title size={titleSize}>{children}</S.Title>
        ) : (
          <S.Paragraph>{children}</S.Paragraph>
        )}
      </S.Header>
      {defaultCloseIcon && (
        <IconButtonDrural
          color="secondary"
          testingContext="closeOverlayButton"
          onClick={onHide}
        >
          <UilTimes size="24" color="#fff" />
        </IconButtonDrural>
      )}
      {closeIcon}
    </S.Wrapper>
  );
};
