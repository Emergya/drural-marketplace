import { Backlink } from "@drural/macaw-ui";
import { Typography } from "@material-ui/core";
import CompanyAddressInput from "@saleor/components/CompanyAddressInput";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import Grid from "@saleor/components/Grid";
import Hr from "@saleor/components/Hr";
import PageHeader from "@saleor/components/PageHeader";
import Savebar from "@saleor/components/Savebar";
import useAddressValidation from "@saleor/hooks/useAddressValidation";
import useStateFromProps from "@saleor/hooks/useStateFromProps";
import { commonMessages, sectionNames } from "@saleor/intl";
import createSingleAutocompleteSelectHandler from "@saleor/utils/handlers/singleAutocompleteSelectChangeHandler";
import { mapCountriesToChoices } from "@saleor/utils/maps";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { maybe } from "../../../misc";
import GA4Tag from "../GA4Tag";
import { getGa4FormError } from "../GA4Tag/utils";
import SiteCommisionRate from "../SiteCommissionRate";
import SiteSettingsDetails from "../SiteSettingsDetails/SiteSettingsDetails";
import { useStyles } from "./styles";
import { SiteSettingsPageProps } from "./types";
import { areAddressInputFieldsModified, getInitialFormData } from "./utils";

const SiteSettingsPage: React.FC<SiteSettingsPageProps> = props => {
  const {
    disabled,
    errors,
    saveButtonBarState,
    shop,
    onBack,
    onSubmit
  } = props;
  const classes = useStyles(props);
  const intl = useIntl();
  const [displayCountry, setDisplayCountry] = useStateFromProps(
    maybe(() => shop.companyAddress.country.code, "")
  );

  const {
    errors: validationErrors,
    submit: handleSubmitWithAddress
  } = useAddressValidation(onSubmit);

  return (
    <Form
      initial={getInitialFormData(shop)}
      onSubmit={data => {
        const submitFunc = areAddressInputFieldsModified(data)
          ? handleSubmitWithAddress
          : onSubmit;
        return submitFunc(data);
      }}
      confirmLeave
    >
      {({ change, data, hasChanged, submit }) => {
        const countryChoices = mapCountriesToChoices(shop?.countries || []);
        const handleCountryChange = createSingleAutocompleteSelectHandler(
          change,
          setDisplayCountry,
          countryChoices
        );
        const ga4FormError = getGa4FormError(data);

        return (
          <Container>
            <Backlink onClick={onBack}>
              {intl.formatMessage(sectionNames.configuration)}
            </Backlink>
            <PageHeader
              title={intl.formatMessage(commonMessages.generalInformations)}
            />
            <Grid className={classes.gridWrapper} variant="inverted">
              <div>
                <Typography>
                  {intl.formatMessage(sectionNames.siteSettings)}
                </Typography>
                <Typography variant="body2">
                  <FormattedMessage defaultMessage="These are general information about your store. They define what is the URL of your store and what is shown in browsers taskbar." />
                </Typography>
              </div>
              <SiteSettingsDetails
                data={data}
                errors={errors}
                disabled={disabled}
                onChange={change}
              />
              <Hr className={classes.hr} />
              <div>
                <Typography>
                  <FormattedMessage
                    defaultMessage="Company Information"
                    description="section header"
                  />
                </Typography>
                <Typography variant="body2">
                  <FormattedMessage defaultMessage="This address will be used to generate invoices and calculate shipping rates." />
                </Typography>
              </div>
              <CompanyAddressInput
                data={data}
                displayCountry={displayCountry}
                countries={countryChoices}
                errors={[...errors, ...validationErrors]}
                disabled={disabled}
                header={intl.formatMessage({
                  defaultMessage: "Store Information",
                  description: "section header"
                })}
                onChange={change}
                onCountryChange={handleCountryChange}
              />
              <Hr className={classes.hr} />
              <div>
                <Typography>
                  <FormattedMessage
                    defaultMessage="Commission rate"
                    description="section header"
                  />
                </Typography>
                <Typography variant="body2">
                  <FormattedMessage defaultMessage="Set the taxes that dRural will charge for every payment made in the marketplace." />
                </Typography>
              </div>
              <SiteCommisionRate
                data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
              <Hr className={classes.hr} />
              <div>
                <Typography>
                  <FormattedMessage
                    defaultMessage="Marketing tags"
                    description="section header"
                  />
                </Typography>
                <Typography variant="body2">
                  <FormattedMessage defaultMessage="Here you can add measurement tags for your campaings to get usefull information about the users in your storefront." />
                </Typography>
              </div>
              <GA4Tag
                data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
            </Grid>
            <Savebar
              state={saveButtonBarState}
              disabled={disabled || !hasChanged || ga4FormError}
              onCancel={onBack}
              onSubmit={submit}
            />
          </Container>
        );
      }}
    </Form>
  );
};

SiteSettingsPage.displayName = "SiteSettingsPage";
export default SiteSettingsPage;
