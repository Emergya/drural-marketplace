import { SaleorTheme } from "@drural/macaw-ui";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  useMediaQuery
} from "@material-ui/core";
import BusinessDetailsPage from "@saleor/business/components/BusinessDetailsPage";
import {
  ActiveBusinessPageFormData,
  BusinessDetailsPageFormData
} from "@saleor/business/components/BusinessDetailsPage/types";
import ActionDialog from "@saleor/components/ActionDialog";
import BannerImageCropDialog from "@saleor/components/BannerImageCropDialog";
import NotFoundPage from "@saleor/components/NotFoundPage";
// import CloseIcon from "@material-ui/icons/Close";
import { WindowTitle } from "@saleor/components/WindowTitle";
import { STOREFRONT_URI } from "@saleor/config";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import useUser from "@saleor/hooks/useUser";
import { commonMessages } from "@saleor/intl";
import { getMutationState } from "@saleor/misc";
import { CompanyStatus, CompanyStatusEnum } from "@saleor/types/globalTypes";
import getChatwootErrorMessage from "@saleor/utils/errors/chatwoot";
import getFileValidationErrorMessage from "@saleor/utils/errors/files";
import {
  bannerAspect,
  bannerFileValitations,
  minBannerHeight
} from "@saleor/utils/files/constants";
import { fileValidator, getFileUrl } from "@saleor/utils/files/files";
import createDialogActionHandlers from "@saleor/utils/handlers/dialogActionHandlers";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { FormattedMessage } from "react-intl";

import { BusinessValidationFormData } from "../../components/BusinessValidation";
import {
  useCompanyChatwootCreateQuery,
  useCompanyChatwootUpdateQuery,
  useDisableCompany,
  useEditCompany,
  useEnableCompany,
  useValidationCompany
} from "../../mutations";
import { useBusinessDetailsQuery } from "../../queries";
import { CompanyChatwootCreate } from "../../types/CompanyChatwootCreate";
import { CompanyChatwootUpdate } from "../../types/CompanyChatwootUpdate";
import { CompanyDisable as CompanyDisableMutationResult } from "../../types/CompanyDisable";
import { CompanyEnable as CompanyEnableMutationResult } from "../../types/CompanyEnable";
import { CompanyUpdate as CompanyUpdateMutationResult } from "../../types/CompanyUpdate";
import { CompanyValidation as CompanyValidationResult } from "../../types/CompanyValidation";
import {
  businessAddressesPath,
  businessesListUrl,
  businessUrl,
  BusinessUrlDialog,
  BusinessUrlQueryParams
} from "../../urls";
import { useStyles } from "./styles";
import { BusinessDetailsViewProps } from "./types";

export const BusinessDetailsView: React.FC<BusinessDetailsViewProps> = ({
  id,
  params
}) => {
  const intl = useIntl();
  const navigate = useNavigator();
  const notify = useNotifier();
  const classes = useStyles();
  const user = useUser();
  const isStaff = user.user.isStaff;
  const isMdUp = useMediaQuery((theme: SaleorTheme) =>
    theme.breakpoints.up("md")
  );

  const [bannerSrc, setBannerSrc] = useState<string>(null);

  const [openModal, closeModal] = createDialogActionHandlers<
    BusinessUrlDialog,
    BusinessUrlQueryParams
  >(navigate, params => businessUrl(id, params), params);

  const handleBannerUpload = async (file: File) => {
    const fileUrl = await getFileUrl(file, notify);

    if (fileUrl) {
      const validationError = await fileValidator(
        file,
        fileUrl,
        bannerFileValitations,
        notify
      );

      if (validationError) {
        notify({
          status: "error",
          text: getFileValidationErrorMessage(
            bannerFileValitations.dimesions,
            validationError,
            intl
          )
        });
      } else {
        setBannerSrc(fileUrl);
        openModal("cropImage");
      }
    }
  };

  const handleBack = () => navigate(businessesListUrl());

  const { data, loading, refetch } = useBusinessDetailsQuery({
    displayLoader: true,
    variables: {
      id
    }
  });
  const business = data?.company;
  const showSuccessNotification = () => {
    notify({
      status: "success",
      text: intl.formatMessage(commonMessages.savedChanges)
    });
  };
  const showErrorNotification = error =>
    notify({
      status: "error",
      text: error.message
    });
  const handleValidationSuccess = (data: CompanyValidationResult) => {
    if (!data.companyValidation.errors.length) {
      showSuccessNotification();
      refetch();
    } else {
      data.companyValidation.errors.map(err => showErrorNotification(err));
    }
  };
  const handleCreateChatwootSuccess = (data: CompanyChatwootCreate) => {
    const { errors } = data.companyChatwootCreate || {};

    if (errors.length) {
      errors.forEach(error =>
        notify({
          status: "error",
          text: getChatwootErrorMessage(error, intl)
        })
      );
    } else {
      showSuccessNotification();
      refetch();
    }
  };
  const handleUpdateChatwootSuccess = (data: CompanyChatwootUpdate) => {
    const { errors } = data.companyChatwootUpdate || {};

    if (errors.length) {
      errors.forEach(error =>
        notify({
          status: "error",
          text: getChatwootErrorMessage(error, intl)
        })
      );
    } else {
      showSuccessNotification();
      refetch();
    }
  };

  const handleUpdate = (data: CompanyUpdateMutationResult) => {
    const errors = data?.companyUpdate?.errors;
    const businessStatus = data?.companyUpdate?.company?.status;

    if (errors.length) {
      data.companyUpdate.errors.map(err => showErrorNotification(err));
    } else {
      if (!isStaff && businessStatus === CompanyStatus.PEN) {
        openModal("adminVerification");
      }
      notify({
        status: "success",
        text: intl.formatMessage(commonMessages.savedChanges)
      });
      refetch();
    }
  };

  const handleDisable = (data: CompanyDisableMutationResult) => {
    if (!data.companyDisable.errors.length) {
      notify({
        status: "success",
        text: intl.formatMessage({
          defaultMessage: "Your shop is now inactive",
          id: "companyDisableSuccess"
        })
      });
    } else {
      data.companyDisable.errors.map(error =>
        notify({
          status: "error",
          text: error.message
        })
      );
    }
  };

  const handleEnable = (data: CompanyEnableMutationResult) => {
    if (!data.companyEnable.errors.length) {
      notify({
        status: "success",
        text: intl.formatMessage({
          defaultMessage: "Your shop is now active",
          id: "companyEnableSuccess"
        })
      });
    } else {
      data.companyEnable.errors.map(error =>
        notify({
          status: "error",
          text: error.message
        })
      );
    }
  };
  const [businessDisable, businessDisableOpt] = useDisableCompany({
    onCompleted: handleDisable
  });
  const [businessEnable, businessEnableOpt] = useEnableCompany({
    onCompleted: handleEnable
  });
  const [updateBusiness, updateBusinessOpt] = useEditCompany({
    onCompleted: handleUpdate
  });
  const [validateBusiness] = useValidationCompany({
    onCompleted: handleValidationSuccess
  });
  const [createChatwoot, createChatwootOpts] = useCompanyChatwootCreateQuery({
    onCompleted: handleCreateChatwootSuccess
  });
  const [updateChatwoot, updateChatwootOpts] = useCompanyChatwootUpdateQuery({
    onCompleted: handleUpdateChatwootSuccess
  });

  const handleValidateBusiness = async () => {
    await validateBusiness({
      variables: {
        id,
        reason: "",
        status: CompanyStatusEnum.ACCEPTED
      }
    });
    return [];
  };
  const handleDismissBusiness = async (data: BusinessValidationFormData) => {
    await validateBusiness({
      variables: {
        id,
        reason: data.reason,
        status: CompanyStatusEnum.REJECTED
      }
    });
    return [];
  };
  const handleSsspendBusiness = async (data: BusinessValidationFormData) => {
    await validateBusiness({
      variables: {
        id,
        reason: data.reason,
        status: CompanyStatusEnum.DEACTIVATED
      }
    });
    return [];
  };
  const handleActivateBusiness = (data: ActiveBusinessPageFormData) => {
    if (!data.isEnabled) {
      businessEnable({
        variables: {
          id
        }
      });
    } else if (data.isEnabled) {
      businessDisable({
        variables: {
          id
        }
      });
    }
  };
  const handleChatwootCreate = (data: Partial<BusinessDetailsPageFormData>) =>
    createChatwoot({
      variables: {
        id,
        input: {
          isActive: true,
          password: data.chatPassword,
          websiteUrl: STOREFRONT_URI || ""
        }
      }
    });

  const handleChatwootToggle = (data: Partial<BusinessDetailsPageFormData>) =>
    updateChatwoot({
      variables: {
        id: business?.chatwootCredentials?.id,
        input: {
          isActive: !data.isChatActive
        }
      }
    });

  const handleChatwootPasswordReset = (
    data: Partial<BusinessDetailsPageFormData>
  ) =>
    updateChatwoot({
      variables: {
        id: business?.chatwootCredentials?.id,
        input: {
          password: data.chatPassword
        }
      }
    });

  const handleSubmit = (data: BusinessDetailsPageFormData) => {
    updateBusiness({
      variables: {
        id,
        input: {
          name: data.name,
          publicName: data.publicName,
          cif: data.cif,
          phone: data.phone,
          email: data.email,
          languageCode: data.languageCode,
          description: data.description
        }
      }
    });
    return [];
  };
  const errors = [...(updateBusinessOpt.data?.companyUpdate?.errors || [])];
  const chatwootErrors = [
    ...(createChatwootOpts.data?.companyChatwootCreate?.errors || []),
    ...(updateChatwootOpts.data?.companyChatwootUpdate?.errors || [])
  ];

  const disabled =
    loading ||
    businessDisableOpt.loading ||
    businessEnableOpt.loading ||
    updateBusinessOpt.loading ||
    createChatwootOpts.loading ||
    updateChatwootOpts.loading;

  if (business === null) {
    return <NotFoundPage onBack={handleBack} />;
  }

  return (
    <>
      <WindowTitle title={business?.name} />
      <BusinessDetailsPage
        business={business}
        disabled={disabled}
        errors={errors}
        chatwootErrors={chatwootErrors}
        onBack={handleBack}
        onSubmit={handleSubmit}
        onActiveSubmit={handleActivateBusiness}
        saveButtonBar={getMutationState(
          updateBusinessOpt.called,
          updateBusinessOpt.loading
        )}
        onValidateBusiness={handleValidateBusiness}
        onDismissBusiness={handleDismissBusiness}
        onAddressManageClick={() => navigate(businessAddressesPath(id))}
        onSuspendBusiness={handleSsspendBusiness}
        onBannerDelete={() => openModal("removeBanner")}
        onImageUpload={file => {
          updateBusiness({
            variables: {
              id,
              input: {
                image: file
              }
            }
          });
        }}
        onBannerUpload={handleBannerUpload}
        onCreateChatwoot={handleChatwootCreate}
        onToggleChatwoot={handleChatwootToggle}
        onResetChatwootPassword={handleChatwootPasswordReset}
      />

      {/* Image crop modal */}
      {bannerSrc && (
        <BannerImageCropDialog
          imageSrc={bannerSrc}
          open={params.action === "cropImage"}
          onClose={closeModal}
          onComplete={file => {
            updateBusiness({
              variables: {
                id,
                input: {
                  banner: file
                }
              }
            });
            closeModal();
            setBannerSrc(null);
          }}
          bannerAspect={bannerAspect}
          bannerFileValitations={bannerFileValitations}
          minBannerHeight={minBannerHeight}
        />
      )}

      {/* Image delete modal */}
      <ActionDialog
        open={params.action === "removeBanner"}
        onClose={closeModal}
        confirmButtonState={updateBusinessOpt.status}
        onConfirm={() => {
          updateBusiness({
            variables: { id, input: { banner: null } }
          });
          closeModal();
        }}
        variant="default"
        title={intl.formatMessage(commonMessages.deleteImage)}
      >
        <DialogContentText>
          <FormattedMessage defaultMessage="Are you shure you want to delete this business image?" />
        </DialogContentText>
      </ActionDialog>

      {/* Update success modal */}
      <Dialog
        open={params.action === "adminVerification"}
        onClose={closeModal}
        maxWidth={isMdUp ? "md" : "lg"}
        className={classes.validationModal}
      >
        <DialogTitle>
          <Typography variant="h2" display="inline">
            <FormattedMessage defaultMessage="Your shop needs validation" />
          </Typography>
          {/* TODO align close modal icon */}
          {/* <CloseIcon onClick={closeModal} className={classes.closeIcon} /> */}
        </DialogTitle>
        <DialogContent>
          <Typography className={classes.dialogText}>
            <FormattedMessage defaultMessage="You have edited your shop succesfully, but before you can see the changes, an administrator must validate them. You will receive an email once your shop is validated." />
          </Typography>
          <Button color="primary" variant="contained" onClick={closeModal}>
            <FormattedMessage defaultMessage="Got it" />
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BusinessDetailsView;
