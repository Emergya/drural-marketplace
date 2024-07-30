import { WebhookDetails_webhook } from "./types/WebhookDetails";

export const webhook: WebhookDetails_webhook = {
  __typename: "Webhook",
  app: {
    __typename: "App",
    id: "Jzx1ss23sEt==",
    name: "Test App 2",
    user: {
      __typename: "User",
      isStaff: true
    }
  },
  events: [],
  id: "Jzx123sEt==",
  isActive: true,
  name: "Webhook Test 2",
  secretKey: "zxczx_asdas",
  targetUrl: "http://www.getsaleor.com"
};
