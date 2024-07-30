import { UilImageUpload, UilUser } from "@iconscout/react-unicons";
import React from "react";
import { FormattedMessage } from "react-intl";

import * as S from "./styles";
import { IProps } from "./types";

export const AccountAvatar: React.FC<IProps> = ({
  source,
  imageUpload,
  imageDelete,
}) => {
  const imgInputAnchor = React.useRef<HTMLInputElement>(null);

  const clickImgInput = () => imgInputAnchor?.current?.click();

  return (
    <S.AvatarWrapper>
      <S.Avatar>
        {source ? (
          <S.AvatarImage src={source} />
        ) : (
          <UilUser color="#FFFFFF" size="40" />
        )}
      </S.Avatar>
      <S.AvatarImageInput
        ref={imgInputAnchor}
        onChange={event => {
          if (event.target.files) {
            imageUpload(event.target.files[0]);
          }
        }}
        type="file"
        accept=".png, .jpg, .jpeg, .gif"
      />
      <S.AvatarTextContainer>
        <UilImageUpload color="#FFFFFF" size="30" />
        <S.TextAction onClick={clickImgInput}>
          <FormattedMessage defaultMessage="Change photo" />
        </S.TextAction>
        <S.TextAction onClick={imageDelete}>
          <FormattedMessage defaultMessage="Delete photo" />
        </S.TextAction>
      </S.AvatarTextContainer>
    </S.AvatarWrapper>
  );
};
