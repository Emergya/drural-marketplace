import { makeStyles } from "@drural/macaw-ui";
import {
  UilCoins,
  UilCreditCard,
  UilMobileAndroid,
  UilMoneyInsert,
  UilPaypal,
  UilShoppingBag
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
  paymentAction
} from "@saleor/business/utils";
import React from "react";

import { paymentMethods } from "./paymentMethods";

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
    icon: {
      color: theme.palette.primary.main
    },
    selectAll: {
      display: "flex"
    },
    centerCards: {
      justifyContent: "center"
    },
    input: {
      display: "flex",
      alignItems: "start"
    }
  }),
  { name: "step2" }
);

const Step2: React.FC<CreateCompanyStep> = ({ dispatch, state }) => {
  const classes = useStyles();

  function getIcon(index) {
    switch (index) {
      case 0:
        return <UilCreditCard size={44} className={classes.icon} />;
      case 1:
        return <UilPaypal size={44} className={classes.icon} />;
      case 2:
        return <UilMoneyInsert size={44} className={classes.icon} />;
      case 3:
        return <UilCoins size={44} className={classes.icon} />;
      case 4:
        return <UilMobileAndroid size={44} className={classes.icon} />;
      case 5:
        return <UilShoppingBag size={44} className={classes.icon} />;
    }
  }

  const selectAll = React.useMemo(() => checkAll(state, "paymentMethods"), [
    state
  ]);

  return (
    <div className={classes.separator}>
      <Grid container spacing={3} className={classes.centerCards}>
        <Grid item xs={12} className={classes.selectAll}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={selectAll}
                onChange={({ target }) => {
                  Object.values(paymentMethods).map(paymentMethod =>
                    dispatch(paymentAction(paymentMethod, target.checked))
                  );
                }}
              />
            }
            label="Select all"
          />
        </Grid>
        {Object.values(paymentMethods).map((method, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Card variant="outlined" className={classes.card}>
              <FormControlLabel
                value={method}
                control={
                  <Checkbox
                    color="primary"
                    name={method}
                    checked={mapMethodState(state, index, "paymentMethods")}
                    onChange={({ target }) =>
                      dispatch(paymentAction(method, target.checked))
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

export default Step2;
