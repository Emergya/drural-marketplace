import { UilUser } from "@iconscout/react-unicons";
import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

export const Avatar: React.FC<IProps> = ({ source }) => {
  return (
    <>
      {!source ? (
        <S.AvatarDefault>
          <UilUser color="#FFFFFF" />
        </S.AvatarDefault>
      ) : (
        <S.Avatar src={source} />
      )}
    </>
  );
};
