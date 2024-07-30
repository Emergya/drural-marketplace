import { Backlink } from "@drural/macaw-ui";
import { Container } from "@material-ui/core";
import ChatwootConfiguration from "@saleor/chatwoot/components/ChatwootConfiguration";
import CardSpacer from "@saleor/components/CardSpacer";
import Form from "@saleor/components/Form";
import Grid from "@saleor/components/Grid";
import Savebar from "@saleor/components/Savebar";
import StripeWarning from "@saleor/components/StripeWarning";
import useNavigator from "@saleor/hooks/useNavigator";
import useUser from "@saleor/hooks/useUser";
import { commonMessages, sectionNames } from "@saleor/intl";
import { MediaShapeEnum } from "@saleor/utils/_types/media";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";

import { ChatwootConfigurationType } from "../../../chatwoot/components/ChatwootConfiguration/types";
import { businessStripeConfigurationUrl } from "../../urls";
import BusinessActive from "../BusinessActive/BusinessActive";
import BusinessAddress from "../BusinessAddress";
import BusinessAgents from "../BusinessAgents";
import BusinessConfiguration from "../BusinessConfiguration";
import BusinessDetails from "../BusinessDetails";
import BusinessHistory from "../BusinessHistory";
import BusinessMedia from "../BusinessMedia";
import BusinessOrders from "../BusinessOrders";
import { BusinessStripeConfiguration } from "../BusinessStripeConfiguration";
import BusinessValidation from "../BusinessValidation";
import BusinessDetailsForm from "./form";
import Title from "./Title";
import { BusinessDetailsPageProps } from "./types";
import { getInitialActiveValue, getInitialValues } from "./utils";

const BusinessDetailsPage: React.FC<BusinessDetailsPageProps> = ({
  business,
  disabled,
  onActiveSubmit,
  onBack,
  onSubmit,
  saveButtonBar,
  onAddressManageClick,
  onValidateBusiness,
  onDismissBusiness,
  errors,
  chatwootErrors,
  onSuspendBusiness,
  onImageUpload,
  onBannerDelete,
  onBannerUpload,
  onCreateChatwoot,
  onToggleChatwoot,
  onResetChatwootPassword
}: BusinessDetailsPageProps) => {
  const intl = useIntl();
  const { user } = useUser();
  const navigate = useNavigator();
  const { isSeller, isStaff } = user || {};
  const { isEnabled: isStripeEnabled } = business?.stripeCredentials || {};

  const [hasStripeWarning, setStripeWarning] = useState(false);
  const showStripeWarning = isSeller && !disabled && hasStripeWarning;

  useEffect(() => {
    setStripeWarning(!isStripeEnabled);
  }, [isStripeEnabled]);

  return (
    <Container>
      <Backlink onClick={onBack}>
        {intl.formatMessage(sectionNames.business)}
      </Backlink>
      {showStripeWarning && (
        <StripeWarning
          spacer
          text={intl.formatMessage(commonMessages.stripeWarningText)}
          onClose={() => setStripeWarning(false)}
          onConfigureStripe={() =>
            navigate(businessStripeConfigurationUrl(business?.id))
          }
        />
      )}
      <Title business={business} />
      <CardSpacer />
      <Grid>
        <div>
          <Form
            initial={getInitialActiveValue(business, errors)}
            onSubmit={onActiveSubmit}
            confirmLeave
          >
            {({ change, data, submit }) => (
              <>
                <BusinessActive
                  business={business}
                  data={data}
                  disabled={disabled}
                  submit={submit}
                  onChange={change}
                  isStaff={isStaff}
                  onSuspendBusiness={onSuspendBusiness}
                />
                <CardSpacer />
              </>
            )}
          </Form>
          <BusinessDetailsForm
            initial={getInitialValues(business, errors)}
            onSubmit={onSubmit}
            confirmLeave
          >
            {({ change, outerChange, set, data, hasChanged, submit }) => (
              <>
                <BusinessDetails
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  onChange={change}
                />
                <CardSpacer />
                <BusinessConfiguration
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  onChange={change}
                />
                <CardSpacer />
                {isSeller && (
                  <ChatwootConfiguration
                    data={data}
                    disabled={disabled}
                    errors={chatwootErrors}
                    type={ChatwootConfigurationType.company}
                    onChange={outerChange}
                    onSet={set}
                    onCreateChatwoot={onCreateChatwoot}
                    onToggleChatwoot={onToggleChatwoot}
                    onResetChatwootPassword={onResetChatwootPassword}
                  />
                )}
                <CardSpacer />
                <BusinessMedia
                  image={{
                    alt: "business-profile-img",
                    url: business?.imageUrl
                  }}
                  title={intl.formatMessage({
                    defaultMessage: "Profile image (required)"
                  })}
                  shape={MediaShapeEnum.SQUARE}
                  subTitle={intl.formatMessage({
                    defaultMessage: "Upload a photo for your shop profile"
                  })}
                  onImageUpload={onImageUpload}
                />
                <CardSpacer />
                <BusinessMedia
                  description={intl.formatMessage({
                    defaultMessage:
                      "This is the picture that will show up in the header of your shop page. Minimum size: 1440 x 480 (width x height)."
                  })}
                  image={business?.banner}
                  title={intl.formatMessage({
                    defaultMessage: "Header image (optional)"
                  })}
                  shape={MediaShapeEnum.RECTANGLE}
                  subTitle={intl.formatMessage({
                    defaultMessage: "Upload a photo for your shop page header"
                  })}
                  onImageDelete={onBannerDelete}
                  onImageUpload={onBannerUpload}
                />
                <CardSpacer />
                <BusinessOrders />
                <Savebar
                  disabled={disabled || !hasChanged}
                  state={saveButtonBar}
                  onSubmit={submit}
                  onCancel={onBack}
                />
              </>
            )}
          </BusinessDetailsForm>
        </div>
        <div>
          {isStaff && business?.status === "PEN" && (
            <>
              <BusinessValidation
                disabled={disabled}
                onDismiss={onDismissBusiness}
                onValidate={onValidateBusiness}
              />
              <CardSpacer />
            </>
          )}
          <BusinessAddress
            address={business?.address}
            disabled={disabled}
            onAddressManageClick={onAddressManageClick}
          />
          <CardSpacer />
          {isSeller && (
            <BusinessStripeConfiguration
              businessId={business?.id}
              disabled={disabled}
              isStripeEnabled={business?.stripeCredentials?.isEnabled}
            />
          )}
          <CardSpacer />
          <BusinessAgents businessId={business?.id} disabled={disabled} />
          <CardSpacer />
          <BusinessHistory business={business} />
        </div>
      </Grid>
    </Container>
  );
};
BusinessDetailsPage.displayName = "BusinessDetailsPage";
export default BusinessDetailsPage;
