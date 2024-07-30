import { makeStyles } from "@drural/macaw-ui";
import { Button, Typography } from "@material-ui/core";
import { CreateCompanyStep } from "@saleor/business/utils";
import useNavigator from "@saleor/hooks/useNavigator";
import React from "react";
import { FormattedMessage } from "react-intl";

import register_illustration from "../../../../../../assets/images/register_illustration.svg";

const useStyles = makeStyles(
  theme => ({
    heading: {
      textAlign: "left",
      marginBottom: theme.spacing(4)
    },
    separator: {
      padding: "5%",
      marginTop: theme.spacing(3),
      display: "grid",
      gridTemplateColumns: "292px auto",
      gap: "3rem",
      height: "258px",
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        flexDirection: "column",
        height: "auto",
        justifyContent: "center",
        alignItems: "center"
      }
    },
    image: {
      background: `url("${register_illustration}") no-repeat`,
      maxWidth: "292px",
      width: "100%",
      height: "258px"
    },
    text: {
      flex: "auto",
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        flexDirection: "column",
        height: "auto",
        justifyContent: "center",
        alignItems: "center"
      }
    }
  }),
  { name: "step4" }
);
const Step4: React.FC<CreateCompanyStep> = props => {
  const classes = useStyles(props);
  const navigate = useNavigator();
  return (
    <div className={classes.separator}>
      <div className={classes.image}></div>
      <div className={classes.text}>
        <Typography variant="h2" className={classes.heading}>
          <FormattedMessage
            defaultMessage="Set up completed!"
            id="createCompanyCompletedStepperHeader"
          />
        </Typography>
        <Typography variant="body1" className={classes.heading}>
          <FormattedMessage defaultMessage="Just one more step. An administrator of the platform has to review your shop details and validate that everything is ok. You will receive an email when your shop is validated." />
        </Typography>
        <Typography variant="body1" className={classes.heading}>
          <FormattedMessage defaultMessage="Once your shop is validated, it will be in draft mode. You must add at least one service in order to make your shop public to all the users in dRural. You will get further instructions in the activation mail. You can also check your shop status in your shop manager." />
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          component="span"
          onClick={() => navigate("/")}
        >
          <FormattedMessage defaultMessage="Go back to dRural home" />
        </Button>
      </div>
    </div>
  );
};

export default Step4;
