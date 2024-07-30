import { ChangeEvent } from "@saleor/hooks/useForm";
import { WebhookEventTypeEnum } from "@saleor/types/globalTypes";

export interface IWebhookEventsProps {
  data: {
    allEvents: boolean;
    events: string[];
  };
  disabled: boolean;
  events: WebhookEventTypeEnum[];
  onChange: (event: ChangeEvent, cb?: () => void) => void;
}
