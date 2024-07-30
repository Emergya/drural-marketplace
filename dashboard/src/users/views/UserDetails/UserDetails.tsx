import { DialogContentText } from "@material-ui/core";
import ActionDialog from "@saleor/components/ActionDialog";
import { WindowTitle } from "@saleor/components/WindowTitle";
import useNavigator from "@saleor/hooks/useNavigator";
import { getStringOrPlaceholder } from "@saleor/misc";
import { orderListUrl, orderUrl } from "@saleor/orders/urls";
import UserDetailsPage from "@saleor/users/components/UserDetailsPage";
import { getUserTypeMessage } from "@saleor/users/utils";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { UserDetailsViewProps } from "./types";

export const UserDetails: React.FC<UserDetailsViewProps> = ({
  disabled,
  errors,
  params,
  removeUserOpts,
  saveButtonBarStatus,
  type,
  user,
  detailsUrl,
  handleAddressManageClick,
  handleBack,
  removeUser,
  handleSubmit
}) => {
  const navigate = useNavigator();
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={user?.email} />
      <UserDetailsPage
        user={user}
        disabled={disabled}
        errors={errors}
        saveButtonBar={saveButtonBarStatus}
        type={type}
        onAddressManageClick={handleAddressManageClick}
        onBack={handleBack}
        onRowClick={id => navigate(orderUrl(id))}
        onSubmit={handleSubmit}
        onDelete={() =>
          navigate(
            detailsUrl({
              action: "remove"
            })
          )
        }
        onViewAllOrdersClick={() =>
          navigate(
            orderListUrl({
              customer: user?.email
            })
          )
        }
      />
      <ActionDialog
        confirmButtonState={removeUserOpts.status}
        onClose={() => navigate(detailsUrl(), true)}
        onConfirm={removeUser}
        title={intl.formatMessage(
          {
            defaultMessage: "Delete {user}",
            description: "dialog header"
          },
          {
            user: getUserTypeMessage(intl, type)
          }
        )}
        variant="delete"
        open={params.action === "remove"}
      >
        <DialogContentText>
          <FormattedMessage
            defaultMessage="Are you sure you want to delete {email}?"
            description="delete user, dialog content"
            values={{
              email: <strong>{getStringOrPlaceholder(user?.email)}</strong>
            }}
          />
        </DialogContentText>
      </ActionDialog>
    </>
  );
};
export default UserDetails;
