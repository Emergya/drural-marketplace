import { Card, CardContent, Typography } from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import ControlledCheckbox from "@saleor/components/ControlledCheckbox";
import Hr from "@saleor/components/Hr";
import { ChangeEvent } from "@saleor/hooks/useForm";
import { toggle } from "@saleor/utils/lists";
import React from "react";
import { useIntl } from "react-intl";

import { IWebhookEventsProps } from "./types";
import { getEventMessage, messages } from "./utils";

const WebhookEvents: React.FC<IWebhookEventsProps> = ({
  data,
  disabled,
  events,
  onChange
}) => {
  const intl = useIntl();

  const handleAllEventsChange = (event: ChangeEvent) => {
    // Stores unchanged data.allAvents
    const isAllEventsChecked = data.allEvents;
    // Changes data.allAvents
    onChange(event);
    // Adds all avalable evets to the data.events array
    onChange({
      target: {
        name: "events",
        value: isAllEventsChecked ? [] : events
      }
    });
  };

  const handleEventsChange = (event: ChangeEvent) =>
    onChange({
      target: {
        name: "events",
        value: toggle(event.target.name, data.events, (a, b) => a === b)
      }
    });

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Events",
          description: "section header"
        })}
      />
      <CardContent>
        <Typography>
          {intl.formatMessage({
            defaultMessage:
              "Expand or restrict webhooks permissions to register certain events in Saleor system.",
            description: "webhook events"
          })}
        </Typography>
        <ControlledCheckbox
          checked={data.allEvents}
          disabled={disabled}
          label={intl.formatMessage(messages.allEvents)}
          name="allEvents"
          onChange={handleAllEventsChange}
        />
        {!data.allEvents && (
          <>
            <Hr />
            {events.map(event => (
              <div key={event}>
                <ControlledCheckbox
                  checked={data.events.includes(event)}
                  disabled={disabled}
                  label={getEventMessage(event, intl)}
                  name={event}
                  onChange={handleEventsChange}
                />
              </div>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
};
WebhookEvents.displayName = "WebhookEvents";
export default WebhookEvents;
