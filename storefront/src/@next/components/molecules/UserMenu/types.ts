import { DataErrorAuthTypes } from "@drural/sdk/lib/api/Auth/types";
import { PromiseRunResponse } from "@drural/sdk/lib/api/types";

export interface IProps {
  name: string;
  messages: number;
  notifications: number;
  handleSignOut?: () => PromiseRunResponse<DataErrorAuthTypes>;
}
