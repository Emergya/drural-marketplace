import { uniqueId } from "lodash";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { Tile } from "@components/atoms";
import { MediaDropzone, MediaIconUpload } from "@components/molecules";
import { commonMessages } from "@temp/intl";
import { IFormError } from "@types";

import * as S from "./styles";
import { ImageTileProps } from "./types";

export const ReportMediaTile: React.FC<ImageTileProps> = ({
  imagesToUpload,
  setImagesToUpload,
}) => {
  // 1. Variables
  const maxFilesToUpload = 5;
  const intl = useIntl();
  const [mediaErrors, setMediaErrors] = React.useState<IFormError[]>([]);

  // 2. Events
  const setErrors = () => {
    setMediaErrors(() => [
      {
        message: intl.formatMessage(commonMessages.maxFileUpload),
      },
    ]);
    setTimeout(() => {
      setMediaErrors([]);
    }, 5000);
  };

  const onImageSelect = (files: FileList) => {
    if (
      files &&
      files.length <= maxFilesToUpload &&
      imagesToUpload.length < maxFilesToUpload
    ) {
      Array.from(files).forEach((file, fileIndex) => {
        const reader = new FileReader();
        reader.onload = event => {
          setImagesToUpload(prevImagesToUpload => {
            if (prevImagesToUpload.length < maxFilesToUpload) {
              return [
                ...prevImagesToUpload,
                {
                  id: uniqueId(),
                  fileIndex,
                  url: event.target?.result as string,
                  file,
                },
              ];
            }
            return [...prevImagesToUpload];
          });
        };
        reader.readAsDataURL(file);
      });
    } else {
      setErrors();
    }
  };

  const onImageDelete = (id: string) => {
    setImagesToUpload(prevImagesToUpload =>
      prevImagesToUpload.filter(image => image.id !== id)
    );
  };

  // 3. Render
  return (
    <S.Wrapper>
      <Tile>
        <S.Header>
          <S.Title>
            <FormattedMessage defaultMessage="Upload photos (optional)" />
          </S.Title>
          <MediaIconUpload onImageSelect={onImageSelect} />
        </S.Header>
        <S.Body>
          <MediaDropzone
            imagesToUpload={imagesToUpload}
            onImageSelect={onImageSelect}
            onImageDelete={onImageDelete}
            errors={mediaErrors}
          />
        </S.Body>
      </Tile>
    </S.Wrapper>
  );
};
