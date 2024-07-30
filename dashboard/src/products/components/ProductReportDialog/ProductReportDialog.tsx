import { makeStyles } from "@drural/macaw-ui";
import { Dialog } from "@material-ui/core";
import CloseIcon from "@saleor/components/CloseIcon";
import { GetFraudulentProductReports_fraudulentProductReports_edges_node } from "@saleor/products/types/GetFraudulentProductReports";
import React from "react";

import { MediaInfo } from "./MediaInfo";
import { ReportInfo } from "./ReportInfo";

const useStyles = makeStyles(
  theme => ({
    closeIcon: {
      position: "absolute",
      top: theme.spacing(3),
      right: theme.spacing(3),
      [theme.breakpoints.down("xs")]: {
        top: theme.spacing(2.5),
        right: theme.spacing(2.5),
        "& svg": {
          width: "16px",
          height: "16px"
        }
      }
    },
    hr: {
      left: theme.spacing(-3),
      position: "relative",
      width: `calc(100% + ${theme.spacing(6)})`
    }
  }),
  { name: "ProductReportDialog" }
);

export interface ProductReportDialogProps {
  open: boolean;
  onClose: () => void;
  report: GetFraudulentProductReports_fraudulentProductReports_edges_node;
}

const ProductReportDialog: React.FC<ProductReportDialogProps> = ({
  onClose,
  open,
  report
}) => {
  const classes = useStyles();
  const [mediaOpen, setMediaOpen] = React.useState(false);

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth={mediaOpen ? "lg" : "md"}
    >
      <CloseIcon className={classes.closeIcon} onClose={onClose} />
      {!mediaOpen ? (
        <ReportInfo report={report} setMediaOpen={setMediaOpen} />
      ) : (
        <MediaInfo media={report.media} setMediaOpen={setMediaOpen} />
      )}
    </Dialog>
  );
};
ProductReportDialog.displayName = "ProductReportDialog";
export default ProductReportDialog;
