import { FormChange } from "../../../hooks/useForm";

export interface PurchaseEmailFormData {
  subject: string;
  title: string;
  content: string;
}

export interface UsePurchaseEmailFormResult {
  change: FormChange;
  data: PurchaseEmailFormData;
  disabled: boolean;
  hasChanged: boolean;
  submit: () => void;
}

export interface PurchaseEmailFormProps {
  children: (props: UsePurchaseEmailFormResult) => React.ReactNode;
  initialData?: Partial<PurchaseEmailFormData>;
  onSubmit: (data: PurchaseEmailFormData) => void;
}
