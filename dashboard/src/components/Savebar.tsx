import {
  Savebar as MacawSavebar,
  SavebarLabels,
  SavebarProps as MacawSavebarProps
} from "@drural/macaw-ui";
import { buttonMessages, commonMessages } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";

export interface SavebarProps extends Omit<MacawSavebarProps, "labels"> {
  labels?: Partial<SavebarLabels>;
}

export const Savebar: React.FC<SavebarProps> = ({ labels = {}, ...rest }) => {
  const intl = useIntl();

  const defaultLabels: SavebarLabels = {
    additional: intl.formatMessage(buttonMessages.preview),
    cancel: intl.formatMessage(buttonMessages.back),
    confirm: intl.formatMessage(buttonMessages.save),
    delete: intl.formatMessage(buttonMessages.delete),
    error: intl.formatMessage(commonMessages.error)
  };
  const componentLabels: SavebarLabels = {
    ...defaultLabels,
    ...labels
  };

  return <MacawSavebar labels={componentLabels} {...rest} />;
};
Savebar.displayName = "SaveBar";
export default Savebar;
