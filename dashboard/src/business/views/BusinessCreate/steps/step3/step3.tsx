import { makeStyles } from "@drural/macaw-ui";
import {
  UilFastMail,
  UilMailboxAlt,
  UilStoreAlt,
  UilTruck,
  UilTruckLoading
} from "@iconscout/react-unicons";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Typography
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {
  checkAll,
  CreateCompanyStep,
  mapMethodState,
  shippingAction
} from "@saleor/business/utils";
import React from "react";

import { shippingMethods } from "./shippingMethods";

const useStyles = makeStyles(
  theme => ({
    card: {
      background: "#ffffff",
      boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
      borderRadius: "16px",
      display: "flex",
      flexDirection: "column"
    },
    separator: {
      marginTop: theme.spacing(8),
      textAlign: "center",
      width: "100%"
    },
    imageContainer: {
      height: "96px",
      width: "96px",
      borderRadius: "50%",
      margin: "1rem auto",
      background: "#EBFBF6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.down("sm")]: {
        height: "72px",
        width: "72px",
        margin: "auto auto"
      }
    },
    cardText: {
      textAlign: "center",
      marginBottom: "42px",
      [theme.breakpoints.down("sm")]: {
        marginBottom: "10px",
        marginTop: "14px"
      }
    },
    selectAll: {
      display: "flex"
    },
    input: {
      display: "flex",
      alignItems: "start"
    },
    icon: {
      color: theme.palette.primary.main
    }
  }),
  { name: "step3" }
);

const Step3: React.FC<CreateCompanyStep> = ({ dispatch, state }) => {
  const classes = useStyles();

  function getIcon(index) {
    switch (index) {
      case 0:
        return <UilMailboxAlt size={44} className={classes.icon} />;
      case 1:
        return <UilFastMail size={44} className={classes.icon} />;
      case 2:
        return <UilTruckLoading size={44} className={classes.icon} />;
      case 3:
        return <UilTruck size={44} className={classes.icon} />;
      case 4:
        return <UilStoreAlt size={44} className={classes.icon} />;
    }
  }

  const selectAll = React.useMemo(() => checkAll(state, "shippingMethods"), [
    state
  ]);

  return (
    <div className={classes.separator}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.selectAll}>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectAll}
                color="primary"
                onChange={({ target }) => {
                  Object.values(shippingMethods).map(shippingMethod =>
                    dispatch(shippingAction(shippingMethod, target.checked))
                  );
                }}
              />
            }
            label="Select all"
          />
        </Grid>
        {Object.values(shippingMethods).map((method, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Card variant="outlined" className={classes.card}>
              <FormControlLabel
                value={method}
                control={
                  <Checkbox
                    color="primary"
                    name={method}
                    checked={mapMethodState(state, index, "shippingMethods")}
                    onChange={({ target }) =>
                      dispatch(shippingAction(method, target.checked))
                    }
                  />
                }
                labelPlacement="bottom"
                label={""}
                className={classes.input}
              />
              <div className={classes.imageContainer}>{getIcon(index)}</div>
              <Typography variant="body1" className={classes.cardText}>
                {method}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Step3;
