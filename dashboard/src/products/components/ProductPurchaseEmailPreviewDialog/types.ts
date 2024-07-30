import { PurchaseEmailFormData } from "@saleor/products/forms/PurchaseEmailForm/types";

export interface IProductPurchaseEmailPreviewDialogProps {
  data: PurchaseEmailFormData;
  disabled?: boolean;
  open: boolean;
  onClose: () => void;
}
