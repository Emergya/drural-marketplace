import { DialogContentText } from "@material-ui/core";
import ActionDialog from "@saleor/components/ActionDialog";
import NotFoundPage from "@saleor/components/NotFoundPage";
import { WindowTitle } from "@saleor/components/WindowTitle";
import { DEFAULT_INITIAL_SEARCH_DATA } from "@saleor/config";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import useUser from "@saleor/hooks/useUser";
import { commonMessages, errorMessages } from "@saleor/intl";
import { getStringOrPlaceholder, maybe } from "@saleor/misc";
import usePermissionGroupSearch from "@saleor/searches/usePermissionGroupSearch";
import { mapEdgesToItems } from "@saleor/utils/maps";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import StaffDetailsPage, {
  StaffDetailsFormData
} from "../components/StaffDetailsPage/StaffDetailsPage";
import StaffPasswordResetDialog from "../components/StaffPasswordResetDialog";
import {
  TypedStaffAvatarDeleteMutation,
  TypedStaffAvatarUpdateMutation,
  TypedStaffMemberDeleteMutation,
  TypedStaffMemberUpdateMutation,
  useAccountUpdate,
  useChangeStaffPassword
} from "../mutations";
import { TypedStaffMemberDetailsQuery } from "../queries";
import { AccountUpdate } from "../types/AccountUpdate";
import { ChangeStaffPassword } from "../types/ChangeStaffPassword";
import { StaffAvatarDelete } from "../types/StaffAvatarDelete";
import { StaffAvatarUpdate } from "../types/StaffAvatarUpdate";
import { StaffMemberDelete } from "../types/StaffMemberDelete";
import { StaffMemberDetails_user_permissionGroups } from "../types/StaffMemberDetails";
import { StaffMemberUpdate } from "../types/StaffMemberUpdate";
import {
  staffListUrl,
  staffMemberDetailsUrl,
  StaffMemberDetailsUrlQueryParams
} from "../urls";
import { groupsDiff } from "../utils";

interface OrderListProps {
  id: string;
  params: StaffMemberDetailsUrlQueryParams;
}

export const StaffDetails: React.FC<OrderListProps> = ({ id, params }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const user = useUser();
  const intl = useIntl();

  const closeModal = () =>
    navigate(
      staffMemberDetailsUrl(id, {
        ...params,
        action: undefined
      })
    );

  const handleChangePassword = (data: ChangeStaffPassword) => {
    if (data.passwordChange.errors.length === 0) {
      notify({
        status: "success",
        text: intl.formatMessage(commonMessages.savedChanges)
      });
      closeModal();
    }
  };
  const [changePassword, changePasswordOpts] = useChangeStaffPassword({
    onCompleted: handleChangePassword
  });

  const handleBack = () => navigate(staffListUrl());

  const {
    loadMore: loadMorePermissionGroups,
    search: searchPermissionGroups,
    result: searchPermissionGroupsOpts
  } = usePermissionGroupSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA
  });

  // New Account Update for Seller's account

  const hasSellerGroup = (
    permissionsGroup: StaffMemberDetails_user_permissionGroups[]
  ) => {
    const sellerGroup = permissionsGroup?.filter(
      group => group.name === "Sellers"
    );
    return sellerGroup?.length > 0;
  };

  const handleSellerAccountUpdate = (data: AccountUpdate) => {
    if (!maybe(() => data.accountUpdate.errors.length !== 0)) {
      notify({
        status: "success",
        text: intl.formatMessage(commonMessages.savedChanges)
      });
    }
  };

  const [setAccountUpdate] = useAccountUpdate({
    onCompleted: handleSellerAccountUpdate
  });

  return (
    <TypedStaffMemberDetailsQuery displayLoader variables={{ id }}>
      {({ data, loading, refetch }) => {
        const staffMember = data?.user;

        if (staffMember === null) {
          return <NotFoundPage onBack={handleBack} />;
        }

        const handleStaffMemberUpdate = (data: StaffMemberUpdate) => {
          if (!maybe(() => data.staffUpdate.errors.length !== 0)) {
            notify({
              status: "success",
              text: intl.formatMessage(commonMessages.savedChanges)
            });
          }
        };
        const handleStaffMemberDelete = (data: StaffMemberDelete) => {
          if (!maybe(() => data.staffDelete.errors.length !== 0)) {
            notify({
              status: "success",
              text: intl.formatMessage(commonMessages.savedChanges)
            });
            navigate(staffListUrl());
          }
        };
        const handleStaffMemberAvatarUpdate = (data: StaffAvatarUpdate) => {
          if (!maybe(() => data.userAvatarUpdate.errors.length !== 0)) {
            notify({
              status: "success",
              text: intl.formatMessage(commonMessages.savedChanges)
            });
            refetch();
            user.tokenRefresh();
          } else {
            notify({
              status: "error",
              title: intl.formatMessage(errorMessages.imgageUploadErrorTitle),
              text: intl.formatMessage(errorMessages.imageUploadErrorText)
            });
          }
        };
        const handleStaffMemberAvatarDelete = (data: StaffAvatarDelete) => {
          if (!maybe(() => data.userAvatarDelete.errors.length !== 0)) {
            notify({
              status: "success",
              text: intl.formatMessage(commonMessages.savedChanges)
            });
            refetch();
            user.tokenRefresh();
            navigate(staffMemberDetailsUrl(id));
          }
        };

        return (
          <TypedStaffMemberUpdateMutation onCompleted={handleStaffMemberUpdate}>
            {(updateStaffMember, updateResult) => {
              const handleSubmit = async (formData: StaffDetailsFormData) => {
                // New Update Account flow if a Seller is accesing its Account

                if (hasSellerGroup(data.user.permissionGroups)) {
                  const result = await setAccountUpdate({
                    variables: {
                      input: {
                        firstName: formData.firstName,
                        lastName: formData.lastName
                      }
                    }
                  });

                  return result.data.accountUpdate.errors;
                } else {
                  const result = await updateStaffMember({
                    variables: {
                      id,
                      input: {
                        // email: formData.email,
                        firstName: formData.firstName,
                        isActive: formData.isActive,
                        lastName: formData.lastName,
                        ...groupsDiff(data?.user, formData)
                      }
                    }
                  });

                  return result.data.staffUpdate.errors;
                }
              };

              return (
                <TypedStaffMemberDeleteMutation
                  variables={{ id }}
                  onCompleted={handleStaffMemberDelete}
                >
                  {(deleteStaffMember, deleteResult) => (
                    <TypedStaffAvatarUpdateMutation
                      onCompleted={handleStaffMemberAvatarUpdate}
                    >
                      {updateStaffAvatar => (
                        <TypedStaffAvatarDeleteMutation
                          onCompleted={handleStaffMemberAvatarDelete}
                        >
                          {(deleteStaffAvatar, deleteAvatarResult) => {
                            const isUserSameAsViewer =
                              user.user?.id === data?.user?.id;

                            return (
                              <>
                                <WindowTitle
                                  title={getStringOrPlaceholder(
                                    staffMember?.email
                                  )}
                                />
                                <StaffDetailsPage
                                  errors={
                                    updateResult?.data?.staffUpdate?.errors ||
                                    []
                                  }
                                  // TODO: changing the avatar for sellers has been disabled for the moment.
                                  // It should be implemented in parallel with the Storefront for general users.
                                  canEditAvatar={isUserSameAsViewer}
                                  canEditPreferences={isUserSameAsViewer}
                                  canEditStatus={!isUserSameAsViewer}
                                  canRemove={!isUserSameAsViewer}
                                  disabled={loading}
                                  onBack={handleBack}
                                  initialSearch=""
                                  onChangePassword={() =>
                                    navigate(
                                      staffMemberDetailsUrl(id, {
                                        action: "change-password"
                                      })
                                    )
                                  }
                                  onDelete={() =>
                                    navigate(
                                      staffMemberDetailsUrl(id, {
                                        action: "remove"
                                      })
                                    )
                                  }
                                  onSubmit={handleSubmit}
                                  onImageUpload={file =>
                                    updateStaffAvatar({
                                      variables: {
                                        image: file
                                      }
                                    })
                                  }
                                  onImageDelete={() =>
                                    navigate(
                                      staffMemberDetailsUrl(id, {
                                        action: "remove-avatar"
                                      })
                                    )
                                  }
                                  availablePermissionGroups={mapEdgesToItems(
                                    searchPermissionGroupsOpts?.data?.search
                                  )}
                                  staffMember={staffMember}
                                  saveButtonBarState={updateResult.status}
                                  fetchMorePermissionGroups={{
                                    hasMore:
                                      searchPermissionGroupsOpts.data?.search
                                        ?.pageInfo.hasNextPage,
                                    loading: searchPermissionGroupsOpts.loading,
                                    onFetchMore: loadMorePermissionGroups
                                  }}
                                  onSearchChange={searchPermissionGroups}
                                />
                                <ActionDialog
                                  open={params.action === "remove"}
                                  title={intl.formatMessage({
                                    defaultMessage: "delete Staff User",
                                    description: "dialog header"
                                  })}
                                  confirmButtonState={deleteResult.status}
                                  confirmButtonLabel={intl.formatMessage({
                                    defaultMessage: "Delete"
                                  })}
                                  variant="default"
                                  onClose={closeModal}
                                  onConfirm={deleteStaffMember}
                                >
                                  <DialogContentText>
                                    <FormattedMessage
                                      defaultMessage="Are you sure you want to delete {email} from staff members?"
                                      values={{
                                        email: getStringOrPlaceholder(
                                          data?.user?.email
                                        )
                                      }}
                                    />
                                  </DialogContentText>
                                </ActionDialog>
                                <ActionDialog
                                  open={params.action === "remove-avatar"}
                                  title={intl.formatMessage({
                                    defaultMessage: "Delete Staff User Avatar",
                                    description: "dialog header"
                                  })}
                                  confirmButtonState={deleteAvatarResult.status}
                                  variant="default"
                                  onClose={closeModal}
                                  onConfirm={deleteStaffAvatar}
                                >
                                  <DialogContentText>
                                    <FormattedMessage
                                      defaultMessage="Are you sure you want to remove {email} avatar?"
                                      values={{
                                        email: (
                                          <strong>
                                            {getStringOrPlaceholder(
                                              data?.user?.email
                                            )}
                                          </strong>
                                        )
                                      }}
                                    />
                                  </DialogContentText>
                                </ActionDialog>
                                <StaffPasswordResetDialog
                                  confirmButtonState={changePasswordOpts.status}
                                  errors={
                                    changePasswordOpts?.data?.passwordChange
                                      ?.errors || []
                                  }
                                  open={params.action === "change-password"}
                                  onClose={closeModal}
                                  onSubmit={data =>
                                    changePassword({
                                      variables: data
                                    })
                                  }
                                />
                              </>
                            );
                          }}
                        </TypedStaffAvatarDeleteMutation>
                      )}
                    </TypedStaffAvatarUpdateMutation>
                  )}
                </TypedStaffMemberDeleteMutation>
              );
            }}
          </TypedStaffMemberUpdateMutation>
        );
      }}
    </TypedStaffMemberDetailsQuery>
  );
};

export default StaffDetails;
