import { CompanyEnableStripe } from "@saleor/business/types/CompanyEnableStripe";
import { CompanyLinkStripeAccount } from "@saleor/business/types/CompanyLinkStripeAccount";
import { CompanyStripeAccountCreate } from "@saleor/business/types/CompanyStripeAccountCreate";
import NotFoundPage from "@saleor/components/NotFoundPage";
import { StripeConnectionStatus } from "@saleor/components/StripeAccountConfiguration/types";
import { getStripeAccountConfigurationStep } from "@saleor/components/StripeAccountConfiguration/utils";
import { WindowTitle } from "@saleor/components/WindowTitle";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages, errorMessages } from "@saleor/intl";
import {
  getBusinessEnableStripeErrorMessage,
  getBusinessLinkStripeAccountErrorMessage,
  getBusinessStripeAccountCreateErrorMessage
} from "@saleor/utils/errors/business";
import React, { useEffect } from "react";
import { useIntl } from "react-intl";

import { APP_MOUNT_URI } from "../../../config";
import BusinessStripeConfiigurationPage from "../../components/BusinessStripeConfiigurationPage";
import {
  useCompanyEnableStripe,
  useCompanyLinkStripeAccount,
  useCompanyStripeAccountCreate
} from "../../mutations";
import { useBusinessDetailsQuery } from "../../queries";
import {
  businessStripeConfigurationUrl,
  businessUrl,
  companyStripeRedirectUrl
} from "../../urls";
import { IBusinessStripeConfigurationProps } from "./types";

export const BusinessStripeConfiguration: React.FC<IBusinessStripeConfigurationProps> = ({
  id: businessId,
  params: { stripeReturned, stripeConnection }
}) => {
  const intl = useIntl();
  const navigate = useNavigator();
  const notify = useNotifier();

  const {
    data: businessDetailsData,
    loading: loadingBusinessDetails,
    refetch: refetchBusinessDetails
  } = useBusinessDetailsQuery({
    displayLoader: true,
    variables: {
      id: businessId
    }
  });
  const business = businessDetailsData?.company;
  const { accountId: stripeAccountId, isEnabled: isStripeEnabled } =
    business?.stripeCredentials || {};

  const stripeRedirectUrl = companyStripeRedirectUrl(
    window.location.origin,
    APP_MOUNT_URI,
    businessId,
    {
      stripeReturned: true
    }
  );

  const handleCreateStripeAccountComplete = (
    data: CompanyStripeAccountCreate
  ) => {
    const { errors } = data.companyStripeAccountCreate;

    if (errors.length) {
      errors.forEach(error =>
        notify({
          status: "error",
          text: getBusinessStripeAccountCreateErrorMessage(error, intl)
        })
      );
    } else {
      refetchBusinessDetails();
      notify({
        status: "success",
        text: intl.formatMessage({
          defaultMessage: "Stripe account successfuly created"
        })
      });
    }
  };

  const handleCreateStripeAccountError = () => {
    notify({
      status: "error",
      text: intl.formatMessage(errorMessages.unableToConnectWithStripe)
    });
  };

  const handleLinkStripeAccountComplete = (data: CompanyLinkStripeAccount) => {
    const { errors } = data.companyLinkStripeAccount;
    const stripeFormUrl = data.companyLinkStripeAccount.stripeForm;

    if (errors.length) {
      errors.forEach(error =>
        notify({
          status: "error",
          text: getBusinessLinkStripeAccountErrorMessage(error, intl)
        })
      );
    } else {
      refetchBusinessDetails();
      window.open(stripeFormUrl, "_blank");
    }
  };

  const handleLinkStripeAccountError = () => {
    notify({
      status: "error",
      text: intl.formatMessage(errorMessages.unableToSetUpStripeAccount)
    });
  };

  const handleEnableCompanyStripeComplete = (data: CompanyEnableStripe) => {
    const { errors } = data.companyEnableStripe;

    if (errors.length) {
      navigate(
        businessStripeConfigurationUrl(businessId, {
          stripeReturned,
          stripeConnection: StripeConnectionStatus.error
        })
      );

      errors.forEach(error =>
        notify({
          status: "error",
          text: getBusinessEnableStripeErrorMessage(error, intl)
        })
      );
    } else {
      refetchBusinessDetails();

      navigate(
        businessStripeConfigurationUrl(businessId, {
          stripeReturned,
          stripeConnection: StripeConnectionStatus.success
        })
      );

      notify({
        status: "success",
        text: intl.formatMessage({
          defaultMessage: "Shop successfully activated with stripe"
        })
      });
    }
  };

  const handleEnableCompanyStripeError = () => {
    navigate(
      businessStripeConfigurationUrl(businessId, {
        stripeReturned,
        stripeConnection: StripeConnectionStatus.error
      })
    );

    notify({
      status: "error",
      text: intl.formatMessage(errorMessages.unableToActivateStripe)
    });
  };

  const [
    createStripeAccount,
    createStripeAccountOpts
  ] = useCompanyStripeAccountCreate({
    onCompleted: handleCreateStripeAccountComplete,
    onError: handleCreateStripeAccountError
  });

  const [
    linkStripeAccount,
    linkStripeAccountOpts
  ] = useCompanyLinkStripeAccount({
    onCompleted: handleLinkStripeAccountComplete,
    onError: handleLinkStripeAccountError
  });

  const [enableCompanyStripe, enableCompanyStripeOpts] = useCompanyEnableStripe(
    {
      onCompleted: handleEnableCompanyStripeComplete,
      onError: handleEnableCompanyStripeError
    }
  );

  const handleCreateStripeAccount = () => {
    createStripeAccount({
      variables: {
        id: businessId
      }
    });
  };

  const handleLinkStripeAccount = () => {
    linkStripeAccount({
      variables: {
        id: businessId,
        input: {
          refreshUrl: stripeRedirectUrl,
          returnUrl: stripeRedirectUrl
        }
      }
    });
  };

  const handleEnableCompanyStripe = () => {
    if (!isStripeEnabled) {
      enableCompanyStripe({
        variables: {
          id: businessId
        }
      });
    }
  };

  const handleBack = () => navigate(businessUrl(businessId));

  const stripeLoading =
    createStripeAccountOpts.loading ||
    linkStripeAccountOpts.loading ||
    enableCompanyStripeOpts.loading;

  const disabled = loadingBusinessDetails || stripeLoading;

  const activeStep = getStripeAccountConfigurationStep(
    stripeAccountId,
    isStripeEnabled,
    stripeLoading,
    stripeReturned,
    stripeConnection
  );

  // Fires enableCompanyStripe mutation after redirecting from stripe form.
  // Depending on th result navigates to the success or error card content.
  useEffect(() => {
    if (stripeReturned && stripeConnection !== StripeConnectionStatus.success) {
      handleEnableCompanyStripe();
    }
  }, [stripeReturned]);

  if (business === null) {
    return <NotFoundPage onBack={handleBack} />;
  }

  return (
    <>
      <WindowTitle title={intl.formatMessage(commonMessages.stripePayments)} />
      <BusinessStripeConfiigurationPage
        activeStep={activeStep}
        disabled={disabled}
        onBack={handleBack}
        onCreateStripeAccount={handleCreateStripeAccount}
        onLinkStripeAccount={handleLinkStripeAccount}
      />
    </>
  );
};

BusinessStripeConfiguration.displayName = "BusinessStripeConfiguration";
export default BusinessStripeConfiguration;
