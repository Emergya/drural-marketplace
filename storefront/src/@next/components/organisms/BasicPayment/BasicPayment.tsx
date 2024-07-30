import { Formik } from "formik";
import React from "react";

import { ErrorMessage } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Basic payment gateway.
 */
const BasicPayment: React.FC<IProps> = ({
  processPayment,
  formRef,
  formId,
  errors = [],
}: IProps) => {
  const handleFormSubmit = async () => {
    processPayment();
  };

  return (
    <Formik
      initialValues={null}
      onSubmit={async (values, { setSubmitting }) => {
        await handleFormSubmit();
        setSubmitting(false);
      }}
    >
      {({ handleSubmit }) => (
        <S.Form id={formId} ref={formRef} onSubmit={handleSubmit}>
          <ErrorMessage errors={errors} />
        </S.Form>
      )}
    </Formik>
  );
};

export { BasicPayment };
