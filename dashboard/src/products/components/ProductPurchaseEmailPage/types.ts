import { ConfirmButtonTransitionState } from "@drural/macaw-ui";
import { PurchaseEmailFormData } from "@saleor/products/forms/PurchaseEmailForm/types";
import { ProductPurchaseEmail_product } from "@saleor/products/types/ProductPurchaseEmail";
import { ProductPurchaseEmailUpdate_productUpdate_errors } from "@saleor/products/types/ProductPurchaseEmailUpdate";

export interface ProductPurchaseEmailPageProps {
  errors: ProductPurchaseEmailUpdate_productUpdate_errors[];
  header: string;
  initialData?: Partial<PurchaseEmailFormData>;
  loading: boolean;
  product: ProductPurchaseEmail_product | undefined;
  saveButtonBarState: ConfirmButtonTransitionState;
  onBack: () => void;
  onDelete?: () => void;
  onSubmit: (formData: PurchaseEmailFormData) => void;
}
