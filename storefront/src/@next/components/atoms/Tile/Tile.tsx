import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

export const Tile: React.FC<IProps> = ({
  header,
  children,
  footer,
  ...props
}: IProps) => {
  const hasFooter = !!footer;
  return (
    <S.Wrapper {...props}>
      {header && <S.Header>{header}</S.Header>}
      <S.Content hasFooter={hasFooter}>{children}</S.Content>
      {footer && <S.Footer>{footer}</S.Footer>}
    </S.Wrapper>
  );
};
