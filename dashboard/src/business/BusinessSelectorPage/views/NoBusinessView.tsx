import notAvailableIllustration from "@assets/images/NotAvailableFace.svg";
import { makeStyles } from "@drural/macaw-ui";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router";

import { BusinessPageProps } from "../BusinessSelectorPage";

const useStyles = makeStyles(
  theme => ({
    container: {
      display: "flex",
      justifyContent: "space-around",
      width: "85%",
      margin: "0 auto",
      backgroundColor: "#FFFFFF",
      paddingTop: "65px",
      paddingBottom: "65px",
      paddingLeft: "65px",
      paddingRight: "65px",
      boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
      "& img": {
        height: "210px"
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: "20px",
        paddingRight: "20px",
        "& img": {
          height: "163px"
        }
      }
    },
    textContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "flex-start",
      minHeight: "150px",
      marginLeft: "70px",

      [theme.breakpoints.down("sm")]: {
        alignItems: "center",
        marginTop: "30px",
        minHeight: "220px",
        marginLeft: "0px"
      }
    },
    title: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "16px",
        textAlign: "center"
      }
    },
    text: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "16px",
        fontWeight: "400",
        textAlign: "center",
        marginBottom: "26px"
      }
    }
  }),
  { name: "BusinessSelectorPage" }
);

export const NoBusinessView: React.FC<BusinessPageProps> = ({
  setFirstBusiness
}) => {
  const history = useHistory();
  const classes = useStyles({});
  return (
    <div className={classes.container}>
      <div>
        <img src={notAvailableIllustration} alt="not-available" />
      </div>
      <div className={classes.textContainer}>
        <Typography variant="h3" component="h3" className={classes.title}>
          <FormattedMessage defaultMessage="You have not created any shop yet" />
        </Typography>
        <Typography variant="h6" component="p" className={classes.text}>
          <FormattedMessage defaultMessage="Go to our shop creation assistant and start selling your services now." />
        </Typography>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            history.replace("/business/create");
            setFirstBusiness(true);
          }}
        >
          <FormattedMessage defaultMessage="Create shop" />
        </Button>
      </div>
    </div>
  );
};
