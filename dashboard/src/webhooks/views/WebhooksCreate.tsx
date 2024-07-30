import { useAppDetails } from "@saleor/apps/queries";
import { appsSection, customAppUrl } from "@saleor/apps/urls";
import NotFoundPage from "@saleor/components/NotFoundPage";
import { WindowTitle } from "@saleor/components/WindowTitle";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";

import WebhookCreatePage, { FormData } from "../components/WebhookCreatePage";
import { useWebhookCreateMutation } from "../mutations";
import { WebhookCreate as WebhookCreateData } from "../types/WebhookCreate";
import { webhookUrl } from "../urls";

export interface WebhooksCreateProps {
  id: string;
}

export const WebhooksCreate: React.FC<WebhooksCreateProps> = ({ id }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();

  const { data: appData } = useAppDetails({ variables: { id } });
  const app = appData?.app;

  const onSubmit = (data: WebhookCreateData) => {
    if (data.webhookCreate.errors.length === 0) {
      notify({
        status: "success",
        text: intl.formatMessage(commonMessages.savedChanges)
      });
      navigate(webhookUrl(data.webhookCreate.webhook.id));
    }
  };
  const [webhookCreate, webhookCreateOpts] = useWebhookCreateMutation({
    onCompleted: onSubmit
  });

  const handleBack = () => navigate(customAppUrl(id));

  const handleSubmit = (data: FormData) =>
    webhookCreate({
      variables: {
        input: {
          app: id,
          events: data.events,
          isActive: data.isActive,
          name: data.name,
          secretKey: data.secretKey,
          targetUrl: data.targetUrl
        }
      }
    });

  if (!app) {
    return <NotFoundPage onBack={() => navigate(appsSection)} />;
  }

  return (
    <>
      <WindowTitle
        title={intl.formatMessage({
          defaultMessage: "Create Webhook",
          description: "window title"
        })}
      />
      <WebhookCreatePage
        appName={app?.name}
        isUserStaff={app?.user.isStaff}
        disabled={false}
        errors={webhookCreateOpts.data?.webhookCreate.errors || []}
        onBack={handleBack}
        onSubmit={handleSubmit}
        saveButtonBarState={webhookCreateOpts.status}
      />
    </>
  );
};

WebhooksCreate.displayName = "WebhooksCreate";
export default WebhooksCreate;
