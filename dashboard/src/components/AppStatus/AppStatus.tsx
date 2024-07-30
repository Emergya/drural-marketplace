import { makeStyles } from "@drural/macaw-ui";
import { Card, CardContent, Typography } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import { ControlledCheckbox } from "@saleor/components/ControlledCheckbox";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

interface AppStatusProps {
  data: {
    isActive: boolean;
  };
  disabled: boolean;
  label: React.ReactNode;
  onChange: (event: React.ChangeEvent<any>) => void;
  disableName: string;
}

const useStyles = makeStyles(
  {
    textDescription: {
      fontSize: "12px",
      fontWeight: 400,
      opacity: "60%",
      marginBottom: "10px"
    }
  },
  { name: "PageHeader" }
);

const AppStatus: React.FC<AppStatusProps> = ({
  data,
  disabled,
  label,
  onChange,
  disableName
}) => {
  const intl = useIntl();
  const classes = useStyles();
  return (
    <Card>
      <CardTitle
        title={intl.formatMessage(
          {
            defaultMessage: "{name} Status",
            description: "section header"
          },
          { name: disableName }
        )}
      />
      <CardContent>
        <Typography className={classes.textDescription}>
          <FormattedMessage
            defaultMessage="If you want to disable this {name}, please uncheck the box below."
            values={{ name: disableName }}
          />
        </Typography>
        <ControlledCheckbox
          checked={data.isActive}
          disabled={disabled}
          label={label}
          name="isActive"
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
AppStatus.displayName = "AppStatus";
export default AppStatus;
