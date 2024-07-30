import { makeStyles } from "@drural/macaw-ui";
import { InputAdornment, TextField, Typography } from "@material-ui/core";
import { InputProps } from "@material-ui/core/Input";
import useLocale from "@saleor/hooks/useLocale";
import { convertEuroToKuna } from "@saleor/utils/money";
import React from "react";
import { FormattedMessage } from "react-intl";

import { Currency } from "../../utils/_types/Currency";
import { formatMoney } from "../Money";

const useStyles = makeStyles(
  theme => ({
    convertedMoney: {
      margin: "8px 14px 0",
      fontSize: 14,
      color: "#616161"
    },
    currencySymbol: {
      fontSize: "0.875rem"
    },
    inputContainer: {
      display: "grid",
      gridTemplateColumns: "1fr 2rem 1fr"
    },
    pullDown: {
      marginTop: theme.spacing(2)
    },
    separator: {
      marginTop: theme.spacing(3),
      textAlign: "center",
      width: "100%"
    },
    widgetContainer: {
      marginTop: theme.spacing(2)
    }
  }),
  { name: "PriceField" }
);

interface PriceFieldProps {
  fullWidth?: boolean;
  className?: string;
  convertValueToKuna?: boolean;
  currencySymbol?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  hint?: string;
  label?: string;
  maxValue?: number;
  minValue?: number;
  name?: string;
  value?: string | number;
  InputProps?: InputProps;
  inputProps?: InputProps["inputProps"];
  required?: boolean;
  onChange(event: any);
}

export const PriceField: React.FC<PriceFieldProps> = props => {
  const {
    fullWidth,
    className,
    convertValueToKuna,
    disabled,
    error,
    label,
    helperText,
    hint = "",
    currencySymbol,
    maxValue,
    minValue = 0,
    name,
    onChange,
    required,
    value,
    InputProps,
    inputProps
  } = props;

  const classes = useStyles(props);
  const { locale } = useLocale();

  return (
    <div>
      <TextField
        className={className}
        error={error || value < minValue || value > maxValue}
        helperText={
          hint ? (
            hint
          ) : value < minValue ? (
            <FormattedMessage
              defaultMessage="Value cannot be lower than {minValue} {currencySymbol}"
              values={{ minValue, currencySymbol }}
            />
          ) : value > maxValue ? (
            <FormattedMessage
              defaultMessage="Value cannot be greater than {maxValue} {currencySymbol}"
              values={{ maxValue, currencySymbol }}
            />
          ) : helperText ? (
            helperText
          ) : (
            ""
          )
        }
        label={label}
        fullWidth={fullWidth}
        value={value}
        InputProps={{
          ...InputProps,
          endAdornment: currencySymbol ? (
            <InputAdornment position="end" className={classes.currencySymbol}>
              {currencySymbol}
            </InputAdornment>
          ) : (
            <span />
          ),
          inputProps: {
            min: 0,
            ...InputProps?.inputProps
          },
          type: "number"
        }}
        inputProps={{
          min: minValue,
          type: "number",
          ...inputProps
        }}
        name={name}
        disabled={disabled}
        required={required}
        onChange={onChange}
      />
      {convertValueToKuna && currencySymbol === Currency.EUR && value && (
        <Typography className={classes.convertedMoney}>
          {formatMoney(
            {
              amount: convertEuroToKuna(value),
              currency: Currency.HRK
            },
            locale
          )}
        </Typography>
      )}
    </div>
  );
};
PriceField.defaultProps = {
  name: "price"
};

PriceField.displayName = "PriceField";
export default PriceField;
