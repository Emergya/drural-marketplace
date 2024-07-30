import useForm, { FormChange } from "@saleor/hooks/useForm";
import React from "react";

import {
  PurchaseEmailFormData,
  PurchaseEmailFormProps,
  UsePurchaseEmailFormResult
} from "./types";
import { getPurchaseEmailFormData } from "./utils";

function usePurchaseEmailForm(
  initialData: Partial<PurchaseEmailFormData>,
  onSubmit: (data: PurchaseEmailFormData) => void
): UsePurchaseEmailFormResult {
  const [changed, setChanged] = React.useState(false);
  const triggerChange = () => setChanged(true);

  const form = useForm(getPurchaseEmailFormData(initialData));

  const handleChange: FormChange = (event, cb) => {
    form.change(event, cb);
    triggerChange();
  };

  const data = form.data;

  const submit = () => onSubmit(data);

  const disabled = !data.subject || !data.title || !data.content;

  return {
    change: handleChange,
    data,
    disabled,
    hasChanged: changed,
    submit
  };
}

const PurchaseEmailForm: React.FC<PurchaseEmailFormProps> = ({
  children,
  initialData,
  onSubmit
}) => {
  const props = usePurchaseEmailForm(initialData || {}, onSubmit);

  return <form onSubmit={props.submit}>{children(props)}</form>;
};

PurchaseEmailForm.displayName = "PurchaseEmailForm";
export default PurchaseEmailForm;
