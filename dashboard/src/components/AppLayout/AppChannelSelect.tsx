import { makeStyles } from "@drural/macaw-ui";
import { ChannelFragment } from "@saleor/fragments/types/ChannelFragment";
import { ChannelProps } from "@saleor/types";
import { mapNodeToChoice } from "@saleor/utils/maps";
import React from "react";

import SingleSelectField from "../SingleSelectField";

const useStyles = makeStyles(
  theme => ({
    root: {
      "&& fieldset": {
        borderColor: theme.palette.divider
      },
      marginRight: theme.spacing(2),
      width: 192
    }
  }),
  {
    name: "AppChannelSelect"
  }
);

export interface AppChannelSelectProps extends ChannelProps {
  channels: ChannelFragment[];
  onChannelSelect: (id: string) => void;
}

const AppChannelSelect: React.FC<AppChannelSelectProps> = ({
  channels,
  onChannelSelect,
  selectedChannelId
}) => {
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <SingleSelectField
        testId="app-channel-select"
        choices={mapNodeToChoice(channels)}
        value={selectedChannelId}
        onChange={event => onChannelSelect(event.target.value)}
      />
    </div>
  );
};

AppChannelSelect.displayName = "AppChannelSelect";
export default AppChannelSelect;
