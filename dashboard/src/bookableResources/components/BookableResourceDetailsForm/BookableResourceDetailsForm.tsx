import { makeStyles } from "@drural/macaw-ui";
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@material-ui/core";
import { BookableResourceStateEnum } from "@saleor/bookableResources/forms/types";
import { BookableResourceCreate_bookableResourceCreate_errors } from "@saleor/bookableResources/types/BookableResourceCreate";
import CardTitle from "@saleor/components/CardTitle";
import ControlledCheckbox from "@saleor/components/ControlledCheckbox";
import { commonMessages } from "@saleor/intl";
import { getFormErrors } from "@saleor/utils/errors";
import getBookableResourceErrorMessage from "@saleor/utils/errors/bookableResource";
import React from "react";
import { useIntl } from "react-intl";

const useStyles = makeStyles(
  theme => ({
    cardContent: {
      display: "flex",
      flexWrap: "wrap"
    },
    filed: {
      width: "33%",
      paddingBottom: theme.spacing(5),

      "&:not(:last-child)": {
        paddingRight: theme.spacing(3)
      },

      [theme.breakpoints.down("xs")]: {
        width: "100%",

        "&:not(:last-child)": {
          paddingRight: 0
        }
      }
    }
  }),
  { name: "BookableResourceDetailsForm" }
);

interface BookableResourceDetailsFormProps {
  data: {
    isActive: string;
    name: string;
    quantity: string;
    quantityInfinite: boolean;
  };
  disabled?: boolean;
  errors: BookableResourceCreate_bookableResourceCreate_errors[];
  onChange(event: React.ChangeEvent<HTMLInputElement>);
}

export const BookableResourceDetailsForm: React.FC<BookableResourceDetailsFormProps> = ({
  data,
  disabled,
  errors,
  onChange
}) => {
  const intl = useIntl();
  const classes = useStyles();
  const states = [
    {
      name: intl.formatMessage(commonMessages.statusActive),
      value: BookableResourceStateEnum.ACTIVE
    },
    {
      name: intl.formatMessage(commonMessages.statusInactive),
      value: BookableResourceStateEnum.INACTIVE
    }
  ];

  const formErrors = getFormErrors(
    ["name", "isActive", "quantity", "quantityInfinite"],
    errors
  );

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage(commonMessages.generalInformations)}
      />
      <CardContent className={classes.cardContent}>
        <TextField
          className={classes.filed}
          error={!!formErrors.name}
          helperText={getBookableResourceErrorMessage(formErrors.name, intl)}
          disabled={disabled}
          fullWidth
          label={intl.formatMessage(commonMessages.name)}
          name="name"
          value={data.name}
          onChange={onChange}
          required
        />
        <FormControl className={classes.filed} variant="outlined" fullWidth>
          <InputLabel>
            {`${intl.formatMessage(commonMessages.state)} *`}
          </InputLabel>
          <Select
            name="isActive"
            fullWidth
            autoComplete="none"
            value={data.isActive || ""}
            disabled={disabled}
            error={!!formErrors.isActive}
            onChange={onChange}
            required
          >
            {states.map((state, index) => (
              <MenuItem key={index} value={state.value}>
                {state.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          className={classes.filed}
          error={!!formErrors.quantity}
          helperText={getBookableResourceErrorMessage(
            formErrors.quantity,
            intl
          )}
          inputProps={{
            min: 0,
            type: "number"
          }}
          type="number"
          disabled={disabled || data.quantityInfinite}
          fullWidth
          label={intl.formatMessage(commonMessages.quantity)}
          name="quantity"
          value={data.quantity}
          onChange={onChange}
          required
        />
        <ControlledCheckbox
          checked={data.quantityInfinite}
          name="quantityInfinite"
          onChange={onChange}
          disabled={disabled}
          label={intl.formatMessage({
            defaultMessage: "This resource is inexhaustible"
          })}
        />
      </CardContent>
    </Card>
  );
};
export default BookableResourceDetailsForm;
