import React from "react";

import { ErrorMessage } from "@components/atoms";
import { MediaTile, MediaTileUpload } from "@components/molecules";

import * as S from "./styles";
import { IProps } from "./types";

export const MediaDropzone: React.FC<IProps> = ({
  imagesToUpload,
  errors,
  onImageSelect,
  onImageDelete,
}) => {
  const imagesUpload = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <S.Dropzone
        onClick={() => imagesUpload.current?.click()}
        cursorEnabled={imagesToUpload.length === 0}
      >
        <S.MediaUpload
          id="fileInputDropzone"
          disabled={imagesToUpload.length > 0}
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
        {imagesToUpload.length > 0 ? (
          <S.MediaGrid>
            {imagesToUpload.map(image => (
              <MediaTile
                key={image.id}
                media={image}
                onDelete={onImageDelete}
              />
            ))}
          </S.MediaGrid>
        ) : (
          <MediaTileUpload />
        )}
      </S.Dropzone>

      {errors.length > 0 && <ErrorMessage errors={errors} />}
    </>
  );
};
