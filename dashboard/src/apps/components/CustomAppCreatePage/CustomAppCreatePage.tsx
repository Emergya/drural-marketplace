import { Backlink } from "@drural/macaw-ui";
import AccountPermissions from "@saleor/components/AccountPermissions";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import Grid from "@saleor/components/Grid";
import PageHeader from "@saleor/components/PageHeader";
import Savebar from "@saleor/components/Savebar";
import { AppErrorFragment } from "@saleor/fragments/types/AppErrorFragment";
import { User_userPermissions } from "@saleor/fragments/types/User";
import { sectionNames } from "@saleor/intl";
import { PermissionEnum } from "@saleor/types/globalTypes";
import { getFormErrors } from "@saleor/utils/errors";
import getAppErrorMessage from "@saleor/utils/errors/app";
import React from "react";
import { useIntl } from "react-intl";

import CustomAppInformation from "../CustomAppInformation";

export interface CustomAppCreatePageFormData {
  hasFullAccess: boolean;
  name: string;
  permissions: PermissionEnum[];
}
export interface CustomAppCreatePageProps {
  disabled: boolean;
  errors: AppErrorFragment[];
  permissions: User_userPermissions[];
  saveButtonBarState: ConfirmButtonTransitionState;
  onBack: () => void;
  onSubmit: (data: CustomAppCreatePageFormData) => void;
}

const CustomAppCreatePage: React.FC<CustomAppCreatePageProps> = props => {
  const {
    disabled,
    errors,
    permissions,
    saveButtonBarState,
    onBack,
    onSubmit
  } = props;
  const intl = useIntl();

  const initialForm: CustomAppCreatePageFormData = {
    hasFullAccess: false,
    name: "",
    permissions: []
  };

  const formErrors = getFormErrors(["permissions"], errors || []);
  const permissionsError = getAppErrorMessage(formErrors.permissions, intl);

  return (
    <Form initial={initialForm} onSubmit={onSubmit} confirmLeave>
      {({ data, change, hasChanged, submit }) => (
        <Container>
          <Backlink onClick={onBack}>
            {intl.formatMessage(sectionNames.apps)}
          </Backlink>
          <PageHeader
            title={intl.formatMessage({
              defaultMessage: "Create New App",
              description: "header"
            })}
          />
          <Grid>
            <div>
              <CustomAppInformation
                data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
            </div>
            <AccountPermissions
              data={data}
              errorMessage={permissionsError}
              disabled={disabled}
              permissions={permissions}
              permissionsExceeded={false}
              onChange={change}
              fullAccessLabel={intl.formatMessage({
                defaultMessage: "Grant this app full access to the store",
                description: "checkbox label"
              })}
              description={intl.formatMessage({
                defaultMessage:
                  "Expand or restrict app permissions to access certain part of Saleor system.",
                description: "card description"
              })}
            />
          </Grid>
          <Savebar
            disabled={disabled || !hasChanged}
            state={saveButtonBarState}
            onCancel={onBack}
            onSubmit={submit}
          />
        </Container>
      )}
    </Form>
  );
};

CustomAppCreatePage.displayName = "CustomAppCreatePage";
export default CustomAppCreatePage;
