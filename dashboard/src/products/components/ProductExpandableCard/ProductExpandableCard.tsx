import { Card, CardContent, Typography } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import ControlledCheckbox from "@saleor/components/ControlledCheckbox";
import Hr from "@saleor/components/Hr";
import React from "react";
import { FormattedMessage } from "react-intl";

import { useStyles } from "./styles";
import { ProductExpandableCardProps } from "./types";

export const ProductExpandableCard: React.FC<ProductExpandableCardProps> = ({
  checked,
  children,
  disabled,
  label,
  name,
  readOnly,
  title,
  onChange
}) => {
  const classes = useStyles();

  return (
    <Card>
      <CardTitle title={title} />
      <CardContent>
        {readOnly ? (
          <Typography variant="body1">{label}</Typography>
        ) : (
          <div>
            <ControlledCheckbox
              name={name}
              checked={checked}
              onChange={onChange}
              disabled={disabled}
              label={label}
            />
            <p className={classes.helperText}>
              <FormattedMessage defaultMessage="You won't be able to change this setting after the service is created" />
            </p>
          </div>
        )}
      </CardContent>
      {checked && (
        <>
          <Hr />
          {children}
        </>
      )}
    </Card>
  );
};
ProductExpandableCard.displayName = "ProductExportDialog";
export default ProductExpandableCard;
