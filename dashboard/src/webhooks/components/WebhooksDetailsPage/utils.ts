import { hasArr2AllItemsFromArr1 } from "@saleor/utils/arrays";
import { WebhookDetails_webhook_events } from "@saleor/webhooks/types/WebhookDetails";

import { getEventsFromData, getStaticEvents } from "../WebhookEvents/utils";

export const getAllEvents = (
  events: WebhookDetails_webhook_events[] | undefined,
  isStaff: boolean
): boolean => {
  const dataEvents = getEventsFromData(events);
  const staticEvents = getStaticEvents(isStaff);
  return hasArr2AllItemsFromArr1(staticEvents, dataEvents);
};
