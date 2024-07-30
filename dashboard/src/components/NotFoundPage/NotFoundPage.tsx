import notFoundImage from "@assets/images/dRuralImages/no-services.svg";
import { makeStyles } from "@drural/macaw-ui";
import { Button, Typography } from "@material-ui/core";
import React from "react";
import SVG from "react-inlinesvg";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(
  theme => ({
    container: {
      [theme.breakpoints.down("sm")]: {
        flexWrap: "wrap",
        padding: theme.spacing(3),
        width: "100%"
      },
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      padding: `0 ${theme.spacing(2)}`,
      margin: "0 auto",
      maxWidth: 900
    },
    content: {
      marginBottom: theme.spacing(5)
    },
    innerContainer: {
      [theme.breakpoints.down("sm")]: {
        order: 1,
        paddingLeft: 0,
        textAlign: "center"
      },
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      paddingLeft: 80
    },
    notFoundImage: {
      [theme.breakpoints.down("sm")]: {
        marginBottom: 40
      },
      width: 270,
      height: 270
    },
    title: {
      [theme.breakpoints.down("sm")]: {
        position: "absolute",
        top: 110,
        width: "94%"
      },
      marginBottom: theme.spacing(4)
    },
    root: {
      alignItems: "center",
      display: "flex",
      height: "calc(100vh - 180px)"
    }
  }),
  { name: "NotFoundPage" }
);

interface NotFoundPageProps {
  onBack: () => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = props => {
  const { onBack } = props;

  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div>
          <SVG className={classes.notFoundImage} src={notFoundImage} />
        </div>
        <div className={classes.innerContainer}>
          <div>
            <Typography className={classes.title} variant="h2">
              <FormattedMessage defaultMessage="Ooops!... 404" />
            </Typography>
            <Typography className={classes.content}>
              <FormattedMessage defaultMessage="We can’t seem to find a page you are looking for! You may have mistyped the address or the page may have moved. We’re sorry for the error and hope you’ll have a good day." />
            </Typography>
          </div>
          <div>
            <Button color="primary" variant="contained" onClick={onBack}>
              <FormattedMessage
                defaultMessage="Go back to dashboard"
                description="button"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
NotFoundPage.displayName = "NotFoundPage";
export default NotFoundPage;
