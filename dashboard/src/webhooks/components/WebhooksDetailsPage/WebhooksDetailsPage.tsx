import { Backlink } from "@drural/macaw-ui";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import FormSpacer from "@saleor/components/FormSpacer";
import Grid from "@saleor/components/Grid";
import PageHeader from "@saleor/components/PageHeader";
import Savebar from "@saleor/components/Savebar";
import { WebhookErrorFragment } from "@saleor/fragments/types/WebhookErrorFragment";
import { getStringOrPlaceholder } from "@saleor/misc";
import { WebhookEventTypeEnum } from "@saleor/types/globalTypes";
import WebhookEvents from "@saleor/webhooks/components/WebhookEvents";
import WebhookInfo from "@saleor/webhooks/components/WebhookInfo";
import WebhookStatus from "@saleor/webhooks/components/WebhookStatus";
import { WebhookDetails_webhook } from "@saleor/webhooks/types/WebhookDetails";
import { isUnnamed } from "@saleor/webhooks/utils";
import React from "react";
import { useIntl } from "react-intl";

import { getStaticEvents } from "../WebhookEvents/utils";
import { getAllEvents } from "./utils";

export interface FormData {
  events: WebhookEventTypeEnum[];
  isActive: boolean;
  name: string;
  secretKey: string | null;
  targetUrl: string;
  allEvents: boolean;
}

export interface WebhooksDetailsPageProps {
  appName: string;
  disabled: boolean;
  errors: WebhookErrorFragment[];
  isUserStaff: boolean;
  webhook: WebhookDetails_webhook;
  saveButtonBarState: ConfirmButtonTransitionState;
  onBack: () => void;
  onSubmit: (data: FormData) => void;
}

const WebhooksDetailsPage: React.FC<WebhooksDetailsPageProps> = ({
  appName,
  disabled,
  errors,
  isUserStaff,
  webhook,
  saveButtonBarState,
  onBack,
  onSubmit
}) => {
  const intl = useIntl();

  const initialForm: FormData = {
    allEvents: getAllEvents(webhook?.events, isUserStaff),
    events: webhook?.events?.map(event => event.eventType) || [],
    isActive: !!webhook?.isActive,
    name: webhook?.name || "",
    secretKey: webhook?.secretKey || "",
    targetUrl: webhook?.targetUrl || ""
  };

  return (
    <Form initial={initialForm} onSubmit={onSubmit}>
      {({ data, hasChanged, submit, change }) => (
        <Container>
          <Backlink onClick={onBack}>{appName}</Backlink>
          <PageHeader
            title={
              isUnnamed(webhook)
                ? intl.formatMessage({
                    defaultMessage: "Unnamed Webhook Details",
                    description: "header"
                  })
                : intl.formatMessage(
                    {
                      defaultMessage: "{webhookName} Details",
                      description: "header"
                    },
                    {
                      webhookName: getStringOrPlaceholder(webhook?.name)
                    }
                  )
            }
          />
          <Grid>
            <div>
              <WebhookInfo
                data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
            </div>
            <div>
              <WebhookEvents
                data={data}
                disabled={disabled}
                events={getStaticEvents(isUserStaff)}
                onChange={change}
              />
              <FormSpacer />
              <WebhookStatus
                data={data.isActive}
                disabled={disabled}
                onChange={change}
              />
            </div>
          </Grid>
          <Savebar
            disabled={disabled || !hasChanged}
            state={saveButtonBarState}
            onCancel={onBack}
            onSubmit={submit}
          />
        </Container>
      )}
    </Form>
  );
};
WebhooksDetailsPage.displayName = "WebhooksDetailsPage";
export default WebhooksDetailsPage;
