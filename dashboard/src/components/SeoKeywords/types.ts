import { ChangeEvent } from "@saleor/hooks/useForm";

export enum EventDataAction {
  add = "add",
  delete = "delete",
  update = "update"
}

export interface ISeoKeywordsProps {
  keywords: string[];
  disabled?: boolean;
  onChange: (event: ChangeEvent<string[]>) => void;
}
