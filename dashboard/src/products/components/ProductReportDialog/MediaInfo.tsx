import { makeStyles } from "@drural/macaw-ui";
import { DialogContent } from "@material-ui/core";
import BackLink from "@saleor/components/BackLink";
import MediaTile from "@saleor/components/MediaTile";
import Slider from "@saleor/components/Slider";
import { GetFraudulentProductReports_fraudulentProductReports_edges_node_media } from "@saleor/products/types/GetFraudulentProductReports";
import React from "react";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(
  theme => ({
    backLink: {
      cursor: "pointer",
      paddingBottom: theme.spacing(1)
    },
    dialogContent: {
      "&.MuiDialogContent-root": {
        padding: theme.spacing(5.75, 8, 8),

        [theme.breakpoints.down("xs")]: {
          padding: theme.spacing(3, 2, 5)
        }
      }
    },
    openIamge: {
      height: "100%",
      width: "100%"
    }
  }),
  { name: "ReportMedia" }
);

interface ReportInfoProps {
  media: GetFraudulentProductReports_fraudulentProductReports_edges_node_media[];
  setMediaOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MediaInfo: React.FC<ReportInfoProps> = ({
  media,
  setMediaOpen
}) => {
  const classes = useStyles();

  return (
    <DialogContent className={classes.dialogContent}>
      <div className={classes.backLink}>
        <BackLink onClick={() => setMediaOpen(false)}>
          <FormattedMessage defaultMessage="Go back to report information" />
        </BackLink>
      </div>
      <Slider>
        {media.map(image => (
          <MediaTile
            key={image.id}
            className={classes.openIamge}
            media={image}
          />
        ))}
      </Slider>
    </DialogContent>
  );
};
