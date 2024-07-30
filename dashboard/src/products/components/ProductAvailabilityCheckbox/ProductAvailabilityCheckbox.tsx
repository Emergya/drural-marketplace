import { makeStyles, Typography } from "@material-ui/core";
import { ChannelData } from "@saleor/channels/utils";
import { ChannelOpts } from "@saleor/components/ChannelsAvailabilityCard/types";
import ControlledCheckbox from "@saleor/components/ControlledCheckbox";
import { commonMessages } from "@saleor/intl";
import React from "react";
import { FormattedMessage } from "react-intl";

interface ProductAvailabilityCheckboxProps {
  defaultChannel: ChannelData;
  disabled?: boolean;
  onChannelChange: (id: string, data: ChannelOpts) => void;
}

const useStyles = makeStyles(
  () => ({
    controlledCheckbox: {
      alignItems: "flex-start",

      "& .MuiCheckbox-root": {
        padding: "4px 4px 0 11px"
      }
    },
    labelMain: {
      marginBottom: "2px"
    }
  }),
  { name: "ProductDetailsForm" }
);

export const ProductAvailabilityCheckbox: React.FC<ProductAvailabilityCheckboxProps> = ({
  defaultChannel,
  disabled,
  onChannelChange
}) => {
  const classes = useStyles();
  const { id, isPublished, publicationDate } = defaultChannel || {};
  const channelData = {
    isPublished,
    publicationDate
  };

  return (
    <>
      <ControlledCheckbox
        className={classes.controlledCheckbox}
        checked={defaultChannel && defaultChannel.isPublished}
        name="isAvailable"
        onChange={() =>
          onChannelChange(id, {
            ...channelData,
            isPublished: !isPublished
          })
        }
        disabled={disabled}
        label={
          <>
            <Typography className={classes.labelMain}>
              <FormattedMessage {...commonMessages.statusActive} />
            </Typography>

            <Typography variant="caption">
              <FormattedMessage
                defaultMessage="Unchek to disabled the service
              temporarily."
              />
            </Typography>
          </>
        }
      />
    </>
  );
};

export default ProductAvailabilityCheckbox;
