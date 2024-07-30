import { makeStyles } from "@drural/macaw-ui";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography
} from "@material-ui/core";
import { CompanyValidation_companyValidation_errors } from "@saleor/business/types/CompanyValidation";
import CardTitle from "@saleor/components/CardTitle";
import Form from "@saleor/components/Form";
import { SubmitPromise } from "@saleor/hooks/useForm";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";

import { BusinessDetailsPageFormData } from "../BusinessDetailsPage/types";

const useStyles = makeStyles(
  theme => ({
    [theme.breakpoints.up("md")]: {
      dismissModal: {
        "& div": {
          padding: theme.spacing(2)
        }
      }
    },
    buttonDiv: {
      display: "flex",
      justifyContent: "space-between",
      "& button": {
        width: "45%"
      }
    },
    dialogText: {
      marginBottom: theme.spacing(1),
      textAlign: "left"
    },
    dismissModal: {
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
  { name: "BusinessValidation" }
);

export interface BusinessValidationFormData {
  reason: string;
}
export interface BusinessValidationProps {
  disabled: boolean;
  errors: CompanyValidation_companyValidation_errors[];
  reason: string;
  onChange: (event: React.ChangeEvent<any>) => void;
  onDismiss: (data: BusinessDetailsPageFormData) => SubmitPromise;
  onValidate: () => SubmitPromise;
}
const BusinessValidation = props => {
  const { onDismiss, onValidate, disabled } = props;
  const intl = useIntl();
  const classes = useStyles();

  const [isOpenModal, setOpenModal] = React.useState(false);

  const closeModal = () => setOpenModal(false);
  const openModal = () => setOpenModal(true);

  const initialValues: BusinessValidationFormData = {
    reason: ""
  };
  return (
    <>
      <Card>
        <CardTitle
          title={intl.formatMessage({ defaultMessage: "Shop validation" })}
        />
        <CardContent>
          <div className={classes.buttonDiv}>
            <Button
              onClick={openModal}
              color="secondary"
              variant="contained"
              disabled={disabled}
            >
              <FormattedMessage defaultMessage="Dismiss" />
            </Button>
            <Button
              color="primary"
              disabled={disabled}
              variant="contained"
              onClick={onValidate}
            >
              <FormattedMessage defaultMessage="Validate" />
            </Button>
          </div>
        </CardContent>
      </Card>
      <Dialog
        open={isOpenModal}
        onClose={closeModal}
        maxWidth="md"
        className={classes.dismissModal}
      >
        <DialogTitle>
          <Typography variant="h2">
            <FormattedMessage defaultMessage="Dismiss shop" />
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography className={classes.dialogText}>
            <FormattedMessage defaultMessage="You must provide a reason why you are not activating the shop. An email will be sent to the owner of the shop, explaining the reason why you have decided to dismiss his/her shop." />
          </Typography>
          <Typography className={classes.dialogText}>
            <FormattedMessage defaultMessage="Please be concise and try to provide the user with a solution to his/her problem." />
          </Typography>
          <Form initial={initialValues} onSubmit={onDismiss} confirmLeave>
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
                    onClick={closeModal}
                  >
                    <FormattedMessage defaultMessage="Cancel" />
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    disabled={!data.reason.length}
                    onClick={() => {
                      submit();
                      closeModal();
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

export default BusinessValidation;
