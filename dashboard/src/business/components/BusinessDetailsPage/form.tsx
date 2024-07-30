import useForm, { FormChange } from "@saleor/hooks/useForm";
import React from "react";

import { BusinessDetailsFormProps } from "./types";

function BusinessDetailsForm(props: BusinessDetailsFormProps): JSX.Element {
  const { children, initial, resetOnSubmit, onSubmit } = props;
  const form = useForm(initial, onSubmit);

  const [changed, setChanged] = React.useState(false);
  const triggerChange = () => setChanged(true);

  const handleChange: FormChange = (event, cb) => {
    form.change(event, cb);
    triggerChange();
  };

  const handleSubmit = (event?: React.FormEvent<any>, cb?: () => void) => {
    const { reset, submit } = form;

    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    if (cb) {
      cb();
    }

    if (resetOnSubmit) {
      reset();
    }

    submit();
  };

  const formProps = {
    ...form,
    change: handleChange,
    outerChange: form.change,
    hasChanged: changed
  };

  return <form onSubmit={handleSubmit}>{children(formProps)}</form>;
}

BusinessDetailsForm.displayName = "BusinessDetailsForm";
export default BusinessDetailsForm;
