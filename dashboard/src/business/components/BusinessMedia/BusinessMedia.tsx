import { Button, Card, CardContent } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import ImageUpload from "@saleor/components/ImageUpload";
import MediaTile from "@saleor/components/MediaTile";
import Skeleton from "@saleor/components/Skeleton";
import { commonMessages } from "@saleor/intl";
import { cleanFileInputValue } from "@saleor/utils/files/files";
import React from "react";
import { useIntl } from "react-intl";

import { useStyles } from "./styles";
import { IBusinessMediaProps } from "./types";

const BusinessMedia: React.FC<IBusinessMediaProps> = ({
  description,
  image,
  shape,
  subTitle,
  title,
  onImageUpload,
  onImageDelete
}) => {
  const classes = useStyles();
  const intl = useIntl();
  const imagesUpload = React.useRef<HTMLInputElement>(null);

  return (
    <Card>
      <CardTitle
        title={title}
        toolbar={
          <>
            <Button
              className={classes.buttonUpload}
              onClick={() => imagesUpload.current?.click()}
              variant="text"
              color="primary"
              data-test="button-upload-image"
            >
              {intl.formatMessage(commonMessages.uploadImage)}
            </Button>

            <input
              className={classes.fileField}
              id="fileUpload"
              onClick={cleanFileInputValue}
              onChange={event => onImageUpload(event.target.files[0])}
              type="file"
              ref={imagesUpload}
              accept=".png, .jpg, .jpeg, .gif"
            />
          </>
        }
      />

      <div className={classes.imageGridContainer}>
        {image === undefined ? (
          <CardContent>
            <div>
              <div className={classes.imageContainer}>
                <Skeleton />
              </div>
            </div>
          </CardContent>
        ) : image === null ? (
          <ImageUpload
            description={description}
            shape={shape}
            title={subTitle}
            onImageUpload={files => onImageUpload(files[0])}
          />
        ) : (
          <CardContent>
            <MediaTile media={image} shape={shape} onDelete={onImageDelete} />
          </CardContent>
        )}
      </div>
    </Card>
  );
};

export default BusinessMedia;
