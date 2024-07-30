import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
  Typography
} from "@material-ui/core";
import { BusinessDetails_company } from "@saleor/business/types/BusinessDetails";
import CardTitle from "@saleor/components/CardTitle";
import ControlledSwitch from "@saleor/components/ControlledSwitch";
import Form from "@saleor/components/Form";
import Skeleton from "@saleor/components/Skeleton";
import { SubmitPromise } from "@saleor/hooks/useForm";
import { buttonMessages } from "@saleor/intl";
import { maybe } from "@saleor/misc";
import moment from "moment";
import React from "react";
import { useIntl } from "react-intl";
import { FormattedMessage } from "react-intl";

import { BusinessValidationFormData } from "../BusinessValidation";

const useStyles = makeStyles(
  theme => ({
    [theme.breakpoints.up("md")]: {
      suspendModal: {
        "& div": {
          padding: theme.spacing(2)
        }
      }
    },
    activeShop: {
      display: "flex",
      justifyContent: "space-between",
      "& div": {
        alignSelf: "center"
      }
    },
    cardTitle: {
      height: 72
    },
    content: {
      paddingTop: theme.spacing()
    },
    subtitle: {
      marginTop: theme.spacing()
    },
    subtitleDescription: {
      color: theme.palette.grey[600]
    },
    suspendBtn: {
      color: theme.palette.error.main,
      textTransform: "uppercase"
    },
    dialogText: {
      marginBottom: theme.spacing(1),
      textAlign: "left"
    },
    suspendModal: {
      textAlign: "center",
      "& button": {
        height: 45,
        margin: theme.spacing(1),
        marginTop: theme.spacing(3)
      },
      "& .MuiDialogTitle-root": {
        borderBottom: "none"
      }
    },
    modalBtn: {
      display: "flex",
      justifyContent: "center",
      "& button": {
        width: 180
      },
      [theme.breakpoints.up("md")]: {
        "& button": {
          width: 190
        }
      }
    },
    reason: {
      "& div": {
        alignItems: "flex-start",
        height: 140
      }
    }
  }),
  { name: "BusinessActive" }
);

export interface BusinessActiveProps {
  business: BusinessDetails_company;
  disabled: boolean;
  onChange: (event: React.ChangeEvent<any>) => void;
  data: {
    isEnabled: boolean;
  };
  submit: () => void;
  isStaff: boolean;
  onSuspendBusiness: (data: BusinessValidationFormData) => SubmitPromise;
}

const BusinessActive: React.FC<BusinessActiveProps> = props => {
  const {
    business,
    disabled,
    data,
    submit,
    onChange,
    isStaff,
    onSuspendBusiness
  } = props;

  const classes = useStyles(props);
  const intl = useIntl();

  const [isOpenSuspendModal, setOpenSuspendModal] = React.useState(false);

  const closeSuspendModal = () => setOpenSuspendModal(false);
  const toggleSuspendModal = () => setOpenSuspendModal(!isOpenSuspendModal);

  const initialValues: BusinessValidationFormData = {
    reason: ""
  };

  return (
    <>
      <Card>
        <CardTitle
          className={classes.cardTitle}
          title={
            <>
              {maybe<React.ReactNode>(() => business.publicName, <Skeleton />)}
              {business && business.created ? (
                <Typography
                  className={classes.subtitle}
                  variant="caption"
                  component="div"
                >
                  <FormattedMessage
                    defaultMessage="Shop created on {date}"
                    values={{
                      date: moment(business.created).format("MMM YYYY")
                    }}
                  />
                </Typography>
              ) : (
                <Skeleton style={{ width: "10rem" }} />
              )}
            </>
          }
          toolbar={
            isStaff &&
            business?.status === "ACC" && (
              <Button
                className={classes.suspendBtn}
                disabled={disabled}
                variant="text"
                onClick={toggleSuspendModal}
              >
                {intl.formatMessage(buttonMessages.suspendShop)}
              </Button>
            )
          }
        />
        <CardContent className={classes.content}>
          <div className={classes.activeShop}>
            <Typography component="div">
              {intl.formatMessage({
                defaultMessage: "Active shop",
                description: "label"
              })}
            </Typography>
            {data.isEnabled === undefined ? (
              <Skeleton />
            ) : (
              <ControlledSwitch
                name="isEnabled"
                label=""
                checked={data.isEnabled}
                onChange={onChange}
                onClick={submit}
                disabled={disabled}
              />
            )}
          </div>

          <Typography
            className={classes.subtitleDescription}
            variant="caption"
            component="div"
          >
            <FormattedMessage defaultMessage="You can deactivate your shop when you go on vacation." />
            <br />
            <FormattedMessage defaultMessage="You won't receive any orders while the shop is not active." />
          </Typography>
        </CardContent>
      </Card>
      {/* Suspend business Modal */}
      <Dialog
        open={isOpenSuspendModal}
        onClose={closeSuspendModal}
        maxWidth="md"
        className={classes.suspendModal}
      >
        <DialogTitle>
          <Typography variant="h2">
            <FormattedMessage
              defaultMessage="Suspend shop"
              id="SuspendShopTitle"
            />
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography className={classes.dialogText}>
            <FormattedMessage defaultMessage="You must provide a reason why you are suspend the shop. An email will be sent to the owner of the shop, explaining the reason why you have decided to dismiss his/her shop." />
          </Typography>
          <Typography className={classes.dialogText}>
            <FormattedMessage defaultMessage="Please be concise and try to provide the user with a solution to his/her problem." />
          </Typography>
          <Form
            initial={initialValues}
            onSubmit={onSuspendBusiness}
            confirmLeave
          >
            {({ data, submit, change }) => (
              <>
                <TextField
                  className={classes.reason}
                  fullWidth
                  onChange={change}
                  multiline
                  name="reason"
                  placeholder={intl.formatMessage({
                    defaultMessage: "Reasons for shop dismission*"
                  })}
                  type="text"
                  value={data.reason}
                  required
                />
                <div className={classes.modalBtn}>
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={closeSuspendModal}
                  >
                    <FormattedMessage defaultMessage="Cancel" />
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    disabled={!data.reason.length}
                    onClick={() => {
                      submit();
                      closeSuspendModal();
                    }}
                  >
                    <FormattedMessage defaultMessage="Dismiss shop" />
                  </Button>
                </div>
              </>
            )}
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
BusinessActive.displayName = "BusinessActive";
export default BusinessActive;
