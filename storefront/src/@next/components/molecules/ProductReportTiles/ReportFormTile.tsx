import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Media from "react-responsive";

import { TextArea, Tile } from "@components/atoms";
import { TextField } from "@components/molecules/TextField";
import { smallScreen } from "@styles/constants";

import * as S from "./styles";
import { IFormError, IProps } from "./types";

export const ReportFormTile: React.FC<IProps> = ({ formik, error }) => {
  const { values, errors, touched, handleChange, handleBlur } = formik;
  const intl = useIntl();

  const fieldErrors: any = {};

  if (error) {
    error.map(({ field, message }: IFormError) => {
      if (field && message) {
        fieldErrors[field] = fieldErrors[field]
          ? [...fieldErrors[field], { message }]
          : [{ message }];
      }
    });
  }

  return (
    <S.Wrapper>
      <Tile>
        <S.Title>
          <FormattedMessage defaultMessage="Tell us why you report this service" />
        </S.Title>
        <Media minWidth={smallScreen + 1}>
          <S.Text>
            <FormattedMessage defaultMessage="You must provide a reason why you think this service must be reported (e.g. this service no longer exists, this service provider has closed, this service is inappropriate, etc.). You can add images to illustrate your comments." />
          </S.Text>
        </Media>
        <TextArea
          name="reason"
          label="Reasons for service reporting*"
          rows={7}
          value={values.reason}
          onBlur={handleBlur}
          onChange={handleChange}
          errors={
            touched.reason && errors.reason
              ? [{ message: errors.reason }]
              : undefined || fieldErrors!.reason
          }
          required
        />
        <TextField
          name="phone"
          label={intl.formatMessage({
            defaultMessage: "Leave us your telephone*",
          })}
          helpText={intl.formatMessage({
            defaultMessage:
              "In case we need to contact you for further information",
          })}
          type="text"
          value={values.phone}
          onBlur={handleBlur}
          onChange={handleChange}
          errors={
            touched.phone && errors.phone
              ? [{ message: errors.phone }]
              : undefined || fieldErrors!.phone
          }
          required
        />
      </Tile>
    </S.Wrapper>
  );
};
