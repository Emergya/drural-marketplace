import { Field, Formik } from "formik";
import * as React from "react";
import { useAlert } from "react-alert";
import { useMutation } from "react-apollo";
import { FormattedMessage, useIntl } from "react-intl";
import * as Yup from "yup";

import { Button } from "@components/atoms";
import { StarsRating } from "@components/atoms/Rating";
import { Thumbnail } from "@components/molecules";
import { TextAreaField } from "@components/molecules/TextAreaField";
import { Overlay } from "@components/organisms";

import {
  ProductAddRating,
  ProductAddRatingVariables,
} from "./gqlTypes/ProductAddRating";
import { productAddRating } from "./queries";
import * as S from "./styles";

interface ServiceToReview {
  serviceId: string;
  serviceName: string;
  serviceImage: string;
}

export interface ModalFormProps {
  serviceToReview: ServiceToReview;
  hide: () => void;
  // TODO: update refetch function
  refetchProductRatings?: () => void;
  showSucessModal: () => void;
}

const RatingModal: React.FC<ModalFormProps> = ({
  serviceToReview,
  hide,
  refetchProductRatings,
  showSucessModal,
}) => {
  const alert = useAlert();
  const intl = useIntl();

  const displayQueryMutationError = () => {
    alert.show(
      {
        content: intl.formatMessage({
          defaultMessage: "Something went wrong",
        }),
        title: "Error",
      },
      { type: "error", timeout: 5000 }
    );
  };

  const [addProductRating] = useMutation<
    ProductAddRating,
    ProductAddRatingVariables
  >(productAddRating, {
    onCompleted(data) {
      // TODO: error handling UI not yet defined
      if (data.productRatingCreate!.errors?.length > 0) {
        alert.show(
          {
            content: intl.formatMessage(
              {
                defaultMessage: "{error}",
              },
              {
                error: data.productRatingCreate!.errors[0].message,
              }
            ),
            title: "Error",
          },
          { type: "error", timeout: 5000 }
        );
      } else if (refetchProductRatings) {
        refetchProductRatings();
        showSucessModal();
      } else {
        showSucessModal();
      }

      hide();
    },
    onError() {
      displayQueryMutationError();
      hide();
    },
  });

  return (
    <Overlay
      testingContext="modalForm"
      duration={0}
      show
      hide={hide}
      position="notification"
    >
      <Formik
        initialValues={{ review: "", rating: 0 }}
        onSubmit={(values, { setSubmitting }) => {
          addProductRating({
            variables: {
              id: serviceToReview.serviceId,
              rating: values.rating,
              review: values.review,
            },
          });

          setSubmitting(false);
        }}
        validationSchema={Yup.object({
          review: Yup.string().max(500, "Max. 500 characters"),
        })}
      >
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          errors,
          touched,
          isSubmitting,
          isValid,
        }) => {
          return (
            <S.Div>
              <S.CloseIconRestyled onClose={hide} />
              <S.Form onSubmit={handleSubmit} id="rating-form">
                <h2>
                  <FormattedMessage defaultMessage="Rate the service" />
                </h2>
                <S.ServiceInfo>
                  <S.Image>
                    <Thumbnail
                      source={{
                        thumbnail: {
                          url: serviceToReview.serviceImage || "",
                          alt: "image-service",
                        },
                      }}
                    />
                  </S.Image>
                  <p>{serviceToReview.serviceName}</p>
                </S.ServiceInfo>

                <S.RatingDiv>
                  <S.RateTitle>
                    <FormattedMessage defaultMessage="Rate your experience" />
                  </S.RateTitle>
                  <Field>
                    {({ form }: { form: any }) => {
                      const onClickStar = (value: number) => {
                        form.setFieldValue("rating", value);
                      };
                      return (
                        <StarsRating
                          starsNumber={values.rating}
                          onClick={onClickStar}
                        />
                      );
                    }}
                  </Field>
                </S.RatingDiv>
                <S.RateTitle>
                  <FormattedMessage defaultMessage="Leave a review" />
                </S.RateTitle>

                <TextAreaField
                  name="review"
                  label={intl.formatMessage({ defaultMessage: "Optional" })}
                  type="text"
                  value={values.review}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  errors={
                    touched.review && errors.review
                      ? [{ message: errors.review }]
                      : undefined
                  }
                  rows={10}
                />

                <S.Footer>
                  <Button
                    id="rating-form"
                    testingContext="rating-modal"
                    type="submit"
                    disabled={values.rating === 0}
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

export default RatingModal;
