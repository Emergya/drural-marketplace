import React from "react";
import { useIntl } from "react-intl";
import ReactMoment from "react-moment";

import { IProps } from "./types";

export const Moment: React.FC<IProps> = props => {
  const { locale } = useIntl();

  return <ReactMoment {...props} locale={locale} />;
};
