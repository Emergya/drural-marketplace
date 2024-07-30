import { PurchaseEmailFormData } from "@saleor/products/forms/PurchaseEmailForm/types";
import { ProductPurchaseEmailUpdate_productUpdate_errors } from "@saleor/products/types/ProductPurchaseEmailUpdate";

import { FormChange } from "../../../hooks/useForm";

export interface ProductEmailConfigurationProps {
  contentValidationError: string;
  data: PurchaseEmailFormData;
  disabled?: boolean;
  errors: ProductPurchaseEmailUpdate_productUpdate_errors[];
  subjectValidationError: string;
  titleValidationError: string;
  onChange: FormChange;
}

export enum ProductEmailConfigurationFields {
  subject = "subject",
  title = "title",
  content = "content"
}
