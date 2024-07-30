import { makeStyles } from "@drural/macaw-ui";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import BusinessMediaCreate from "@saleor/business/components/BusinessMediaCreate";
import {
  businessDescriptionAction,
  CreateCompanyStep
} from "@saleor/business/utils";
import { commonMessages } from "@saleor/intl";
import { MediaShapeEnum } from "@saleor/utils/_types/media";
import {
  bannerFileValitations,
  commonFileValidations
} from "@saleor/utils/files/constants";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

export interface CreateCompanyFormStep1 {
  imageShop: string;
  shopName: string;
  language: string;
  category: string;
  description: string;
}

const useStyles = makeStyles(
  theme => ({
    separator: {
      marginTop: theme.spacing(8),
      width: "100%"
    },
    form: {
      paddingLeft: "8%",
      paddingRight: "8%",
      [theme.breakpoints.down("sm")]: {
        paddingLeft: 0,
        paddingRight: 0
      }
    },

    businessMediaDecorator: {
      "& .businessCreate-uploadContainer": {
        "& > div:first-child": {
          "& > div": {
            width: 200,
            [theme.breakpoints.down("sm")]: {
              margin: "auto"
            }
          }
        }
      }
    },
    inputContainer: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "1.8rem",
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr",
        gap: "1em"
      }
    },
    description: {
      gridRow: "span 3",
      "& > div": {
        height: "100%"
      },
      [theme.breakpoints.down("sm")]: {
        gridRow: "4 / span 5"
      }
    }
  }),
  { name: "step1" }
);

const Step1: React.FC<CreateCompanyStep> = ({
  dispatch,
  state,
  errors,
  handdleInput,
  image,
  banner,
  setImage,
  setBanner
}) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <div className={classes.separator}>
      <form className={classes.form}>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <div className={classes.businessMediaDecorator}>
              <BusinessMediaCreate
                actionName="imageShop"
                description={intl.formatMessage({
                  defaultMessage:
                    "This is the picture that will show up in your shop page and in your shop profile information."
                })}
                image={image}
                title={intl.formatMessage({
                  defaultMessage: "Upload a photo for your shop profile"
                })}
                validations={commonFileValidations}
                dispatch={dispatch}
                setImage={setImage}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <BusinessMediaCreate
              actionName="banner"
              description={intl.formatMessage({
                defaultMessage:
                  "This is the picture that will show up in the header of your shop page. Minimum size: 1440 x 480 (width x height)."
              })}
              image={banner}
              title={intl.formatMessage({
                defaultMessage: "Upload a photo for your shop page header"
              })}
              shape={MediaShapeEnum.RECTANGLE}
              validations={bannerFileValitations}
              dispatch={dispatch}
              setImage={setBanner}
              withCropper
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={9}>
                <TextField
                  error={errors.shopName ? true : false}
                  variant="outlined"
                  fullWidth
                  autoComplete="none"
                  label={intl.formatMessage(commonMessages.shopName)}
                  name="shopName"
                  onChange={({ target }) =>
                    dispatch(
                      businessDescriptionAction(target.name, target.value)
                    )
                  }
                  onBlur={handdleInput}
                  type="text"
                  value={state.businessDescription.shopName}
                  helperText={
                    errors.shopName ? (
                      errors.shopName
                    ) : (
                      <FormattedMessage defaultMessage="This is the name that will show up in your shop page and url" />
                    )
                  }
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errors.description ? true : false}
                  variant="outlined"
                  fullWidth
                  autoComplete="none"
                  label={intl.formatMessage(commonMessages.description)}
                  name="description"
                  onChange={({ target }) =>
                    dispatch(
                      businessDescriptionAction(target.name, target.value)
                    )
                  }
                  onBlur={handdleInput}
                  multiline
                  rows={5}
                  value={state.businessDescription.description}
                  className={classes.description}
                  helperText={
                    errors.description ? (
                      errors.description
                    ) : (
                      <FormattedMessage defaultMessage="A brief description of your shop" />
                    )
                  }
                  required
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Step1;
