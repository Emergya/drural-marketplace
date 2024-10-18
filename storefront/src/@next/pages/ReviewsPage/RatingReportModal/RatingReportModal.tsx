import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { Overlay } from "@components/organisms";
import { Thumbnail } from "@components/molecules";
import { Formik } from "formik";
import { Button } from "@components/atoms";
import { TextAreaField } from "@components/molecules/TextAreaField";

import * as S from "./styles";
import * as Yup from "yup";

import { ReportProductReview, ReportProductReviewVariables } from "./gqlTypes/ReportProductReview";
import { useMutation } from "react-apollo";
import { reportProductReview } from "./queries";
import { useAlert } from "react-alert";
import { commonMessages } from "@temp/intl";

interface ServiceToReport {
  serviceId: string;
  serviceName: string;
  serviceImage: string;
}

interface FormValues {
  reasons: string[];
  otherReason: string;
}

interface ReportReviewData {
  reasons: string[];
}

export interface ModalFormProps {
  serviceToReport: ServiceToReport;
  ratingID: string;
  hide: () => void;
  refetch: () => void;
  showSucessModal: () => void;
}

const RatingReportModal: React.FC<ModalFormProps> = ({
  serviceToReport,
  ratingID,
  hide,
  refetch,
  showSucessModal,
}) => {
  const alert = useAlert();
  const intl = useIntl();

  const displayQueryMutationError = () => {
    alert.show(
      {
        content: intl.formatMessage(commonMessages.mutationError),
        title: "Error",
      },
      { type: "error", timeout: 5000 }
    );
  };

  const [sendReportREview] = useMutation<
    ReportProductReview,
    ReportProductReviewVariables
  >(reportProductReview,{
    onCompleted(){
      showSucessModal()
      refetch();
      hide();
    },
    onError() {
      displayQueryMutationError();
      hide();
    },
  });

  const handleClick = (data:ReportReviewData) => {
    sendReportREview({
      variables: {id: ratingID, reasons: data.reasons}
    });
  }

  const reasons = [
    "Offensive language or insults",
    "Inappropriate or violent content",
    "Discrimination or hate speech",
    "False or misleading information",
  ];

  return (
    <Overlay
      testingContext="modalForm"
      duration={0}
      show
      hide={hide}
      position="notification"
    >
      <Formik<FormValues>
        initialValues={{ reasons: [], otherReason: "" }}
        onSubmit={(values, { setSubmitting }) => {
          const finalReasons = values.reasons.includes("Others")
            ? [...values.reasons.filter((r) => r !== "Others"), values.otherReason]
            : values.reasons;

          handleClick({
            reasons: finalReasons,
          });
  
          setSubmitting(false);
        }}
        validationSchema={Yup.object({
          reasons: Yup.array()
            .of(Yup.string())
            .min(1, "Please select at least one reason")
            .required("This field is required"),
          otherReason: Yup.string().when("reasons", {
            is: (reasons: string[]) => reasons.includes("Others"),
            then: Yup.string().required("Please provide a reason for 'Others'").max(500, "Max. 500 characters"),
          }),
        })}
      >
        {({
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
          handleChange,
          handleBlur
        }) => {
          const handleCheckboxChange = (reason: string) => {
            if (values.reasons.includes(reason)) {
              setFieldValue(
                "reasons",
                values.reasons.filter((item) => item !== reason)
              );
            } else {
              setFieldValue("reasons", [...values.reasons, reason]);
            }
          };
  
          return (
            <S.Div>
              <S.CloseIconRestyled onClose={hide} />
              <S.Form onSubmit={handleSubmit} id="report-review-form">
                <h2>
                  <FormattedMessage defaultMessage="Report review" />
                </h2>
                <S.ServiceInfo>
                  <S.Image>
                    <Thumbnail
                      source={{
                        thumbnail: {
                          url: serviceToReport.serviceImage || "",
                          alt: "image-service",
                        },
                      }}
                    />
                  </S.Image>
                  <p>{serviceToReport.serviceName}</p>
                </S.ServiceInfo>
                <p>
                  <FormattedMessage defaultMessage="You are about to report a review, please select one or several reasons from the list below:" />
                </p>  
                <div>
                  {reasons.map((reason, index) => (
                    <S.Reason key={index}>
                      <label>
                        <S.CheckBox
                          type="checkbox"
                          name="reasons"
                          value={reason}
                          checked={values.reasons.includes(reason)}
                          onChange={() => handleCheckboxChange(reason)}
                        />
                        {reason}
                      </label>
                    </S.Reason>
                  ))}
  
                  <S.Reason>
                    <label>
                      <S.CheckBox
                        type="checkbox"
                        name="reasons"
                        value="Others"
                        checked={values.reasons.includes("Others")}
                        onChange={() => handleCheckboxChange("Others")}
                      />
                      Others
                    </label>
                  </S.Reason>
  
                  {values.reasons.includes("Others") && (
                    <div>
                      <TextAreaField
                        name="otherReason"
                        label={intl.formatMessage({ defaultMessage: "Please specify your reason" })}
                        type="text"
                        value={values.otherReason}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        errors={
                          touched.otherReason && errors.otherReason
                            ? [{ message: errors.otherReason }]
                            : undefined
                        }
                        rows={10}
                      />
                    </div>
                  )}
                </div>
  
                {errors.reasons && touched.reasons && (
                  <div>{errors.reasons}</div>
                )}
  
                <S.Footer>
                  <Button
                    id="report-review-form"
                    testingContext="report-review-modal"
                    type="submit"
                  >
                    <FormattedMessage defaultMessage="Send" />
                  </Button>
                </S.Footer>
              </S.Form>
            </S.Div>
          );
        }}
      </Formik>
    </Overlay>
  );
};

export default RatingReportModal;
