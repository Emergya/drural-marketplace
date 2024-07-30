import { UilImageUpload } from "@iconscout/react-unicons";
import React from "react";

import { IconButtonDrural } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const MediaIconUpload: React.FC<IProps> = ({ onImageSelect }) => {
  const imagesUpload = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <IconButtonDrural
        color="primary"
        onClick={() => imagesUpload.current?.click()}
        testingContext="uploadFileButton"
      >
        <UilImageUpload size="24" color="#fff" />
      </IconButtonDrural>
      <S.MediaUpload
        id="fileInput"
        onChange={event => {
          if (event.target.files) {
            onImageSelect(event.target.files);
          }
        }}
        multiple
        type="file"
        ref={imagesUpload}
        accept="image/*"
      />
    </>
  );
};
