import React from "react";
import { FormattedMessage } from "react-intl";

import { SocialMediaShare } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductMediaShare: React.FC<IProps> = ({ disabled, url }) => (
  <S.Wrapper>
    <S.Title>
      <FormattedMessage defaultMessage="Share this service" />
    </S.Title>
    <SocialMediaShare disabled={disabled} url={url} />
  </S.Wrapper>
);
