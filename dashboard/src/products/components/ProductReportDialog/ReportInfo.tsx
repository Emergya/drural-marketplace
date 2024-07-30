import { makeStyles } from "@drural/macaw-ui";
import { DialogContent, DialogTitle } from "@material-ui/core";
import Hr from "@saleor/components/Hr";
import MediaTile from "@saleor/components/MediaTile";
import useLocale from "@saleor/hooks/useLocale";
import useNavigator from "@saleor/hooks/useNavigator";
import { commonMessages } from "@saleor/intl";
import { GetFraudulentProductReports_fraudulentProductReports_edges_node } from "@saleor/products/types/GetFraudulentProductReports";
import { productPath } from "@saleor/products/urls";
import { staffMemberDetailsPath } from "@saleor/staff/urls";
import { userPath, UserSections } from "@saleor/users/urls";
import { dateFormat } from "@saleor/utils/date/contants";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Moment from "react-moment";

const useStyles = makeStyles(
  theme => ({
    dialogTitle: {
      padding: theme.spacing(6, 8, 0),

      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(5, 2, 0)
      },

      "& h2": {
        fontSize: theme.typography.h2.fontSize,
        lineHeight: theme.typography.h2.lineHeight,
        fontWeight: 600,
        [theme.breakpoints.down("xs")]: {
          fontSize: 18,
          lineHeight: "24px",
          width: "90%",
          margin: "auto"
        }
      }
    },
    dialogContent: {
      "&.MuiDialogContent-root": {
        padding: theme.spacing(5.75, 8, 8),

        [theme.breakpoints.down("xs")]: {
          padding: theme.spacing(3, 2, 5)
        }
      }
    },
    hr: {
      left: theme.spacing(-3),
      marginBottom: theme.spacing(3),
      position: "relative",
      width: `calc(100% + ${theme.spacing(6)})`
    },
    dateWrapper: {
      color: theme.palette.secondary.main,
      display: "flex",
      justifyContent: "flex-end"
    },
    flexWrapper: {
      display: "flex",
      flexWrap: "wrap",
      gridColumnGap: theme.spacing(3),
      justifyContent: "space-between"
    },
    mediaItem: {
      "&:not(:last-child)": {
        marginBottom: 16,
        marginRight: 16
      }
    },
    mediaTile: {
      width: 100,
      height: 100
    },
    mediaWrapper: {
      display: "flex",
      flexWrap: "wrap"
    },
    tileWrapper: {
      cursor: "pointer",
      display: "flex",
      flexWrap: "wrap"
    },
    strong: {
      fontWeight: 600,
      paddingRight: theme.spacing(0.5)
    },
    subtitle: {
      fontSize: theme.typography.h3.fontSize,
      lineHeight: theme.typography.h3.fontSize,
      fontWeight: 600
    },
    reasonWrapper: {
      marginBottom: theme.spacing(3.25)
    },
    text: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1)
    }
  }),
  { name: "ReportInfo" }
);

interface ReportInfoProps {
  report: GetFraudulentProductReports_fraudulentProductReports_edges_node;
  setMediaOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ReportInfo: React.FC<ReportInfoProps> = ({
  report,
  setMediaOpen
}) => {
  const classes = useStyles();
  const navigate = useNavigator();
  const intl = useIntl();
  const { locale } = useLocale();

  return (
    <>
      <DialogTitle className={classes.dialogTitle}>
        <FormattedMessage defaultMessage="Report information" />
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <div className={classes.dateWrapper}>
          <Moment format={dateFormat} locale={locale}>
            {report.date as string}
          </Moment>
        </div>

        <Hr className={classes.hr} />

        <div className={classes.flexWrapper}>
          <div>
            <h3 className={classes.subtitle}>
              {intl.formatMessage(commonMessages.product)}
            </h3>
            <div
              className={classes.tileWrapper}
              onClick={() => navigate(productPath(report.product.id))}
            >
              <MediaTile
                className={classes.mediaTile}
                media={report.product.thumbnail}
              />
              <div>
                <p className={classes.text}>
                  <span className={classes.strong}>
                    <FormattedMessage defaultMessage="Name:" />
                  </span>
                  {report.product.name}
                </p>
                <p className={classes.text}>
                  <span className={classes.strong}>
                    <FormattedMessage defaultMessage="Company:" />
                  </span>
                  {report.product.company.name}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className={classes.subtitle}>
              {intl.formatMessage(commonMessages.user)}
            </h3>
            <div
              className={classes.tileWrapper}
              onClick={() => {
                if (report.user.isStaff) {
                  navigate(staffMemberDetailsPath(report.user.id));
                } else {
                  navigate(userPath(UserSections.customers, report.user.id));
                }
              }}
            >
              <MediaTile
                className={classes.mediaTile}
                media={report.user.avatar}
              />
              <div>
                {(report.user.firstName || report.user.lastName) && (
                  <p className={classes.text}>
                    <span className={classes.strong}>
                      <FormattedMessage defaultMessage="Name:" />
                    </span>
                    {report.user.firstName} {report.user.lastName}
                  </p>
                )}
                <p className={classes.text}>
                  <span className={classes.strong}>
                    <FormattedMessage defaultMessage="Email:" />
                  </span>
                  {report.user.email}
                </p>
                {report.phone && (
                  <p className={classes.text}>
                    <span className={classes.strong}>
                      <FormattedMessage defaultMessage="Phone:" />
                    </span>
                    {report.phone}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={classes.reasonWrapper}>
          <h3 className={classes.subtitle}>
            {intl.formatMessage(commonMessages.reason)}
          </h3>
          <p className={classes.text}>{report.reason}</p>
        </div>

        {report.media.length > 0 && (
          <>
            <Hr className={classes.hr} />
            <div>
              <h3 className={classes.subtitle}>
                {intl.formatMessage(commonMessages.media)}
              </h3>
              <div className={classes.mediaWrapper}>
                {report.media.map(media => (
                  <div
                    key={media.id}
                    className={classes.mediaItem}
                    onClick={() => setMediaOpen(true)}
                  >
                    <MediaTile media={media} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </>
  );
};
