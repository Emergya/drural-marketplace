import { UilTrashAlt } from "@iconscout/react-unicons";
import React from "react";

import { IconButtonDrural } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const MediaTile: React.FC<IProps> = ({ media, onDelete }) => (
  <S.Wrapper>
    <S.Overlay>
      <S.Toolbar>
        {onDelete && (
          <IconButtonDrural
            color="primary"
            onClick={() => onDelete(media.id)}
            testingContext="uploadFileButton"
          >
            <UilTrashAlt size="20" color="#fff" />
          </IconButtonDrural>
        )}
      </S.Toolbar>
    </S.Overlay>
    <S.Image url={media.url} />
  </S.Wrapper>
);
