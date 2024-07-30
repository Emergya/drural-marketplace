import { Backlink, makeStyles } from "@drural/macaw-ui";
import {
  Button,
  Card,
  CardContent,
  Container,
  Typography
} from "@material-ui/core";
import CardTitle from "@saleor/components/CardTitle";
import ColorPicker from "@saleor/components/ColorPicker";
import { Grid } from "@saleor/components/Grid";
import ImageUploadWithCrop from "@saleor/components/ImageUploadWithCrop";
import PageHeader from "@saleor/components/PageHeader";
import Savebar from "@saleor/components/Savebar";
import { configurationMenuUrl } from "@saleor/configuration";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import { sectionNames } from "@saleor/intl";
import { dRuralPalette } from "@saleor/theme/overrides/palettes";
import { ShopSettingsInput } from "@saleor/types/globalTypes";
import { MediaSizeEnum } from "@saleor/utils/_types/media";
import {
  bannerDashboardFileValitations,
  bannerStorefrontFileValitations,
  commonFileValidations,
  dashboardBannerAspect,
  minDashboardBannerHeight,
  minStorefrontBannerHeight,
  storefrontBannerAspect
} from "@saleor/utils/files/constants";
import React, { useState } from "react";
import { useQuery } from "react-apollo";
import { FormattedMessage, useIntl } from "react-intl";

import { useUpdateCustomization } from "./mutations";
import { shopCustomization } from "./queries";
import { CustomizationUpdate } from "./types/CustomizationUpdate";
import { ShopCustomization } from "./types/ShopCustomization";
const useStyles = makeStyles(
  theme => ({
    header: {
      margin: 0
    },
    card: {
      marginTop: "24px"
    },
    buttonText: {
      "& span": {
        textTransform: "uppercase",
        fontWeight: theme.typography.fontWeightBold
      }
    },
    colorThemeWrapper: {
      marginTop: "26px"
    },
    pickerWrapper: {
      display: "flex",
      marginTop: "26px",
      "& > div:first-child": {
        marginRight: "72px"
      },
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        "& > div:first-child": {
          marginRight: "0",
          marginBottom: "15px"
        }
      }
    }
  }),
  { name: "CustomizationPage" }
);

export const CustomizationPage: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigator();
  const intl = useIntl();
  const notify = useNotifier();
  const [logo, setLogo] = useState<File>(null);
  const [bannerStorefront, setBannerStorefront] = useState<File>(null);
  const [bannerDashboard, setBannerDashboard] = useState<File>(null);
  const [primaryColor, setPrimaryColor] = useState<string>("");
  const [secondaryColor, setSecondaryColor] = useState<string>("");

  const [inputLogoRef, setInputLogoRef] = useState<
    React.MutableRefObject<HTMLInputElement>
  >();

  const [inputStorefrontRef, setInputStorefrontRef] = useState<
    React.MutableRefObject<HTMLInputElement>
  >();
  const [inputDashboardRef, setInputDashboardRef] = useState<
    React.MutableRefObject<HTMLInputElement>
  >();

  const isSubmitSuccessful = (data: CustomizationUpdate) => {
    if (data.shopSettingsUpdate.errors.length === 0) {
      notify({
        status: "success",
        text: intl.formatMessage({
          defaultMessage: "Images/Colors have been successfully modified"
        })
      });
    } else {
      data.shopSettingsUpdate.errors.map(error =>
        notify({
          status: "error",
          text: error.message
        })
      );
    }
  };
  const { data } = useQuery<ShopCustomization>(shopCustomization);

  const [
    updateCustomization,
    updateCustomizationResult
  ] = useUpdateCustomization({
    onCompleted: isSubmitSuccessful
  });

  const handdleDeleteLogo = () => {
    updateCustomization({
      variables: {
        input: {
          logo: null
        }
      }
    });
  };
  const handdleDeleteBannerStorefront = () => {
    updateCustomization({
      variables: {
        input: {
          storefrontBanner: null
        }
      }
    });
  };

  const handdleDeleteBannerDashboard = () => {
    updateCustomization({
      variables: {
        input: {
          dashboardBanner: null
        }
      }
    });
  };

  const checkAndBuildInput = () => {
    const input: ShopSettingsInput = {};

    if (logo) {
      input.logo = logo;
    }
    if (bannerDashboard) {
      input.dashboardBanner = bannerDashboard;
    }
    if (bannerStorefront) {
      input.storefrontBanner = bannerStorefront;
    }
    if (primaryColor) {
      input.primaryColor = primaryColor;
    }
    if (secondaryColor) {
      input.secondaryColor = secondaryColor;
    }

    return input;
  };

  const handdleUpdate = () => {
    const input = checkAndBuildInput();
    updateCustomization({
      variables: {
        input
      }
    });
  };

  return (
    <Container>
      <Backlink
        onClick={() => {
          navigate(configurationMenuUrl);
        }}
      >
        {intl.formatMessage(sectionNames.configuration)}
      </Backlink>
      <PageHeader
        className={classes.header}
        title={intl.formatMessage(sectionNames.siteCustomization)}
      />
      <Grid>
        <div>
          <Card className={classes.card}>
            <CardTitle
              title={
                <FormattedMessage
                  defaultMessage="Main logo and colors"
                  description="Customization logo and colors"
                />
              }
              toolbar={
                <Button
                  className={classes.buttonText}
                  color="primary"
                  variant="text"
                  onClick={() => inputLogoRef?.current?.click()}
                >
                  <FormattedMessage defaultMessage="UPLOAD" />
                </Button>
              }
            />
            <CardContent>
              <ImageUploadWithCrop
                title={intl.formatMessage({
                  defaultMessage: "Upload a logo for the platform"
                })}
                description={intl.formatMessage({
                  defaultMessage:
                    "The logo should be ideally in landscape format Supported formats: svg"
                })}
                validations={commonFileValidations}
                size={MediaSizeEnum.SM}
                image={data?.shop?.logo?.url}
                setImage={setLogo}
                uploadButton={false}
                onImageDelete={handdleDeleteLogo}
                setUploadLinkRef={setInputLogoRef}
                fileAcceptedFormats=".svg"
              />
              <div className={classes.colorThemeWrapper}>
                <Typography variant="h4">
                  <FormattedMessage defaultMessage="Color theme" />
                </Typography>
                <div className={classes.pickerWrapper}>
                  <ColorPicker
                    selectedColor={data?.shop?.primaryColor}
                    defaultColor={dRuralPalette.light.primary}
                    colorName={intl.formatMessage({
                      defaultMessage: "PRIMARY COLOR"
                    })}
                    changeSelectedColor={color => setPrimaryColor(color.hex)}
                  />
                  <ColorPicker
                    selectedColor={data?.shop?.secondaryColor}
                    defaultColor={dRuralPalette.light.secondary}
                    colorName={intl.formatMessage({
                      defaultMessage: "SECONDARY COLOR"
                    })}
                    changeSelectedColor={color => setSecondaryColor(color.hex)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardTitle
              title={
                <FormattedMessage
                  defaultMessage="Marketplace login image"
                  description="Customization marketplace login image"
                />
              }
              toolbar={
                <Button
                  className={classes.buttonText}
                  color="primary"
                  variant="text"
                  onClick={() => inputStorefrontRef?.current?.click()}
                >
                  <FormattedMessage defaultMessage="UPLOAD" />
                </Button>
              }
            />
            <CardContent>
              <ImageUploadWithCrop
                title={intl.formatMessage({
                  defaultMessage: "Upload an image for the marketplace login"
                })}
                description={intl.formatMessage({
                  defaultMessage:
                    "Minimum size: 1440 x 720 px Supported formats: jpeg, gif, png."
                })}
                validations={bannerStorefrontFileValitations}
                size={MediaSizeEnum.SM}
                image={data?.shop?.storefrontBanner?.url}
                setImage={setBannerStorefront}
                uploadButton={false}
                setUploadLinkRef={setInputStorefrontRef}
                withCropper
                onImageDelete={handdleDeleteBannerStorefront}
                bannerAspect={storefrontBannerAspect}
                minBannerHeight={minStorefrontBannerHeight}
              />
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardTitle
              title={
                <FormattedMessage
                  defaultMessage="Dashboard login image"
                  description="Customization dashboard login image"
                />
              }
              toolbar={
                <Button
                  className={classes.buttonText}
                  color="primary"
                  variant="text"
                  onClick={() => inputDashboardRef?.current?.click()}
                >
                  <FormattedMessage defaultMessage="UPLOAD" />
                </Button>
              }
            />
            <CardContent>
              <ImageUploadWithCrop
                title={intl.formatMessage({
                  defaultMessage: "Upload an image for the dashboard login"
                })}
                description={intl.formatMessage({
                  defaultMessage:
                    "Minimum size: 520 x 1024 px Supported formats: jpeg, gif, png."
                })}
                validations={bannerDashboardFileValitations}
                size={MediaSizeEnum.SM}
                image={data?.shop?.dashboardBanner?.url}
                setImage={setBannerDashboard}
                uploadButton={false}
                setUploadLinkRef={setInputDashboardRef}
                withCropper
                onImageDelete={handdleDeleteBannerDashboard}
                bannerAspect={dashboardBannerAspect}
                minBannerHeight={minDashboardBannerHeight}
              />
            </CardContent>
          </Card>
        </div>
      </Grid>
      <Savebar
        onCancel={() => {
          navigate(configurationMenuUrl);
        }}
        onSubmit={handdleUpdate}
        state={updateCustomizationResult.status}
        disabled={
          !logo &&
          !bannerStorefront &&
          !bannerDashboard &&
          !primaryColor &&
          !secondaryColor
        }
      />
    </Container>
  );
};
CustomizationPage.displayName = "CustomizationPage";
export default CustomizationPage;
