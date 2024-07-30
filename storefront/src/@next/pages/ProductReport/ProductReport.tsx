import { useAuth } from "@drural/sdk";
import { User } from "@drural/sdk/lib/fragments/gqlTypes/User";
import { Formik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { generatePath } from "react-router";
import * as Yup from "yup";

import {
  Button,
  Loader,
  NotificationTemplate,
  PageBottomSpacing,
} from "@components/atoms";
import {
  BackLink,
  ReportFormTile,
  ReportMediaTile,
  SidebarTile,
} from "@components/molecules";
import { Container } from "@components/templates";
import { paths } from "@paths";
import { NotFound } from "@temp/components";
import { commonMessages } from "@temp/intl";
import { phoneRegExp } from "@utils/formValidation";

import { TypedFraudulentProductReportCreateMutation } from "./mutations";
import { useFraudulentProductReportQuery } from "./queries";
import * as S from "./styles";

export interface IImageToUpload {
  id: string;
  file: File;
  fileIndex: number;
  url: string;
}

export const ProductReport: NextPage = () => {
  // 1. Data + varaibles
  const intl = useIntl();
  const { query, push } = useRouter();
  const { user } = useAuth();

  const [formErrors, setFormErrors] = React.useState<string[]>([]);
  const [imagesToUpload, setImagesToUpload] = React.useState<IImageToUpload[]>(
    []
  );

  const {
    data: productData,
    loading: productLoading,
  } = useFraudulentProductReportQuery(
    {
      slug: query.productSlug as string,
    },
    !query.productSlug
  );
  const product = productData?.product;

  // 2. Functions
  const getUserPhone = (user: User) => {
    if (user) {
      const address = user.addresses?.find(address => address?.phone);
      if (address) {
        return address.phone;
      }
    }
  };

  // 3. Form validation schema
  const validationSchema = Yup.object().shape({
    reason: Yup.string().required(intl.formatMessage(commonMessages.required)),
    phone: Yup.string()
      .matches(phoneRegExp, intl.formatMessage(commonMessages.invalidPhone))
      .max(15, intl.formatMessage(commonMessages.maxPhoneLength))
      .required(intl.formatMessage(commonMessages.required)),
  });

  // 4. Render
  if (productLoading) {
    return <Loader />;
  }

  if (!user || !product) {
    return <NotFound />;
  }

  return (
    <TypedFraudulentProductReportCreateMutation
      onCompleted={data => {
        const dataErrors = data.fraudulentProductReportCreate?.errors;

        if (dataErrors?.length !== 0) {
          dataErrors?.forEach(error => {
            if (error.message !== null) {
              setFormErrors(prevState => {
                return [...prevState, error.message as string];
              });
            } else {
              setFormErrors(prevState => {
                return [
                  ...prevState,
                  intl.formatMessage({
                    defaultMessage: "Unable to report product",
                  }),
                ];
              });
            }
          });
        } else {
          push({
            pathname: paths.productReportSuccess,
            query: {
              productSlug: product?.slug,
            },
          });
        }
      }}
      onError={error => {
        if (error) {
          setFormErrors(prevState => [...prevState, error.message]);
        }
      }}
    >
      {(fraudulentProductReportCreate, { data, loading, error }) => (
        <>
          <Container>
            <BackLink
              onClick={() =>
                push(
                  generatePath(paths.product, {
                    slug: query.productSlug as string,
                  })
                )
              }
            >
              <FormattedMessage defaultMessage="Back to the service" />
            </BackLink>
            <S.Title>
              <FormattedMessage defaultMessage="Report service" />
            </S.Title>
            <S.Wrapper>
              <SidebarTile
                title={intl.formatMessage(commonMessages.reportingService)}
                image={{
                  thumbnail: product?.thumbnail,
                  thumbnail2x: product?.thumbnail2x,
                }}
                itemName={product?.name || ""}
              />
              <S.MainWrapper>
                <Formik
                  initialValues={{
                    reason: "",
                    phone: getUserPhone(user) || "",
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    if (product) {
                      const files = imagesToUpload.map(image => image.file);
                      fraudulentProductReportCreate({
                        variables: {
                          product: product.id,
                          reason: values.reason,
                          phone: values.phone,
                          images: Array.from(files),
                        },
                      });
                      setSubmitting(false);
                    }
                  }}
                  validateOnChange={false}
                  validationSchema={validationSchema}
                >
                  {formik => {
                    return (
                      <S.Form onSubmit={formik.handleSubmit}>
                        <ReportFormTile
                          formik={formik}
                          error={data?.fraudulentProductReportCreate?.errors}
                        />
                        <ReportMediaTile
                          imagesToUpload={imagesToUpload}
                          setImagesToUpload={prevImagesToUpload =>
                            setImagesToUpload(prevImagesToUpload)
                          }
                        />
                        <S.FormButtons>
                          <Button
                            testingContext="cancelButton"
                            type="button"
                            color="ghost"
                            onClick={() =>
                              push(
                                generatePath(paths.product, {
                                  slug: query.productSlug as string,
                                })
                              )
                            }
                          >
                            <FormattedMessage {...commonMessages.cancel} />
                          </Button>
                          <Button
                            testingContext="submitButton"
                            type="submit"
                            disabled={
                              productLoading ||
                              loading ||
                              formik.isSubmitting ||
                              !formik.isValid
                            }
                          >
                            <FormattedMessage
                              {...commonMessages.reportService}
                            />
                          </Button>
                        </S.FormButtons>
                      </S.Form>
                    );
                  }}
                </Formik>
              </S.MainWrapper>
            </S.Wrapper>
            <PageBottomSpacing />
          </Container>
          {formErrors.length > 0 &&
            formErrors.map((formError, index) => (
              <NotificationTemplate
                key={index}
                id="reportProductNotification"
                close={() => setFormErrors([])}
                message={{ title: "Error", content: formError }}
                options={{ type: "error" }}
                style={{}}
              />
            ))}
        </>
      )}
    </TypedFraudulentProductReportCreateMutation>
  );
};
